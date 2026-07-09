/* ============================================================
   Renders the project index grid (used on index.html and
   projects.html) and the "featured" subset on the homepage.

   HOW TO ADD A NEW PROJECT
   ------------------------
   1. Duplicate projects/_template.html, rename it, e.g.
      projects/rc-suspension-rig.html
   2. Fill in the sections in that file with your content.
   3. Add one object below pointing "href" at that new file.
   4. Drop any images in assets/images/projects/ and any
      downloadable files in assets/downloads/projects/.
   That's it — the card grids on this page and the homepage
   pick it up automatically.
   ============================================================ */

const PROJECTS = [
  {
    slug: "example-project",
    title: "[Project Title Placeholder]",
    category: "CAD / Mechanical Design",
    summary:
      "One or two sentences describing what this project is, the core mechanical problem it solves, and the outcome. Replace with your own project summary.",
    tags: ["CAD", "SolidWorks", "3D Printing"],
    image: "assets/images/projects/placeholder-01.svg",
    href: "projects/example-project.html",
    year: "20XX",
    featured: true,
  },
  {
    slug: "add-your-next-project",
    title: "[Add Your Next Project]",
    category: "Robotics / Controls",
    summary:
      "Duplicate projects/_template.html and add a new entry to data/projects-data.js to feature another project here. This card is a placeholder showing the grid can scale to dozens of entries.",
    tags: ["Robotics", "Placeholder"],
    image: "assets/images/projects/placeholder-02.svg",
    href: "projects/_template.html",
    year: "20XX",
    featured: true,
  },
  {
    slug: "third-slot",
    title: "[Third Project Slot]",
    category: "Manufacturing / Prototyping",
    summary:
      "This site supports an unlimited number of project cards. Keep adding entries here as your portfolio of engineering work grows through college and beyond.",
    tags: ["Manufacturing", "Placeholder"],
    image: "assets/images/projects/placeholder-03.svg",
    href: "projects/_template.html",
    year: "20XX",
    featured: false,
  },
];

function projectCardHTML(p) {
  return `
    <a class="card reveal" href="${p.href}">
      <div class="card-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="card-body">
        <span class="card-tag">${p.category}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-text">${p.summary}</p>
        <div class="tag-row">
          ${p.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}
        </div>
        <div class="card-foot">
          <span>${p.year}</span>
          <span class="card-link">View project <span class="btn-arrow">&rarr;</span></span>
        </div>
      </div>
    </a>`;
}

function renderProjectGrid(targetSelector, { featuredOnly = false, limit = null } = {}) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  let list = featuredOnly ? PROJECTS.filter((p) => p.featured) : PROJECTS;
  if (limit) list = list.slice(0, limit);
  if (!list.length) {
    el.innerHTML = `<div class="empty-state">No projects to show in this filter yet — check back soon.</div>`;
    return;
  }
  el.innerHTML = list.map(projectCardHTML).join("");
}

function renderProjectFilterBar(barSelector, gridSelector) {
  const bar = document.querySelector(barSelector);
  const grid = document.querySelector(gridSelector);
  if (!bar || !grid) return;

  const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  bar.innerHTML = categories
    .map(
      (c, i) =>
        `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`
    )
    .join("");

  function applyFilter(cat) {
    const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state">No projects tagged "${cat}" yet.</div>`;
      return;
    }
    grid.innerHTML = list.map(projectCardHTML).join("");
  }

  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.cat);
    });
  });

  applyFilter("All");
}
