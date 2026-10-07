/* Travel story script, shared by every story in my_travels/<trip>/.
   - click a photo to see it full size; arrow keys move through every photo on the page
   - highlights the current day in "On this page" while you scroll */

/* ---------- Photo viewer ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const photos = Array.from(document.querySelectorAll(".story-photo img"));
let current = 0;

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  const img = photos[current];
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = `${img.alt} (${current + 1}/${photos.length})`;
}

photos.forEach((img, index) => {
  img.closest(".story-photo").addEventListener("click", () => {
    showPhoto(index);
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else window.open(img.src, "_blank", "noopener");
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(current - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(current + 1));

// Clicking the dark area around the photo closes the viewer.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPhoto(current - 1);
  if (event.key === "ArrowRight") showPhoto(current + 1);
});

/* ---------- "On this page": highlight the section being read ---------- */
const tocLinks = Array.from(document.querySelectorAll(".post-toc a"));
const sections = tocLinks
  .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
  .filter(Boolean);

function setActive(id) {
  tocLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
}

if ("IntersectionObserver" in window && sections.length) {
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    // the first section (in page order) that is on screen
    const first = sections.find((section) => visible.has(section));
    if (first) setActive(first.id);
  }, { rootMargin: "-80px 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}
