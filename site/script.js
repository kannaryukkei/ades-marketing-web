(() => {
  const menu = document.querySelector(".mobile-menu");
  if (!menu) return;
  const summary = menu.querySelector("summary");

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      summary.focus();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.open = false;
    });
  });
})();
