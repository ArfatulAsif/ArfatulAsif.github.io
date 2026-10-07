/* Experience page: work out each duration from its dates, LinkedIn style
   (both the first and last month count), so "Present" roles stay current. */

function parseMonth(value) {
  if (value === "present") {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function formatDuration(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ") || "1 mo";
}

document.querySelectorAll(".xp-duration[data-start][data-end]").forEach((el) => {
  const start = parseMonth(el.dataset.start);
  const end = parseMonth(el.dataset.end);
  const total = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (Number.isFinite(total) && total > 0) el.textContent = formatDuration(total);
});
