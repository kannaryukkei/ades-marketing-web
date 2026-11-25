# ADES REDO v0.2 — R1 Divergent Design Lab

**Status:** R1 complete; three concepts source-checked and browser-rendered through the controlled `page.set_content` path. No direction selected.  
**PRD:** REDO v0.2, explicitly approved 2026-11-26.  
**Research Pack:** validated with limitations and frozen 2026-11-26.  
**Author:** the single operator-selected Lead / Execution Agent identity under `single_agent_end_to_end`; no additional author or jury.

## Concepts

1. **Concept 01 — Editorial Clarity**  
   [Open HTML](./concept-01-editorial-clarity.html)  
   Thesis: a calm, editorial studio journal. Ivory paper, forest green and clay; serif-led hierarchy; asymmetrical composition; offers presented as a typographic service index; measured pace and explanatory copy.

2. **Concept 02 — Signal and Structure**  
   [Open HTML](./concept-02-signal-and-structure.html)  
   Thesis: a high-contrast digital signal system. Near-black canvas, acid-lime and cobalt accents; oversized uppercase sans; monospaced system labels; modular offer rows and compact data-like service summary; decisive, technical rhythm.

3. **Concept 03 — Human-First Studio**  
   [Open HTML](./concept-03-human-first-studio.html)  
   Thesis: an approachable creative workshop. Warm cream, blue, coral, mint and yellow; rounded forms and layered illustration; friendly conversational copy; offer cards and collaborative process rhythm.

## Divergence validation

The concepts differ materially in:
- typography and typographic scale (serif editorial / oversized geometric sans / rounded humanist sans);
- colour/material system (paper/forest/clay / dark/acid/cobalt / cream/blue/coral/mint/yellow);
- composition and information grammar (editorial index / modular system grid / workshop cards and collage);
- copy tone and pacing (reflective / declarative / conversational).

All three retain the same approved facts, visitor journey, one-page scope, Custom inquiry boundary, Nusa Forma fictional-demo disclosure and WhatsApp destination. None is selected as-is or treated as the final direction.

## Browser and source validation

Renderer: Chromium 144.0.7559.96 via Playwright `page.set_content`; no external network or local HTTP navigation. Screenshots are generated locally under `/mnt/data/ades-r1-redo/evidence/` and are not production assets.

| Check | Concept 01 | Concept 02 | Concept 03 |
|---|---:|---:|---:|
| Exactly one H1 | PASS | PASS | PASS |
| Semantic main + labelled nav | PASS | PASS | PASS |
| CSSOM rules parsed | 81 | 86 | 84 |
| Internal anchors resolve | PASS | PASS | PASS |
| WhatsApp links use supplied URL | 3 | 3 | 3 |
| Unexpected external links/assets | None | None | None |
| Reduced-motion rule present | PASS | PASS | PASS |
| No horizontal overflow at 1440 / 1024 / 768 / 390 / 360 / 320 px | PASS | PASS | PASS |
| Mobile menu opens with aria-expanded | PASS | PASS | PASS |
| Escape closes menu and returns focus | PASS | PASS | PASS |
| FAQ opens with keyboard | PASS | PASS | PASS |
| JavaScript page errors | None | None | None |

Initial responsive checks found overflow in Concepts 02 and 03 at narrow widths. The sources were corrected before freeze: Concept 02's long CTA headline was shortened and constrained; Concept 03's decorative hero composition was clipped to its artboard. All viewport checks were rerun and passed. This is source/render evidence, not a full WCAG audit, cross-browser certification, performance audit or live WhatsApp endpoint test.

## Shared content / truth controls

- Starter: available; one page / landing page.
- Business: available; website with several pages. No additional deliverables promised.
- Custom: available for inquiry; feasibility, scope, price and timeline after consultation. No specific feature promise.
- Nusa Forma Studio: fictional internal concept/demo, not client work or proof.
- No testimonials, metrics, awards, client logos, prices or delivery guarantees invented.
- Public language remains undecided; Indonesian is used as provisional concept copy, with English labels selectively explored.

## Limitations

- Browser navigation to external sites and localhost is blocked in this runtime; the concepts were rendered from exact HTML through `page.set_content`.
- Visual references in the frozen Research Pack were inspected at page-text extraction level, not as live rendered websites.
- No image/media assets or third-party code were copied.
- This directory is the REDO-specific R1 set; previous-cycle `r1/*.html` files are historical and untouched.

