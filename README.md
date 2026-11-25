# ADES MARKETING WEB

ADES marketing website — internal studio-development REDO. Approved direction: Warm Editorial / Signal Architecture (R2, operator-approved 2026-11-26). Product boundary: ADES Starter v0.1.0; one static-first page.

## Current project state

- Website repository: https://github.com/kannaryukkei/ades-marketing-web
- Website source and intended static publish directory: `site/` (do not publish the repository root; it contains the active Project Brief and internal R1/R2 exploration records).
- Stack: static HTML, CSS and vanilla JavaScript. No package manager, build step, backend, database, CMS, analytics or form submission.
- Primary visitor action: operator-confirmed WhatsApp link `https://wa.me/6281246027946`.
- Current offers: Starter available (one page / landing page); Business available (multi-page website; page count is the only confirmed distinction); Custom open for inquiry (scope, feasibility, price and timeline after consultation; no specific features promised).
- The Nusa Forma Studio showcase is a fictional internal concept/demo, not client work, not a completed client project and not proof of client outcomes.
- The REDO production candidate is on branch `redo/prd-v0.2-research`; `main` has not been changed. The page includes `noindex,nofollow`. This is not access control.
- Hosting provider, custom domain and canonical hostname have not been selected. No deployment, DNS change or public release is authorized.
- See the single active `ADES_PROJECT_BRIEF.md` for current approvals, evidence, gate status and limitations.

## Local preview — Windows PowerShell

Requirements: Git and Python 3 with the Windows `py` launcher. No npm install or build command is needed.

From a clean checkout:

```powershell
git clone https://github.com/kannaryukkei/ades-marketing-web.git
cd ades-marketing-web
py -m http.server 4173 --directory site
```

Open `http://localhost:4173` in a browser. Stop the server with `Ctrl+C` in the PowerShell window.

Local preview is not deployment. A clean-checkout run still needs operator verification; the operator previously reported a successful preview from the existing local clone.

## Hosting and security notes

- Configure the host's publish/output directory as exactly `site/`.
- `site/_headers` is a static-host response-header configuration for compatible providers. No provider has been selected and live response headers have not been verified.
- Do not publish the repository root. Do not treat `noindex,nofollow` as authentication or preview protection.
- No DNS, domain, hosting-account, billing or production changes are authorized by this repository state.

## ADES activation message

Copy the following message when starting an ADES Lead session for this project:

> Act as the ADES Lead for ADES MARKETING WEB. Follow the current ADES Guide 2.8 as the authoritative operating contract and maintain exactly one active `ADES_PROJECT_BRIEF.md` as the project source of truth. Project entry path: `redo_existing_project`. Selected Product Profile: ADES Starter v0.1.0. Active assignment: approved REDO PRD v0.2. Approved R2 direction: Warm Editorial / Signal Architecture; operator approval recorded 2026-11-26. Business mode: `studio_development`. ADES mode: `single_agent_end_to_end`. The operator-selected identity label is GPT GO; Lead, Execution Agent and Governance Lead are the same selected identity. There is no independent jury or separate Synthesizer in this mode. Provider/model/version details are NOT_EXPOSED and must not be inferred. ADES Core repository: https://github.com/kannaryukkei/ai-design-exploration-synthesis. Website repository: https://github.com/kannaryukkei/ades-marketing-web. Read the Guide, current Brief, Intake and selected Product Profile from their authoritative sources before acting. Resume from the last verified state; “lanjut” is continuation, not approval. Do not deploy, change DNS/domain, contact third parties, spend money or publicly release the website without explicit scoped operator authorization.

## Ownership and support boundary

This repository is the project source and local preview. Hosting, domain ownership, ongoing maintenance, monitoring, incident response and support are not included or assigned unless separately agreed. Do not infer commercial terms or a service-level commitment from the website.