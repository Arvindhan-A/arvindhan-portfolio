from flask import Flask, render_template, abort

app = Flask(__name__)

projects = [
    {
        "slug": "gaia-sentinel",
        "name": "Gaia Sentinel",
        "tag": "FLAGSHIP",
        "image": "gaiasentinel.png",
        "url": "https://gaiasentinel.online",
        "cofounder": "Abinaav K (Founder & Head of Engineering)",
        "desc": "Environmental monitoring using IoT sensor networks. Custom hardware that reads air and water quality in real time and pushes alerts when things go bad.",
        "long_desc": "Environmental intelligence platform started as a school project. Built sensor nodes that detect unsafe conditions in air and water, then alert you instantly. Monitors PM2.5, PM10, NO2, CO, TDS, pH, and temperature. Data flows through Python/Flask backend to a real-time WebGL dashboard. Won 1st place at Robo Genesis December 2025. Currently working on a HEPA Purification Node that actively cleans air when thresholds are crossed.",
        "features": [
            "Air quality monitoring — PM2.5, PM10, NO2, CO via laser-scattering sensors",
            "Water quality monitoring — TDS, pH, turbidity analysis",
            "Intelligent alert system — Low / Medium / Critical classification with SMS and email",
            "Real-time WebGL dashboard with CSV/JSON export",
            "Multi-platform: web console, mobile responsive, REST API",
            "AES-256 encryption, role-based access control, GDPR compliant",
            "Store-and-forward: nodes cache data locally for 30 days if internet drops",
        ],
        "hardware": [
            "Air Node — MQ135, MQ7, MQ2, MQ4, MQ6, DHT22 sensors. 5G & LoRaWAN mesh. IP67 weatherproof.",
            "Water Node — TDS and water temperature sensors. IP68 fully submersible. 2+ year probe life.",
            "Drone Attachment — < 150g modular payload. Universal DJI/Autel mount. Real-time 3D pollution heatmapping.",
            "HEPA Purification Node — 100 m3/hour capacity. AI-autonomous activation. Industrial HEPA-13 + activated carbon.",
        ],
        "roadmap": [
            "Oct 2025 — Project inception",
            "Nov 2025 — Prototype alpha",
            "Dec 2025 — Won 1st Prize at Robo Genesis",
            "Jan 2026 — HEPA Node launch",
            "Jun 2026 — Global mesh network with satellite uplinks",
            "2027 — Predictive AI 2.0 for smart cities",
        ],
        "tech": ["Python", "Flask", "Celery", "PostgreSQL", "Socket.IO", "ESP32", "Docker", "Redis", "LoRaWAN"],
        "role": "Co-founder, Lead UI/UX, Hardware Prototyping",
        "status": "Live — Growing",
    },
    {
        "slug": "c12-tracker",
        "name": "C12 Tracker",
        "tag": "EDTECH",
        "image": "studytracker.png",
        "url": "https://c12tracker.gaiasentinel.online",
        "desc": "Study tracker for CBSE Class 9-12. Track what you've studied, what needs revision, and exam readiness.",
        "long_desc": "Study tracker for CBSE Class 9-12 built for myself. Tracks which chapters are done, what needs revision, and calculates exam readiness as a percentage by subject. Sign in with Google or email, mark chapters complete, and get nudges before you forget. Built with Flask and PostgreSQL. First month free for new users.",
        "features": [
            "Google and email sign-in",
            "Chapter completion tracking by subject",
            "Revision cycle tracking with smart nudges",
            "Exam readiness percentage by subject",
            "Clean study dashboard",
        ],
        "tech": ["Flask", "PostgreSQL", "JavaScript", "Google Auth"],
        "role": "Full-stack — designed and built the whole thing",
        "status": "Live — First month free",
    },
    {
        "slug": "gaia-transfer",
        "name": "Gaia Transfer",
        "tag": "FILE TRANSFER",
        "image": "transfer.png",
        "url": "https://transfer.gaiasentinel.online",
        "desc": "Send files browser-to-browser. No server stores anything. AES-256 encrypted, peer-to-peer.",
        "long_desc": "Browser-to-browser file transfer with AES-256 encryption and WebRTC peer-to-peer. No server stores anything — files go directly from sender to receiver. Guest mode uses word-pair codes (like 'blue-elephant'), account mode gives custom @username, contacts, and transfer history. No file size limit, constrained only by browser memory.",
        "features": [
            "AES-256 encryption — encrypted in-browser before leaving your device",
            "Peer-to-peer via WebRTC — no upload/download delay, no server storage",
            "Guest mode with word-pair codes — no tracking, no account needed",
            "Account mode with custom @username, contacts, and transfer history",
            "No file size limit (constrained only by browser memory)",
        ],
        "tech": ["JavaScript", "WebRTC", "AES-256 Cryptography", "WebSocket"],
        "role": "Full-stack — encryption logic and WebRTC setup",
        "status": "Live — Guest and account modes",
    },
    {
        "slug": "sandipani",
        "name": "Sandipani Vidyalaya",
        "tag": "SCHOOL",
        "image": "sandipani.png",
        "url": "https://sandipani2.gaiasentinel.online",
        "desc": "Official website for my school. CBSE affiliated, Nursery to Grade XII.",
        "long_desc": "Official website for Sandipani Vidyalaya, a CBSE affiliated school in Chennai run by SASTRA Trust. Built with Abinaav: admissions page with 2026-27 registration, curriculum breakdown from PreKG to Grade XII, fee structure, faculty directory, events calendar, and campus gallery. The school actually uses it for admissions and communications.",
        "features": [
            "Full admissions system for 2026-27 academic year",
            "Curriculum breakdown: PreKG, Primary (I-V), Middle (VI-VIII), Secondary (IX-X), Senior Sec (XI-XII)",
            "Fee structure and online fee payment integration",
            "Faculty directory with subject specializations",
            "Events calendar with news and announcements",
            "Campus gallery with facilities showcase",
        ],
        "tech": ["HTML", "CSS", "JavaScript"],
        "role": "Co-developer with Abinaav K",
        "status": "Live — Official school website",
    },
    {
        "slug": "sri-krishna",
        "name": "Sri Krishna Enterprises",
        "tag": "BUSINESS",
        "image": "srikrishnarnterprises.png",
        "url": "https://srikrishnas.store",
        "desc": "Website for a silk and traditional fabrics showroom in Vadapalani, Chennai.",
        "long_desc": "Website for Sri Krishna Enterprises, a silk and traditional fabrics showroom in Vadapalani, Chennai since 1995. Family-run business with 2000+ blouse varieties. Built a clean site showcasing silk sarees, blouse materials, with WhatsApp integration, Google Maps directions, and Instagram link for latest arrivals.",
        "features": [
            "Full collection showcase with 2000+ varieties",
            "Traditional silk sarees and blouse materials",
            "WhatsApp integration for orders",
            "Google Maps directions to showroom",
            "Instagram link for latest arrivals",
        ],
        "tech": ["HTML", "CSS", "JavaScript"],
        "role": "Full design and development",
        "status": "Live — srikrishnas.store",
    },
    {
        "slug": "deploy",
        "name": "Deploy (ATS)",
        "tag": "PLATFORM",
        "image": "deploy.png",
        "url": "https://deploy.gaiasentinel.online",
        "desc": "The original deployment platform. Auto-detects your framework and gets you live.",
        "long_desc": "First version of our hosting platform, before Gaia Cloud. Push your repo, auto-detect framework (Flask, Django, FastAPI, Express, Next.js, static HTML), deploy in under 60 seconds. Free PostgreSQL provisioning and subdomains. No cold starts on free tier, real-time deploy logs.",
        "features": [
            "Auto framework detection — 6 frameworks",
            "PostgreSQL provisioning in seconds",
            "Free subdomain per deployment",
            "cgroup resource isolation",
            "Real-time deploy logs",
            "No cold starts on free tier",
        ],
        "tech": ["Python", "Docker", "Nginx", "PostgreSQL"],
        "role": "Original architect",
        "status": "Live — Legacy platform",
    },
]


