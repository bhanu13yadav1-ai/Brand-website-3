# BLACKED INNERWEAR — Fit Studio v1.1.0

**Build:** Static HTML + CSS + JavaScript; phone-first.
**Budget target:** ₹0; no AI API, paid API, npm install or build step.
**Deployment:** Not pushed to GitHub or live-deployed from this build.

## Faster update workflow

Use `BLACKED-INNERWEAR-FIT-STUDIO-v1.1.0-CHANGED-FILES.zip` to update an existing v1.0.0 repository: extract it and upload/overwrite only those files at the repository root. All unchanged image files are intentionally omitted from that patch. The full ZIP is available separately for a fresh install or backup.

## What changed in v1.1.0

- Added catalog-wide search, filter result counts, alphabetic sorting, a reset control and a no-results state across the full reference inventory.
- Added per-product reference/detail view toggles in Try-On. Missing garment-detail views remain disabled rather than borrowing a different image.
- Improved manual preview clarity: the selected product/reference image remains the default, and generic illustration mode is explicitly separate from real garment fitting.
- Improved Intimate Wellness category finder and reset behaviour.
- Improved Plus-One comfort preference preview and adult conversation starters; previews make clear that nothing is submitted, saved or booked.
- Updated title, footer version and documentation to v1.1.0.

## Existing capabilities retained

- P0: product-specific selected-image mapping; no generic demo garment shown as the selected product.
- P1: product detail dialog and available local gallery/detail images. Missing product views are not fabricated.
- P2: Fit Detective and Fit Passport with optional local saving and clear controls. Verified BLACKED size charts are required before product-specific size advice can be enabled.
- P3: Style Finder, up-to-three-item comparison, device-local wishlist and downloadable style-board concept.
- P4: privacy controls, mobile layout, and transparent review/shipping/return placeholders.
- Separate After Dark / Boudoir concepts, Intimate Wellness 18+, Plus-One outing planner and private adult-preference questionnaire prototypes.

## Catalog and assets

- 43 catalog/reference cards are included; these are **not** 43 confirmed sellable products.
- No image assets changed in v1.1.0. All image files from v1.0.0 are reused as-is. This is why the changed-files ZIP does not contain images.
- User-supplied external-brand visuals remain reference-only and are not presented as BLACKED stock. No external store is embedded, scraped or linked.

## Limits that remain

- Static frontend only. There is no connected inventory, real price, cart/checkout, shipping calculation, verified-purchase review system, account system, live dating match, messaging, provider directory, booking or payment service.
- The 18+ checkbox is self-attestation, not formal age verification. A public launch needs appropriate age/identity checks, secure accounts, privacy/deletion controls, moderation/block-report, security and Indian legal/privacy review.
- The Try-On is a selected reference photo or a manual guide overlay; it is not automatic realistic garment fitting.
- No product size, SKU, stock, price, discount, rating or material claim is invented.

## Update steps

1. Back up your current repository or download its ZIP first.
2. Extract the changed-files ZIP. It contains only files updated for v1.1.0 plus release/testing docs.
3. Upload those files to the same locations in the existing repository and allow GitHub to replace same-named files. Do not delete or re-upload image assets.
4. Commit changes, then test the site on Android.

If you need a clean install, use the full ZIP instead.
