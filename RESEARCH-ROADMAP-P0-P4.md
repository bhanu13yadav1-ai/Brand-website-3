# BLACKED INNERWEAR Fit Studio v1.1.0 — Consolidated Research & Build Specification

**Prepared:** 17 October 2026  
**Current shipped prototype:** `v0.7.0` (static prototype package prepared in this conversation)  
**Current inspected release:** `v0.5.1`  
**Constraints:** ₹0 budget, no AI, no paid APIs, no npm/build step, Android-phone-first, GitHub-friendly static website.

> This file consolidates the research, implementation order and remaining launch requirements. v1.1.0 implements the static frontend portions; real inventory, backend services and live-service verification remain future work.

## 1. Product goal

Build a premium mobile-first BLACKED INNERWEAR shopping prototype that helps visitors:

1. Browse the supplied design references without confusing campaign artwork with confirmed sellable inventory.
2. Select one product/reference and see that exact selected image in the Try-On area (not an unrelated demo silhouette).
3. Inspect genuine product/gallery images and product attributes where assets/data are available.
4. Get transparent, non-guaranteed size guidance from a verified BLACKED size chart.
5. Save and compare styles locally, then use genuine product/review/checkout data when the business is ready.

## 2. Research findings that drive the design

### Product images need to be discoverable

Baymard's apparel UX research emphasizes fit uncertainty, human-model context, sufficient sizing information, visible size controls, and usable product imagery. Its 2026 apparel quant research surveyed 1,922 US online shoppers; 48% said they look for size-accuracy/fit details in reviews. This is a US survey and should not be presented as an India-specific statistic. Sources:

- Baymard, Apparel & Accessories UX Research: https://baymard.com/industries/apparel-ux
- Baymard, 2026 Apparel & Accessories Quantitative UX: https://baymard.com/research-articles/apparel-and-accessories-quantitative-ux-insights-2026
- Baymard, Product Page UX Best Practices (updated 2026): https://baymard.com/research-articles/current-state-ecommerce-product-page-ux
- Baymard, product-gallery thumbnails on mobile: https://baymard.com/research-articles/always-use-thumbnails-additional-images
- Baymard, image resolution and zoom: https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom

### Size options should be obvious

Use visible size buttons/chips rather than hiding the choices in a dropdown where reasonable. Show availability only if real inventory data exists. Do not invent the size chart or make “perfect fit” guarantees.

- Baymard, size-selection buttons: https://baymard.com/research-articles/use-buttons-for-size-selection
- Clovia's public bra-size calculator is a useful reference for the general measurement flow (not a source for BLACKED sizing): https://www.clovia.com/bra-size-calculator/

### No-AI local photo handling is technically feasible

HTML Canvas can composite images and export a preview. The File API supports selecting local files; object URLs should be revoked after use. Local-only processing avoids sending a user's photo to an API in this static prototype, but it does not delete browser history or guarantee privacy from someone with access to the device.

- MDN, using images with Canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
- MDN, using files in web applications: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
- WCAG 2.2 target size minimum (24 × 24 CSS px, subject to exceptions): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

## 3. Current release facts and constraints

The inspected `v0.5.1` ZIP contains plain `index.html`, `styles.css`, and `app.js`, plus 10 original user-supplied reference images, four newer BLACKED design-concept posters with separate product-only images, and three illustrative SYRN-inspired references. Existing test notes report syntax/HTML/asset checks, but no complete browser click-through regression test was completed.

Critical catalog truth rules:

- The original 10 images are references/campaign visuals, not automatically 10 verified sellable SKUs.
- The four newer BLACKED concepts remain concepts until the user confirms inventory, physical construction, sizes, prices, material details and image rights.
- SYRN references are a separate brand, not BLACKED inventory or an implied collaboration. Do not label them as BLACKED products.
- The additional images most recently supplied (files named `1000197276.png` through `1000197288.png`, excluding filenames not present in that sequence) are research inputs only in this pass. They have not been added or modified here.
- Never fabricate price, stock, fabric composition, model size, customer reviews, sale badge, shipping promise or verified-purchase claim.