skills = [
    {
        "name": "Python", "slug": "python", "cat": "Backend",
        "desc": "Automation scripts, data analysis, and backend services.",
        "long_desc": "Python is my primary language. I use it for everything from backend web services to sensor data processing to automation scripts. Flask is my go-to framework, and I use NumPy/SciPy for physics simulations and data analysis. Most of my projects have a Python backend.",
        "used_in": ["gaia-sentinel", "c12-tracker"],
        "details": ["Flask web apps and REST APIs", "Sensor data processing and threshold logic", "Automation scripts for deployment", "Data analysis with NumPy and Pandas"],
    },
    {
        "name": "Flask", "slug": "flask", "cat": "Backend",
        "desc": "REST APIs and full-stack web apps.",
        "long_desc": "Flask is my framework of choice. I've used it for Gaia Sentinel's backend, Gaia Cloud's deployment engine, C12 Tracker, and several other projects. It's lightweight enough that I understand every part of my stack, and flexible enough to build anything from a simple API to a full platform.",
        "used_in": ["gaia-sentinel", "c12-tracker"],
        "details": ["RESTful API design with proper endpoints", "Database integration with SQLAlchemy and raw PostgreSQL", "Authentication with session management", "WebSocket integration via Flask-SocketIO"],
    },
    {
        "name": "HTML5", "slug": "html5", "cat": "Frontend",
        "desc": "Semantic structure for modern web.",
        "long_desc": "Every project starts with clean HTML. Semantic markup, accessibility, and structure. From the Sandipani Vidyalaya school website to Sri Krishna Enterprises — all hand-written HTML, no bloated frameworks.",
        "used_in": ["sandipani", "sri-krishna", "gaia-sentinel"],
        "details": ["Semantic HTML5 elements", "Form design and validation", "SEO-friendly markup", "Jinja2 templating with Flask"],
    },
    {
        "name": "CSS3", "slug": "css3", "cat": "Frontend",
        "desc": "Styling, animations, responsive layouts.",
        "long_desc": "I design and code all my UI by hand. Custom themes, CSS variables for theming systems, responsive layouts, subtle animations. My art background (5+ years at Global Art) directly influences how I approach visual design. No Bootstrap, no Tailwind — I write my own CSS.",
        "used_in": ["gaia-sentinel", "sandipani", "sri-krishna"],
        "details": ["CSS custom properties for theming (4 themes on this portfolio)", "Responsive layouts with CSS Grid and Flexbox", "Smooth animations with cubic-bezier easing", "Glassmorphism and modern UI patterns"],
    },
    {
        "name": "JavaScript", "slug": "javascript", "cat": "Frontend",
        "desc": "Interactive logic and dynamic content.",
        "long_desc": "Vanilla JavaScript — no React, no Vue. I write plain JS for interactivity: form handling, API calls, DOM manipulation, WebSocket connections. For Gaia Transfer, I built the entire WebRTC peer-to-peer connection logic in vanilla JS.",
        "used_in": ["gaia-sentinel", "gaia-transfer"],
        "details": ["WebRTC for peer-to-peer file transfer (Gaia Transfer)", "Real-time dashboard updates via WebSocket", "Form validation and dynamic UI", "API integration and fetch calls"],
    },
    {
        "name": "ESP32", "slug": "esp32", "cat": "IoT",
        "desc": "Firmware, sensor integration, hardware.",
        "long_desc": "The ESP32 is the brain behind every Gaia Sentinel sensor node. I write firmware that reads from MQ-series gas sensors, TDS probes, and DHT22 temperature/humidity sensors. Data gets transmitted over WiFi or LoRaWAN to our backend.",
        "used_in": ["gaia-sentinel"],
        "details": ["MQ135, MQ7, MQ2, MQ4, MQ6 gas sensor integration", "TDS and water temperature probe reading", "LoRaWAN mesh networking between nodes", "Low-power sleep modes for solar-powered nodes"],
    },
    {
        "name": "PostgreSQL", "slug": "postgresql", "cat": "Database",
        "desc": "Schema design and data management.",
        "long_desc": "PostgreSQL is my database of choice. I use it for Gaia Sentinel's sensor data storage, C12 Tracker's study progress, and Gaia Cloud's user and deployment management. Comfortable with both raw SQL and ORM patterns.",
        "used_in": ["gaia-sentinel", "c12-tracker"],
        "details": ["Schema design with proper normalization", "Time-series data storage for sensor readings", "User authentication and role management", "Database provisioning automation (Gaia Cloud)"],
    },
    {
        "name": "Arduino/C++", "slug": "arduino", "cat": "IoT",
        "desc": "Low-level peripheral control.",
        "long_desc": "Before switching to MicroPython on the ESP32, I wrote Arduino sketches for sensor control. Comfortable with C++ for low-level hardware — reading analog sensors, GPIO pins, I2C/SPI communication, and interrupt handlers.",
        "used_in": ["gaia-sentinel"],
        "details": ["Analog sensor reading with ADC", "GPIO control for actuators and LEDs", "I2C/SPI communication protocols", "Interrupt-driven data collection"],
    },
    {
        "name": "Git/GitHub", "slug": "git", "cat": "DevOps",
        "desc": "Version control and collaboration.",
        "long_desc": "Every project lives on GitHub. Branches, pull requests, proper commit messages. For collaborative projects like Sandipani Vidyalaya (with Abinaav), we coordinate through GitHub. Gaia Cloud integrates with GitHub for auto-deployment.",
        "used_in": ["sandipani"],
        "details": ["Branch-based workflow with pull requests", "GitHub integration for CI/CD (Gaia Cloud)", "Collaborative development with teammates", "Proper commit history and documentation"],
    },
]


