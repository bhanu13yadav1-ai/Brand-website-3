# v1.1.0 update manifest — changed files only

## Base assumption
This patch targets a repository already matching the v1.0.0 package built in this conversation, with the same root-level image assets and filenames.

## Replace these existing root files
- `index.html`
- `app.js`
- `styles.css`
- `README.md`
- `ASSET-MANIFEST.md`
- `RELEASE-NOTES.md`
- `RESEARCH-ROADMAP-P0-P4.md`
- `TEST-NOTES.md`
- `TEST-RESULTS.json`
- `VERSION.txt`

## New file
- `UPDATE-MANIFEST.md`

## Image files
**No images were added, changed or removed in v1.1.0.** The app references the same images as v1.0.0, so the delta ZIP intentionally excludes all image assets. Do not delete the existing images.

## Apply on GitHub from a phone
1. Back up the current repository or download its ZIP first.
2. Download and extract `BLACKED-INNERWEAR-FIT-STUDIO-v1.1.0-CHANGED-FILES.zip`.
3. Upload the extracted files to the repository root and choose to replace same-named files. Keep all existing image files.
4. Commit the changes. Wait for GitHub Pages deployment, then open the site and refresh/clear cache if it shows an older version.

If the repository is older than v1.0.0, or some assets have different names, do not apply the delta blindly; use the full v1.1.0 ZIP instead.
