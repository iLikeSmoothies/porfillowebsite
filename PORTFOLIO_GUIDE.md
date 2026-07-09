# Portfolio Guide

This guide shows where to put files so the site stays organized and easy to update.

## Resume

Use one stable filename:

```text
assets/resume/resume.pdf
```

When your resume changes, export the new PDF, rename it to `resume.pdf`, replace the old file, commit, and push. The embedded viewer and every resume download link already point to this file.

## Certifications

Use these files:

```text
assets/certifications/cswa.pdf
assets/certifications/autocad.pdf
assets/certifications/images/
```

The certification cards are controlled by:

```text
data/certifications-data.js
```

To add another certification, copy an existing object in the `CERTIFICATIONS` array and update the title, issuer, date, description, file path, and credential details. If a Credly badge is available, paste its badge ID into `credlyBadgeId`.

## Drawings

Use these folders:

```text
assets/drawings/pdf/
assets/drawings/previews/
```

Put exported drawing PDFs in `assets/drawings/pdf/`. Put preview images in `assets/drawings/previews/`.

The visible Drawings page is currently an empty state. When you are ready to show a drawing, open `drawings.html`, copy the commented example drawing card, and update:

- preview image path
- drawing title
- PDF download path
- image alt text

## Projects

Use this folder for project images:

```text
assets/images/projects/
```

Project cards are controlled by:

```text
data/projects-data.js
```

Project detail pages live in:

```text
projects/
```

To add a project, copy `projects/_template.html`, rename it, fill in real project information, then add a matching entry in `data/projects-data.js`. Do not add fake projects or accomplishments just to fill space.

## Profile Photo

Use this exact path:

```text
assets/images/profile/profile.jpg
```

The About page already looks for this file. If the file is missing, the page hides the image and shows a clean fallback instead of a broken image icon.

## GitHub Workflow

After replacing or adding files:

```bash
git status
git add .
git commit -m "Update portfolio content"
git push
```

If the site is connected to Netlify, the pushed changes will publish automatically.
