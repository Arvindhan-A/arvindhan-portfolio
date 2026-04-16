(function () {
  'use strict';

  const themeBtn = document.querySelector('.theme-btn');
  const themeDots = document.querySelector('.theme-dots');
  const themeBackdrop = document.querySelector('.theme-backdrop');
  const themeOpts = document.querySelectorAll('.theme-opt');
  const sections = document.querySelectorAll('.section');

  function getTheme() {
    return localStorage.getItem('theme') || 'light';
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    updateThemeUI(t);
  }

  function updateThemeUI(current) {
    themeOpts.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.theme === current);
    });
    const isDark = current !== 'light';
    themeBtn.classList.toggle('dark', isDark);
  }

  function toggleThemePicker() {
    const isOpen = themeDots.classList.toggle('open');
    themeBackdrop.classList.toggle('open', isOpen);
  }

  function closeThemePicker() {
    themeDots.classList.remove('open');
    themeBackdrop.classList.remove('open');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleThemePicker();
    });
  }

  if (themeBackdrop) {
    themeBackdrop.addEventListener('click', closeThemePicker);
  }

  if (themeDots) {
    themeDots.addEventListener('click', (e) => {
      const opt = e.target.closest('.theme-opt');
      if (!opt) return;
      setTheme(opt.dataset.theme);
      closeThemePicker();
    });
  }

  setTheme(getTheme());

  if (sections.length > 0) {
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        secObs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    sections.forEach(s => secObs.observe(s));
  }

  document.querySelectorAll('.nav-link[href^="#"], .btn[href^="#"], .btn-outline[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeThemePicker();
      }
    });
  });

  const tocLinks = document.querySelectorAll('.toc-link');
  const dSecs = document.querySelectorAll('.d-sec[id]');

  if (tocLinks.length > 0 && dSecs.length > 0) {
    const tocObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { threshold: 0.5, rootMargin: '-72px 0px -70% 0px' });

    dSecs.forEach(sec => tocObs.observe(sec));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeThemePicker();
  });
})();
