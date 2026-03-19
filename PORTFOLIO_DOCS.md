# Portfolio Design Documentation

## Overview
This document extracts all content, design language, fonts, and color palettes from the Arvindhan Portfolio website.

---

## 1. Design Language & Aesthetic

### Terminal/Hacker Theme
- **Concept**: Retro computer terminal / file system aesthetic
- **File Extensions in Section Titles**: `.TXT`, `.PY`, `.DAT`, `.DB`, `.LOG`
- **Terminology**: System, root, mission, matrix, signal, initialize, drivers, modules, log, launch
- **Visual Effects**:
  - Matrix rain canvas animation
  - Scanlines overlay
  - Glitch text effects
  - Pixelated fonts
  - Box shadow depth (hard pixel shadows like `4px 4px 0px`)
  - Corner accent borders on cards
  - Typing animation for hero name

### Navigation Items
```
[ Start ] - Hero section
[ Bio ] - About section
[ Projects ] - Projects/Missions section
[ Stats ] - Skills section
[ Comms ] - Contact section
```

---

## 2. Fonts

### Header Font (Pixel)
- **Name**: Press Start 2P
- **Usage**: Section titles, buttons, badges, card headers, navigation
- **Google Fonts Link**: `https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap`

### Body Font (Terminal)
- **Name**: VT323
- **Usage**: Body text, descriptions, content
- **Size**: 20px base (desktop), 16px mobile

### Font Awesome Icons
- **Version**: 6.0.0
- **CDN**: `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css`

---

## 3. Color Palette System

### CSS Variables (Base)
```css
--bg-color: #fdfaf3;        /* Background */
--card-bg: #f5ede0;         /* Card background */
--text-primary: #5d4037;    /* Primary text */
--text-secondary: #8d6e63;  /* Secondary text */
--accent: #a1887f;          /* Accent color */
--white: #3e2723;           /* Text that stands out (dark on light themes) */
```

### Default Theme: Latte
```css
--bg-color: #fdfaf3;
--card-bg: #f5ede0;
--text-primary: #5d4037;
--text-secondary: #8d6e63;
--accent: #a1887f;
--white: #3e2723;
```

---

## 4. Available Themes (39 Themes)

The portfolio includes a theme switcher with 39 themes. Each theme redefines the 5 CSS variables.

### Dark Themes

| Theme | bg-color | text-primary | accent | text-secondary |
|-------|----------|--------------|--------|----------------|
| Forest Tech | #181f1c | #9ea93f | #315c2b | #60712f |
| Cyberpunk | #0b1021 | #00ff9f | #d600ff | #00b8ff |
| Solar Flare | #1a0f00 | #ffaa00 | #ff0000 | #ff5500 |
| Ocean Depth | #001f2b | #00ffea | #005f73 | #008cff |
| Monochrome | #000000 | #ffffff | #444444 | #888888 |
| Retro Terminal | #0d1117 | #00ff00 | #003300 | #008f00 |
| Royal Purple | #1a0b2e | #ffd700 | #7209b7 | #b57edc |
| Coffee | #2b1d16 | #d7ccc8 | #795548 | #a1887f |
| Midnight | #020417 | #818cf8 | #312e81 | #4f46e5 |
| Candy | #2a1b2d | #ff6ec7 | #bd93f9 | #6ec7ff |
| Dracula | #282a36 | #ff79c6 | #bd93f9 | #8be9fd |
| Nord | #2e3440 | #88c0d0 | #5e81ac | #81a1c1 |
| Gruvbox | #282828 | #fabd2f | #b8bb26 | #fe8019 |
| Synthwave | #240046 | #ff9e00 | #9d4edd | #ff0054 |
| Matrix | #000000 | #00ff41 | #003b00 | #008f11 |
| Sunset | #2d1b2e | #ffbe0b | #ff006e | #fb5607 |
| Slate | #0f172a | #94a3b8 | #475569 | #64748b |
| Mint | #0f2018 | #52ffb8 | #1e7054 | #2dc48d |
| Lavender | #181621 | #cdb4db | #a2d2ff | #bde0fe |
| Crimson | #1a0505 | #ff0000 | #660000 | #cc0000 |
| Gold Rush | #1a1600 | #ffd700 | #806b00 | #c0a000 |
| Iceberg | #0d1b21 | #00ffff | #005f7a | #00b7eb |
| Volcano | #1f1212 | #ff5722 | #5d4037 | #bf360c |
| Toxic | #121a12 | #c6ff00 | #33691e | #76ff03 |
| Cotton Candy | #1f1f2e | #ff99c8 | #a9def9 | #d0f4de |
| High Contrast | #000000 | #ffff00 | #ffffff | #00ffff |
| Blueprint | #002b36 | #268bd2 | #859900 | #2aa198 |
| Vampire | #0a0a0a | #ff0000 | #5c0000 | #ffffff |
| Moss | #1b261b | #8fbc8f | #2f4f4f | #556b2f |
| Steel | #191c20 | #76a5af | #37474f | #455a64 |

