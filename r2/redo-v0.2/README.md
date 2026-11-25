# ADES REDO v0.2 — R2 Synthesis Candidate

**Status:** R2 candidate complete; awaiting mode-correct R3 self-assessment and explicit operator direction approval before R4.  
**PRD:** REDO v0.2, approved 2026-11-26.  
**Research Pack:** frozen 2026-11-26.  
**R1 set:** `../r1/redo-v0.2/` (three concepts; previous-cycle R1 files remain untouched).

## Candidate

- [Open synthesized HTML candidate](./ades-redo-synthesized.html)
- Working thesis: **“Website yang jelas, terarah, dan dibangun dengan tujuan.”**
- Direction: **Warm Editorial / Signal Architecture** — thoughtful, precise and human; editorial reading rhythm with a modular visual system.
- This is one R2 candidate, not an approved final direction or production build.

## Creative audit and synthesis

### Concept 01 — Editorial Clarity
- **Strongest:** clear first-screen message; distinctive serif hierarchy; restrained paper/forest/clay palette; service list is easy to scan; concept/demo disclosure is explicit.
- **Weakest:** visual language is conservative; the showcase is typographic rather than an immersive story; the hero's CTA could carry more visual weight.
- **Generic/lifeless risk:** process and FAQ are structurally familiar; small editorial labels can become too quiet at real viewing distance.
- **Retain/adapt:** editorial hierarchy, calm pacing, service index and clear disclosure.
- **Reject:** excessive quietness where a stronger visual anchor is needed.

### Concept 02 — Signal and Structure
- **Strongest:** most distinctive high-contrast identity; offer status and page-type logic are immediate; modular grid creates a clear information system.
- **Weakest:** all-caps density and acid contrast can tire; small monospaced labels and English section language reduce warmth/readability.
- **Generic/lifeless risk:** system-like process blocks can feel like a dashboard rather than a human studio.
- **Retain/adapt:** precise status labels, modular composition and disciplined information hierarchy.
- **Reject:** full dark-mode treatment, dense uppercase everywhere and overly technical tone.

### Concept 03 — Human-First Studio
- **Strongest:** approachable voice; warm colour; lively abstract art; package cards make the offer feel accessible; mobile stack is easy to follow.
- **Weakest:** multiple rounded cards, offset shadows and blobs can resemble a generic creative template; decoration competes with the proposition in places.
- **Generic/lifeless risk:** repeated card grammar can flatten section-to-section rhythm.
- **Retain/adapt:** human tone, approachable colour accents and tactile warmth.
- **Reject:** excessive rounded-card/shadow grammar and playful decoration without a content purpose.

### Post-R1 visual north-star
- Artifact: `/mnt/data/a_high_resolution_clean_editorial_website_landing.png`; generated 2026-11-26 with the available image-generation tool; generation ID `9df824f2-7684-4286-a241-e705914dd5ff`. Model/version not exposed.
- Inputs: approved PRD REDO v0.2, frozen Research Pack and the three completed R1 concepts.
- Rationale: make the ideal experience concrete after R1 without constraining divergent exploration; explore an editorial grid, warm paper/forest palette, saffron/blue signals, architectural collage and a clearly legible offer system.
- Limitations: generated visual only, not a live website or documentary evidence. The Nusa Forma imagery is synthetic concept art and must remain labelled as a fictional internal concept; do not imply client work or reuse the image as a cleared client asset. Some generated microcopy may be inaccurate; the approved PRD and verified facts remain authoritative.
- The north-star is an optional creative target, not a fourth concept or mandatory design. R2 may adapt or reject it.

## R2 synthesis decision

**Selected synthesis:** build on Concept 01's editorial clarity, strengthen its first viewport with a modular architectural composition informed by the post-R1 north-star, adopt Concept 02's explicit offer/status logic, and borrow Concept 03's human, approachable copy tone. Keep the result calm and legible rather than combining every visual motif.

### Complete art-direction contract

