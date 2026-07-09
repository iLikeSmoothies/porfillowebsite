# Portfolio Guide

This site is a static Netlify site. It cannot automatically scan folder contents after deploy, so the maintainable workflow is:

1. Drop files into the organized asset folders.
2. Update one simple JSON file when a page needs to know about those files.
3. Commit and push.
4. Netlify redeploys the site.

## Resume

Resume folder:

```text
assets/resume/
```

The site uses this exact file:

```text
assets/resume/Darnel Williams Resume.pdf
```

To replace the resume, export the new resume PDF, rename it to `Darnel Williams Resume.pdf`, place it in `assets/resume/`, commit, and push. The Resume page will automatically show the new file because the filename stays the same.

## Certifications

Certification folder:

```text
assets/certifications/
```

Current expected files:

```text
assets/certifications/cswa.pdf
assets/certifications/autocad.pdf
```

Certification cards are controlled by:

```text
data/certifications.json
```

To add a certification, place the PDF in `assets/certifications/`, then add one object to the `certifications` array in `data/certifications.json`.

## Engineering Projects

Project folder:

```text
assets/projects/
```

Create one folder per project:

```text
assets/projects/Project_1/
```

Inside a project folder, you can add files like:

```text
picture_1.png
caption_1.txt
picture_2.png
caption_2.txt
drawing_1.pdf
caption_3.txt
notes.txt
```

Project cards and project pages are controlled by:

```text
data/projects.json
```

To add a project, create the folder, add the files, then add one project object to the `projects` array in `data/projects.json`. Use the `_exampleProject` object in that file as the pattern.

Each project supports:

- overview
- sketches
- design process
- CAD images
- engineering drawings
- captions
- downloads
- lessons learned

Open project detail pages through `project.html?project=your-slug`. The project cards generate those links automatically.

## Pictures And Captions

For images, put the image file in the project folder and add it to the `cadImages` array in `data/projects.json`.

Example:

```json
{
  "src": "assets/projects/Project_1/picture_1.png",
  "caption": "Short caption for the image."
}
```

Caption `.txt` files can stay in the project folder for your records. The website displays captions from `data/projects.json` so the static site can render them reliably.

## Drawings

If a drawing belongs to a project, put it in that project folder:

```text
assets/projects/Project_1/drawing_1.pdf
```

Then list it under `engineeringDrawings` in `data/projects.json`.

If a drawing is not tied to a project yet, store it in:

```text
assets/drawings/
```

## Profile Photo

Profile photo folder:

```text
assets/images/profile/
```

The About page looks for:

```text
assets/images/profile/profile.jpg
```

If `profile.jpg` is missing, the image area hides so the page does not show a broken image.

## About Page Text

The About page content is written directly in:

```text
about.html
```

Update that file when education, experience, skills, or extracurriculars change.

## What Controls What

- `index.html` - Home page
- `about.html` - About, education, experience, skills, profile photo
- `projects.html` - Engineering project card grid
- `project.html` - Dynamic project detail page
- `data/projects.json` - Project content manifest
- `certifications.html` - Certification card grid
- `data/certifications.json` - Certification content manifest
- `resume.html` - Resume viewer and download links
- `drawings.html` - Drawing storage guidance and project connection
- `contact.html` - Contact information and Netlify form
- `css/style.css` - Visual design system
- `js/main.js` - Navigation, reveal animation, scroll progress, form behavior
