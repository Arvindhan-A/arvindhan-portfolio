# Minimal Portfolio Template

A reusable CSS/JS template with 4 built-in themes, glassmorphism navigation, scroll animations, and a comprehensive component library.

## Quick Start

```html
<link rel="stylesheet" href="css/style.css">
```

```html
<script src="js/main.js" defer></script>
```

Add the theme attribute to your `<html>` tag:
```html
<html data-theme="light">
```

---

## File Structure

```
template/
├── css/
│   ├── style.css          # Main file (imports all)
│   ├── 1-variables.css    # Design tokens & themes
│   ├── 2-base.css         # Reset & base styles
│   ├── 3-components.css  # All UI components
│   ├── 4-animations.css  # Keyframe animations
│   └── 5-utilities.css   # Utility classes
└── js/
    └── main.js           # Theme switcher, scroll reveal, interactions
```

---

## Themes

The template includes **4 built-in themes**. Set via `data-theme` attribute on `<html>`:

| Theme | Value | Accent Color |
|-------|-------|-------------|
| Light (Warm) | `light` | Terracotta `#b8612a` |
| Jet Black | `jetblack` | Cyan `#4fb0b0` |
| Midnight | `midnight` | Purple `#7882ff` |
| Rose | `rose` | Terracotta `#b85238` |

### Theme Switcher HTML

```html
<div class="site-header">
  <nav class="nav-inner">
    <a href="/" class="nav-logo">Your Name</a>
    <div class="nav-links">
      <a href="#about" class="nav-link">About</a>
      <a href="#work" class="nav-link">Work</a>
      <a href="#contact" class="nav-link">Contact</a>
    </div>
    <div class="nav-controls">
      <div class="theme-wrapper" style="position:relative">
        <button class="theme-btn" aria-label="Switch theme">
          <svg class="theme-dot-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg class="theme-dot-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        <div class="theme-dots">
          <div class="theme-opt active" data-theme="light">
            <span class="theme-opt-dot"></span> Light
          </div>
          <div class="theme-opt" data-theme="jetblack">
            <span class="theme-opt-dot"></span> Jet Black
          </div>
          <div class="theme-opt" data-theme="midnight">
            <span class="theme-opt-dot"></span> Midnight
          </div>
          <div class="theme-opt" data-theme="rose">
            <span class="theme-opt-dot"></span> Rose
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
<div class="theme-backdrop"></div>
```

---

## CSS Variables

### Border Radii

```css
--r-sm: 8px;      /* Small elements */
--r-md: 12px;     /* Cards */
--r-lg: 16px;     /* Large containers */
--r-pill: 100px;  /* Buttons, pills */
```

### Spacing

```css
--pad: 3rem;   /* Section padding */
--w: 1100px;  /* Max content width */
```

### Shadows

```css
--sh-card        /* Card default shadow */
--sh-card-hover  /* Card hover shadow */
--sh-dropdown    /* Dropdown/menu shadow */
```

### Color Tokens (Light Theme)

```css
--bg            /* Page background */
--bg-warm       /* Slightly darker background */
--surface       /* Card/component background */
--glass         /* Glassmorphism background */
--border        /* Subtle border */
--border-accent /* Visible border */
--text-1        /* Primary text */
--text-2        /* Secondary text */
--text-3        /* Muted text */
--text-4        /* Subtle text */
--accent        /* Brand accent color */
--accent-soft   /* Accent with transparency */
```

---

## Creating Custom Themes

Add a new theme in `1-variables.css`:

```css
[data-theme="ocean"] {
  --bg: #0a1628;
  --bg-warm: #0f1d36;
  --surface: #0f1d36;
  --glass: rgba(10, 22, 40, 0.85);
  --border: rgba(255, 255, 255, 0.06);
  --border-accent: rgba(255, 255, 255, 0.12);
  --text-1: #e8f0ff;
  --text-2: #8ba3cc;
  --text-3: #5a7299;
  --text-4: #3d5070;
  --accent: #4a9eff;
  --accent-soft: rgba(74, 158, 255, 0.1);
  --green: #50c8a0;
  --green-soft: rgba(80, 200, 160, 0.1);
  --nav-bg: rgba(255, 255, 255, 0.04);
  --hover-tint: rgba(255, 255, 255, 0.03);
  --scroll-t: rgba(74, 158, 255, 0.3);
  --scroll-h: rgba(74, 158, 255, 0.5);
  --sh-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --sh-card-hover: 0 8px 28px rgba(0, 0, 0, 0.4);
  --sh-dropdown: 0 12px 40px rgba(0, 0, 0, 0.5);
}
```

Then add the option to the theme picker:

```html
<div class="theme-opt" data-theme="ocean">
  <span class="theme-opt-dot"></span> Ocean
</div>
```