### Light Themes

| Theme | bg-color | text-primary | accent | text-secondary |
|-------|----------|--------------|--------|----------------|
| Pearl | #ffffff | #2d3436 | #0984e3 | #636e72 |
| Latte | #fdfaf3 | #5d4037 | #a1887f | #8d6e63 |
| Sakura | #fff5f7 | #d81b60 | #f06292 | #ad1457 |
| Mint Cream | #f7fffb | #00695c | #4db6ac | #00897b |
| Sky Blue | #f0faff | #0277bd | #4fc3f7 | #0288d1 |
| Peach | #fff9f5 | #e65100 | #ffb74d | #ef6c00 |
| Lavender Light | #fafaff | #4527a0 | #9575cd | #5e35b1 |
| Lemon | #fffde7 | #fbc02d | #fff176 | #fdd835 |
| Rose Quartz | #fffafb | #c2185b | #f48fb1 | #d81b60 |

---

## 5. Content Sections

### Hero Section
```
Title: ARVINDHAN
Tagline: PHYSICS. CODE. INNOVATION.
Description: Class 12 Student @ Sandipani Vidyalaya | IoT Systems Engineer | Full-Stack Developer
CTA Primary: VIEW_WORK
CTA Secondary: CONTACT_ME
```

### About Section (USER_PROFILE.TXT)

#### Bio
```
I am a Class 12 student at Sandipani Vidyalaya, formerly achieving academic excellence at Jawahar Vidyalaya (up to Class 10). My work lies at the intersection of Condensed Matter Physics and Embedded Systems. I don't just learn theory; I apply it to build integrated IoT solutions, from environmental drone payloads to secure communication platforms.

My journey began with a curiosity about the fundamental laws of the universe. This drove me to explore how physics principles govern electronics. Today, I actively research topics like Quantum Mechanics and Thermodynamics while prototyping practical hardware solutions.
```

#### Stats
| Label | Value |
|-------|-------|
| Class 10 Score | 476/500 |
| Art Experience | 5+ Yrs |
| Active Projects | 5+ |

#### Detailed Bio (3 blocks)
1. **[ENGINEERING_FOCUS]**: Specializing in end-to-end IoT architecture. I bridge the gap between physical sensors and cloud intelligence, primarily using the ESP32 ecosystem and MicroPython.

2. **[PHYSICS_RESEARCH]**: Deeply fascinated by Condensed Matter Physics and Quantum Mechanics. I spend my time exploring how material properties at the atomic level can be leveraged for better electronic systems.

3. **[ARTISTIC_SYNERGY]**: My 5+ years in formal art training isn't separate from my engineering; it informs my UI design and hardware spatial planning, ensuring everything I build is as aesthetic as it is functional.

#### Timeline (LOG_HISTORY)
| Year | Event | Description |
|------|-------|-------------|
| 2025-2026 (Current) | Class 12: Physics & Innovation | Studying at Sandipani Vidyalaya. Focusing on core Physics/Math fundamentals. Building advanced electronics prototypes and preparing for Olympiads. |
| 2026 | IITM Electronic Systems | Completed the IITM Online Course on Electronic Systems (6-week intensive). Focused on embedded system design, circuit analysis, and hardware-software integration. |
| 2025 | IITM Data Science | Completed the IITM Data Science Course (6-week intensive). Gained proficiency in statistical modeling, data visualization, and Python-based analytics. |
| 2025 | GAIA Sentinel Win | Winner (1st Place): School Project Competition for GAIA Sentinel (IoT Drone System). Developed OOP Python projects and basic hardware prototypes. |
| 2023 | Academic Excellence | Completed Class 10 at Jawahar Vidyalaya with distinction (476/500 - 95.2%). Established strong fundamentals in Physics and Math. |

---

### Projects Section (MISSIONS.PY)

8 Projects:

1. **C12 Tracker**
   - Category: EdTech
   - Description: Study progress tracker for Class 12 students with syllabus coverage, mock test analytics, performance trends, and weak area predictions for board exam preparation.
   - Tech: React, Flask, Chart.js, PostgreSQL, OpenAI
   - Achievements: CLASS 12 CBSE
   - URL: https://c12tracker.gaiasentinel.online

2. **Gaia Sentinel**
   - Category: IoT Platform
   - Description: Core environmental monitoring hub with ESP32 sensor integration, real-time dashboards, cloud telemetry, and sub-second pollution alerts.
   - Tech: ESP32, MicroPython, Flask, PostgreSQL, SocketIO
   - Achievements: 1ST PLACE WINNER
   - URL: https://gaiasentinel.online

