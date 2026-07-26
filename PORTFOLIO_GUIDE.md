# Portfolio Guide

This site is now a simple manual portfolio. There is no automatic drag-and-drop system.

## Resume

The Resume page uses:

```text
assets/resume/resume.pdf
```

To update the resume, replace that file with the new PDF, commit, and push.

## Certifications

Put certification PDFs in:

```text
assets/certifications/
```

Then edit `certifications.html` by hand to add or update links.

## Engineering Projects

Put project images and visual assets in one folder per project:

```text
assets/images/projects/project-folder-name/
```

Example:

```text
assets/images/projects/adjustable-desk-clamp-dock/
```

Then edit `projects.html` by hand. Keep newest projects toward the top of the page.

## Profile Photo

Replace the profile photo here:

```text
assets/images/profile/profile.png
```

## Page Map

- `index.html` controls Home.
- `about.html` controls About.
- `projects.html` controls Engineering Projects.
- `certifications.html` controls Certifications.
- `resume.html` controls Resume.
- `css/style.css` controls the visual design.
- `js/main.js` controls the mobile nav, reveal animation, scroll progress, optional image fallback, and form-safe shared behavior.
