/* ============================================================
   Renders certification cards on certifications.html.

   HOW TO ADD A CERTIFICATION
   ---------------------------
   Add an object below. "status" can be "earned", "progress",
   or "planned". "credentialUrl" and "fileUrl" are optional —
   leave as null if you don't have a link or PDF for it yet.
   ============================================================ */

const CERTIFICATIONS = [
  {
    title: "[Certification Name Placeholder]",
    issuer: "[Issuing Organization]",
    status: "earned", // "earned" | "progress" | "planned"
    date: "20XX",
    description:
      "Short description of what this certification covers and why it's relevant to your engineering work.",
    credentialUrl: null,
    fileUrl: null,
  },
  {
    title: "[Certification In Progress]",
    issuer: "[Issuing Organization]",
    status: "progress",
    date: "Expected 20XX",
    description:
      "Replace with a certification you're currently pursuing, such as a CAD certification, safety training, or a robotics/controls course.",
    credentialUrl: null,
    fileUrl: null,
  },
  {
    title: "[Planned Certification]",
    issuer: "[Issuing Organization]",
    status: "planned",
    date: "Planned",
    description:
      "A certification you intend to pursue in the future. Update the status to \"progress\" or \"earned\" as you move through it.",
    credentialUrl: null,
    fileUrl: null,
  },
];

const STATUS_LABEL = {
  earned: "Earned",
  progress: "In progress",
  planned: "Planned",
};

function certCardHTML(c) {
  const links = [];
  if (c.credentialUrl) links.push(`<a href="${c.credentialUrl}" target="_blank" rel="noopener">Verify &rarr;</a>`);
  if (c.fileUrl) links.push(`<a href="${c.fileUrl}" target="_blank" rel="noopener">PDF &rarr;</a>`);

  return `
    <div class="cert-card reveal">
      <span class="cert-status ${c.status}"><span class="dot"></span>${STATUS_LABEL[c.status] || c.status}</span>
      <h3 class="cert-title">${c.title}</h3>
      <p class="cert-issuer">${c.issuer}</p>
      <p class="cert-desc">${c.description}</p>
      <div class="cert-foot">
        <span>${c.date}</span>
        <span>${links.join(" &nbsp; ") || "&mdash;"}</span>
      </div>
    </div>`;
}

function renderCertGrid(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  el.innerHTML = CERTIFICATIONS.map(certCardHTML).join("");
}
