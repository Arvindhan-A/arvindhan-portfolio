document.addEventListener('DOMContentLoaded', () => {
    // Theme
    const themeColors = { light: '#f8f7f4', jetblack: '#0b1919', midnight: '#0c0e1a', rose: '#f9f3f0' };
    function getTheme() { return localStorage.getItem('theme') || 'light'; }
    function setTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        document.querySelectorAll('.theme-opt').forEach(o => o.classList.toggle('active', o.dataset.theme === t));
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }
        meta.content = themeColors[t] || themeColors.light;
    }
    setTheme(getTheme());

    const themeBtn = document.getElementById('theme-btn');
    const backdrop = document.getElementById('theme-backdrop');

    function openThemePicker() {
        const p = document.querySelector('.theme-dots');
        if (p) p.classList.add('open');
        if (backdrop) backdrop.classList.add('open');
    }
    function closeThemePicker() {
        const p = document.querySelector('.theme-dots');
        if (p) p.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', e => {
            const p = document.querySelector('.theme-dots');
            if (p && p.classList.contains('open')) {
                closeThemePicker();
            } else {
                openThemePicker();
            }
            e.stopPropagation();
        });
    }
    document.querySelectorAll('.theme-opt').forEach(o => {
        o.addEventListener('click', () => {
            setTheme(o.dataset.theme);
            closeThemePicker();
        });
    });
    if (backdrop) {
        backdrop.addEventListener('click', closeThemePicker);
    }
    document.addEventListener('click', () => {
        closeThemePicker();
    });

    // Section scroll reveal
    const sections = document.querySelectorAll('.section');
    const secObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            secObs.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    sections.forEach(s => secObs.observe(s));

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link[href^="#"], .btn[href^="#"], .btn-outline[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