1. **Emotional intent:** assured, thoughtful, clear and approachable; communicate a studio with a considered process rather than an anonymous template.
2. **Design thesis:** clarity before build. Help visitors understand what ADES does, where each offer starts and how to initiate a conversation.
3. **Composition grammar:** asymmetric two-column hero with editorial message and modular abstract artwork; three offer cards; split concept showcase; four-step process; quiet FAQ; high-contrast final CTA. The page remains a single route.
4. **Typography:** expressive serif display for the proposition and section headings; neutral sans-serif for body and controls; compact uppercase labels only as secondary navigation. Microcopy sizes were increased during R2 source refinement.
5. **Colour/material:** warm paper `#f3f0e7`, deep forest `#234c3b`, saffron `#e8b64d`, muted blue `#496b9b`, ink `#1d3028`. Paper and restrained rules create calm; forest anchors primary actions; saffron/blue distinguish secondary visual modules.
6. **Image direction:** CSS-built geometric collage in hero; CSS-built typographic concept card for Nusa Forma. No documentary photography, client logo, external stock, remote font or third-party asset. Text-led service/process/FAQ sections are intentional because clarity is the visitor task. If future media is added, require provenance, rights and responsive crop review.
7. **Narrative / IA:** hero → offers → labelled internal concept → process → FAQ → WhatsApp CTA. Repeat the primary inquiry path without adding a form.
8. **Interaction:** anchor navigation; accessible mobile menu with `aria-expanded`, Escape close and focus return; native `details/summary` FAQ; WhatsApp anchors use the operator-supplied destination. No fake form, carousel or simulated submission.
9. **Motion:** intentionally static. No scroll reveal, parallax or auto-animation; respect `prefers-reduced-motion`. Motion is not needed to understand the content.
10. **Responsive art direction:** desktop uses split hero and three offer columns; tablet tightens the hero and changes process grid; mobile changes hero to one column, offers/process to vertical stacks and keeps the abstract collage inside its frame. Verified at 1440, 1024, 768, 390, 360 and 320 px widths.
11. **Accessibility / performance:** semantic header/nav/main/sections, one H1, labelled navigation, visible focus, keyboard menu and FAQ, no remote assets/dependencies, no horizontal overflow in tested widths, no runtime page errors. This is not a complete WCAG or performance audit.

## R2 source and browser evidence

- Source: `ades-redo-synthesized.html`, standalone HTML/CSS/vanilla JS; no build tool, framework, external font, CDN, image request or dependency.
- Renderer: Chromium 144.0.7559.96 via Playwright `page.set_content`.
- Viewports tested: 1440×1000, 1024×900, 768×1024, 390×844, 360×800 and 320×800; no horizontal overflow.
- Structure: exactly one H1, one main, one labelled nav; internal anchors resolve; three WhatsApp links use the supplied destination; no other external links.
- Interaction: mobile menu opens; Escape closes and returns focus; FAQ opens with keyboard; reduced-motion mode resolves to non-smooth scrolling; no JavaScript page errors.
- Screenshots: `/mnt/data/ades-r1-redo/evidence/r2-synthesized-desktop.png` and `/mnt/data/ades-r1-redo/evidence/r2-synthesized-mobile.png`. Local evidence only; no production URL or network-hosted browser test.
- Limitation: browser external/local HTTP navigation remains blocked. The candidate was rendered from its source through the controlled content path, not from a deployed server.

## Retain / reject rationale

- **Retain:** PRD visitor journey; clear three-offer explanation; single WhatsApp conversion path; truthful concept disclosure; process explanation; one-page static-first boundary; warm editorial composition and responsive hierarchy.
- **Reject:** unverified client proof; public NARA Objects use until rights are verified; Nusa Forma screenshot as documentary evidence; localhost iframe; invented pricing/timelines/features; full dark dashboard aesthetic; excessive playful cards; unnecessary libraries, remote fonts and motion.
- **Highest-value change for memorability:** a distinctive modular hero that makes the ADES method visible before the visitor reaches the package comparison, without relying on unsupported proof.
- **Most generic element to keep improving:** FAQ and process remain familiar patterns; R4 should add section-specific art direction only if it improves comprehension, not decoration.

## Decision boundary

This R2 candidate has not been selected by an independent panel; the project is `single_agent_end_to_end`. R3 must be recorded as a clearly labelled **non-independent self-assessment**, not a jury verdict. The operator must explicitly approve the material direction before R4. No production edits, spending, third-party contact, DNS, deployment or public release are authorized by this candidate.
