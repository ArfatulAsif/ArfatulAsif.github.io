/* Teaching page: show a thumbnail for each video and only load the YouTube
   player when it is clicked (keeps the page fast and avoids YouTube cookies). */
document.querySelectorAll(".video-frame[data-video]").forEach((button) => {
  button.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1&rel=0`;
    iframe.title = button.getAttribute("aria-label").replace(/^Play: /, "");
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    // Swap the button for a plain frame holding the player
    const frame = document.createElement("div");
    frame.className = "video-frame";
    frame.appendChild(iframe);
    button.replaceWith(frame);
    iframe.focus();
  });
});