@app.route('/')
def index():
    certs = [
        "IITM Electronic Systems (6-week intensive)",
        "IITM Data Science (6-week intensive)",
        "Hindi Proficiency Certification",
        "Computer Science Basics",
        "Tech Team Member — Sandipani Vidyalaya",
        "Global Art Certification (5+ years)",
    ]
    books = [
        {"title": "The Inheritance Games", "author": "Jennifer Lynn Barnes", "quote": "Every problem has a solution if you look at it from the right angle."},
        {"title": "Dune", "author": "Frank Herbert", "quote": "The ecology, politics, technology — it all connects. World-building done right."},
        {"title": "Sapiens", "author": "Yuval Noah Harari", "quote": "Understanding where we came from changes how you think about where tech is going."},
        {"title": "The Silent Patient", "author": "Alex Michaelides", "quote": "Questioning assumptions. Same skill you need when debugging."},
        {"title": "Beach Read", "author": "Emily Henry", "quote": "Sometimes you need a good narrative to reset the creative brain."},
        {"title": "Atomic Habits", "author": "James Clear", "quote": "Small changes, big results. Applies to coding and studying equally."},
        {"title": "Project Hail Mary", "author": "Andy Weir", "quote": "Science problem-solving at its best. Made me want to build more things."},
        {"title": "The Alchemist", "author": "Paulo Coelho", "quote": "The journey matters more than the destination. Cliche but true."},
    ]
    timeline = [
        {"year": "2025-26", "title": "Class 12", "desc": "Physics and math heavy. Building advanced prototypes, prepping for Olympiads."},
        {"year": "2026", "title": "IITM Electronic Systems", "desc": "6-week course on circuit design, op-amps, and embedded logic."},
        {"year": "2025", "title": "IITM Data Science", "desc": "6-week course on statistics, ML basics, and Python analytics."},
        {"year": "2025", "title": "GAIA Sentinel — 1st Place", "desc": "Won the school project competition. The IoT drone project that started everything."},
        {"year": "2023", "title": "Class 10 — 476/500", "desc": "Finished at Jawahar Vidyalaya with 95.2%. Strong base in physics and math."},
    ]
    collaborators = [
        {"name": "Abinaav K", "url": "https://abinaavk.com"},
        {"name": "Gokul", "url": "https://gokul.gaiasentinel.online"},
    ]
    return render_template('index.html',
        projects=projects, skills=skills, certs=certs,
        books=books, timeline=timeline, collaborators=collaborators
    )


