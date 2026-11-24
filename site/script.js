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


  // Keep native details/summary semantics, but animate measured answer height.
  // The summary click is intercepted so the panel stays renderable during close.
  const faqItems = [...document.querySelectorAll(".faq-list details")];
  const faqAnimations = new WeakMap();
  const faqExpanded = new WeakMap();
  const faqGeneration = new WeakMap();
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
    faqExpanded.set(details, details.open);
    answer.style.height = details.open ? "auto" : "0px";
    answer.style.opacity = details.open ? "1" : "0";

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      const shouldOpen = !faqExpanded.get(details);
      faqExpanded.set(details, shouldOpen);
      const generation = (faqGeneration.get(details) || 0) + 1;
      faqGeneration.set(details, generation);

      // Preserve the exact in-flight visual height before cancelling an older animation.
      const currentHeight = answer.getBoundingClientRect().height;
      const currentOpacity = Number.parseFloat(getComputedStyle(answer).opacity) || 0;
      const previous = faqAnimations.get(details);
      if (previous) previous.cancel();

      if (shouldOpen) details.open = true;
      answer.style.height = `${currentHeight}px`;
      answer.style.opacity = String(currentOpacity);

      if (reduceMotion.matches || typeof answer.animate !== "function") {
        details.open = shouldOpen;
        answer.style.height = shouldOpen ? "auto" : "0px";
        answer.style.opacity = shouldOpen ? "1" : "0";
        return;
      }

      requestAnimationFrame(() => {
        if (faqGeneration.get(details) !== generation) return;
        const from = answer.getBoundingClientRect().height;
        const to = shouldOpen ? answer.scrollHeight : 0;
        const animation = answer.animate(
          [{ height: `${from}px`, opacity: currentOpacity }, { height: `${to}px`, opacity: shouldOpen ? 1 : 0 }],
          { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" }
        );
        faqAnimations.set(details, animation);
        animation.onfinish = () => {
          if (faqGeneration.get(details) !== generation || faqExpanded.get(details) !== shouldOpen) return;
          faqAnimations.delete(details);
          details.open = shouldOpen;
          answer.style.height = shouldOpen ? "auto" : "0px";
          answer.style.opacity = shouldOpen ? "1" : "0";
        };
      });
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
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${(index % 3) * 40}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
