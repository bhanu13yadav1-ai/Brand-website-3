# BLACKED INNERWEAR — Fit Studio v1.2.0

**Build date:** 17 October 2026  
**Stack:** Static HTML + CSS + JavaScript, phone-first.  
**Cost target:** ₹0; no AI API, paid API, package manager or build step.  
**Deployment status:** Package prepared locally; not pushed to GitHub and not deployed live.

## What changed in v1.2.0

- Added a three-card experience hub linking to the three distinct areas: BLACKED Innerwear Collection, Intimate Wellness 18+, and Plus-One Club 18+.
- Added a swipe/drag, slider and arrow-controlled 8-frame 360° **concept demo**. It is clearly labelled generated visual demo, not a verified 360° capture of physical stock.
- Added four separate product-only concept cutout sets (Midnight Lace, Bow Lace, Scarlet Satin and Ivory Bloom), with bra/bottom layers for those concepts only.
- Try-On defaults to the exact selected product/reference photo. The manual cutout overlay is available only after selecting a personal photo and a concept with its own matching overlay assets; references without cutouts remain photo-only.
- Added original illustrative images to the three Plus-One outing cards and improved the Intimate Wellness hero image and nav paths.
- Preserved existing P0–P4 tools: catalog search/sort/filter, product detail dialog, Fit Detective, Fit Passport, Style Finder, product comparison, local wishlist, style board, After Dark collection, wellness finder, and private adult preference prototype.
- Added a root-level cutout contact sheet and explicit image/patch manifest to speed future repository updates.

## Three sections

1. **BLACKED INNERWEAR:** original 10 references, campaign images and design concepts. These are not automatically confirmed SKUs.
2. **Intimate Wellness 18+:** `Sanskari outside. Savage inside.` category finder and educational category placeholders. This is not a live product catalogue or checkout.
3. **Plus-One Club / adult preferences 18+:** platonic public-outing preview and consent-aware, private preference questionnaire. Images are illustrative AI-generated concepts, not real people/providers. No actual profiles, matching, messaging, booking or payment service is connected.

## Important limitations

- The eight-frame spin is a generated **concept demo**, not real photographed views of a physical product. A true commercial 360° viewer needs consistent images of the actual physical sample.
- The four garment cutouts are generated concept visuals and are not confirmed inventory, exact product photography, fit simulation, or a guarantee of garment construction.
- Try-On can show the selected reference or manually position the matching concept cutouts on a locally selected personal photo. It does not automatically detect body shape or perform photorealistic virtual fitting.
- Wellness cards are category ideas, not live product SKUs. Real stock, supplier details, prices, shipping terms and care instructions must be supplied before shop claims or checkout are added.
- Plus-One and adult preference features are local prototypes. The 18+ checkbox is self-attestation, not formal verification. A real launch needs verified adult access, screened profiles/providers, secure accounts, moderation, reporting/blocking, deletion controls, and Indian legal/privacy review.
- No real prices, inventory, reviews, ratings, discount badges or product-fit claims are invented.

## Test status

`TEST-RESULTS.json` records **30/30 Playwright checks passed** in an in-memory DOM with local assets replaced by fixtures. Checks cover the hub, gallery/catalog filters, 360 controls, product-specific cutout gating, no generic overlay fallback, wellness finder/reset, Plus-One preview, adult preference privacy, and mobile/desktop horizontal overflow. This is not a live GitHub Pages test or a real-phone visual regression; verify after deployment on Android.

## Updating an existing GitHub repo

- If your current repository matches the previous v1.1.0 package, use `BLACKED-INNERWEAR-FIT-STUDIO-v1.2.0-CHANGED-FILES.zip`. It includes only changed code/docs plus newly added image assets. Extract it and upload files to the same relative paths, replacing same-named files. Keep all other existing images.
- For a clean install/backup, use the full `BLACKED-INNERWEAR-FIT-STUDIO-v1.2.0.zip`.
- Review `UPDATE-MANIFEST.md` first. Back up/download the repository before replacing files. Commit changes and wait for GitHub Pages to deploy. If cached assets show the old version, refresh or clear site cache.

The GitHub repository has not been modified or deployed by this build step.
