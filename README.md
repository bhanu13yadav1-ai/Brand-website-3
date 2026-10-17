# BLACKED INNERWEAR — Fit Studio v1.0.0

**Build:** Static HTML + CSS + JavaScript; phone-first.
**Budget target:** ₹0; no AI API, paid API, npm install or build step.
**Deployment:** This ZIP is not uploaded to the user's GitHub and is not live-deployed.

## What this version includes

### Original BLACKED shopping / fit tools (P0–P4)
- Product reference catalogue for BLACKED campaign imagery, owner-supplied concepts and a separate group of user-supplied external-brand reference material. The catalogue is not a verified inventory/SKU list.
- P0 selected-image mapping: selected reference uses its own `previewImage` where available, otherwise its own main image; no generic mannequin fallback. Manual guide mode is separate and only appears after a user chooses their own photo. It does not create realistic garment fitting.
- P1 product detail dialog and available local gallery/detail images. Missing product views are not fabricated.
- P2 Fit Detective educational checks and Fit Passport with explicit local-saving option and clear controls. Verified BLACKED size charts are required before product-specific size advice can be enabled.
- P3 Style Finder, up-to-three-item comparison, device-local wishlist and downloadable style-board concept.
- P4 privacy controls, mobile layout, transparent review/shipping/return placeholders, FAQs and owner setup notes.
- After Dark / Boudoir Edit as original BLACKED-styled concepts. It is not official Playboy merchandise or an endorsement.

### New BLACKED Intimate Wellness 18+ section
- Original non-explicit brand artwork in `wellness-hero-art.svg`; the user-supplied adult store screenshot was used as a layout reference, not reproduced as a website screenshot.
- Hinglish brand line: “Sanskari outside. Savage inside.”
- Category tiles for For Her, For Him, For Couples and New Ideas.
- Eight non-explicit category concept cards, client-side filters, live category search and reset button.
- Expandable educational notes for product materials, cleaning/storage, boundaries and consent.
- The section is a **concept catalogue only**: no actual product photos/listings, SKU, price, rating, discount, stock, medical claims, shipping promises, payments or checkout are configured. Confirm real products and details before converting categories into sellable listings.

### Adult Connection preferences section
- Separate 18+ Hinglish preference questionnaire includes connection intent, partner preference, adult age-range preference, optional intimate-size preference, adult-interest tags (consensual group intimacy, BDSM-aware interests, role-play and consensual non-monogamy), per-topic comfort choices, personal boundaries and future-sharing preference.
- Intimate answers are **not saved to localStorage or sent to a server**. The form creates a preview only in the current page; reset and reload clear it.
- “Private by default” is a UI rule for the prototype; no live profile publishing, adult matching, messaging, provider listings, bookings or payments exist.
- A self-attestation checkbox is not formal age verification. A live public service would need appropriate age/identity checks, secure accounts, data minimisation, consent/privacy notices, deletion tools, per-field sharing controls, block/report and moderation, security review, and Indian legal/privacy review.

## Asset / commercial-use notes
- Original user-supplied images and existing concept/reference images are retained as local files. Not every image represents a real product for sale.
- Crops from user-supplied SYRN-branded screenshots remain separately labelled external inspiration in the lingerie reference catalog; no SYRN store is embedded, scraped or linked. Do not present these as BLACKED-owned stock or an official collaboration without rights clearance.
- Newly added Intimate Wellness visuals are abstract non-explicit illustrations, not photographic product claims. The third-party adult-store screenshot is not embedded in the new section and no competitor logo, review number, discount or “#1” claim has been copied.
- Product prices, stock, fabric composition, size charts, verified reviews, shipping promises, return rules and care claims are not invented. Owner-confirmed facts must be supplied before product listings or checkout are activated.

## Run locally
Extract the ZIP and open `index.html` in a modern browser. Keep all extracted files in the same folder. No installation is needed. To publish via GitHub, upload all extracted files (not just the ZIP) into the repository root. A private repository does not automatically make a hosted page private.

## Testing
See `TEST-NOTES.md` and `TEST-RESULTS.json` for static checks. The new wellness filter and search controls are wired in `app.js`; full browser interaction and Android regression still need manual test on the extracted or hosted preview because browser automation was blocked in this environment.

## Research and safety references
- Feeld Safety and Community Guidelines: https://feeld.co/about/safety
- Feeld Help Center, report offensive or abusive behaviour (updated March 3, 2026): https://support.feeld.co/hc/en-gb/articles/9406780057756-Report-offensive-or-abusive-behavior
- Bumble Safety Features (updated March 3, 2026): https://support.bumble.com/hc/articles/28537051467293-Our-safety-features
- MeitY, DPDP Rules 2025 announcement (17 November 2025): https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655&lang=2&reg=48&trk=article-ssr-frontend-pulse-little-text-block
- Baymard apparel and product-page UX research: https://baymard.com/industries/apparel-ux

The prototype is an implementation demo, not a claim of legal compliance or a ready-to-operate online store.
