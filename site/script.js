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


  // FAQ: measured WAAPI motion in both directions, with interruption-safe reversal.
  const faqList = document.querySelector(".faq-list");
  if (faqList) {
    const faqStates = new WeakMap();
    const faqItems = [...faqList.querySelectorAll("details")];
    const syncFAQ = (details, expanded) => {
      const summary = details.querySelector("summary");
      if (summary) summary.setAttribute("aria-expanded", String(expanded));
    };

    faqItems.forEach((details) => {
      const answer = details.querySelector(":scope > .faq-answer");
      if (!answer) return;
      syncFAQ(details, details.open);
      answer.style.height = details.open ? "auto" : "0px";
      answer.style.opacity = details.open ? "1" : "0";
    });
    root.classList.add("faq-motion-ready");

    const setFinalState = (details, answer, expanded) => {
      details.open = expanded;
      answer.style.height = expanded ? "auto" : "0px";
      answer.style.opacity = expanded ? "1" : "0";
      syncFAQ(details, expanded);
      faqStates.delete(details);
    };

    const animateFAQ = (details) => {
      const answer = details.querySelector(":scope > .faq-answer");
      if (!answer) return;
      const previous = faqStates.get(details);
      const targetOpen = previous ? !previous.targetOpen : !details.open;
      const fromHeight = answer.getBoundingClientRect().height;
      const fromOpacity = Number.parseFloat(getComputedStyle(answer).opacity) || 0;
      if (previous?.animation) previous.animation.cancel();
      if (targetOpen && !details.open) details.open = true;
      const toHeight = targetOpen ? answer.scrollHeight : 0;

      if (reduceMotion.matches || typeof answer.animate !== "function") {
        setFinalState(details, answer, targetOpen);
        return;
      }

      answer.style.height = `${fromHeight}px`;
      answer.style.opacity = String(fromOpacity);
      syncFAQ(details, targetOpen);
      const distance = Math.abs(toHeight - fromHeight);
      const duration = Math.min(620, Math.max(260, 250 + distance * 0.16));
      const animation = answer.animate(
        [{ height: `${fromHeight}px`, opacity: fromOpacity },
         { height: `${toHeight}px`, opacity: targetOpen ? 1 : 0 }],
        { duration, easing: "cubic-bezier(.22,.68,0,1.02)", fill: "forwards" }
      );
      faqStates.set(details, { animation, targetOpen });
      animation.onfinish = () => {
        if (faqStates.get(details)?.animation !== animation) return;
        setFinalState(details, answer, targetOpen);
        animation.cancel();
      };
    };

    faqList.addEventListener("click", (event) => {
      const summary = event.target.closest("summary");
      if (!summary || !faqList.contains(summary)) return;
      const details = summary.parentElement;
      if (!(details instanceof HTMLDetailsElement)) return;
      event.preventDefault();
      animateFAQ(details);
    });
  }

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