### Theme Guidelines

1. **--bg**: Main page background
2. **--surface**: Card/container backgrounds
3. **--text-1**: Headings and primary text
4. **--text-2**: Body text
5. **--text-3**: Muted/secondary text
6. **--accent**: Brand color for links, highlights, active states
7. **--accent-soft**: Accent with ~10% opacity for backgrounds
8. **--green**: Success/positive accent
9. **--green-soft**: Green background tint
10. **--border**: Subtle dividers
11. **--border-accent**: Visible borders on hover
12. **--nav-bg**: Nav link hover background
13. **--hover-tint**: Generic hover background
14. **--scroll-t/h**: Scrollbar thumb (normal/hover)
15. **--sh-***: Shadows for cards and dropdowns

---

## Components

### Hero Section

```html
<section class="hero">
  <div class="hero-shapes">
    <div class="shape-circle s1"></div>
    <div class="shape-circle s2"></div>
    <div class="shape-circle s3"></div>
    <div class="shape-ring s4"></div>
    <div class="shape-ring s5"></div>
    <div class="shape-dot s6"></div>
    <div class="shape-cross s7"></div>
    <div class="shape-cross s8"></div>
  </div>
  <h1>Hello, I'm Name</h1>
  <p>Your tagline here</p>
  <div class="hero-links">
    <a href="#work">View Work</a>
    <a href="#contact">Get in Touch</a>
  </div>
</section>
```

### Section

```html
<section id="about" class="section">
  <div class="container">
    <div class="sec-header">
      <p class="sec-label">About</p>
      <h2 class="sec-title">Who I Am</h2>
    </div>
    <div class="about-grid">
      <div class="about-text">
        <p>Your bio here...</p>
      </div>
      <div class="about-highlights">
        <div class="highlight-card">
          <div class="highlight-val">5+</div>
          <div class="highlight-lbl">Years Experience</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Project Card

```html
<div class="project-card">
  <img src="img.jpg" alt="Project" class="project-img">
  <p class="project-tag">Web App</p>
  <h3>Project Name</h3>
  <p>Project description</p>
  <div class="project-tech">
    <span class="tech-pill">React</span>
    <span class="tech-pill">Node.js</span>
  </div>
  <a href="/project" class="project-live-btn">
    View Project
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M7 17L17 7M17 7H7M17 7V17"/>
    </svg>
  </a>
</div>
```

### Skill Card

```html
<div class="skill-card">
  <p class="skill-name">React</p>
  <p class="skill-desc">Frontend framework</p>
  <svg class="skill-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M7 17L17 7M17 7H7M17 7V17"/>
  </svg>
</div>
```

### Focus Card

```html
<div class="focus-card">
  <h3>Clean Code</h3>
  <p>Writing maintainable, readable code</p>
</div>
```

### Timeline

```html
<div class="timeline-list">
  <div class="timeline-item">
    <span class="timeline-year">2024</span>
    <div class="timeline-content">
      <h3>Company Name</h3>
      <p>Role description</p>
    </div>
  </div>
</div>
```

### Book Ticker

```html
<div class="book-ticker-wrap">
  <div class="book-ticker">
    <div class="book-ticker-item">
      <div>
        <p class="book-quote">"Book quote here"</p>
        <p class="book-author">- Author Name</p>
      </div>
    </div>
    <!-- Repeat items for continuous scroll -->
    <div class="book-ticker-item">
      <div>
        <p class="book-quote">"Another quote"</p>
        <p class="book-author">- Another Author</p>
      </div>
    </div>
  </div>
</div>
```

### Buttons

```html
<!-- Primary -->
<button class="btn">Get Started</button>

<!-- Outline -->
<a href="#" class="btn-outline">Learn More</a>

<!-- With Icon -->
<a href="#" class="btn-outline">
  View Project
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
    <path d="M7 17L17 7M17 7H7M17 7V17"/>
  </svg>
</a>
```

### Contact Section

```html
<section id="contact" class="section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <h2>Let's Connect</h2>
        <p>Reach out anytime...</p>
        <div class="contact-links">
          <a href="mailto:email@example.com" class="contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            email@example.com
          </a>
        </div>
      </div>
      <div class="collab-list">
        <div class="collab-item">
          <span>Available for work</span>
          <svg class="collab-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Footer

```html
<footer class="foot">
  <p>&copy; 2024 Your Name</p>
  <p class="foot-sub">Built with this template</p>
</footer>
```

---

## Grid Layouts

