/* Projects page:
   - filter projects by tag
   - "Read more" for long descriptions
   - alternate between a project's images, and open them full size */

const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Filters ---------- */
const filterButtons = Array.from(document.querySelectorAll(".project-filter"));
const projects = Array.from(document.querySelectorAll(".project"));
const tagsOf = (el) => (el.dataset.tags || "").split(/\s+/).filter(Boolean);

filterButtons.forEach((button) => {
  const filter = button.dataset.filter;
  const count = filter === "all" ? projects.length : projects.filter((p) => tagsOf(p).includes(filter)).length;
  button.querySelector(".filter-count").textContent = count;
  if (count === 0) button.hidden = true;

  button.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      const active = b === button;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    projects.forEach((p) => {
      p.hidden = filter !== "all" && !tagsOf(p).includes(filter);
    });
    updateReadMore();
  });
});

/* ---------- Read more ---------- */
function updateReadMore() {
  document.querySelectorAll(".project-desc").forEach((desc) => {
    const button = desc.nextElementSibling;
    if (!button || !button.classList.contains("project-more")) return;
    if (desc.classList.contains("is-expanded")) return;
    button.hidden = desc.scrollHeight <= desc.clientHeight + 1;
  });
}

document.querySelectorAll(".project-more").forEach((button) => {
  button.addEventListener("click", () => {
    const desc = button.previousElementSibling;
    const expanded = desc.classList.toggle("is-expanded");
    button.textContent = expanded ? "Show less" : "Read more";
  });
});

window.addEventListener("load", updateReadMore);
window.addEventListener("resize", updateReadMore);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateReadMore);
updateReadMore();

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

document.querySelectorAll(".project-media").forEach((media) => {
  const frame = media.querySelector(".media-frame");
  const gallery = { media, slides: Array.from(frame.querySelectorAll("img")), index: 0, visible: true, paused: false };
  galleries.push(gallery);
  frame.addEventListener("click", () => openViewer(gallery));

  if (gallery.slides.length < 2) return;

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

  // Stagger the start so neighbouring cards don't all change at once.
  galleries
    .filter((g) => g.slides.length > 1)
    .forEach((gallery, n) => {
      setTimeout(() => {
        setInterval(() => {
          if (gallery.paused || !gallery.visible || lightbox.open) return;
          const next = gallery.slides[(gallery.index + 1) % gallery.slides.length];
          if (next.complete && next.naturalWidth > 0) showSlide(gallery, gallery.index + 1);
        }, 2000);
      }, n * 600);
    });
}
