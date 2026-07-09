# Mechanical Engineering Portfolio

A static, dependency-free personal portfolio site for a mechanical engineering student. It is built with plain HTML, CSS, and JavaScript so it stays easy to edit by hand and deploy from GitHub.

## Main Pages

- `index.html` - Home
- `about.html` - Education, experience, skills, and profile photo area
- `projects.html` and `projects/` - Project index and project detail pages
- `drawings.html` - Engineering drawing archive
- `certifications.html` - Certification cards rendered from `data/certifications-data.js`
- `resume.html` - Embedded resume PDF and download links
- `contact.html` - Contact links and Netlify form
- `blog.html` - Future research/blog page

## Asset Folders

Use these folders when adding portfolio files:

```text
assets/resume/resume.pdf
assets/certifications/cswa.pdf
assets/certifications/autocad.pdf
assets/certifications/images/
assets/drawings/pdf/
assets/drawings/previews/
assets/images/profile/profile.jpg
assets/images/projects/
```

Empty folders contain `.gitkeep` files so GitHub keeps the structure. You can leave those files alone.

## Updating Content

- Resume: replace `assets/resume/resume.pdf`. The Resume page updates automatically.
- Certifications: place PDFs in `assets/certifications/`, then edit `data/certifications-data.js` if names, dates, links, or credential details change.
- Drawings: place PDFs in `assets/drawings/pdf/` and preview images in `assets/drawings/previews/`, then copy the commented example card in `drawings.html`.
- Projects: place project images in `assets/images/projects/`, place downloadable project files where you want them under `assets/`, then add the project to `data/projects-data.js` and create/copy a project detail page in `projects/`.
- Profile photo: save the image as `assets/images/profile/profile.jpg`. The About page will show a fallback if the file is missing.

See `PORTFOLIO_GUIDE.md` for a more detailed step-by-step guide.

## Running Locally

No install step is required. Open `index.html` directly, or serve the folder with any static server.

```bash
npx serve .
```

## Deployment

Because this is a static site, pushing changes to GitHub is enough for Netlify to redeploy if the repository is connected there.