| Layout | Classes |
|--------|---------|
| 2 columns | `project-grid`, `book-grid` |
| 3 columns | `focus-cards`, `skill-grid`, `other-grid` |
| About sidebar | `about-grid` (1fr 200px) |
| Contact layout | `contact-grid` (1fr 220px) |
| Project detail | `project-detail-grid` (1fr 220px) |

---

## Animations

### Scroll Reveal

Sections with `.section` class automatically animate on scroll. Add `visible` class for manual control.

### Keyframes

```css
@keyframes reveal    /* Hero entrance */
@keyframes float      /* Floating shapes */
@keyframes blink      /* Pulsing dots */
@keyframes fadeUp      /* Dropdown/menu open */
@keyframes slideUp    /* Mobile bottom sheet */
@keyframes ticker     /* Scrolling ticker */
```

### Animation Classes

```html
<div class="animate-fadeIn">...</div>
<div class="animate-scaleIn">...</div>
<div class="animate-slideInLeft">...</div>
<div class="animate-slideInRight">...</div>

<!-- Stagger delays -->
<div class="animate-fadeIn stagger-1">...</div>
<div class="animate-fadeIn stagger-2">...</div>
```

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Desktop | 769px+ | Full layout |
| Tablet | 768px | Single columns, hidden nav |
| Mobile | 480px | Smaller typography |

---

## Utility Classes

### Typography

```html
<p class="text-1 text-2 text-3 text-4 text-accent text-green">
<p class="font-display font-sans">
<p class="fw-400 fw-500 fw-600 fw-700 fw-800">
<p class="fs-sm fs-xs fs-label">
<p class="lh-1 lh-12 lh-16 lh-18">
<p class="ls-tight ls-normal ls-wide ls-wider">
```

### Layout

```html
<div class="flex flex-col flex-wrap items-center items-start items-end justify-center justify-between justify-end">
<div class="gap-1 gap-2 gap-3 gap-4 gap-5 gap-6">
<div class="grid grid-2 grid-3">
```

### Spacing

```html
<div class="mt-1 mt-2 mt-3 mt-4 mt-5 mt-6 mt-8">
<div class="mb-1 mb-2 mb-3 mb-4 mb-5 mb-6 mb-8">
<div class="py-1 py-2 py-3 py-4 py-5 py-6 py-8">
<div class="px-1 px-2 px-3 px-4 px-5 px-6">
```

### Other

```html
<div class="r-sm r-md r-lg r-pill r-full">
<div class="w-full h-full min-h-screen">
<div class="relative absolute sticky fixed top-0 right-0 bottom-0 left-0">
<div class="z-10 z-50 z-100">
<div class="overflow-hidden overflow-auto">
<div class="opacity-0 opacity-50 opacity-100">
<div class="pointer-events-none cursor-pointer">
<div class="transition transition-fast transition-slow">
<div class="border border-accent border-t border-b">
<div class="bg bg-surface bg-warm bg-accent bg-green">
<div class="shadow shadow-hover">
```

---

## JavaScript Features

The `main.js` provides:

1. **Theme Switching** - Saves to localStorage, persists across sessions
2. **Scroll Reveal** - Sections animate when entering viewport
3. **Smooth Scroll** - All anchor links scroll smoothly
4. **TOC Highlighting** - Table of contents links highlight on scroll
5. **Keyboard Support** - Escape closes theme picker

---

## Example Page Template

```html
<!DOCTYPE html>
<html data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Portfolio</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  
  <header class="site-header">
    <nav class="nav-inner">
      <a href="/" class="nav-logo">Your Name</a>
      <div class="nav-links">
        <a href="#about" class="nav-link">About</a>
        <a href="#work" class="nav-link">Work</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
      <div class="nav-controls">
        <div class="theme-wrapper" style="position:relative">
          <button class="theme-btn" aria-label="Switch theme">
            <svg class="theme-dot-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg class="theme-dot-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
          <div class="theme-dots">
            <div class="theme-opt active" data-theme="light"><span class="theme-opt-dot"></span> Light</div>
            <div class="theme-opt" data-theme="jetblack"><span class="theme-opt-dot"></span> Jet Black</div>
            <div class="theme-opt" data-theme="midnight"><span class="theme-opt-dot"></span> Midnight</div>
            <div class="theme-opt" data-theme="rose"><span class="theme-opt-dot"></span> Rose</div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="theme-backdrop"></div>

  <main>
    <section class="hero">
      <h1>Your Name</h1>
      <p>Designer & Developer</p>
    </section>

    <section id="about" class="section">
      <div class="container">
        <div class="sec-header">
          <p class="sec-label">About</p>
          <h2 class="sec-title">Who I Am</h2>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <div class="container">
        <h2>Get in Touch</h2>
      </div>
    </section>
  </main>

  <footer class="foot">
    <p>&copy; 2024 Your Name</p>
  </footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```
