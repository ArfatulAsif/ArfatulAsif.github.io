/* Research page: show / hide each publication's abstract. */
document.querySelectorAll(".pub-abs-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const abstract = button.closest(".pub").querySelector(".pub-abstract");
    abstract.hidden = !abstract.hidden;
  });
});
