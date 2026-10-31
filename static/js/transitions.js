// Page-to-page choreography: when moving between the project list and a project page,
// the card, its title and its screenshot become one shared element that travels across.
// Loaded in <head> without defer, because pagereveal can fire before deferred scripts run.
(() => {
    if (!('onpagereveal' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const NAMES = { band: 'vt-band', title: 'vt-title', shot: 'vt-shot' };
    const DURATION = 800;
    const EASING = 'cubic-bezier(0.76, 0, 0.18, 1)';
    const CARD_RADIUS = '24px';

    const pathOf = url => {
        try {
            const parsed = new URL(url);
            return parsed.origin === location.origin ? parsed.pathname : null;
        } catch {
            return null;
        }
    };
    const projectOf = path => (/^\/project\/([^/]+)/.exec(path || '') || [])[1] || null;

    // The project that links these two pages, if there is one.
    function sharedProject(pathA, pathB) {
        if (pathA === null || pathB === null) return null;
        const a = projectOf(pathA);
        const b = projectOf(pathB);
        if (pathA === '/') return b;
        if (pathB === '/') return a;
        return a && b ? b : null;
    }

    function partsOf(slug) {
        return {
            band: document.querySelector(`[data-vt-band="${slug}"]`),
            title: document.querySelector(`[data-vt-title="${slug}"]`),
            shot: document.querySelector(`[data-vt-shot="${slug}"]`),
        };
    }

    function assignNames(parts) {
        Object.entries(NAMES).forEach(([key, name]) => {
            if (parts[key]) parts[key].style.viewTransitionName = name;
        });
    }

    function clearNames() {
        Object.values(NAMES).forEach(name => {
            document.querySelectorAll(`[style*="${name}"]`).forEach(el => {
                el.style.viewTransitionName = '';
            });
        });
    }

    /* ---------- Leaving a page ---------- */
    addEventListener('pageswap', event => {
        if (!event.viewTransition) return;
        const slug = sharedProject(location.pathname, pathOf(event.activation?.entry?.url));
        if (!slug) return;
        root.classList.add('vt-leaving');
        assignNames(partsOf(slug));
    });

    // Restored from the back/forward cache: undo what pageswap did.
    addEventListener('pageshow', event => {
        if (!event.persisted) return;
        root.classList.remove('vt-leaving');
    });

    /* ---------- Arriving on a page ---------- */
    // Decided before first paint: animated-in content has to start in its final position,
    // otherwise the transition would capture it hidden.
    function arrivingProject() {
        const activation = window.navigation?.activation;
        if (!activation?.from || activation.navigationType === 'reload') return null;
        return sharedProject(pathOf(activation.from.url), location.pathname);
    }
    if (arrivingProject()) root.classList.add('vt-arrive');

    addEventListener('pagereveal', event => {
        // Worked out again here: a page restored from the back/forward cache is still
        // the same document, so what was true when it first loaded is out of date.
        const transition = event.viewTransition;
        const arrivingSlug = arrivingProject();
        clearNames();
        if (!transition || !arrivingSlug) {
            root.classList.remove('vt-arrive');
            return;
        }
        const parts = partsOf(arrivingSlug);
        assignNames(parts);
        // Its card image may be further down a lazily loaded page: fetch it right away.
        parts.shot?.querySelector('img')?.setAttribute('loading', 'eager');

        // Coming from a "Next project" card, there is no screenshot on the old page.
        const fromPath = pathOf(window.navigation.activation.from.url);
        const shotHasPartner = fromPath === '/' || location.pathname === '/';
        root.classList.toggle('vt-shot-solo', !shotHasPartner);

        const band = parts.band;
        if (band) root.style.setProperty('--vt-p', getComputedStyle(band).getPropertyValue('--p'));

        transition.ready.then(() => {
            if (!band) return;
            // Rounded card to square-edged band, or the reverse.
            const onProjectPage = location.pathname !== '/';
            root.animate(
                { borderRadius: onProjectPage ? [CARD_RADIUS, '0px'] : ['0px', CARD_RADIUS] },
                { duration: DURATION, easing: EASING, fill: 'both', pseudoElement: '::view-transition-group(vt-band)' }
            );
        }).catch(() => {});

        transition.finished.finally(() => {
            root.classList.remove('vt-arrive', 'vt-shot-solo');
            root.style.removeProperty('--vt-p');
            clearNames();
        });
    });
})();