## 4. P0–P4 implementation plan

## P0 — Correct product selection and Try-On state (blocker)

### Problem to prevent
A customer selects one lingerie reference, but the Try-On stage still shows the generic demo bra/silhouette. The selected product, selected gallery image and canvas have drifted out of sync.

### Required behaviour

1. Store one canonical `activeProductId` in application state.
2. Each catalog item has a stable ID and explicit fields: `title`, `category`, `referenceImage`, optional `productOnlyImage`, optional `overlayImage`, `assetType`, `isConfirmedStock`, and optional verified product-data fields.
3. Clicking a product in the catalogue or Try-On picker must update together:
   - selected card highlight,
   - active product name/number,
   - reference image,
   - gallery thumbnails,
   - product details,
   - Try-On stage and download state.
4. On opening Try-On, render the exact selected reference image by default. Do not show a generic mannequin/silhouette as if it were that garment.
5. If the customer explicitly switches to `My photo + guide`, show their local photo and only use a product-specific transparent garment overlay if that asset truly exists. If no overlay exists, explain that this item supports reference preview only; do not silently substitute a generic garment.
6. Selecting a different product must clear stale transforms/overlay state or load transforms specifically scoped to that product. Downloaded PNG must match what is actually visible.
7. Keep campaign/reference-only items clearly labelled `Design reference` / `Campaign visual`; only confirmed inventory can use `Shop product`/stock wording.
8. Add `Reset preview`, clear customer photo, loading/error fallback, and a visible mode label: `Reference preview` vs `My photo + manual guide`.

### P0 acceptance tests

- Select each available product ID in turn; stage image and heading must match the same ID.
- Open Try-On from a product-detail card; same product must be preselected.
- Switch A → B → A; no stale photo, overlay, transform, name or download state may remain.
- With no customer photo, no generic demo silhouette appears.
- Selecting a product without an overlay displays its reference/product-only image and an honest limitation note.
- With a customer photo, no network request uploads the photo; clear/reset removes its visible preview and releases any object URL.
- PNG download corresponds to the currently visible canvas state.

## P1 — Product Truth Gallery and product-detail pages

### Required behaviour

- Keep a single collection of product/reference cards; filtering and search must not duplicate products.
- Every product card opens its own product-detail view using the same product ID/image mapping.
- Gallery views may include: campaign/model, product-only/front, back/side, fabric/detail, and colour variant—but only where supplied and valid.
- Display real thumbnail buttons, selected thumbnail state, enlarged/lightbox view, close/back control, and pinch/double-tap zoom where feasible on mobile.
- Use `object-fit: contain` for product-only shots; `cover` only for editorial/campaign cards where intended. Avoid cutting off straps, briefs or detail components.
- Clearly distinguish: `Campaign artwork`, `Product-only concept`, `Reference image`, `Confirmed product`. Never infer stock or product specs from text embedded in a poster.
- Use verified data only: garment category, description, fabric composition, care instructions, closure/strap info, colour options, sizes, price and stock are optional fields that remain “not confirmed” until supplied.
- Size choices should be visible button/chip controls; out-of-stock state can be shown only if inventory data is configured.
- Do not show fake star ratings/review counts or unsupported “premium/ultra-soft/perfect fit” claims as factual product attributes. They can be marketing copy only if the owner confirms they are true.

### P1 acceptance tests

- All 10 original images are present byte-for-byte and individually addressable.
- Each newer uploaded image is individually mapped (no one composite poster accidentally reused as several different product images).
- Main image and selected thumbnail always agree.
- Gallery modal closes via button and Escape; keyboard focus remains visible.
- Missing optional image/details degrade gracefully without broken-image icons or invented values.
- Mobile gallery allows direct selection of thumbnail images, not just tiny dots.

## P2 — Fit Detective + Fit Passport (rule-based, not AI)

### Fit Detective flow

Ask what product category the customer is shopping for first: bra, brief, bodysuit or set. Then ask relevant, optional questions. For bras, ask about familiar fit symptoms such as band riding up, straps slipping, cup gaping or spillage. For briefs, ask whether waistband/leg openings feel tight or loose. These responses are guidance prompts, not medical or guaranteed sizing advice.

