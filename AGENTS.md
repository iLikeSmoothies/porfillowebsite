# AGENTS.md

Guidance for AI agents and future maintenance work on this codebase.

## Architecture

Static, multi-page site. No framework, no bundler, no package.json. Every `.html` file is served as-is by Netlify.

```text
index.html                 Home
about.html                 About, education, experience, skills
projects.html              Engineering project index
project.html               Dynamic project detail page
drawings.html              Drawing guidance connected to project folders
certifications.html        Certification cards
resume.html                Embedded PDF resume + download
contact.html               Contact links + Netlify Forms contact form
blog.html                  Future research notes

css/style.css              Shared visual design system
js/main.js                 Shared behavior
data/projects.json         Project manifest
data/projects-data.js      Project renderer
data/certifications.json   Certification manifest
data/certifications-data.js Certification renderer

assets/resume/             Resume PDF
assets/projects/           One folder per project
assets/certifications/     Certification PDFs
assets/drawings/           General drawing files
assets/images/profile/     Profile photo
```

## Conventions

- Preserve the current visual style, typography, animations, and engineering aesthetic.
- Do not add a framework or build step.
- Do not invent fake projects, employers, credentials, or accomplishments.
- Because Netlify serves a static site, folder contents cannot be scanned automatically. Use `data/projects.json` and `data/certifications.json` as the maintainable manifest files.
- The Resume page uses `assets/resume/Darnel Williams Resume.pdf`.
- The About page looks for `assets/images/profile/profile.jpg` and hides the image area if missing.
- Project files live under `assets/projects/Project_Name/`; project cards and detail pages are generated from `data/projects.json`.

## Adding Content

- Resume: replace `assets/resume/Darnel Williams Resume.pdf`.
- Certifications: drop PDFs in `assets/certifications/`, then update `data/certifications.json`.
- Projects: create a project folder in `assets/projects/`, add files, then add a project object to `data/projects.json`.
- Drawings: keep project drawings inside project folders when possible; use `assets/drawings/` for general drawing files.
- Profile photo: add `assets/images/profile/profile.jpg`.

See `PORTFOLIO_GUIDE.md` for user-facing instructions.