3. **Hey Gaia**
   - Category: Smart Home
   - Description: Raspberry Pi-powered voice assistant for smart home control with natural language processing, GAIA sensor integration, and custom automation routines.
   - Tech: Raspberry Pi, Whisper, OpenAI, Flask, MQTT, HomeAssistant
   - Achievements: VOICE AI ASSISTANT
   - URL: https://heygaia.gaiasentinel.online

4. **Music**
   - Category: Music Platform
   - Description: Music streaming service with playlist curation, lofi coding sessions, offline caching, and Study Companion integration for focused development.
   - Tech: Node.js, Spotify API, React, PWA, WebAudioAPI
   - Achievements: STREAMING SERVICE
   - URL: https://music.gaiasentinel.online

5. **Platform**
   - Category: Deployment Platform
   - Description: Universal app deployment platform supporting Flask/Django/Node.js with one-click Docker deploys, auto-scaling, and Gaia Sentinel monitoring integration.
   - Tech: Docker, Kubernetes, Flask, Nginx, Traefik, Prometheus
   - Achievements: SELF-HOSTED APPS
   - URL: https://deploy.gaiasentinel.online

6. **Sandipani Vidyalaya**
   - Category: School Management
   - Description: Complete school website rebuild with parent portals, teacher dashboards, attendance tracking, homework assignments, and fee management.
   - Tech: Django, PostgreSQL, React, PushNotifications, EmailJS
   - Achievements: V2 REBUILD
   - URL: https://sandipani2.gaiasentinel.online

7. **Sri Krishna's Store**
   - Category: Business Management
   - Description: Billing and inventory system for textile enterprises with invoice generation, stock tracking, customer management, and financial reporting.
   - Tech: Flask, PostgreSQL, React, QRCode, Stripe, PDFKit
   - Achievements: TEXTILE BILLING
   - URL: https://srikrishnas.store

8. **Transfer**
   - Category: File Transfer
   - Description: Fast, secure file transfer optimized for GAIA sensor datasets with resumable uploads, end-to-end encryption, and transfer analytics.
   - Tech: Node.js, SocketIO, Multer, AWS S3, CryptoJS
   - Achievements: HIGH-SPEED GAIA
   - URL: https://transfer.gaiasentinel.online

---

### Skills Section (SKILL_MATRIX.DAT)

#### SYSTEM_DRIVERS / TECH_STACK (9 items)
| Name | Category | Level | Description |
|------|----------|-------|-------------|
| Python | Backend | 95% | Mastery in automation and research scripts. |
| Flask | Backend | 85% | Building robust REST APIs and services. |
| HTML5 | Frontend | 90% | Semantic structure for modern web applications. |
| CSS3 | Frontend | 85% | Advanced styling, animations, and responsive layouts. |
| JavaScript | Frontend | 80% | Interactive logic and dynamic content. |
| ESP32 | IoT | 90% | Firmware and hardware integration. |
| PostgreSQL | Database | 80% | Database design and optimization. |
| Arduino/C++ | IoT | 85% | Low-level peripheral control and optimization. |
| Git/GitHub | DevOps | 85% | Version control and collaborative workflows. |

#### CORE_MODULES (6 items)
1. **IoT System Design**: End-to-end architecture of connected devices, sensors, and cloud infrastructure.
2. **Full-Stack Web**: Building scalable web apps using React, Flask, and modern database solutions.
3. **Embedded Systems**: Programming microcontrollers (ESP32, Arduino) with C++ and MicroPython for real-time control.
4. **Physics Simulation**: Modelling physical phenomena using Python (NumPy, SciPy) for research and analysis.
5. **Database Management**: Designing efficient schemas and managing data flow with PostgreSQL and Supabase.
6. **Object-Oriented Programming**: Writing clean, modular, and reusable code using advanced OOP principles in Python.

#### CERTIFICATIONS (5 items)
1. **IITM ELECTRONIC SYSTEMS (6-WK)**: Intensive course on circuit design, op-amps, and embedded logic.
2. **IITM DATA SCIENCE (6-WK)**: Comprehensive training in statistics, ML algorithms, and data viz.
3. **HINDI PROFICIENCY**: Certified competency in Hindi language studies and formal communication.
4. **COMPUTER SCIENCE BASICS**: Certified foundation in algorithms, system architecture, and computational logic.
5. **TECH TEAM - SANDIPANI VIDYALAYA**: Official member of the school tech committee, managing digital systems and technical event logistics.

