# Release notes — v1.1.0

## Changed behaviour
- Catalog-wide search now filters all 43 reference/concept cards, including dynamically added cards.
- Added alphabetical sorting, current filter counts, reset and empty-state support.
- Try-On supports an explicit selected-reference vs available-product-detail view. The detail control is disabled where that product has no mapped detail image.
- The selected product/reference image stays the default preview; manual illustration mode remains explicitly separate from realistic fit simulation.
- Intimate Wellness Finder returns category ideas based on the selected audience/goal/priority and resets to the full category list.
- Plus-One outing preferences render a local preview with explicit no-booking/no-submit notice.
- Adult preference questionnaire generates boundary/comfort conversation starters and clear/reset control without writing intimate answers to localStorage or sending them to a server.
- Corrected page title/footer version to v1.1.0.

## Existing features kept
P0 image mapping, P1 product gallery/dialog, P2 Fit Detective and Fit Passport, P3 style quiz/comparison/wishlist/style board, P4 privacy and policy placeholders, After Dark concepts, Intimate Wellness 18+, Plus-One planner, and the adult preference prototype.

## File and asset strategy
No images were changed or added for v1.1.0. The delta ZIP contains only changed code/documentation files; unchanged product/reference images are reused from v1.0.0. The full ZIP is provided as a convenience for a fresh install or backup.

## Validation
See `TEST-NOTES.md` and `TEST-RESULTS.json`. Automated browser checks run on an in-memory DOM with local fixture images, not against a live GitHub deployment. Manual Android/GitHub Pages validation is still recommended.
