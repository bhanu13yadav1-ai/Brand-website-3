# Release notes — BLACKED FINAL FUSION v1.3.0

## Core UX changes
- Exactly three top-level tabs: **Innerwear**, **Boyfriend 18+**, and **Wellness 18+**. Only the chosen panel is shown; other experiences are hidden rather than stacked into one extra-long page.
- Accessible tabs with keyboard navigation, selected-state attributes, and deep-link routing.
- Uses image files already stored in the target repo plus shared images from `Brand-website-3`; this update contains no duplicate campaign/product photos.

## Innerwear
- Preserves the 43-entry catalog/reference collection, search/sort/filter, product details, style finder, wishlist, product comparison, Fit Detective, Fit Passport, After Dark styling concept, and set-builder prototype.
- Selected reference/photo view remains separate from manual guide mode.
- Product-specific garment overlays remain available for four mapped concept sets only. A reference without matching cutout assets never receives a generic bra/panty illustration.
- Remote image loads used by the canvas opt into anonymous CORS before drawing, so local preview export can work when the shared image host permits CORS.
- 8-frame 360° concept demo supports drag/swipe across multiple frames per gesture, next/previous buttons, keyboard arrows/Home/End, and a slider.

## Boyfriend / Plus-One 18+
- Separate top-level tab with original café/date hero, existing outing scenes, planner, conversation copy helper, and private adult-preference prototype.
- Outing artwork is illustrative; no actual provider profiles, matching, messages, booking, or payments are represented as live.

## Intimate Wellness 18+
- Separate top-level tab with the existing Sanskari campaign, For Her / For Him / For Couples / New Ideas categories, wellness reference photos already in the target repo, search/filter, and age self-attestation.
- Content remains a visual/category prototype, not verified stock, live prices, or checkout.

## Truth and privacy notes
- The 360° viewer is a generated eight-frame demo, not a photographed physical SKU.
- The four product-only cutouts are generated concept art and not inventory confirmation or a fit guarantee.
- Personal Try-On photos remain browser-local within this static prototype; no automatic AI fitting is performed.
- No product prices, verified reviews, ratings, discount claims, supplier or safety certification claims are invented.

## Validation
- `node --check app.js` passed.
- HTML parse and duplicate-ID check passed; 3 tabs/3 panels identified.
- Playwright Chromium in-memory interaction checks: 26/26 passed with image requests replaced by fixtures. See `TEST-RESULTS.json` and `TEST-NOTES.md`.
- GitHub Pages deployment and real-device visual check remain pending.
