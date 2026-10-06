/* Research page:
   - filter research by domain (sidebar or the domain buttons on each card)
   - alternate between images when a research item has several
   - open images full size in a viewer */

const items = Array.from(document.querySelectorAll(".research-item, .supervision-item"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const filterButtons = Array.from(document.querySelectorAll(".domain-filter"));
const filterStatus = document.querySelector(".filter-status");
const researchMain = document.querySelector(".research-main");
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const domainsOf = (el) => (el.dataset.domains || "").split(/\s+/).filter(Boolean);

/* ---------- Domain filter ---------- */
function domainLabel(domain) {
  const button = filterButtons.find((b) => b.dataset.domain === domain);
  return button ? button.querySelector(".domain-name").textContent : domain;
}

// Count each domain once; hide domains that have no work.
filterButtons.forEach((button) => {
  const domain = button.dataset.domain;
  const count = domain === "all" ? items.length : items.filter((el) => domainsOf(el).includes(domain)).length;
  button.querySelector(".domain-count").textContent = count;
  if (count === 0) button.parentElement.hidden = true;
});

function applyFilter(domain, { scroll = false } = {}) {
  if (!filterButtons.some((b) => b.dataset.domain === domain)) domain = "all";

  let shown = 0;
  items.forEach((el) => {
    const match = domain === "all" || domainsOf(el).includes(domain);
    el.hidden = !match;
    if (match) shown++;
  });

  // Hide empty sections and keep every count in sync with what is visible.
  sections.forEach((section) => {
    const visible = section.querySelectorAll(".research-item:not([hidden]), .supervision-item:not([hidden])").length;
    section.hidden = visible === 0;
    section.querySelector(".section-count").textContent = visible;

    const link = document.querySelector(`[data-section-link="${section.dataset.section}"]`);
    if (link) {
      link.querySelector(".section-count").textContent = visible;
      link.classList.toggle("is-empty", visible === 0);
    }
  });

  filterButtons.forEach((b) => {
    const active = b.dataset.domain === domain;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", String(active));
  });

  filterStatus.hidden = domain === "all";
  if (domain !== "all") {
    filterStatus.querySelector(".filter-count").textContent = `${shown} ${shown === 1 ? "work" : "works"}`;
    const name = filterStatus.querySelector(".filter-name");
    name.textContent = domainLabel(domain);
    name.className = `filter-name domain-chip domain--${domain}`;
  }

  // Keep the filter in the address bar so a filtered view can be shared.
  try {
    const url = new URL(window.location.href);
    if (domain === "all") url.searchParams.delete("domain");
    else url.searchParams.set("domain", domain);
    history.replaceState(null, "", url);
  } catch (e) {
    /* e.g. opened from a file: the filter still works, it just isn't in the URL */
  }

  // If the list starts above the screen, bring its top back into view.
  if (scroll && researchMain.getBoundingClientRect().top < 0) {
    researchMain.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.domain, { scroll: true }));
});

document.querySelectorAll(".domain-chip[data-domain]").forEach((chip) => {
  chip.addEventListener("click", () => applyFilter(chip.dataset.domain, { scroll: true }));
});

filterStatus.querySelector(".filter-clear").addEventListener("click", () => applyFilter("all"));

// Links to another item on this page (Dataset, Related, Sections): clear the
// filter first if it is hiding the target.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (target && target.closest("[hidden]")) applyFilter("all");
  });
});

applyFilter(new URLSearchParams(window.location.search).get("domain") || "all");

/* ---------- Image viewer ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
let viewerGallery = null;
let viewerIndex = 0;

function renderViewer() {
  const slide = viewerGallery.slides[viewerIndex];
  lightboxImg.src = slide.currentSrc || slide.src;
  lightboxImg.alt = slide.alt;
  const total = viewerGallery.slides.length;
  lightboxCaption.textContent = total > 1 ? `${slide.alt} (${viewerIndex + 1}/${total})` : slide.alt;
}

function openViewer(gallery) {
  viewerGallery = gallery;
  viewerIndex = gallery.index;
  lightbox.classList.toggle("is-single", gallery.slides.length < 2);
  renderViewer();
  if (typeof lightbox.showModal === "function") lightbox.showModal();
  else window.open(lightboxImg.src, "_blank", "noopener");
}

function stepViewer(delta) {
  const total = viewerGallery.slides.length;
  viewerIndex = (viewerIndex + delta + total) % total;
  renderViewer();
}

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => stepViewer(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => stepViewer(1));

// Clicking the dark area around the image closes the viewer.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener("keydown", (event) => {
  if (viewerGallery && viewerGallery.slides.length > 1) {
    if (event.key === "ArrowLeft") stepViewer(-1);
    if (event.key === "ArrowRight") stepViewer(1);
  }
});

// When the viewer closes, leave the card showing the image you stopped on.
lightbox.addEventListener("close", () => {
  if (viewerGallery) showSlide(viewerGallery, viewerIndex);
});

/* ---------- Alternating images on each card ---------- */
const galleries = [];

function showSlide(gallery, index) {
  const total = gallery.slides.length;
  gallery.index = (index + total) % total;
  gallery.slides.forEach((img, n) => img.classList.toggle("is-active", n === gallery.index));
  if (gallery.dots) {
    gallery.dots.forEach((dot, n) => {
      dot.classList.toggle("is-active", n === gallery.index);
      dot.setAttribute("aria-current", n === gallery.index ? "true" : "false");
    });
  }
}

document.querySelectorAll(".research-media").forEach((media) => {
  const frame = media.querySelector(".media-frame");
  if (!frame) return; // icon placeholder, no images

  const gallery = { media, slides: Array.from(frame.querySelectorAll("img")), index: 0, visible: true, paused: false };
  galleries.push(gallery);
  frame.addEventListener("click", () => openViewer(gallery));

  if (gallery.slides.length < 2) return;

  // Dots under the image to jump between pictures
  const dots = document.createElement("div");
  dots.className = "media-dots";
  gallery.slides.forEach((img, n) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "media-dot";
    dot.setAttribute("aria-label", `Show image ${n + 1} of ${gallery.slides.length}`);
    dot.addEventListener("click", () => showSlide(gallery, n));
    dots.appendChild(dot);
  });
  media.appendChild(dots);
  gallery.dots = Array.from(dots.children);
  showSlide(gallery, 0);

  // Hold still while the visitor is looking closely
  media.addEventListener("mouseenter", () => (gallery.paused = true));
  media.addEventListener("mouseleave", () => (gallery.paused = false));
  media.addEventListener("focusin", () => (gallery.paused = true));
  media.addEventListener("focusout", () => (gallery.paused = false));
});

if (!reduceMotion) {
  // Only rotate cards that are on screen.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const gallery = galleries.find((g) => g.media === entry.target);
        if (gallery) gallery.visible = entry.isIntersecting;
      });
    }, { threshold: 0.3 });
    galleries.forEach((g) => observer.observe(g.media));
  }

  // Stagger the start so neighbouring cards don't all change at once.
  galleries
    .filter((g) => g.slides.length > 1)
    .forEach((gallery, n) => {
      setTimeout(() => {
        setInterval(() => {
          if (gallery.paused || !gallery.visible || lightbox.open) return;
          // Wait until the next picture has loaded, so the frame never goes blank.
          const next = gallery.slides[(gallery.index + 1) % gallery.slides.length];
          if (next.complete && next.naturalWidth > 0) showSlide(gallery, gallery.index + 1);
        }, 3500);
      }, n * 900);
    });
}
