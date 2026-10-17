# BLACKED Fit Studio v1.2.0 — Test notes

## Automated validation
- `node --check app.js` — expected/pass.
- Playwright Chromium in-memory DOM tests: **30/30 passed**; results are in `TEST-RESULTS.json`.
- The test replaces local media with in-memory fixtures; it tests page interactions/state, not the pixel appearance of the actual images.
- Sections tested: 3 experience hub cards, unique navigation anchors, 43 catalog/reference cards, search/empty state/reset, 360 next/previous/slider, selected product mapping, mapped detail cutout, manual cutout gating, no generic overlay fallback, Wellness self-attestation/finder/reset, Plus-One preview disclaimer, illustrative-card labels, adult conversation prompts, no localStorage persistence for intimate answers, clear/reset, no horizontal overflow at 390px and 1280px, and no uncaught browser errors.

## Package-time static tests
- `node --check app.js` passed.
- HTML parser and duplicate IDs checked.
- Relative image/script/style references checked against the build root.
- ZIP integrity checks run for both full and changed-files ZIPs.

## Manual acceptance after GitHub Pages upload
1. On Android, open each of the three experience hub cards and verify they navigate to the correct section.
2. In the collection, search, sort and reset the 43 references.
3. Select Midnight Lace, Bow Lace, Scarlet Satin and Ivory Bloom in Try-On. Verify product detail switches to that concept's product-only cutout.
4. Select a reference without matching cutouts (for example Move Together). The manual cutout mode must remain disabled and the selected reference photo must remain visible.
5. Upload a personal image and verify manual cutout mode is available only for the four mapped concepts. Clear the photo afterwards.
6. Operate the 360° demo by swiping/dragging, the arrows and the slider. Remember the frames are illustrative concepts, not actual physical-product 360° scans.
7. Check the Plus-One images and planner preview; nothing should be sent or booked.
8. Open Wellness after checking 18+ self-attestation; search/filter/finder/reset should work. It is a category prototype, not a live store.
9. Clear adult preference answers and verify intimate answers are not persisted. Test mobile menu, popups, scroll width and stale browser cache.

## Remaining before public commercial launch
Actual product photos and confirmed SKUs/sizes/prices, rights for all public-use images, real inventory/checkout, formal adult verification, security/moderation, privacy/legal review, and a live device/browser regression are still needed.

## Environment limitation
A direct browser navigation to localhost/file URLs was blocked by the execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR`), so a visual screenshot-based live-page check could not be completed here. The 30/30 automated checks above used an in-memory DOM with fixture images; the real image rendering and interactions should be checked after uploading to GitHub Pages/on an Android phone.
