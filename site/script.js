(() => {
  "use strict";
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector(".site-header");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuSummary = mobileMenu?.querySelector("summary");

  // Sticky-header reading progress is orientation feedback only.
  let scrollQueued = false;
  const updateScrollState = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      header?.style.setProperty("--scroll-progress", String(progress));
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      scrollQueued = false;
    });
  };
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
  updateScrollState();

  // Native disclosure stays functional without JavaScript; this synchronizes accessible state.
  if (mobileMenu && menuSummary) {
    const syncMenuState = () => {
      menuSummary.setAttribute("aria-expanded", String(mobileMenu.open));
      menuSummary.setAttribute("aria-label", mobileMenu.open ? "Tutup navigasi" : "Buka navigasi");
    };
    mobileMenu.addEventListener("toggle", syncMenuState);
    syncMenuState();
    mobileMenu.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.open) {
        mobileMenu.open = false;
        syncMenuState();
        menuSummary.focus();
      }
    });
    mobileMenu.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.open = false;
        syncMenuState();
      });
    });
    document.addEventListener("pointerdown", (event) => {
      if (mobileMenu.open && !mobileMenu.contains(event.target)) {
        mobileMenu.open = false;
        syncMenuState();
      }
    });
  }

  // Reveal is progressive enhancement; content remains visible if motion/IO is unavailable.
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if (revealItems.length && !reduceMotion.matches && "IntersectionObserver" in window) {
    root.classList.add("js-enabled");
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = Math.min(index % 4 * 65, 195) + "ms";
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
