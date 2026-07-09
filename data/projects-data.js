/* ============================================================
   Project manifest renderer.

   Projects are listed in data/projects.json. Each project can keep
   its files together in assets/projects/Project_Name/.
   ============================================================ */

let PROJECTS = [];

async function loadProjectManifest() {
  if (PROJECTS.length) return PROJECTS;
  try {
    const response = await fetch("data/projects.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load projects.json: ${response.status}`);
    const manifest = await response.json();
    PROJECTS = Array.isArray(manifest.projects) ? manifest.projects : [];
  } catch (error) {
    console.warn(error);
    PROJECTS = [];
  }
  return PROJECTS;
}

function projectCardHTML(p) {
  const image = p.image || p.heroImage || "";
  const media = image
    ? `<img src="${image}" alt="${p.title}" loading="lazy" />`
    : `<div class="card-media-empty">Project files ready</div>`;

  return `
    <a class="card" href="project.html?project=${encodeURIComponent(p.slug)}">
      <div class="card-media">${media}</div>
      <div class="card-body">
        <span class="card-tag">${p.category || "Engineering Project"}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-text">${p.summary || "Project details will be added as the work is documented."}</p>
        <div class="tag-row">
          ${(p.tags || []).map((t) => `<span class="tag-pill">${t}</span>`).join("")}
        </div>
        <div class="card-foot">
          <span>${p.year || ""}</span>
          <span class="card-link">View project <span class="btn-arrow">&rarr;</span></span>
        </div>
      </div>
    </a>`;
}

function projectEmptyState() {
  return `
    <div class="empty-state">
      <h3>Engineering projects will appear here as they are documented.</h3>
      <p>Drop each project's files into assets/projects/Project_Name/, then add one entry to data/projects.json.</p>
    </div>`;
}

async function renderProjectGrid(targetSelector, { featuredOnly = false, limit = null } = {}) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  let list = await loadProjectManifest();
  list = featuredOnly ? list.filter((p) => p.featured) : list;
  if (limit) list = list.slice(0, limit);
  if (!list.length) {
    el.innerHTML = projectEmptyState();
    return;
  }
  el.innerHTML = list.map(projectCardHTML).join("");
}

async function renderProjectFilterBar(barSelector, gridSelector) {
  const bar = document.querySelector(barSelector);
  const grid = document.querySelector(gridSelector);
  if (!bar || !grid) return;

  const projects = await loadProjectManifest();
  if (!projects.length) {
    bar.hidden = true;
    grid.innerHTML = projectEmptyState();
    return;
  }

  const categories = ["All", ...new Set(projects.map((p) => p.category || "Engineering Project"))];
  bar.innerHTML = categories
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`)
    .join("");

  function applyFilter(cat) {
    const list = cat === "All"
      ? projects
      : projects.filter((p) => (p.category || "Engineering Project") === cat);
    grid.innerHTML = list.length ? list.map(projectCardHTML).join("") : projectEmptyState();
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

async function renderProjectDetail(targetSelector) {
  const root = document.querySelector(targetSelector);
  if (!root) return;

  const slug = new URLSearchParams(window.location.search).get("project");
  const projects = await loadProjectManifest();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    root.innerHTML = `
      <section class="page-intro">
        <div class="container">
          <span class="eyebrow">Engineering Project</span>
          <h1 class="page-title">Project Not Found</h1>
          <p class="page-desc">Add a project entry to data/projects.json, then open it from the Engineering Projects page.</p>
          <div class="hero-actions" style="margin-top: 1.6rem;">
            <a href="projects.html" class="btn btn-primary">Back to Engineering Projects <span class="btn-arrow">&rarr;</span></a>
          </div>
        </div>
      </section>`;
    return;
  }

  const paragraphs = (items = []) => items.map((text) => `<p>${text}</p>`).join("");
  const section = (label, title, items) => items && items.length
    ? `<section class="detail-section"><div class="container"><span class="detail-label">${label}</span><h2 class="detail-title">${title}</h2><div class="detail-body">${paragraphs(items)}</div></div></section>`
    : "";
  const images = (project.cadImages || []).map((item) => `
    <figure class="project-media-item">
      <img src="${item.src}" alt="${item.caption || project.title}" loading="lazy" />
      ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}
    </figure>`).join("");
  const drawings = (project.engineeringDrawings || []).map((item) => `
    <a class="download-row" href="${item.file}" target="_blank" rel="noopener">
      <span>
        <span class="download-name">${item.title || "Engineering drawing"}</span>
        ${item.caption ? `<span class="download-meta">${item.caption}</span>` : ""}
      </span>
      <span class="download-link">Open PDF &rarr;</span>
    </a>`).join("");
  const downloads = (project.downloads || []).map((item) => `
    <a class="download-row" href="${item.file}" target="_blank" rel="noopener">
      <span>
        <span class="download-name">${item.title}</span>
        <span class="download-meta">${item.type || "Download"}</span>
      </span>
      <span class="download-link">Download &darr;</span>
    </a>`).join("");

  root.innerHTML = `
    <section class="project-hero container">
      <div>
        <span class="eyebrow">${project.category || "Engineering Project"}</span>
        <h1 class="page-title">${project.title}</h1>
        <p class="page-desc">${project.summary || ""}</p>
        <div class="tag-row" style="margin-top: 1.4rem;">
          ${(project.tags || []).map((t) => `<span class="tag-pill">${t}</span>`).join("")}
        </div>
      </div>
      <div class="project-facts">
        <div class="project-fact"><span class="k">Year</span><span class="v">${project.year || "In progress"}</span></div>
        <div class="project-fact"><span class="k">Folder</span><span class="v">${project.folder || "assets/projects/"}</span></div>
      </div>
    </section>
    ${section("Overview", "Overview", project.overview)}
    ${section("Sketches", "Sketches", project.sketches)}
    ${section("Design Process", "Design Process", project.designProcess)}
    ${images ? `<section class="detail-section"><div class="container"><span class="detail-label">CAD Images</span><h2 class="detail-title">CAD Images</h2><div class="project-media-grid">${images}</div></div></section>` : ""}
    ${drawings ? `<section class="detail-section"><div class="container"><span class="detail-label">Engineering Drawings</span><h2 class="detail-title">Engineering Drawings</h2><div class="download-list">${drawings}</div></div></section>` : ""}
    ${downloads ? `<section class="detail-section"><div class="container"><span class="detail-label">Downloads</span><h2 class="detail-title">Downloads</h2><div class="download-list">${downloads}</div></div></section>` : ""}
    ${section("Lessons Learned", "Lessons Learned", project.lessonsLearned)}
    <div class="container project-nav"><a href="projects.html">&larr; Back to Engineering Projects</a></div>`;
}
