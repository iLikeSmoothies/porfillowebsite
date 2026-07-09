/* ============================================================
   Shared site behavior: nav, scroll reveal, active link,
   scroll progress. Loaded on every page.
   ============================================================ */

(function () {
  "use strict";

  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* Highlight current nav link */
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* Scroll-triggered reveal animations */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Scroll progress bar */
  const bar = document.querySelector(".scroll-progress");
  if (bar) {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : "0%";
    };
    document.addEventListener("scroll", update, { passive: true });
    update();
  }
})();
