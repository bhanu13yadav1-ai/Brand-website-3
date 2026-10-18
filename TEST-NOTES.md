# Test Notes — v1.5.0

Static validation performed during packaging:
- JavaScript syntax check (`node --check app.js`).
- All local HTML `src` / `href` / `srcset` paths validated against files in this bundle where applicable.
- Ten distinct Sanskari gallery cards verified against ten unique image files.
- Image references rewritten to local files; no required campaign/product image depends on a raw URL from a different repository.
- The three main tab identifiers, 360 frame set, product cutout family and age-attestation gate are present.

Manual Android/GitHub Pages testing is still needed after upload. This container cannot verify your live GitHub Pages deployment, mobile browser caching, or real checkout/backend behavior.
