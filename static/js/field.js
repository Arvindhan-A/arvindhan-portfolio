// Hero: a ripple tank. Two drifting sources, the pointer and tap/click pulses add up as
// real wave superposition. The GPU draws the result as a halftone field; the same sum
// runs here in JS for the name, whose letters swell, lift and take colour with the wave.
(() => {
    const canvas = document.getElementById('field');
    if (!canvas) return;

    const hero = canvas.parentElement;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const hasMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const nameEl = hero.querySelector('.hero-name');
    const letters = [...hero.querySelectorAll('.hero-name .ch')].map(el => ({
        el, inner: el.firstElementChild, x: 0, y: 0, weight: 0, lift: 0, tint: '',
    }));

    const WAVELENGTH = 104;
    const K = (Math.PI * 2) / WAVELENGTH;
    const OMEGA = 2.3;
    const DAMPING = 0.0011;
    const POINTER_REACH = 300;
    const PULSE_SPEED = 560;
    const PULSE_WIDTH = 70;
    const PULSE_LIFE = 3;
    const MAX_PULSES = 5;
    const AUTO_PULSE_EVERY = 4.5;
    const REVEAL_TIME = 1.7;

    const BASE_WEIGHT = 500;
    const MIN_WEIGHT = 300;
    const MAX_WEIGHT = 800;

    const VERTEX_SHADER = `
        attribute vec2 aPos;
        void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
    `;
    const FRAGMENT_SHADER = `
        precision highp float;
        uniform vec2 uRes;
        uniform float uDpr, uTime, uGap, uReveal, uTextTop;
        uniform vec2 uA, uB, uRevealAt;
        uniform vec3 uPointer;
        uniform vec4 uPulses[${MAX_PULSES}];
        uniform vec3 uColA, uColB;

        float wave(vec2 p) {
            float phase = ${OMEGA.toFixed(3)} * uTime;
            float k = ${K.toFixed(6)};
            float da = distance(p, uA);
            float db = distance(p, uB);
            float w = 0.5 * (sin(k * da - phase) / (1.0 + da * ${DAMPING.toFixed(5)})
                           + sin(k * db - phase) / (1.0 + db * ${DAMPING.toFixed(5)}));
            if (uPointer.z > 0.01) {
                float dp = distance(p, uPointer.xy);
                w += 0.9 * uPointer.z * sin(k * dp - phase * 1.5) * exp(-dp / ${POINTER_REACH.toFixed(1)});
            }
            for (int i = 0; i < ${MAX_PULSES}; i++) {
                if (uPulses[i].w > 0.0) {
                    float off = (distance(p, uPulses[i].xy) - uPulses[i].z) / ${PULSE_WIDTH.toFixed(1)};
                    w += uPulses[i].w * exp(-off * off);
                }
            }
            return clamp(w, -1.0, 1.0);
        }

        void main() {
            vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;

            // The grid bends away from the pointer.
            vec2 away = p - uPointer.xy;
            float dist = length(away) + 0.001;
            float push = 30.0 * uPointer.z * (1.0 - exp(-dist / 50.0)) * exp(-dist / 150.0);
            vec2 q = p - (away / dist) * push;

            // Staggered rows, like a printer's halftone.
            float row = floor(q.y / uGap);
            float shift = 0.5 * mod(row, 2.0);
            vec2 centre = vec2((floor(q.x / uGap - shift) + 0.5 + shift) * uGap, (row + 0.5) * uGap);

            float w = wave(centre);
            float strength = abs(w);
            float radius = uGap * (0.06 + 0.42 * strength);
            float edge = 0.8 / uDpr;
            float disc = 1.0 - smoothstep(radius - edge, radius + edge, distance(q, centre));
            float alpha = disc * (0.16 + 0.84 * strength);

            // Strongest up top, and nearly gone behind the small text so it stays readable.
            alpha *= 1.0 - 0.9 * smoothstep(uTextTop - 40.0, uTextTop + 10.0, p.y);
            // The opening ripple uncovers the field.
            alpha *= smoothstep(uReveal, uReveal - 140.0, distance(centre, uRevealAt));

            vec3 colour = w < 0.0 ? uColB : uColA;
            gl_FragColor = vec4(colour * alpha, alpha);
        }
    `;

    let width = 0;
    let height = 0;
    let narrow = false;
    let fontSize = 0;
    let renderScale = 2;
    let lettersLive = false;
    let letterEvery = 2;
    let frameCount = 0;
    let revealStart = -1;
    let nextAutoPulse = 3;
    const startedAt = performance.now();
    const sourceA = { x: 0, y: 0 };
    const sourceB = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0, strength: 0, target: 0 };
    const pulses = [];

    let running = false;
    let onScreen = true;
    let rafId = 0;
    let lastFrame = 0;
    let slowFrames = 0;
    let sampledFrames = 0;

    const now = () => (performance.now() - startedAt) / 1000;

    /* ---------- WebGL setup ---------- */
    let gl = null;
    let uniforms = {};
    const pulseData = new Float32Array(MAX_PULSES * 4);

    function compile(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    }

    function initGl() {
        gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'low-power' });
        if (!gl) return false;
        const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        if (!vertex || !fragment) return false;
        const program = gl.createProgram();
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'aPos');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        uniforms = {};
        ['uRes', 'uDpr', 'uTime', 'uGap', 'uReveal', 'uTextTop', 'uA', 'uB', 'uRevealAt', 'uPointer', 'uPulses', 'uColA', 'uColB'].forEach(name => {
            uniforms[name] = gl.getUniformLocation(program, name);
        });
        return true;
    }

    function hexToRgb(hex) {
        const value = parseInt(hex.trim().replace('#', ''), 16);
        return [(value >> 16 & 255) / 255, (value >> 8 & 255) / 255, (value & 255) / 255];
    }

    function readColors() {
        if (!gl) return;
        const style = getComputedStyle(document.documentElement);
        gl.uniform3fv(uniforms.uColA, hexToRgb(style.getPropertyValue('--accent')));
        gl.uniform3fv(uniforms.uColB, hexToRgb(style.getPropertyValue('--accent-2')));
    }

    /* ---------- The wave, as the name feels it ---------- */
    function moveSources(t) {
        if (narrow) {
            sourceA.x = width * (0.24 + 0.08 * Math.sin(t * 0.23));
            sourceA.y = height * (0.2 + 0.06 * Math.cos(t * 0.31));
            sourceB.x = width * (0.76 + 0.08 * Math.cos(t * 0.19));
            sourceB.y = height * (0.3 + 0.08 * Math.sin(t * 0.27));
        } else {
            sourceA.x = width * (0.56 + 0.1 * Math.sin(t * 0.23));
            sourceA.y = height * (0.26 + 0.12 * Math.cos(t * 0.31));
            sourceB.x = width * (0.84 + 0.07 * Math.cos(t * 0.19));
            sourceB.y = height * (0.22 + 0.14 * Math.sin(t * 0.27));
        }
    }

    function waveAt(x, y, t) {
        const phase = OMEGA * t;
        const da = Math.hypot(x - sourceA.x, y - sourceA.y);
        const db = Math.hypot(x - sourceB.x, y - sourceB.y);
        let wave = 0.5 * (Math.sin(K * da - phase) / (1 + da * DAMPING)
                        + Math.sin(K * db - phase) / (1 + db * DAMPING));
        if (pointer.strength > 0.01) {
            const dp = Math.hypot(x - pointer.x, y - pointer.y);
            wave += 0.9 * pointer.strength * Math.sin(K * dp - phase * 1.5) * Math.exp(-dp / POINTER_REACH);
        }
        for (const pulse of pulses) {
            const offset = (Math.hypot(x - pulse.x, y - pulse.y) - pulse.radius) / PULSE_WIDTH;
            if (offset > -3 && offset < 3) wave += pulse.power * Math.exp(-offset * offset);
        }
        return wave > 1 ? 1 : wave < -1 ? -1 : wave;
    }

    function driveLetters(t) {
        for (const letter of letters) {
            const wave = waveAt(letter.x, letter.y, t);
            let near = 0;
            if (pointer.strength > 0.01) {
                const dx = letter.x - pointer.x;
                const dy = letter.y - pointer.y;
                near = pointer.strength * Math.exp(-(dx * dx + dy * dy) / (fontSize * fontSize * 0.5));
            }
            const raw = BASE_WEIGHT + wave * 170 + near * 280;
            const weight = Math.round(Math.min(MAX_WEIGHT, Math.max(MIN_WEIGHT, raw)) / 10) * 10;
            if (weight !== letter.weight) {
                letter.weight = weight;
                letter.inner.style.fontWeight = weight;
            }

            const lift = Math.round((wave * -0.018 - near * 0.05) * fontSize);
            if (lift !== letter.lift) {
                letter.lift = lift;
                letter.inner.style.transform = `translateY(${lift}px)`;
            }

            // Strong crests and troughs tint the letter in the matching colour.
            const amount = Math.max(near, (Math.abs(wave) - 0.45) / 0.55);
            const percent = Math.round(Math.min(1, Math.max(0, amount)) * 10) * 10;
            const tint = percent === 0 ? '' : `color-mix(in srgb, var(${wave < 0 ? '--accent-2' : '--accent'}) ${percent}%, var(--text-1))`;
            if (tint !== letter.tint) {
                letter.tint = tint;
                letter.inner.style.color = tint;
            }
        }
    }

    /* ---------- Layout ---------- */
    function measure() {
        const box = hero.getBoundingClientRect();
        width = box.width;
        height = box.height;
        narrow = width < 700;
        letterEvery = narrow ? 3 : 2;

        if (gl) {
            const dpr = Math.min(devicePixelRatio || 1, renderScale);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uniforms.uRes, width, height);
            gl.uniform1f(uniforms.uDpr, canvas.width / width);
            gl.uniform1f(uniforms.uGap, narrow ? 11 : 12);
            const text = hero.querySelector('.hero-foot');
            gl.uniform1f(uniforms.uTextTop, text ? text.getBoundingClientRect().top - box.top : height);
        }

        if (nameEl) fontSize = parseFloat(getComputedStyle(nameEl).fontSize);
        for (const letter of letters) {
            const rect = letter.el.getBoundingClientRect();
            letter.x = rect.left + rect.width / 2 - box.left;
            letter.y = rect.top + rect.height / 2 - box.top;
        }
    }

    /* ---------- Frame ---------- */
    function updatePulses(t) {
        for (let i = pulses.length - 1; i >= 0; i--) {
            const pulse = pulses[i];
            const age = t - pulse.born;
            if (age > PULSE_LIFE) {
                pulses.splice(i, 1);
                continue;
            }
            pulse.radius = age * PULSE_SPEED;
            pulse.power = pulse.force * (1 - age / PULSE_LIFE);
        }
    }

    function revealRadius(t) {
        if (reduceMotion.matches) return 1e5;
        if (revealStart < 0) return 0;
        const progress = (t - revealStart) / REVEAL_TIME;
        if (progress >= 1) return 1e5;
        const eased = 1 - Math.pow(1 - progress, 3);
        return eased * Math.hypot(width, height) * 1.15;
    }

    function render(t) {
        if (!gl) return;
        pulseData.fill(0);
        pulses.forEach((pulse, i) => {
            pulseData.set([pulse.x, pulse.y, pulse.radius, pulse.power], i * 4);
        });
        gl.uniform1f(uniforms.uTime, t);
        gl.uniform2f(uniforms.uA, sourceA.x, sourceA.y);
        gl.uniform2f(uniforms.uB, sourceB.x, sourceB.y);
        gl.uniform3f(uniforms.uPointer, pointer.x, pointer.y, pointer.strength);
        gl.uniform4fv(uniforms.uPulses, pulseData);
        gl.uniform1f(uniforms.uReveal, revealRadius(t));
        gl.uniform2f(uniforms.uRevealAt, width * 0.5, height * 0.66);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // No cursor on phones, so a third source wanders along the name by itself
    // and the odd pulse rolls through.
    function touchLife(t) {
        pointer.x = width * (0.5 + 0.44 * Math.sin(t * 0.42));
        pointer.y = (letters[0] ? letters[0].y : height * 0.6) + Math.sin(t * 0.7) * height * 0.12;
        pointer.target = 0.8;
        if (t > nextAutoPulse) {
            nextAutoPulse = t + AUTO_PULSE_EVERY;
            addPulse(width * (0.15 + Math.random() * 0.7), height * (0.1 + Math.random() * 0.35), 0.9);
        }
    }

    function draw(t) {
        if (!hasMouse && !reduceMotion.matches) touchLife(t);
        pointer.strength += (pointer.target - pointer.strength) * 0.07;
        updatePulses(t);
        moveSources(t);
        render(t);
        if (lettersLive && frameCount++ % letterEvery === 0) driveLetters(t);
    }

    // If this device struggles, trade sharpness and letter updates to stay smooth.
    function watchPerformance(timestamp) {
        const delta = timestamp - lastFrame;
        lastFrame = timestamp;
        if (delta > 200) return;
        sampledFrames++;
        if (delta > 26) slowFrames++;
        if (sampledFrames < 90) return;
        if (slowFrames > 45) {
            if (renderScale > 1) {
                renderScale = 1;
                measure();
            } else {
                letterEvery = 6;
            }
        }
        sampledFrames = 0;
        slowFrames = 0;
    }

    function loop(timestamp) {
        draw(now());
        watchPerformance(timestamp);
        rafId = requestAnimationFrame(loop);
    }

    function sync() {
        const shouldRun = onScreen && !document.hidden && !reduceMotion.matches;
        if (shouldRun && !running) {
            running = true;
            lastFrame = performance.now();
            rafId = requestAnimationFrame(loop);
        } else if (!shouldRun && running) {
            running = false;
            cancelAnimationFrame(rafId);
        }
        if (reduceMotion.matches) draw(2);
    }

    function addPulse(x, y, force = 1.5) {
        if (reduceMotion.matches) return;
        if (pulses.length >= MAX_PULSES) pulses.shift();
        pulses.push({ x, y, born: now(), radius: 0, power: force, force });
    }

    /* ---------- Name ---------- */
    // Lock each letter's box to its normal width so changing weight never reflows the name.
    function lockLetterWidths() {
        for (const letter of letters) {
            const size = parseFloat(getComputedStyle(letter.el).fontSize);
            letter.el.style.width = `${letter.el.getBoundingClientRect().width / size}em`;
        }
        measure();
    }

    // Wait for the real font, so the name never rises in a fallback typeface and then jumps.
    function whenFontReady() {
        const timeout = new Promise(resolve => setTimeout(resolve, 1500));
        if (!document.fonts) return timeout;
        return Promise.race([document.fonts.load('500 1em "Funnel Display"').catch(() => {}), timeout]);
    }

    /* ---------- Events ---------- */
    if (hasMouse) {
        hero.addEventListener('pointermove', event => {
            const box = hero.getBoundingClientRect();
            pointer.x = event.clientX - box.left;
            pointer.y = event.clientY - box.top;
            pointer.target = 1;
        }, { passive: true });
        hero.addEventListener('pointerleave', () => { pointer.target = 0; });
    }
    hero.addEventListener('pointerdown', event => {
        if (event.target.closest('a, button')) return;
        const box = hero.getBoundingClientRect();
        addPulse(event.clientX - box.left, event.clientY - box.top);
    }, { passive: true });

    new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
    }).observe(hero);

    // Only redo the layout when the hero really changes size; mobile URL bars fire resize on scroll.
    new ResizeObserver(() => {
        const box = hero.getBoundingClientRect();
        if (box.width === width && box.height === height) return;
        measure();
        if (!running) draw(2);
    }).observe(hero);

    new MutationObserver(() => {
        readColors();
        if (!running) draw(2);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    canvas.addEventListener('webglcontextlost', event => {
        event.preventDefault();
        gl = null;
        hero.classList.add('no-field');
    });
    document.addEventListener('visibilitychange', sync);
    reduceMotion.addEventListener('change', sync);

    /* ---------- Start ---------- */
    let glReady = false;
    try {
        glReady = initGl();
    } catch {
        glReady = false;
    }
    if (!glReady) {
        gl = null;
        hero.classList.add('no-field');
    }
    readColors();
    measure();
    sync();

    whenFontReady().then(() => {
        lockLetterWidths();
        nameEl?.classList.add('is-ready');
        revealStart = now();
        if (reduceMotion.matches) return;
        // The rise uses the letter's transform, so take over once it has landed.
        setTimeout(() => {
            nameEl?.classList.add('is-live');
            lettersLive = true;
            addPulse(width * 0.5, height * 0.66);
        }, 1400);
    });
})();
