(() => {
    const root = document.documentElement;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const canHover = matchMedia('(hover: hover) and (pointer: fine)');
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    /* ---------- Theme ---------- */
    const THEME_COLORS = { light: '#f8f7f4', jetblack: '#0b1919', midnight: '#0c0e1a', rose: '#f9f3f0' };
    const themeMenu = document.getElementById('theme-menu');
    const themeBtn = document.getElementById('theme-btn');
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        // Project pages tint the phone's browser bar with their own colour.
        const projectColor = document.body.classList.contains('project-page')
            ? getComputedStyle(document.body).getPropertyValue('--project').trim()
            : '';
        themeMeta.content = projectColor || THEME_COLORS[theme] || THEME_COLORS.light;
        document.querySelectorAll('[data-theme-option]').forEach(option => {
            option.classList.toggle('is-active', option.dataset.themeOption === theme);
        });
    }

    // New theme spreads in a circle from the theme button.
    function switchTheme(theme) {
        localStorage.setItem('theme', theme);
        if (!document.startViewTransition || reduceMotion.matches) {
            setTheme(theme);
            return;
        }
        const box = themeBtn.getBoundingClientRect();
        const x = box.left + box.width / 2;
        const y = box.top + box.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        root.classList.add('vt-theme');
        const transition = document.startViewTransition(() => setTheme(theme));
        transition.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(() => {});
        transition.finished.finally(() => root.classList.remove('vt-theme'));
    }

    setTheme(root.getAttribute('data-theme'));
    document.querySelectorAll('[data-theme-option]').forEach(option => {
        option.addEventListener('click', () => {
            themeMenu.hidePopover();
            switchTheme(option.dataset.themeOption);
        });
    });

    /* ---------- Mobile menu ---------- */
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.hidePopover());
    });

    /* ---------- Text splitting ---------- */
    function wordsOf(el) {
        const text = el.textContent.trim().replace(/\s+/g, ' ');
        el.setAttribute('aria-label', text);
        el.textContent = '';
        return text.split(' ');
    }

    // Headings: words rise into place. data-em names words to set heavy and in colour.
    document.querySelectorAll('[data-split]').forEach(heading => {
        const emphasised = (heading.dataset.em || '').split(' ');
        wordsOf(heading).forEach((word, index) => {
            const outer = document.createElement('span');
            outer.className = 'word';
            outer.setAttribute('aria-hidden', 'true');
            const inner = document.createElement('span');
            inner.textContent = word;
            inner.style.setProperty('--i', index);
            if (emphasised.includes(word)) inner.classList.add('em');
            outer.append(inner);
            heading.append(outer, ' ');
        });
    });

    // Big statement text: each word lights up as it scrolls through the viewport.
    const litBlocks = [...document.querySelectorAll('[data-lit]')].map(block => {
        const words = wordsOf(block).map(word => {
            const span = document.createElement('span');
            span.className = 'lit-word';
            span.setAttribute('aria-hidden', 'true');
            span.textContent = word;
            block.append(span, ' ');
            return span;
        });
        return { block, words, lit: -1 };
    });

    // Kinetic type: letters in fixed-width boxes, so their weight can change without reflow.
    const kineticChars = [];
    const kineticBlocks = [...document.querySelectorAll('[data-kinetic]')];
    kineticBlocks.forEach(block => {
        let index = 0;
        const addWords = (parent, words) => words.forEach(word => {
            const outer = document.createElement('span');
            outer.className = 'kword';
            outer.setAttribute('aria-hidden', 'true');
            for (const char of word) {
                const span = document.createElement('span');
                span.className = 'kch';
                span.textContent = char;
                span.style.setProperty('--i', index);
                outer.append(span);
                kineticChars.push({ el: span, index, block, weight: 0 });
                index++;
            }
            parent.append(outer, ' ');
        });

        // Keep any fixed line breaks, so the title wraps the same as on its project card.
        const lines = [...block.querySelectorAll('.tline')];
        if (lines.length) {
            block.setAttribute('aria-label', block.textContent.trim().replace(/\s+/g, ' '));
            lines.forEach(line => {
                const words = line.textContent.trim().split(/\s+/);
                line.textContent = '';
                addWords(line, words);
            });
        } else {
            addWords(block, wordsOf(block));
        }
    });
    fontsReady.then(() => {
        kineticChars.forEach(({ el }) => {
            const size = parseFloat(getComputedStyle(el).fontSize);
            el.style.width = `${el.getBoundingClientRect().width / size}em`;
        });
    });

    /* ---------- Count-up numbers ---------- */
    function countUp(el) {
        const match = el.textContent.trim().match(/^(\d+)(.*)$/);
        if (!match || reduceMotion.matches) return;
        const target = Number(match[1]);
        const suffix = match[2];
        const start = performance.now();
        const step = now => {
            const t = clamp((now - start) / 1300);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    /* ---------- Reveal on scroll ---------- */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('is-in');
            revealObserver.unobserve(el);
            el.querySelectorAll('[data-count]').forEach(countUp);
            // Hand the element back to its own hover transitions once it has landed.
            if (el.hasAttribute('data-reveal')) {
                setTimeout(() => el.removeAttribute('data-reveal'), 1300);
            }
            if (el.hasAttribute('data-kinetic')) {
                setTimeout(() => el.classList.add('is-done'), 1500);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('[data-reveal], [data-split], [data-kinetic], .stack-card, .shot-large')
        .forEach(el => revealObserver.observe(el));

    /* ---------- Scroll-linked effects, all driven from one rAF ---------- */
    const progressBar = document.querySelector('.progress');
    const hero = document.getElementById('hero');
    const heroInner = document.querySelector('.hero-inner');
    const heroField = document.getElementById('field');
    const heroLetters = [...document.querySelectorAll('.hero-name .ch')];
    const timeline = document.getElementById('tl');
    const timelineItems = timeline ? [...timeline.querySelectorAll('.tl-item')] : [];
    const stackItems = [...document.querySelectorAll('.stack-item')];
    const stackCards = stackItems.map(item => item.querySelector('.stack-card'));
    const contact = document.getElementById('contact');
    const pointer = { x: -9999, y: -9999, active: false };

    function updateHero() {
        if (scrollY >= hero.offsetHeight) return;
        const t = scrollY / hero.offsetHeight;
        heroInner.style.opacity = String(clamp(1 - t * 1.4));
        heroField.style.transform = `translate3d(0, ${(t * 140).toFixed(1)}px, 0)`;
        // Letters drift apart upward at different rates as the hero leaves.
        heroLetters.forEach((letter, index) => {
            const rate = 0.25 + ((index * 37) % 9) / 9;
            letter.style.translate = `0 ${(-t * 320 * rate).toFixed(1)}px`;
        });
    }

    function updateStack() {
        for (let i = 0; i < stackItems.length - 1; i++) {
            const card = stackCards[i].getBoundingClientRect();
            const nextTop = stackItems[i + 1].getBoundingClientRect().top;
            stackCards[i].style.setProperty('--cover', clamp((card.bottom - nextTop) / card.height).toFixed(3));
        }
    }

    function updateTimeline() {
        const box = timeline.getBoundingClientRect();
        const fill = clamp((innerHeight * 0.7 - box.top) / box.height);
        timeline.style.setProperty('--fill', fill.toFixed(3));
        const reached = box.top + box.height * fill;
        timelineItems.forEach(item => {
            item.classList.toggle('is-lit', item.querySelector('.tl-node').getBoundingClientRect().top <= reached);
        });
    }

    function updateLit() {
        litBlocks.forEach(entry => {
            const box = entry.block.getBoundingClientRect();
            const progress = clamp((innerHeight * 0.82 - box.top) / (box.height + innerHeight * 0.3));
            const lit = Math.round(progress * entry.words.length);
            if (lit === entry.lit) return;
            entry.lit = lit;
            entry.words.forEach((word, index) => word.classList.toggle('is-lit', index < lit));
        });
    }

    function updateContact() {
        const top = contact.getBoundingClientRect().top;
        contact.style.setProperty('--inset', clamp((top - innerHeight * 0.25) / (innerHeight * 0.75)).toFixed(3));
    }

    // Letters swell near the pointer; otherwise a wave rolls through them with the scroll.
    function updateKinetic() {
        for (const char of kineticChars) {
            if (!char.block.classList.contains('is-done')) continue;
            const box = char.el.getBoundingClientRect();
            if (box.bottom < 0 || box.top > innerHeight) continue;
            const dx = box.left + box.width / 2 - pointer.x;
            const dy = box.top + box.height / 2 - pointer.y;
            const near = pointer.active ? Math.exp(-(dx * dx + dy * dy) / (2 * box.height * box.height)) : 0;
            const rolling = Math.sin(scrollY * 0.007 + char.index * 0.8) * 140;
            const weight = Math.round((500 + rolling * (1 - near) + near * 300) / 10) * 10;
            if (weight !== char.weight) {
                char.weight = weight;
                char.el.style.fontWeight = weight;
            }
        }
    }

    let ticking = false;
    function onFrame() {
        ticking = false;
        const scrollable = root.scrollHeight - innerHeight;
        progressBar.style.transform = `scaleX(${scrollable > 0 ? clamp(scrollY / scrollable) : 0})`;

        if (reduceMotion.matches) {
            if (timeline) {
                timeline.style.setProperty('--fill', 1);
                timelineItems.forEach(item => item.classList.add('is-lit'));
            }
            litBlocks.forEach(entry => entry.words.forEach(word => word.classList.add('is-lit')));
            return;
        }
        if (hero) updateHero();
        if (timeline) updateTimeline();
        if (stackItems.length) updateStack();
        if (litBlocks.length) updateLit();
        if (contact) updateContact();
        if (kineticChars.length) updateKinetic();
    }
    function requestFrame() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(onFrame);
    }
    addEventListener('scroll', requestFrame, { passive: true });
    addEventListener('resize', requestFrame, { passive: true });
    requestFrame();

    /* ---------- Tape strips: always drifting, and scrolling pushes and shears them ---------- */
    const tapeWrap = document.querySelector('.tapes');
    if (tapeWrap && !reduceMotion.matches) {
        const tapes = [...tapeWrap.querySelectorAll('.tape-track')].map(track => ({
            track,
            dir: Number(track.dataset.dir),
            position: 0,
            setWidth: 0,
        }));
        const measureTapes = () => tapes.forEach(tape => {
            tape.setWidth = tape.track.firstElementChild.getBoundingClientRect().width;
        });
        fontsReady.then(measureTapes);
        addEventListener('resize', measureTapes, { passive: true });

        let lastScroll = scrollY;
        let velocity = 0;
        let tapeRaf = 0;
        const runTapes = () => {
            velocity += (scrollY - lastScroll - velocity) * 0.14;
            lastScroll = scrollY;
            const skew = clamp(velocity * 0.35, -14, 14);
            tapes.forEach(tape => {
                if (!tape.setWidth) return;
                tape.position += tape.dir * (0.7 + Math.abs(velocity) * 0.5) * (velocity < -0.2 ? -1 : 1);
                const x = ((tape.position % tape.setWidth) + tape.setWidth) % tape.setWidth;
                tape.track.style.transform = `translate3d(${(-x).toFixed(1)}px, 0, 0) skewX(${(skew * tape.dir).toFixed(2)}deg)`;
            });
            tapeRaf = requestAnimationFrame(runTapes);
        };
        new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(tapeRaf);
            if (!entry.isIntersecting) return;
            lastScroll = scrollY;
            tapeRaf = requestAnimationFrame(runTapes);
        }).observe(tapeWrap);
    }

    /* ---------- Nav indicator + scroll spy ---------- */
    const navLinks = [...document.querySelectorAll('.nav-link')];
    const indicator = document.querySelector('.nav-indicator');

    function moveIndicator() {
        const active = navLinks.find(link => link.classList.contains('is-active'));
        indicator.classList.toggle('is-visible', Boolean(active));
        if (!active) return;
        indicator.style.width = `${active.offsetWidth}px`;
        indicator.style.transform = `translateX(${active.offsetLeft}px)`;
    }

    const spied = navLinks.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
    if (spied.length) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.section === entry.target.id));
                moveIndicator();
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        spied.forEach(section => spy.observe(section));
        // Above the first section (hero), nothing is active.
        new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => link.classList.remove('is-active'));
            moveIndicator();
        }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
    }
    moveIndicator();
    fontsReady.then(moveIndicator);
    addEventListener('resize', moveIndicator, { passive: true });

    /* ---------- Skill filter ---------- */
    const filters = [...document.querySelectorAll('.filter')];
    const skillRows = [...document.querySelectorAll('.skill-row')];

    function applyFilter(category) {
        filters.forEach(button => {
            const active = button.dataset.filter === category;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        skillRows.forEach(row => {
            row.hidden = category !== 'all' && row.dataset.cat !== category;
        });
    }

    filters.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            // Rows may still be mid-reveal, or never have scrolled into view.
            skillRows.forEach(row => {
                row.removeAttribute('data-reveal');
                revealObserver.unobserve(row);
            });
            if (!document.startViewTransition || reduceMotion.matches) {
                applyFilter(category);
                return;
            }
            skillRows.forEach(row => { row.style.viewTransitionName = row.dataset.vt; });
            const transition = document.startViewTransition(() => applyFilter(category));
            transition.finished.finally(() => {
                skillRows.forEach(row => { row.style.viewTransitionName = ''; });
            });
        });
    });

    /* ---------- Pointer effects (mouse only) ---------- */
    if (canHover.matches && !reduceMotion.matches) {
        document.addEventListener('pointermove', event => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
            if (kineticChars.length) requestFrame();

            // Soft light that follows the cursor across a card.
            const card = event.target.closest?.('[data-spot]');
            if (!card) return;
            const box = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${event.clientX - box.left}px`);
            card.style.setProperty('--my', `${event.clientY - box.top}px`);
        }, { passive: true });
        document.addEventListener('pointerleave', () => {
            pointer.active = false;
            requestFrame();
        });

        document.querySelectorAll('[data-tilt]').forEach(el => {
            const area = el.closest('.stack-card') || el;
            area.addEventListener('pointermove', event => {
                const box = el.getBoundingClientRect();
                const x = clamp((event.clientX - box.left) / box.width) - 0.5;
                const y = clamp((event.clientY - box.top) / box.height) - 0.5;
                el.style.transform = `perspective(1200px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
            }, { passive: true });
            area.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });

        document.querySelectorAll('[data-magnetic]').forEach(el => {
            el.addEventListener('pointermove', event => {
                const box = el.getBoundingClientRect();
                const x = event.clientX - box.left - box.width / 2;
                const y = event.clientY - box.top - box.height / 2;
                el.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
            }, { passive: true });
            el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });

        // A coloured "Open" badge trails the cursor across project cards.
        if (stackCards.length) {
            const badge = document.createElement('div');
            badge.className = 'cursor-badge';
            badge.setAttribute('aria-hidden', 'true');
            badge.textContent = 'Open';
            document.body.append(badge);
            const pos = { x: 0, y: 0 };
            let raf = 0;
            const follow = () => {
                pos.x += (pointer.x - pos.x) * 0.16;
                pos.y += (pointer.y - pos.y) * 0.16;
                badge.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
                raf = requestAnimationFrame(follow);
            };
            stackCards.forEach(card => {
                card.addEventListener('pointerenter', event => {
                    const style = getComputedStyle(card);
                    badge.style.setProperty('--badge-bg', style.getPropertyValue('--pop'));
                    badge.style.setProperty('--badge-ink', style.getPropertyValue('--p'));
                    if (!badge.classList.contains('is-on')) {
                        pos.x = event.clientX;
                        pos.y = event.clientY;
                    }
                    badge.classList.add('is-on');
                    cancelAnimationFrame(raf);
                    raf = requestAnimationFrame(follow);
                });
                card.addEventListener('pointerleave', () => {
                    badge.classList.remove('is-on');
                    cancelAnimationFrame(raf);
                });
            });
        }
    }
})();