### Fit Passport flow

- Separate measurement fields by garment category; allow cm/in conversion.
- Keep fields optional and explain how to measure.
- Use a configurable size-chart object per verified product/category, not a hard-coded universal chart.
- If verified chart/data are missing, show `Size guidance not configured yet` and a measurement checklist rather than pretending to calculate a reliable size.
- Keep measurements in browser storage only by default; show `Clear Fit Passport` and make persistence opt-in where possible. No account or sync in the static version.
- Recommendation wording: `Suggested size based on the supplied chart`, never `guaranteed perfect fit`.

### P2 acceptance tests

- cm ↔ inch conversion is reversible within rounding tolerance.
- Required measurement validation varies by product category.
- Missing size chart never returns a fabricated size.
- Fit symptom answers produce explanations/rule-based guidance, not a promise that a product will fix the issue.
- Clearing the passport removes stored measurements.

## P3 — Style Board, Compare, and Build-a-Set

### Style Finder

Questions can cover occasion/use, visual style, coverage preference, strap type and colour preference. Filters must operate only on known catalog attributes; unknown attributes remain `Not specified` rather than being guessed from campaign artwork.

### Compare

- Compare up to three distinct product IDs.
- Show the same fields side by side: product/reference image, category, confirmed material, coverage, confirmed sizes, confirmed price, stock status if known.
- Show `Not confirmed` for missing facts; never infer or invent differences.
- Keep compare controls thumb-friendly on mobile.

### Style Board / Wishlist

- Save favourite product IDs in localStorage or another local-only option; no login required.
- Show empty state, remove item, clear all, persistence warning (`saved on this device only`) and graceful handling if storage is unavailable.
- Shareable board, if included, must share public product references only by default—not the customer's uploaded photo or measurements.

### Build-a-Set

- Only allow compatible product combinations if the catalog defines the relationship.
- Calculate combined price only from confirmed prices; if price is missing, disable total price/checkout and say `Price not configured`.
- Do not add fictional discounts, stock counts or purchase confirmation.

### P3 acceptance tests

- Quiz results change when answers change and can be reset.
- Compare prevents duplicate product IDs and caps at three.
- Wishlist survives reload on the same device but makes no sync claim.
- Share action never includes personal try-on photo or measurements by default.
- Bundle price appears only when all required prices/relationships are configured.

## P4 — Genuine fit feedback, pre-checkout confidence and release quality

### Fit reviews

- Static release can include a review section in `Coming soon`/empty state, but must not create sample reviews or fake star averages.
- A real review system later needs storage/backend, a submission process, moderation, abuse/spam controls and a transparent way to distinguish verified purchases.
- Fit feedback fields can include `too small / as expected / too large`, comfort, and optional short text. Do not require body measurements in a public review.

### Pre-checkout confidence

- Add clear placeholder slots for shipping, return/exchange and hygiene policy, but mark them unconfigured until the owner supplies the actual policy.
- No checkout/payment implementation in this static milestone.
- Explain what happens with a local wishlist and user photo. No unnecessary signup wall.

### Mobile and release quality

- Body text readable (target around 14–16px), accessible contrast, visible focus, semantic labels, no horizontal overflow at 320px-wide viewport.
- Interactive targets should aim for at least 24 × 24 CSS px or satisfy a WCAG 2.2 exception; larger touch areas are preferable on phones.
- Use compressed/lazy-loaded non-critical images without degrading zoom/detail quality.
- Confirm file paths are case-sensitive and all assets are included in ZIP root, no nested folder-only archive.
- Use image `alt` text; modal close controls, Escape key, keyboard navigation and reduced-motion respect.
- No npm, remote AI API, paid API, or backend dependency for P0–P3 static features.

### P4 acceptance tests

