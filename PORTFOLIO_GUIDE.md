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

Put project images, PDFs, and related files in:

```text
assets/projects/
```

Then edit `projects.html` by hand. A reusable future project template is included as an HTML comment near the bottom of the page.

## Profile Photo

Add a profile photo here:

```text
assets/images/profile/profile.jpg
```

If the image is missing, the About page shows a clean fallback panel instead of a broken image.

## Page Map

- `index.html` controls Home.
- `about.html` controls About.
- `projects.html` controls Engineering Projects.
- `certifications.html` controls Certifications.
- `resume.html` controls Resume.
- `css/style.css` controls the visual design.
- `js/main.js` controls the mobile nav, reveal animation, scroll progress, optional image fallback, and form-safe shared behavior.
