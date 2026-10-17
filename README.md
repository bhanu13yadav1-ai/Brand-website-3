# BLACKED INNERWEAR — Fit Studio v0.9.0

**Build:** Static HTML + CSS + JavaScript; phone-first.
**Budget target:** ₹0; no AI API, paid API, npm install or build step.
**Deployment:** This ZIP is not uploaded to the user's GitHub and is not live-deployed.

## What this version includes

### Existing BLACKED shopping / fit tools (P0–P4)
- Product reference catalogue for BLACKED campaign imagery, owner-supplied concepts and separately labelled external-brand reference material. The catalogue is not a verified inventory/SKU list.
- P0 selected-image mapping: selected reference uses its own `previewImage` where available, otherwise its own main image; no generic mannequin fallback. Manual guide mode is separate and only appears after a user chooses their own photo. It does not create realistic garment fitting.
- P1 product detail dialog and available local gallery/detail images. Missing product views are not fabricated.
- P2 Fit Detective educational checks and Fit Passport with explicit local-saving option and clear controls. Verified BLACKED size charts are required before product-specific size advice can be enabled.
- P3 Style Finder, up-to-three-item comparison, device-local wishlist and downloadable style-board concept.
- P4 privacy controls, mobile layout, transparent review/shipping/return placeholders, FAQs and owner setup notes.
- After Dark / Boudoir Edit as original BLACKED-styled concepts. It is not official Playboy merchandise or an endorsement.

### New 18+ Adult Connection Preferences section
- Separate from the non-sexual public-outing Plus-One Club.
- Hinglish-friendly preference questionnaire includes connection intent, partner preference, adult age-range preference, optional intimate-size preference, optional adult-interest tags (consensual group intimacy, BDSM-aware interests, role-play and consensual non-monogamy), comfort choices, personal boundaries and future-sharing preference.
- Intimate answers are **not saved to localStorage or sent to a server**. The form generates a preview only in the current page session; reset and page reload clear it.
- “Private by default” is a UI rule for the prototype; no live profile publishing, adult matching, messaging, provider listings, paid sexual services, bookings or payments exist.
- A self-attestation checkbox is not real age verification. It does not make a public live dating site safe or compliant by itself.
- Before launch, the owner needs suitable age/identity verification, secure user accounts, data minimisation, explicit privacy/consent notices, per-field sharing controls, block/report and moderation tools, incident handling, security review, and Indian legal/privacy review.
- Consent UI stresses that an interest is not permission; consent must be freely given, specific, informed, ongoing and reversible.

## Important asset / commercial use notes
- The original ten references and subsequent user-supplied references are preserved as local files. The catalogue includes campaign visuals, concept art and external-brand inspiration; not every image represents a real product for sale.
- Crops from user-provided SYRN-branded screenshots are kept in a distinct external-reference group. No SYRN website is embedded, scraped or linked. These images must not be presented as BLACKED-owned inventory or an official collaboration without rights clearance.
- Product prices, stock, fabric composition, size charts, verified reviews, shipping promises and return rules are not invented. Owner-confirmed facts must be supplied before checkout or sizing is activated.

## Run locally
Extract the ZIP and open `index.html` in a modern browser. Keep all extracted files in the same folder. No installation is needed. To publish via GitHub, upload all extracted files (not just the ZIP) into the repository root. A private repository does not automatically make a hosted page private.

## Testing
See `TEST-NOTES.md` for syntax, HTML, asset and browser interaction checks. The adult form is a local UI prototype only; never call it a live verified matching service.

## Research and safety references
- Feeld Safety and Community Guidelines: https://feeld.co/about/safety
- Feeld Help Center, report offensive or abusive behaviour (updated 3 March 2026): https://support.feeld.co/hc/en-gb/articles/9406780057756-Report-offensive-or-abusive-behavior
- Bumble Safety Features (updated 3 March 2026): https://support.bumble.com/hc/articles/28537051467293-Our-safety-features
- MeitY, DPDP Rules 2025 announcement (17 November 2025): https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655&lang=2&reg=48&trk=article-ssr-frontend-pulse-little-text-block
- Baymard apparel and product-page UX research: https://baymard.com/industries/apparel-ux

This prototype uses these public sources as design references; it does not claim legal compliance, and is not ready to operate a live adult matching service without additional engineering and review.
