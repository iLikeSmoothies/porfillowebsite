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
    const backdrop = document.createElement("button");
    backdrop.className = "nav-backdrop";
    backdrop.type = "button";
    backdrop.setAttribute("aria-label", "Close navigation menu");
    document.body.appendChild(backdrop);

    const setMobileMenuTop = () => {
      const header = document.querySelector(".site-header");
      if (header) document.documentElement.style.setProperty("--nav-menu-top", `${header.offsetHeight}px`);
    };
    const closeMenu = () => {
      links.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      setMobileMenuTop();
      const open = links.classList.toggle("open");
      backdrop.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    backdrop.addEventListener("click", closeMenu);
    window.addEventListener("resize", setMobileMenuTop, { passive: true });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeMenu)
    );
  }

  /* Highlight current nav link */
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "project.html" && href === "projects.html") || (path === "" && href === "index.html")) {
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

  /* Expand project images without leaving the page. */
  const zoomButtons = document.querySelectorAll("[data-lightbox]");
  if (zoomButtons.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Expanded project image");
    lightbox.innerHTML = `
      <button class="image-lightbox-close" type="button" aria-label="Close expanded image">&times;</button>
      <div class="image-lightbox-panel">
        <img alt="" />
        <p class="image-lightbox-caption"></p>
      </div>
    `;
    document.body.appendChild(lightbox);

    const image = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".image-lightbox-caption");
    const close = () => {
      lightbox.classList.remove("open");
      document.body.classList.remove("lightbox-open");
    };

    zoomButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const thumb = button.querySelector("img");
        image.src = button.dataset.lightbox;
        image.alt = thumb ? thumb.alt : "";
        caption.textContent = button.dataset.lightboxCaption || "";
        lightbox.classList.add("open");
        document.body.classList.add("lightbox-open");
      });
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox || event.target.closest(".image-lightbox-close")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) close();
    });
  }

  /* Show a clean fallback when an optional image has not been added yet. */
  document.querySelectorAll("[data-optional-image] img").forEach((img) => {
    const frame = img.closest("[data-optional-image]");
    const fallback = frame ? frame.querySelector(".profile-fallback") : null;
    const showFallback = () => {
      img.hidden = true;
      if (fallback) fallback.hidden = false;
    };
    img.addEventListener("error", showFallback);
    if (img.complete && img.naturalWidth === 0) showFallback();
  });

  /* Netlify form AJAX submission (progressive enhancement) */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => {
          contactForm.style.display = "none";
          const success = document.querySelector(".form-success");
          if (success) success.classList.add("show");
        })
        .catch(() => {
          contactForm.querySelector(".form-note").textContent =
            "Something went wrong sending this. Please email me directly instead.";
        });
    });
  }
})();