- No fake reviews/stars, prices, availability or policy claims.
- No horizontal overflow at 320px, 360px, 390px and 768px widths.
- Major controls work with keyboard and touch; focus is visible.
- Images load offline/from the packaged folder; broken references equal zero.
- `node --check app.js` and HTML parse pass.
- Browser click-through smoke test covers P0–P4 before calling the build tested. If the runtime cannot run a browser, explicitly label that as pending rather than claiming the test passed.

## 5. Asset/catalog model for the next release

Keep an explicit JavaScript catalog array/object, rather than deriving product images from card order. Suggested fields:

```js
{
  id: "black-lace-reference-05",
  title: "Black Lace Cutout — Reference",
  category: "bra-set",
  heroImage: "ref-05-black-lace-cutout-reference.png",
  gallery: ["ref-05-black-lace-cutout-reference.png"],
  productOnlyImage: null,
  overlayImage: null,
  assetType: "campaign-reference", // campaign-reference | concept | product-only | confirmed-product
  isConfirmedStock: false,
  price: null,
  material: null,
  sizes: [],
  inventory: null,
  relatedSetIds: []
}
```

When a transparent, isolated garment layer becomes available, populate `overlayImage` for that product only. Never silently substitute one product's overlay for another. If the available image is a poster/collage, label it as a reference and don't pretend the entire image is a clean garment cut-out.

## 6. Suggested next-version order

**Historical target from the first plan:** v0.6.0. The current additive package is v0.7.0; local browser click-through is pending due execution-environment restrictions.

1. P0: canonical active product state; exact product image selection; no generic demo fallback; correct mode/state handling.
2. P1: explicit asset catalog; correct labels; thumbnail gallery/details and optional fields.
3. P2: Fit Passport + Fit Detective driven by verified/configurable charts.
4. P3: Style Finder, comparison, local wishlist/board, price-safe set builder.
5. P4: authentic empty-state fit reviews, policy placeholders, accessibility/performance QA.
6. Run static checks, asset existence/identity checks, and browser click-through regression tests. Package all files flat in ZIP root.

## 7. Release acceptance checklist

- [ ] No generic default silhouette when opening Try-On with no uploaded photo.
- [ ] All product selection entry points converge to one `activeProductId`.
- [ ] Selected ID, heading, image, gallery, details, overlay choice and PNG output stay synchronized.
- [ ] 10 original references remain unchanged; newly supplied images are mapped individually, not collapsed into a single image or used as fake variations.
- [ ] BLACKED concepts, unconfirmed products and external-brand references are clearly separated.
- [ ] No unconfirmed price/stock/material/size/review/policy claims.
- [ ] Fit Passport is local-only by default and clearable.
- [ ] Every P0–P4 acceptance test is recorded as pass/fail/pending honestly.
- [ ] ZIP opens on Android and contains every referenced file at the archive root.
- [x] This package build changes only the local working copy; no remote GitHub repository or live website was modified/deployed by the assistant.

## 8. Sources

1. Baymard — Apparel UX Research: https://baymard.com/industries/apparel-ux
2. Baymard — Apparel & Accessories quantitative research (published June 2026): https://baymard.com/research-articles/apparel-and-accessories-quantitative-ux-insights-2026
3. Baymard — Product Page UX Best Practices 2026: https://baymard.com/research-articles/current-state-ecommerce-product-page-ux
4. Baymard — Product thumbnails for additional images: https://baymard.com/research-articles/always-use-thumbnails-additional-images
5. Baymard — Image resolution and zoom: https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom
6. Baymard — Size-selection buttons: https://baymard.com/research-articles/use-buttons-for-size-selection
7. Clovia — Bra size calculator (reference workflow only): https://www.clovia.com/bra-size-calculator/
8. MDN — Canvas API using images: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
9. MDN — Using files in web applications: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
10. W3C WAI — WCAG 2.2 target size minimum: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum


## v0.7.0 implementation delta (17 Oct 2026)

The full P0–P4 structure above remains in the site. This release also adds a curated `After Dark / Playful Nights Edit` section for women that uses existing owner-supplied BLACKED concepts. It covers bows, black lace, satin/berry shades, statement straps and garter-inspired styling. The wording explicitly describes the edit as an independent BLACKED concept; it is not Playboy merchandise and not affiliated with or endorsed by Playboy. No official Playboy logo, rabbit-head symbol, or official artwork is included.

