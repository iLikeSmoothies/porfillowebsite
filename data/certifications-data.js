/* ============================================================
   Certification manifest renderer.

   Certifications are listed in data/certifications.json.
   Certificate PDFs belong in assets/certifications/.
   ============================================================ */

const STATUS_LABEL = {
  earned: "Earned",
  progress: "In progress",
  planned: "Planned",
};

async function loadCertifications() {
  try {
    const response = await fetch("data/certifications.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load certifications.json: ${response.status}`);
    const manifest = await response.json();
    return Array.isArray(manifest.certifications) ? manifest.certifications : [];
  } catch (error) {
    console.warn(error);
    return [];
  }
}

function certCardHTML(c) {
  const links = [];
  if (c.credentialUrl) links.push(`<a href="${c.credentialUrl}" target="_blank" rel="noopener">Verify Credential &rarr;</a>`);
  if (!c.credentialUrl && c.verifyPlaceholder) links.push(`<span class="cert-link-disabled">Verify Credential URL needed</span>`);
  if (c.fileUrl) links.push(`<a href="${c.fileUrl}" target="_blank" rel="noopener">Download PDF &rarr;</a>`);

  const credentialId = c.credentialId
    ? `<p class="cert-meta">Credential ID: ${c.credentialId}</p>`
    : "";

  return `
    <div class="cert-card">
      <span class="cert-status ${c.status}"><span class="dot"></span>${STATUS_LABEL[c.status] || c.status}</span>
      <h3 class="cert-title">${c.title}</h3>
      <p class="cert-issuer">${c.issuer}</p>
      ${credentialId}
      <p class="cert-desc">${c.description}</p>
      <div class="cert-foot">
        <span>${c.date}</span>
        <span>${links.join(" &nbsp; ") || "Add PDF or verification link"}</span>
      </div>
    </div>`;
}

async function renderCertGrid(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  const certifications = await loadCertifications();
  el.innerHTML = certifications.length
    ? certifications.map(certCardHTML).join("")
    : `<div class="empty-state">Certification cards will appear here after entries are added to data/certifications.json.</div>`;
}
