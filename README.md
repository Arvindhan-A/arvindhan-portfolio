# SYSTEM.ROOT // Arvindhan Portfolio

A retro-futuristic, pixel-art inspired portfolio website built with Flask. This project showcases the intersection of Condensed Matter Physics, IoT Systems Engineering, and Full-Stack Development.

## 🚀 Features

- **Retro-Terminal Aesthetic**: Custom pixel-art UI with scanlines, glitch effects, and a star-field background.
- **Dynamic Content**: Powered by a central `data.json` file for easy updates without touching HTML.
- **Custom Theme System**: 
    - **30 Unique Themes**: Includes Cyberpunk, Dracula, Matrix, Solar Flare, and more.
    - **Persistence**: Remembers your theme choice using `localStorage`.
    - **Modal UI**: Interactive theme browser at the bottom of the page.
- **Interactive Components**:
    - Collapsible Timeline for academic and project history.
    - Expandable Skill Matrix with descriptions.
    - Smooth scroll navigation with glitch transitions.
- **Responsive Design**: Optimized for both desktop and mobile terminals.

## 🛠️ Tech Stack

- **Backend**: Python 3.x, Flask
- **Frontend**: HTML5, CSS3 (Variables & Animations), Vanilla JavaScript
- **Fonts**: Press Start 2P, VT323 (via Google Fonts)
- **Icons**: Font Awesome

## 📂 Project Structure

```text
arvindhan_portfolio/
├── app.py              # Flask Application Entry Point
├── data.json           # Content & Metadata (The "Database")
├── static/
│   ├── style.css       # Core Layout & Component Styling
│   ├── themes.css      # Definitions for 30 Custom Themes
│   └── pfp.jpeg        # Profile Image
├── templates/
│   └── home.html       # Main Portfolio Template
└── requirements.txt    # Project Dependencies
```

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd arvindhan_portfolio
   ```

2. **Set up a virtual environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install flask
   ```
   *(Note: This project uses standard Flask features)*

4. **Run the application**:
   ```bash
   python app.py
   ```

5. **Access the terminal**:
   Open `http://127.0.0.1:5000` in your web browser.

## 🎨 Customization

### Changing Content
Edit `data.json` to update your bio, stats, projects, and contact information. The frontend will automatically reflect these changes.

### Adding Themes
New themes can be added by:
1. Defining a new CSS class in `static/themes.css` following the `body.theme-name` pattern.
2. Adding the theme object to the `themes` array in the `<script>` tag of `templates/home.html`.

## 📜 License
MIT License. Feel free to use and modify for your own portfolio.

---
**SYSTEM STATUS: OPTIMAL // ENJOY THE VIEW**