Why this boundary matters: Playboy, Inc. publicly describes the Playboy name and rabbit-head design as trademarks licensed to third parties for consumer products, with licenses specifying product categories and territories. See its 2025 Form 10-K and investor licensing contact listed in the README. A real Playboy-branded product collection should only be added after the necessary rights are verified.

External-brand screenshots supplied by the owner are only used as cropped, clearly labelled reference imagery in the prototype; no external website is embedded, scraped, or linked. Rights for public/commercial reuse are not assumed. The newest supplied image set was compared against existing assets; visually duplicate concept posters remain represented by their local assets rather than being falsely counted as separate physical products.

### v0.7 acceptance checklist

- [x] Keep existing pages/features/assets from v0.6.0; new content is additive.
- [x] Add nav access to After Dark.
- [x] Add six curated After Dark cards linked to existing catalog IDs (not new inventory SKUs).
- [x] Add direct actions to view each style in the existing Try-On Studio and save it to the device-local wishlist.
- [x] Explicitly state the edit is concept-only/not official Playboy merchandise; no Playboy marks are reproduced.
- [x] Retain exact selected-image behavior; no demo silhouette fallback in reference mode.
- [x] Replace external screenshot assets with local cropped reference crops derived from screenshots supplied in the conversation; no external web URL is linked or embedded.
- [ ] Full real-device regression test after the owner uploads the ZIP to their GitHub repo.

### Sources

- Baymard Apparel UX: https://baymard.com/industries/apparel-ux
- Baymard 2026 quantitative insights: https://baymard.com/research-articles/apparel-and-accessories-quantitative-ux-insights-2026
- Baymard product page UX (2026): https://baymard.com/research-articles/current-state-ecommerce-product-page-ux
- Playboy, Inc. filing on licensing and marks: https://www.sec.gov/Archives/edgar/data/1803914/000162828026018238/ply-20251231.htm


## v0.8.0 addition — Plus-One Club (separate 18+ concept)

A clean, non-sexual, platonic companion-outing idea is added as a separate concept. It is intended for public activities (coffee/conversation, event plus-one, public-venue dinner, museum/daytime city walk). It does not promise romance, sexual services, real profiles, availability, prices or a completed booking.

Prototype requirements: self-attestation only (not real age verification), public-place boundary acknowledgment, non-sexual boundary acknowledgment and clear demo consent. No name, phone, ID, exact location, payment or booking data is collected; the form does not call an API or store the request.

Before a public live service, conduct local legal review and implement verified adult identity/age checks, provider screening, safeguarding/moderation, block/report, complaint response, safe communication, payments/receipts, clear fees, refunds/cancellations and privacy/data-deletion flows. The project does not currently provide any of those live service operations and should not be advertised as a functioning companion-hire platform.

Safety patterns researched: Bumble's public guidance recommends verification, block/report and public first meetings / sharing plans; MeitY has published the DPDP Rules 2025 with phased enforcement. These sources inform design but do not imply the site is legally compliant.


## v0.9.0 addition — P5 Adult Connection Preferences

- Separate adult preference questionnaire, distinct from platonic Plus-One outings.
- Questions are optional and in Hinglish: relationship intent, partner preference, adult age range, optional intimate-size preference, broad adult interests (consensual group intimacy, BDSM-aware interests, role-play, consensual non-monogamy), per-topic comfort, boundaries, and future sharing preference.
- Answers are intentionally held in page memory only; not stored in localStorage and not transmitted. A preview is local only.
- A self-attestation control is not age verification. Any real public launch requires real age/identity verification, secured profile and message infrastructure, privacy and deletion controls, adult safety moderation, block/report, abuse response, and legal review.
- Product policy draws on Feeld's active-consent, privacy and report/block guidance, Bumble's photo/ID verification and block/report guidance, and India's DPDP Rules 2025.
- The prototype offers no real people, matching, sexual-service listings, provider payments or booking. It does not present interest tags as consent.
