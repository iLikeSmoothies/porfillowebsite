/* ============================================================
   Renders certification cards on certifications.html.

   HOW TO ADD A CERTIFICATION
   ---------------------------
   Add an object below. "status" can be "earned", "progress",
   or "planned". "credentialUrl", "fileUrl", and "credlyBadgeId"
   are optional. Drop certification PDFs in assets/certifications/.
   ============================================================ */

const CERTIFICATIONS = [
  {
    title: "Certified SOLIDWORKS Associate (CSWA) - Mechanical Design",
    issuer: "Dassault Systemes",
    status: "earned",
    date: "Issued April 28, 2023",
    description:
      "Credential focused on core SOLIDWORKS mechanical design skills, including part modeling, assemblies, and engineering drawing workflows.",
    credentialUrl: null,
    fileUrl: "assets/certifications/cswa.pdf",
    credentialId: "C-PEGXJ2VUNM",
    credlyBadgeId: null,
  },
  {
    title: "Autodesk AutoCAD Certified User",
    issuer: "Autodesk / Certiport",
    status: "earned",
    date: "Issued March 21, 2024",
    description:
      "Credential demonstrating AutoCAD drafting and design fundamentals for technical drawings and CAD documentation.",
    // Credly embed did not initialize cleanly during testing.
    // Paste the public Credly verification URL here later to show a Verify Credential button.
    credentialUrl: null,
    fileUrl: "assets/certifications/autocad.pdf",
    credentialId: null,
    credlyBadgeId: null,
  },
];

const STATUS_LABEL = {
  earned: "Earned",
  progress: "In progress",
  planned: "Planned",
};

function certCardHTML(c) {
  const links = [];
  if (c.credentialUrl) links.push(`<a href="${c.credentialUrl}" target="_blank" rel="noopener">Verify Credential &rarr;</a>`);
  if (c.fileUrl) links.push(`<a href="${c.fileUrl}" target="_blank" rel="noopener">Download PDF &rarr;</a>`);

  const credentialId = c.credentialId
    ? `<p class="cert-meta">Credential ID: ${c.credentialId}</p>`
    : "";
  const credlyEmbed = c.credlyBadgeId
    ? `<div class="cert-badge" data-iframe-width="150" data-iframe-height="270" data-share-badge-id="${c.credlyBadgeId}" data-share-badge-host="https://www.credly.com"></div>`
    : "";

  return `
    <div class="cert-card reveal">
      <span class="cert-status ${c.status}"><span class="dot"></span>${STATUS_LABEL[c.status] || c.status}</span>
      <h3 class="cert-title">${c.title}</h3>
      <p class="cert-issuer">${c.issuer}</p>
      ${credentialId}
      <p class="cert-desc">${c.description}</p>
      ${credlyEmbed}
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
