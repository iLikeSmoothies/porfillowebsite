/* ============================================================
   Renders certification cards on certifications.html and the
   preview grid on index.html.

   HOW TO UPDATE
   -------------
   - Set "status" to "earned", "progress", or "planned" as you
     move through each certification.
   - Set "credentialUrl" to the certificate's official verification
     link once issued (e.g. a Certiport or Credly URL).
   - Set "fileUrl" to a path to your certificate PDF once you have
     one, e.g. "assets/certifications/cswa-mechanical-design.pdf"
     (create the assets/certifications/ folder when you add a file).
   ============================================================ */

const CERTIFICATIONS = [
  {
    title: "CSWA — Mechanical Design",
    issuer: "SOLIDWORKS (Dassault Systèmes)",
    status: "planned", // update to "progress" or "earned" as you move through it
    date: "[Add date once earned]",
    description:
      "Certified SOLIDWORKS Associate — Mechanical Design. Validates core skills in parametric part and assembly modeling, drawings, and mechanical design fundamentals.",
    credentialUrl: null,
    fileUrl: null,
  },
  {
    title: "Autodesk AutoCAD Certified User",
    issuer: "Autodesk / Certiport",
    status: "planned", // update to "progress" or "earned" as you move through it
    date: "[Add date once earned]",
    description:
      "Autodesk Certified User: AutoCAD. Validates fundamental skills in 2D drafting, drawing setup, and CAD documentation using AutoCAD.",
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
