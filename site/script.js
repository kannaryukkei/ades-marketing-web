(() => {
  "use strict";
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menu = document.querySelector(".mobile-menu");
  const summary = menu?.querySelector("summary");

  if (menu && summary) {
    const sync = () => {
      summary.setAttribute("aria-expanded", String(menu.open));
      summary.setAttribute("aria-label", menu.open ? "Tutup navigasi" : "Buka navigasi");
    };
    menu.addEventListener("toggle", sync);
    sync();
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.open) {
        event.preventDefault();
        menu.open = false;
        sync();
        summary.focus();
      }
    }, true);
    menu.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      menu.open = false;
      sync();
    });
    document.addEventListener("pointerdown", (event) => {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
        sync();
      }
    });
  }

  // A moving ticker is optional decoration: provide a persistent pause control.
  const ticker = document.querySelector(".ticker");
  const tickerToggle = ticker?.querySelector(".ticker-toggle");
  if (ticker && tickerToggle) {
    tickerToggle.addEventListener("click", () => {
      const paused = ticker.classList.toggle("is-paused");
      tickerToggle.setAttribute("aria-pressed", String(paused));
      tickerToggle.setAttribute("aria-label", paused ? "Lanjutkan gerak teks" : "Jeda gerak teks");
      tickerToggle.innerHTML = paused ? 'LANJUT <span aria-hidden="true">▶</span>' : 'JEDA <span aria-hidden="true">Ⅱ</span>';
    });
  }

  // Mark the section currently occupying the reading position.
  const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-menu nav a')];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-28% 0px -58% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }


  // Smooth FAQ disclosure with interruption-safe height animation.
  const faqItems = [...document.querySelectorAll(".faq-list details")];
  faqItems.forEach((details) => {
    const summary = details.querySelector("summary");
    const content = [...details.children].filter((node) => node !== summary);
    if (!summary || !content.length) return;

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    const inner = document.createElement("div");
    inner.className = "faq-answer-inner";
    content.forEach((node) => inner.append(node));
    answer.append(inner);
    details.append(answer);

    let activeAnimation = null;
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      const currentHeight = answer.getBoundingClientRect().height;
      if (activeAnimation) activeAnimation.cancel();
      answer.style.height = currentHeight + "px";

      const opening = !details.open;
      if (opening) details.open = true;
      const from = currentHeight;
      const to = opening ? inner.scrollHeight : 0;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduced ? 0 : 520;

      activeAnimation = answer.animate(
        [{ height: from + "px", opacity: opening ? 0.72 : 1 },
         { height: to + "px", opacity: opening ? 1 : 0.72 }],
        { duration, easing: "cubic-bezier(.2,.72,.2,1)", fill: "forwards" }
      );
      activeAnimation.onfinish = () => {
        if (!opening) details.open = false;
        answer.style.height = "";
        answer.style.opacity = "";
        activeAnimation = null;
      };
    });
  });

  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if (!reduceMotion.matches && "IntersectionObserver" in window && revealItems.length) {
    root.classList.add("js-ready");
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${(index % 3) * 65}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