#### CREATIVE_MODULES (1 item)
- **Global Art Certification**: 5+ years of dedicated training in visual arts at Global Art. Completed multiple advanced courses in sketching, color theory, and digital composition.

---

### Library Section (READ_LOG.DB)

5 Books in rotating carousel:

1. **The Inheritance Games** by Jennifer Lynn Barnes
   - Brief: "A masterclass in logic and puzzles. Reminds me that every problem has a solution if you look at it from the right angle."

2. **Beach Read** by Emily Henry
   - Brief: "A refreshing break from the code. Sometimes you need a good narrative to reset the creative brain."

3. **The Silent Patient** by Alex Michaelides
   - Brief: "Psychological depth and unexpected twists. Taught me to question assumptions, a skill crucial in debugging."

4. **Dune** by Frank Herbert
   - Brief: "The ultimate world-building masterpiece. The intersection of ecology, politics, and technology is fascinating."

5. **Sapiens** by Yuval Noah Harari
   - Brief: "Understanding where we came from helps predict where technology is taking us. A perspective shift on humanity."

---

### Contact Section (INITIALIZE_COMMS)

#### Contact Info
- **Status**: OPEN TO COLLABORATE
- **Email**: gaiake.arvindhan@gmail.com
- **Phone**: +91 8807823244

#### Intro Text
```
I am actively looking for opportunities to collaborate on research projects, hackathons, and innovative startups. Whether it's discussing Condensed Matter Physics or building the next big IoT solution, my channel is open.
```

#### Social Links
- **LinkedIn**: # (placeholder)
- **GitHub**: https://github.com/arvindhanscooby2-a11y

#### Collaborators (SIGNAL_DETECTED)
| Name | Role | URL |
|------|------|-----|
| Abinaav K | TOP_COLLABORATOR | https://abinaavk.com |
| Gokul | COLLABORATOR | https://gokul.gaiasentinel.online |

---

### Footer
```
SYSTEM ONLINE // ARVINDHAN // CLASS 12
```

---

## 6. UI Components & Terminology Mapping

### Section Title Terminology
| Section | Title (Code Style) |
|---------|-------------------|
| Hero | (no title, just name) |
| About | USER_PROFILE.TXT |
| Projects | MISSIONS.PY |
| Skills | SKILL_MATRIX.DAT |
| Library | READ_LOG.DB |
| Contact | INITIALIZE_COMMS |

### Button Labels
- `[ Start ]` - Nav to hero
- `[ Bio ]` - Nav to about
- `[ Projects ]` - Nav to projects
- `[ Stats ]` - Nav to skills
- `[ Comms ]` - Nav to contact
- `VIEW_WORK` - CTA to projects
- `CONTACT_ME` - CTA to contact
- `SEND_SIGNAL` - Send email
- `ESTABLISH_LINK` - Visit collaborator site
- `LAUNCH_MISSION` - Visit project URL
- `SELECT_THEME` - Open theme switcher

### Card/Block Headers
- `[ENGINEERING_FOCUS]`
- `[PHYSICS_RESEARCH]`
- `[ARTISTIC_SYNERGY]`
- `LOG_HISTORY`
- `SYSTEM_DRIVERS / TECH_STACK`
- `CORE_MODULES`
- `CERTIFICATIONS`
- `CREATIVE_MODULES`
- `SIGNAL_DETECTED`

---

## 7. Visual Effects Details

### Matrix Rain Animation
- **Canvas ID**: `pixel-bg`
- **Character Set**: `01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-=`
- **Font Size**: 16px
- **Layers**: 3 (different speeds, opacities, and glow effects)

### Scanlines Overlay
- **Class**: `scanlines`
- **Effect**: Repeating linear gradient (50% transparent, 50% dark)
- **Size**: 4px
- **Opacity**: 0.15

### Glitch Overlay
- **Class**: `glitch-overlay`
- **Trigger**: Navigation link click
- **Effect**: Color-dodge blend mode, shake animation

### Typing Animation
- **Target**: Hero name "ARVINDHAN"
- **Duration**: 2s with 9 characters
- **Cursor**: Blinking block cursor (4px border)

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|--------------|
| Desktop | > 1077px | Default styles |
| Tablet | 768px - 1077px | Single column grids, reduced padding |
| Mobile | 480px - 768px | Further reduced padding, smaller fonts |
| Small Mobile | < 480px | Compact layout, minimum viable spacing |

---

## 9. File Structure

```
arvindhan-portfolio/
├── templates/
│   └── home.html          # Main HTML template (Jinja2)
├── static/
│   ├── style.css          # Main stylesheet
│   ├── themes.css        # Theme definitions
│   └── pfp.jpeg          # Profile image
├── data.json              # Content data
└── app.py                 # Flask application (inferred)
```

---

*Document generated from portfolio source code.*