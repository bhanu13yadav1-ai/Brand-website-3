# v1.4.0 Automated Test Notes

**Status:** PASS

## Checks
- PASS: HTML parse and required assets — 171 IDs; CSS and JS files present
- PASS: Exactly three top-level tabs/panels — Innerwear, Boyfriend, Wellness
- PASS: No duplicate DOM IDs — 
- PASS: Five new campaign images exist — sanskari-khamosh-raat.webp, sanskari-nazuk-lamhe.webp, sanskari-raat-lambi-kahani.webp, sanskari-raat-shareef.webp, sanskari-shareef-dangerous.webp
- PASS: Flirty-vibe selector wired — Optional dropdown and preview mapping found
- PASS: Default tab state — Innerwear visible, other panels hidden
- PASS: Boyfriend tab switch — Only Boyfriend panel visible
- PASS: Boyfriend vibe preview — Bold non-explicit banter reflected in local preview; no data sent
- PASS: Wellness 18+ gate — Confirm then enter; panel remains separate
- PASS: 360° frame controls — Next arrow and slider advance frame label/state
- PASS: Sanskari campaign gallery — Five new supplied images appear as separate cards
- PASS: Mobile horizontal overflow — {'doc': 390, 'win': 390, 'body': 390}
- PASS: Desktop horizontal overflow — {'doc': 1280, 'win': 1280, 'body': 1280}
- PASS: No uncaught browser errors — 

## Limitations
- Chromium testing ran in an in-memory document with remote media requests replaced by lightweight placeholders. The five newly added Sanskari images were embedded at their real quality for the campaign preview.
- Live GitHub Pages and actual Android-device visual regression remain pending because this patch has not been deployed.
- The 360° viewer uses generated concept frames; they are not camera-captured stock images.
- Age gate is self-attestation only; Boyfriend/Plus-One and adult preferences remain static prototype flows.
