/* Achievements page:
   - filter by category (empty years are hidden)
   - alternate between an achievement's images
   - open images full size */

const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Filters ---------- */
const filterButtons = Array.from(document.querySelectorAll(".ach-filter"));
const items = Array.from(document.querySelectorAll(".ach-item"));
const years = Array.from(document.querySelectorAll(".ach-year"));

function updateYearCounts() {
  years.forEach((year) => {
    const visible = year.querySelectorAll(".ach-item:not([hidden])").length;
    year.hidden = visible === 0;
    year.querySelector(".ach-year-count").textContent = visible;
  });
}

filterButtons.forEach((button) => {
  const category = button.dataset.category;
  const count = category === "all" ? items.length : items.filter((i) => i.dataset.category === category).length;
  button.querySelector(".ach-count").textContent = count;
  if (count === 0) button.hidden = true;

  button.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      const active = b === button;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    items.forEach((i) => {
      i.hidden = category !== "all" && i.dataset.category !== category;
    });
    updateYearCounts();
  });
});

updateYearCounts();

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
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (viewerGallery && viewerGallery.slides.length > 1) {
    if (event.key === "ArrowLeft") stepViewer(-1);
    if (event.key === "ArrowRight") stepViewer(1);
  }
});
lightbox.addEventListener("close", () => {
  if (viewerGallery) showSlide(viewerGallery, viewerIndex);
});

/* ---------- Alternating images ---------- */
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

document.querySelectorAll(".ach-media").forEach((media) => {
  const frame = media.querySelector(".ach-frame");
  if (!frame) return; // no photo: the placing is shown instead

  const gallery = { media, slides: Array.from(frame.querySelectorAll("img")), index: 0, visible: true, paused: false };
  galleries.push(gallery);
  frame.addEventListener("click", () => openViewer(gallery));

  if (gallery.slides.length < 2) return;

  const dots = document.createElement("div");
  dots.className = "ach-dots";
  gallery.slides.forEach((img, n) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "ach-dot";
    dot.setAttribute("aria-label", `Show image ${n + 1} of ${gallery.slides.length}`);
    dot.addEventListener("click", () => showSlide(gallery, n));
    dots.appendChild(dot);
  });
  media.appendChild(dots);
  gallery.dots = Array.from(dots.children);
  showSlide(gallery, 0);

  media.addEventListener("mouseenter", () => (gallery.paused = true));
  media.addEventListener("mouseleave", () => (gallery.paused = false));
  media.addEventListener("focusin", () => (gallery.paused = true));
  media.addEventListener("focusout", () => (gallery.paused = false));
});

if (!reduceMotion) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const gallery = galleries.find((g) => g.media === entry.target);
        if (gallery) gallery.visible = entry.isIntersecting;
      });
    }, { threshold: 0.3 });
    galleries.forEach((g) => observer.observe(g.media));
  }

  // Stagger the start so neighbouring items don't all change at once.
  galleries
    .filter((g) => g.slides.length > 1)
    .forEach((gallery, n) => {
      setTimeout(() => {
        setInterval(() => {
          if (gallery.paused || !gallery.visible || lightbox.open) return;
          const next = gallery.slides[(gallery.index + 1) % gallery.slides.length];
          if (next.complete && next.naturalWidth > 0) showSlide(gallery, gallery.index + 1);
        }, 2000);
      }, n * 500);
    });
}
