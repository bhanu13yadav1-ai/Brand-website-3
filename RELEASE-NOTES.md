# Release notes — BLACKED INNERWEAR Fit Studio v1.2.0

## User-visible changes
- Added a 3-card experience hub: Innerwear Collection, Intimate Wellness 18+, and Plus-One Club 18+.
- Added interactive 8-frame 360° concept viewer with drag/swipe, previous/next buttons and a frame slider. The viewer is clearly labelled as generated concept demo.
- Added four generated product-only concept sets and separate top/bottom overlay images for Midnight Lace, Bow Lace, Scarlet Satin and Ivory Bloom.
- Try-On still opens the selected reference photo by default. Manual top/bottom garment cutouts are available only for product concepts with matching assets. Other references do not fall back to generic garment drawings.
- Added illustrative imagery to the three Plus-One public outing cards and enhanced the Wellness hero visual.
- Improved the navigation path to the 360° studio and synced version branding to v1.2.0.

## Existing capabilities retained
Catalog search/sort/category filters, product detail dialog, Fit Detective, Fit Passport, Style Finder, three-item comparison, local wishlist, downloadable style board, After Dark concepts, Wellness finder, private adult preferences and Plus-One outing planner remain present.

## Assets added in v1.2.0
- 8 frames: `assets/360-demo-*.webp`
- 12 garment cutout concept assets: 4 styles × set/bra/bottom under `assets/cutout-*.webp`
- 3 illustrative companion cards: `assets/companion-*.webp`
- 1 Wellness hero visual: `assets/wellness-hero.webp`
- 1 root preview sheet: `PRODUCT-CUTOUT-CONCEPTS-v1.2.0.jpg`

## Truth and safety labels
Generated product-only cutouts and generated 360° frames are concept visuals, not confirmed BLACKED stock or real photographs of a physical SKU. Companion images are illustrative and not real people or providers. External-brand reference images remain reference-only; no outside store is embedded or scraped.

## Validation
- `node --check app.js` passed.
- Playwright in-memory interaction checks: 30/30 passed (see `TEST-RESULTS.json`).
- HTML parse/duplicate-ID checks and relative asset-path audit are run before packaging.
- Actual GitHub Pages and physical Android-device regression are still pending; no GitHub commit or deployment was made.
