# v1.3.0 update manifest — target repository

**Target:** https://github.com/bhanu13yadav1-ai/Brand-website-full-finally-  
**Purpose:** replace the mixed one-page experience with exactly three working top-level tabs and improve the existing product studio/360° interaction.  
**Media policy:** do not re-upload images already present in the target repo or `Brand-website-3`.

## Files replaced
- `index.html` — updated three-tab UI and separates Innerwear, Boyfriend 18+, Wellness 18+ panels
- `README.md` — v1.3.0 docs and update instructions
- `ASSET-MANIFEST.txt` — records which images are already in the repo vs shared
- `VALIDATION.txt` — current validation summary

## Files added
- `app.js`
- `styles.css`
- `VERSION.txt`
- `UPDATE-MANIFEST.md`
- `RELEASE-NOTES.md`
- `TEST-NOTES.md`
- `TEST-RESULTS.json`

## No image files are included
The existing target repository already contains the Sanskari campaign, Boyfriend outing scenes, and wellness product-reference imagery. Innerwear reference images, concept cutouts, and 360° frame files already exist in the user's public `Brand-website-3` repository and are loaded from its raw GitHub URLs. No duplicate image files should be uploaded with this patch.

## Apply from Android/GitHub UI
1. Download the current repository ZIP as backup.
2. Download and extract `BLACKED-INNERWEAR-FIT-STUDIO-v1.3.0-CHANGED-FILES.zip`.
3. Upload the extracted files at the repository root. Replace same-named files and add the new ones. Keep every existing image and its filename; do not delete media.
4. Commit the changes.
5. Wait for GitHub Pages, then test: (a) switch all three tabs; (b) select different Innerwear items; (c) operate 360° with swipe, arrows and slider; (d) verify only four mapped concepts expose manual garment cutouts after a personal photo is selected; (e) open Wellness, confirm 18+, use category filters; (f) check on 390px/Android Chrome.
6. If the old page persists, hard-refresh or clear Chrome site cache after Pages finishes publishing.

## Important
- The image frames are generated visual concepts, not actual camera-captured 360° photos of a physical garment.
- 18+ is a front-end self-attestation gate, not identity verification.
- This build has been tested in an in-memory Chromium page with fixture images. A real GitHub Pages/Android screenshot regression still needs to be performed after upload.
- The available GitHub connection has read-only permissions; this build has not been committed or deployed by the assistant.
