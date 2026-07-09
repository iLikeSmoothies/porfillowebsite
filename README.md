# Mechanical Engineering Portfolio

A long-term personal portfolio site for a mechanical engineering student — built to grow from a few placeholder projects into dozens of real ones over years of coursework, robotics work, and internships.

## What this is

A static, dependency-free website (plain HTML, CSS, and JavaScript — no framework, no build step). Every page uses a dark, engineering/blueprint-inspired design system with subtle blue accents, a grid-line background, and scroll-triggered reveal animations.

Pages:

- **Home** (`index.html`) — hero intro, featured projects, skill highlights
- **About** (`about.html`) — background and a timeline of education/experience
- **Projects** (`projects.html`, `projects/`) — filterable project index plus a reusable project detail template
- **Engineering Drawings** (`drawings.html`) — inline PDF preview, image gallery, downloads
- **Certifications** (`certifications.html`) — data-driven certification cards
- **Resume** (`resume.html`) — embedded PDF viewer and download button
- **Contact** (`contact.html`) — contact links plus a working Netlify Forms contact form
- **Research/Blog** (`blog.html`) — placeholder for future long-form writing

Everything currently on the site is a labeled placeholder — no invented projects, employers, or accomplishments. Replace the bracketed text, images, and PDFs with your own content as you go.

## Key technologies

- Plain HTML5 / CSS3 / vanilla JavaScript (ES6) — no build tooling required
- Google Fonts: Big Shoulders (display), IBM Plex Sans (body), IBM Plex Mono (technical labels)
- Netlify Forms for the contact form (serverless, no backend code)
- Netlify for hosting (see `netlify.toml`)

## Running locally

No install step is required. Either:

```bash
# Open directly
open index.html

# Or serve it (recommended, so relative paths and fetch() behave like production)
npx serve .
```

To test the Netlify Forms submission locally with full Netlify emulation:

```bash
netlify dev
```

## Editing content

- **Projects** — duplicate `projects/_template.html`, fill in your content, then add one entry to `data/projects-data.js`. The homepage and `projects.html` grids update automatically.
- **Certifications** — edit the array in `data/certifications-data.js`.
- **Drawings** — drop images in `assets/images/drawings/` and PDFs in `assets/drawings/`, then add a `.gallery-item` block in `drawings.html`.
- **Resume** — replace `assets/resume/resume.pdf` with your own exported PDF.
- **Contact details / social links** — update the `mailto:`, LinkedIn, and GitHub links in `contact.html` and the site footer (repeated at the bottom of every page).

See `AGENTS.md` for a more detailed structural breakdown.
