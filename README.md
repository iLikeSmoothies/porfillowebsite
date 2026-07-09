# Mechanical Engineering Portfolio

A long-term personal portfolio site for Darnel Williams, a mechanical engineering student/professional — built to grow over years of coursework, robotics work, and internships.

## What this is

A static, dependency-free website (plain HTML, CSS, and JavaScript — no framework, no build step). Every page uses a dark, engineering/blueprint-inspired design system with subtle blue accents, a grid-line background, and scroll-triggered reveal animations.

Pages:

- **Home** (`index.html`) — hero intro, current focus, skill highlights, certifications preview, resume preview/download, and contact info
- **About** (`about.html`) — background and a timeline of education/experience
- **Engineering Drawings** (`drawings.html`) — inline PDF preview, image gallery, downloads
- **Certifications** (`certifications.html`) — data-driven certification cards (CSWA Mechanical Design, Autodesk AutoCAD Certified User)
- **Resume** (`resume.html`) — embedded PDF viewer and download button

Contact information (email + LinkedIn + resume download) lives in the footer on every page instead of a separate Contact page. There is intentionally no Projects or Blog/Research page yet — the site keeps to a smaller, finished set of sections until there's enough project work to justify a project index.

Everything currently on the site is a labeled placeholder — no invented projects, employers, certifications, or accomplishments. Replace the bracketed text, images, and PDFs with your own content as you go.

## Key technologies

- Plain HTML5 / CSS3 / vanilla JavaScript (ES6) — no build tooling required
- Google Fonts: Big Shoulders (display), IBM Plex Sans (body), IBM Plex Mono (technical labels)
- Netlify for hosting (see `netlify.toml`)

## Running locally

No install step is required. Either:

```bash
# Open directly
open index.html

# Or serve it (recommended, so relative paths behave like production)
npx serve .
```

## Editing content

- **Certifications** — edit the array in `data/certifications-data.js` (status, verification links, certificate PDF paths).
- **Drawings** — drop images in `assets/images/drawings/` and PDFs in `assets/drawings/`, then add a `.gallery-item` block in `drawings.html`.
- **Resume** — replace `assets/resume/resume.pdf` with your own exported PDF.
- **Contact details / social links** — update the `mailto:` and LinkedIn links in the footer at the bottom of every page (repeated per page, no includes system).

See `AGENTS.md` for a more detailed structural breakdown.