@app.route('/about')
def about():
    certs = [
        "IITM Electronic Systems (6-week intensive)",
        "IITM Data Science (6-week intensive)",
        "Hindi Proficiency Certification",
        "Computer Science Basics",
        "Tech Team Member — Sandipani Vidyalaya",
        "Global Art Certification (5+ years)",
    ]
    return render_template('about.html', projects=projects, skills=skills, certs=certs)


@app.route('/journey')
def journey():
    timeline = [
        {"year": "2025-26", "title": "Class 12", "desc": "Physics and math heavy. Building advanced prototypes, prepping for Olympiads.", "highlight": "Current Year"},
        {"year": "2026", "title": "IITM Electronic Systems", "desc": "6-week course on circuit design, op-amps, and embedded logic."},
        {"year": "2025", "title": "IITM Data Science", "desc": "6-week course on statistics, ML basics, and Python analytics."},
        {"year": "2025", "title": "GAIA Sentinel — 1st Place", "desc": "Won the school project competition. The IoT drone project that started everything.", "highlight": "Winner"},
        {"year": "2023", "title": "Class 10 — 476/500", "desc": "Finished at Jawahar Vidyalaya with 95.2%. Strong base in physics and math."},
    ]
    return render_template('journey.html', timeline=timeline, projects=projects)


@app.route('/projects')
def projects_page():
    return render_template('projects.html', projects=projects, skills=skills)


@app.route('/contact')
def contact():
    collaborators = [
        {"name": "Abinaav K", "url": "https://abinaavk.com"},
        {"name": "Gokul", "url": "https://gokul.gaiasentinel.online"},
    ]
    return render_template('contact.html', collaborators=collaborators)


@app.route('/project/<slug>')
def project_detail(slug):
    project = next((p for p in projects if p['slug'] == slug), None)
    if not project:
        abort(404)
    return render_template('project.html', project=project, all_projects=projects)


@app.route('/skill/<slug>')
def skill_detail(slug):
    skill = next((s for s in skills if s['slug'] == slug), None)
    if not skill:
        abort(404)
    used_projects = [p for p in projects if p['slug'] in skill['used_in']]
    return render_template('skill.html', skill=skill, used_projects=used_projects, all_skills=skills)


if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)