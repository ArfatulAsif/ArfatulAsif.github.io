/* Skills page: show whether the certification is still active,
   based on the dates on the card (data-issued / data-expires). */
document.querySelectorAll(".cert-card[data-expires]").forEach((card) => {
  const status = card.querySelector(".cert-status");
  const expires = new Date(`${card.dataset.expires}T23:59:59`);
  if (!status || Number.isNaN(expires.getTime())) return;

  const expired = Date.now() > expires.getTime();
  status.textContent = expired ? "Expired" : "Active";
  status.classList.toggle("is-expired", expired);
});
