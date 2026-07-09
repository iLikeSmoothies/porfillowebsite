# Darnel Williams Mechanical Engineering Portfolio

A static, dependency-free mechanical engineering portfolio built with plain HTML, CSS, and JavaScript. The site is designed to stay easy to maintain by placing files into organized folders and updating simple JSON manifests.

## Main Workflow

1. Drop files into the matching folder in `assets/`.
2. Update `data/projects.json` or `data/certifications.json` when the site needs to display those files.
3. Commit and push.
4. Netlify redeploys the static site.

## Important Folders

```text
assets/resume/
assets/projects/
assets/certifications/
assets/drawings/
assets/images/profile/
```

Each important folder has a `README.txt` explaining what belongs there.

## Key Files

- `index.html` - Home
- `about.html` - About, education, experience, skills
- `projects.html` - Engineering project cards
- `project.html` - Project detail page powered by `data/projects.json`
- `certifications.html` - Certification cards powered by `data/certifications.json`
- `resume.html` - Uses `assets/resume/Darnel Williams Resume.pdf`
- `drawings.html` - Explains how drawings connect to project pages
- `PORTFOLIO_GUIDE.md` - Step-by-step maintenance guide

## Static Site Note

Netlify serves this as a static website, so the site cannot automatically scan folders after deploy. The simple alternative is already set up:

- projects are listed in `data/projects.json`
- certifications are listed in `data/certifications.json`

That keeps updates close to: drop files, update one JSON file, commit, push.
