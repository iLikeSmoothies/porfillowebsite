# AGENTS.md

Guidance for AI agents (and future-you) working on this codebase.

## Architecture

Static, multi-page site. No framework, no bundler, no package.json. Every `.html` file is served as-is by Netlify. This is intentional: the site needs to remain editable by hand for years without a toolchain to maintain or upgrade.

```
index.html            Home
about.html             About
projects.html          Project index (filterable grid, data-driven)
projects/
  _template.html       Master template — copy this for every new project
  example-project.html Filled-in demo of the template (clearly labeled, not a real project)
drawings.html          Engineering drawings archive (PDF + image previews)
certifications.html    Certification cards (data-driven)
resume.html             Embedded PDF resume + download
contact.html            Contact links + Netlify Forms contact form
blog.html               Placeholder for future long-form writing

css/style.css           Single shared stylesheet (design tokens as CSS custom properties)
js/main.js              Shared behavior: nav toggle, active-link highlight, scroll reveal,
                         scroll progress bar, Netlify Forms AJAX submit
data/projects-data.js   Project index array + card renderer + filter bar renderer
data/certifications-data.js  Certification array + card renderer

assets/resume/resume.pdf
assets/certifications/  Certification PDFs such as cswa.pdf and autocad.pdf
assets/certifications/images/
assets/drawings/pdf/    Engineering drawing PDFs
assets/drawings/previews/  Drawing preview images
assets/images/profile/  Profile photo at profile.jpg
assets/images/projects/ Project images
```

## Conventions

- **No build step.** Do not add a bundler, framework, or transpiler unless the user explicitly asks for one — it would work against the "stays editable for a decade" goal.
- **Data-driven grids, hand-authored detail pages.** Project cards and certification cards render from JS arrays (`data/*.js`) so adding one is a one-line edit. Project *detail* pages are full static HTML files cloned from `projects/_template.html` — this keeps each project page fully custom without needing a template engine.
- **Every nav/footer block is duplicated per page.** There's no includes system. When changing the nav links or footer, update all HTML files (a simple `grep -rl 'nav-links' *.html projects/*.html` finds them).
- **Design tokens live in `:root` in `css/style.css`.** Colors, fonts, spacing, and the easing curve are all CSS custom properties — change them once to reskin the whole site.
- **Avoid fake content.** Do not invent projects, employers, credentials, or accomplishments. Use real portfolio content or a clean empty state.
- **`projects/example-project.html` is explicitly labeled as a non-real demo** via a banner at the top of the page. Do not remove that banner or make the content look like a real project — the user has asked that no fake projects/companies/accomplishments be invented.

## Netlify specifics

- The contact form in `contact.html` uses Netlify Forms (`data-netlify="true"`, honeypot field). It was activated via the `netlify-forms` skill's `enable.cjs` script — if the form's `name` attribute or fields change, no further activation step is needed since detection happens automatically at each deploy from the static HTML.
- `netlify.toml` sets `publish = "."` (no build command) and basic security/cache headers.

## Adding a new page type (e.g. a real Blog)

`blog.html` is intentionally empty. When it's time to build it out, follow the same pattern as `projects/`: a data file + list page, or simply individual static HTML posts linked from a card grid — whichever is simpler once there's real content to structure around.
