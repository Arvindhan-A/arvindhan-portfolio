# Arvindhan Portfolio

Personal portfolio: physics, IoT systems and full-stack projects. A small Flask app with hand-written CSS and JavaScript, with no frontend framework or build step.

## Run it

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open http://localhost:8082. In production, `Procfile` runs it with gunicorn.

## Where things live

| Path | What it is |
| --- | --- |
| `app.py` | Routes and all site content: projects, skills, timeline, certifications, books |
| `templates/base.html` | Shared head, nav, theme menu and footer |
| `templates/index.html`, `project.html`, `skill.html` | The three page types |
| `static/css/style.css` | Styles and the four themes (`data-theme`) |
| `static/js/main.js` | Theme switching, scroll effects, skill filter, pointer effects |
| `static/js/field.js` | The hero's interactive wave-interference background |
| `static/js/transitions.js` | The animation between the project list and project pages |
| `static/img/` | Optimised WebP screenshots and the social preview image |

## Editing content

Change the lists in `app.py`. To add a project, add an entry to `projects` and put a screenshot in `static/img/`. Each project sets its own palette: `color` (card and page header background), `ink` (text on it), `highlight` (accents on it), and `accent_light` / `accent_dark` (the page's accent on light and dark themes). Keep text at 4.5:1 contrast or better against whatever it sits on.

The animations respect `prefers-reduced-motion`, and all content stays visible with JavaScript turned off.

## License

MIT
