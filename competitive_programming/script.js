/* Competitive Programming page: filter the contest results by type. */
const resultFilters = Array.from(document.querySelectorAll(".result-filter"));
const results = Array.from(document.querySelectorAll(".result"));

// Show how many results each filter has; hide filters with none.
resultFilters.forEach((button) => {
  const category = button.dataset.category;
  const count = category === "all" ? results.length : results.filter((r) => r.dataset.category === category).length;
  button.querySelector(".result-count").textContent = count;
  if (count === 0) button.hidden = true;
});

resultFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    resultFilters.forEach((b) => {
      const active = b === button;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    results.forEach((result) => {
      result.hidden = category !== "all" && result.dataset.category !== category;
    });
  });
});
