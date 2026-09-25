/* =========================================================
   Shared site script (loaded by every page)
   - Builds the top navigation tabs and footer
   - Mobile menu toggle
   - Light / dark theme toggle
   ========================================================= */

// Edit this list to add, remove or rename tabs. `path` is relative to the site root.
const SITE_NAME = { first: "Arfatul Islam", last: "Asif" };

const TABS = [
  { id: "about", label: "About", path: "index.html" },
  { id: "research", label: "Research", path: "my_research/index.html" },
  { id: "skills", label: "Skills", path: "skills/index.html" },
  { id: "experiences", label: "Experiences", path: "experiences/index.html" },
  { id: "cp", label: "Competitive Programming", path: "competitive_programming/index.html" },
  { id: "projects", label: "Projects", path: "projects/index.html" },
  { id: "teaching", label: "Teaching", path: "teaching/index.html" },
  { id: "travels", label: "Travels", path: "my_travels/index.html" },
  { id: "achievements", label: "Achievements", path: "achievements/index.html" },
];

// Each page sets <body data-page="..." data-root="...">.
// data-root is "" for index.html and "../" for pages inside a folder.
const ROOT = document.body.dataset.root || "";
const CURRENT_PAGE = document.body.dataset.page || "about";

/* ---------- Theme ---------- */
function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    /* storage unavailable: theme just won't be remembered */
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = document.querySelector("#theme-toggle i");
  if (icon) icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(getStoredTheme() || (prefersDark ? "dark" : "light"));

/* ---------- Header ---------- */
function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const links = TABS.map((tab) => {
    const current = tab.id === CURRENT_PAGE ? ' aria-current="page"' : "";
    return `<li><a href="${ROOT}${tab.path}"${current}>${tab.label}</a></li>`;
  }).join("");

  header.className = "site-header";
  header.innerHTML = `
    <nav class="nav" aria-label="Main">
      <a class="nav-brand" href="${ROOT}index.html">${SITE_NAME.first} <strong>${SITE_NAME.last}</strong></a>
      <div class="nav-actions">
        <ul class="nav-links" id="nav-links">${links}</ul>
        <button class="icon-btn" id="theme-toggle" type="button" aria-label="Toggle dark mode">
          <i class="fa-solid fa-moon"></i>
        </button>
        <button class="icon-btn nav-toggle" id="nav-toggle" type="button"
                aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>`;

  const toggle = document.getElementById("nav-toggle");
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("i").className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  });

  applyTheme(document.documentElement.getAttribute("data-theme"));
}

/* ---------- Footer ---------- */
function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  footer.className = "site-footer";
  footer.innerHTML = `&copy; ${new Date().getFullYear()} ${SITE_NAME.first} ${SITE_NAME.last}`;
}

/* ---------- Profile photo fallback (About page) ---------- */
function setupProfilePhoto() {
  const photo = document.querySelector(".profile-photo");
  if (!photo) return;

  const showInitials = () => {
    const fallback = document.createElement("div");
    fallback.className = "profile-photo-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent = "AIA";
    photo.replaceWith(fallback);
  };

  if (photo.complete && photo.naturalWidth === 0) showInitials();
  else photo.addEventListener("error", showInitials);
}

renderHeader();
renderFooter();
setupProfilePhoto();
