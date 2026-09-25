/* Projects page: filter project cards by tag. */
const filterButtons = document.querySelectorAll(".project-filters button");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((b) => b.classList.toggle("is-active", b === button));
    projects.forEach((project) => {
      const tags = project.dataset.tags.split(" ");
      project.hidden = filter !== "all" && !tags.includes(filter);
    });
  });
});
