# v1.3.0 test notes

## Passed local validation
- `node --check app.js`: passed.
- HTML parsed successfully; no duplicate IDs.
- Exactly 3 `role=tab` controls and 3 top-level `data-section-panel` containers; Innerwear visible by default, other panels initially hidden.
- Playwright Chromium in-memory page checks: **26/26 passed** (results in `TEST-RESULTS.json`).
- Tested tab switching, distinct panel visibility, Boyfriend images, Wellness gate/content images, 43 catalog cards, 360 viewer button/slider/drag interactions, manual guide disabled until personal photo selected, manual guide enabled for mapped style, unmapped reference manual mode disabled, and horizontal overflow at 390px mobile and 1280px desktop.
- No uncaught JavaScript page errors in the in-memory test.
- HTML local/root image names were checked against the target repository file listing; shared image references were checked against the `Brand-website-3` repository tree.

## Test limitation
The Chromium environment blocks direct navigation to localhost (`ERR_BLOCKED_BY_ADMINISTRATOR`), so the interaction run used an in-memory document with CSS/JS inlined and image requests intercepted by small fixtures. It verifies DOM interactions and state changes, but not the real photo rendering, raw GitHub image downloads, or a deployed GitHub Pages screenshot. Please do one visual regression on Android after uploading the patch.

## Phone acceptance checklist after deploy
1. Open the live GitHub Pages link and verify exactly three tabs show in the header.
2. Tap Innerwear → Boyfriend → Wellness. Only the chosen section should be visible each time.
3. On Innerwear, select a few cards and confirm the selected photo/details update.
4. Drag the 360° viewer left/right; also test arrows and slider. Labels and images should change through 8 frames.
5. In Try-On, upload a personal photo; only a product with mapped cutouts should enable “My photo + guide.” Unmapped references must not show a generic illustration.
6. In Wellness, confirm age notice, category tiles, reference photos, search/filter and reset.
7. Confirm the target repository's old image files were retained and raw GitHub image URLs load.

## Still not a production service
- No real checkout, order placement, inventory, authentication, verified reviews, supplier details, formal age verification, live dating profiles, booking, or payment gateway.
