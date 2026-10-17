# BLACKED Fit Studio v1.1.0 — Test notes

## Automated validation completed
- `node --check app.js` — passed.
- In-memory HTML/browser test with Playwright Chromium — **22/22 checks passed**. The test uses local fixture images to test state and event wiring without making network calls.
- HTML parser — passed; 152 ID attributes and no duplicate IDs.
- Local HTML image/CSS/JS references — 29 checked, none missing.
- CSS parsed with no syntax errors.
- App source references were checked; the two apparent missing `.png` tokens (`blacked-manual-preview.png`, `blacked-style-moodboard.png`) are filenames written by download actions, not input assets.
- Catalog tests cover 43 cards, search, no-results, sort, filter reset and external-only filter.
- Try-On tests cover selected product label, reference/detail view states, disabled missing-detail state and default canvas mode.
- Wellness gate/finder/reset, Plus-One outing preferences, adult conversation prompts, no localStorage persistence for intimate answers, and mobile/desktop horizontal overflow are covered.

## Browser test limits
The automated check runs on an in-memory DOM with image fixtures. It is not a live GitHub Pages or real-image visual test. Manual Android testing after applying the patch is still required, including testing the actual hosted site and clearing browser cache if old assets remain.

## Manual acceptance checklist
1. Select the 10 original BLACKED references and at least four design concepts, one by one, and verify the matching image each time.
2. For items with a mapped `previewImage`, toggle between Campaign/reference and Product detail. For an item without one, Product detail must stay disabled.
3. Search for `lace`, `ivory`, and a term with no match; counts and empty state should update. Toggle category filters, sort A–Z/Z–A, then clear.
4. Test Wellness Finder for different audiences/goals; results must remain category ideas, not invented product SKUs.
5. Test Plus-One duration, public meetup and physical-contact boundary; preview must say nothing has been sent or booked.
6. Test adult preference options; conversation starters must appear, and answers must not persist to localStorage or be sent to a server.
7. Check menu, popups, photo clear/reset, focus states and layout on Android/desktop after deployment.
