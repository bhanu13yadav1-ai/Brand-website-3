(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value).replace(/[&<>\"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' }[char]));
  const toastEl = $('#toast');
  let toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
  }

  // Mobile navigation
  const menuToggle = $('#menuToggle');
  const primaryNav = $('#primaryNav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      primaryNav.classList.toggle('is-open', !isOpen);
    });
    $$('a', primaryNav).forEach(link => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      primaryNav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        primaryNav.classList.remove('is-open');
      }
    });
  }

  // Catalog controls are wired after the dynamic reference cards have been rendered.
  let activeCatalogFilter = 'all';
  let catalogSortMode = 'featured';

  const products = {
    move: { name: 'Move Together', category: '01 · BLACKED CAMPAIGN', image: 'ref-01-blacked-move-together.png', description: 'Black-and-grey movement-inspired styling from your original campaign artwork.', note: 'Campaign visual only. Confirm the exact garment SKU, materials, sizes and stock before selling.' },
    yoga: { name: 'Yoga Together', category: '02 · BLACKED CAMPAIGN', image: 'ref-02-blacked-yoga-together.png', description: 'Your original warm-studio campaign visual with the “Yoga Together” message.', note: 'Campaign visual only. It is not a separate confirmed product SKU by itself.' },
    redlace: { name: 'Red Lace Bodysuit', category: '03 · DESIGN REFERENCE', image: 'ref-03-red-lace-bodysuit-reference.png', description: 'Red lace and strappy construction reference from the image you supplied.', note: 'Reference image includes another brand name/packaging. Not confirmed BLACKED inventory; do not list it for sale as a BLACKED product without your own product and usage rights.' },
    stretch: { name: 'Movement & Stretch', category: '04 · SHOOT REFERENCE', image: 'ref-04-movement-stretch-reference.png', description: 'A movement-focused studio photo reference for an active, comfortable brand direction.', note: 'Reference photo only. Product identity, ownership and final product specifications have not been confirmed.' },
    blacklace: { name: 'Black Lace Cut-Out Set', category: '05 · DESIGN REFERENCE', image: 'ref-05-black-lace-cutout-reference.png', description: 'Black lace pattern, cut-out and matching-set styling reference.', note: 'The image itself contains other-brand text. It is a design reference, not confirmed BLACKED stock.' },
    velvet: { name: 'Velvet Lace Set', category: '06 · DESIGN REFERENCE', image: 'ref-06-velvet-lace-reference.png', description: 'Pink velvet with black lace detailing from your supplied visual reference.', note: 'Reference image only. Confirm your actual product design, fabric, dimensions and rights before using it as a shop listing.' },
    rose: { name: 'Rose Strap Mannequin Set', category: '07 · PRODUCT DETAIL REFERENCE', image: 'ref-07-rose-strap-mannequin-reference.jpg', description: 'A red strappy design with rose and pearl decorative details, as shown in your original screenshot.', note: 'This is an external social-media screenshot with interface and branding visible; use it for private design inspiration only unless you have permission.' },
    butterfly: { name: 'Pink Butterfly Lace Detail', category: '08 · PRODUCT DETAIL REFERENCE', image: 'ref-08-pink-butterfly-detail-reference.jpg', description: 'Close-up reference of a pink butterfly-inspired lace detail.', note: 'Close-up only; the photo does not establish the complete garment, construction, fit, or a BLACKED product SKU.' },
    signature: { name: 'Black Comfort Set', category: '09 · BLACKED CAMPAIGN', image: 'ref-09-blacked-comfort-set.png', description: 'Your BLACKED campaign creative featuring a black matching set and comfort-led positioning.', note: 'Campaign image, not a verified catalogue SKU. Confirm actual product photography, price, sizes and stock.' },
    together: { name: 'Better Together', category: '10 · BLACKED CAMPAIGN', image: 'ref-10-blacked-better-together.png', description: 'Your second original BLACKED campaign visual in a warm, premium lifestyle setting.', note: 'Campaign image, not a separate confirmed product SKU. Confirm actual product details before selling.' },
    sculpt: { name: 'Midnight Sculpt', category: '11 · BLACKED DESIGN CONCEPT', image: 'design-11-midnight-sculpt.png', previewImage: 'design-11-midnight-sculpt-product.jpg', description: 'Charcoal cups with black lace accents and a matching strappy brief; based on your supplied concept artwork.', note: 'Concept design only. The selected product view shows a garment-detail concept image, not verified sale stock.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    midnight: { name: 'Midnight Lace', category: '12 · BLACKED DESIGN CONCEPT', image: 'design-12-midnight-lace.png', previewImage: 'design-12-midnight-lace-product.jpg', description: 'Black floral lace with adjustable strappy details and a matching brief; concept inspired by your supplied artwork.', note: 'Concept design only. Confirm final construction, sizing, inventory and commercial product photography before selling.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    scarlet: { name: 'Scarlet Satin', category: '13 · BLACKED DESIGN CONCEPT', image: 'design-13-scarlet-satin.png', previewImage: 'design-13-scarlet-satin-product.jpg', description: 'A deep burgundy satin-and-lace matching set concept from your supplied artwork.', note: 'Concept design only. The garment-detail image is a visual direction, not evidence of final product availability.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    ivory: { name: 'Ivory Bloom', category: '14 · BLACKED DESIGN CONCEPT', image: 'design-14-ivory-bloom.png', previewImage: 'design-14-ivory-bloom-product.jpg', description: 'Ivory lingerie with delicate floral embroidery and small bow details, based on your supplied concept image.', note: 'Concept design only. Verify fabric, product construction, sizes and stock before listing for sale.', previewNote: 'BLACKED CONCEPT PRODUCT VIEW · STOCK NOT CONFIRMED' },
    'syrn-demi': { name: 'Showpiece Basque · supplied reference', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-showpiece-basque.jpg', description: 'Cropped product photo from a screenshot you supplied; shown as external style inspiration only.', note: 'Not a BLACKED product or confirmed inventory. No direct external store link is used; commercial reuse requires appropriate rights.', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK', external: true, filterCategory: 'external', sourceType: 'external' },
    'syrn-balconette': { name: 'Garter Skirt · front reference', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-garter-skirt-front.jpg', description: 'Front-view style reference cropped from your supplied product screenshot, without browser/site navigation.', note: 'External-brand reference only. Not a BLACKED product; do not imply a collaboration or sell it as BLACKED stock.', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK', external: true, filterCategory: 'external', sourceType: 'external' },
    'syrn-bodysuit': { name: 'Garter Skirt · back reference', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-garter-skirt-back.jpg', description: 'Back-view style reference cropped from a product screenshot you supplied.', note: 'External-brand reference only. Not a BLACKED product; do not imply a collaboration or sell it as BLACKED stock.', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK', external: true, filterCategory: 'external', sourceType: 'external' },
  };
  // Additional owner-supplied images. External-brand images are separate reference-only options; no external store/site is embedded or linked.
  Object.assign(products, {
    'midnight-lace-alt': { name: 'Midnight Lace · alternate concept', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-midnight-lace-editorial.jpg', description: 'Additional black lace style-board visual supplied by you.', note: 'Concept/reference only; inventory, specifications and usage rights are not confirmed.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT · STOCK NOT CONFIRMED' },
    'midnight-lace-upload': { name: 'Midnight Lace · latest uploaded reference', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-midnight-lace-user-upload.jpg', description: 'A separate black-lace design reference from your latest uploaded set.', note: 'Reference/concept only; it is not confirmation of a stocked BLACKED SKU.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT · STOCK NOT CONFIRMED' },
    'midnight-sculpt-alt': { name: 'Midnight Sculpt · alternate concept', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-midnight-sculpt-variation.jpg', description: 'Alternate charcoal-and-black lace concept image supplied by you.', note: 'Concept/reference only; this image is not proof of a physical SKU or stock.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT · STOCK NOT CONFIRMED' },
    'noir-rose': { name: 'Noir Halter & Rose Demi', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-noir-halter-rose-demi.jpg', description: 'A noir halter and rose-demi design direction from your supplied visual.', note: 'Reference concept only; product construction, size range, price and inventory are unconfirmed.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT · STOCK NOT CONFIRMED' },
    'scarlet-ivory-grid': { name: 'Scarlet Satin & Ivory Bloom', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-scarlet-ivory-grid.jpg', description: 'Two colour and detail directions shown in your uploaded concept sheet.', note: 'Design-reference image only. Confirm exact SKUs and usage rights before public sale.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT GRID · STOCK NOT CONFIRMED' },
    'curve-comfort': { name: 'Curve Comfort', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-curve-comfort.jpg', description: 'Burgundy lace and fuller-coverage styling direction from your supplied concept.', note: 'Visual concept only. Do not claim fit, stretch, fabric or size availability until the garment is confirmed.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT · STOCK NOT CONFIRMED' },
    'model-duo': { name: 'Everyday Duo · style reference', category: 'BLACKED CAMPAIGN REFERENCE', image: 'owner-ref-model-duo.jpg', description: 'Two-look styling reference supplied for the BLACKED visual direction.', note: 'Campaign/reference only; not evidence of two confirmed products or a collaboration.', filterCategory: 'campaign', sourceType: 'campaign', previewNote: 'CAMPAIGN REFERENCE · SKU NOT CONFIRMED' },
    'duo-campaign': { name: 'Better Together · duo campaign', category: 'BLACKED CAMPAIGN CONCEPT', image: 'owner-ref-blacked-duo-campaign.jpg', description: 'Two-model, matching-confidence campaign concept supplied by you.', note: 'Campaign concept only; verify product details and usage rights before public use.', filterCategory: 'campaign', sourceType: 'campaign', previewNote: 'CAMPAIGN CONCEPT · SKU NOT CONFIRMED' },
    'ivory-alt': { name: 'Ivory Bloom · visual variation', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-ivory-bloom-variation.jpg', description: 'An alternate ivory floral embroidery design-reference sheet.', note: 'Concept/reference only, not verified stock; fabric and actual construction are not confirmed.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT · STOCK NOT CONFIRMED' },
    'move-alt': { name: 'Move Together · alternate campaign', category: 'BLACKED CAMPAIGN REFERENCE', image: 'owner-ref-move-together-alt.jpg', description: 'An additional warm-studio campaign visual supplied by you.', note: 'Campaign/reference only. Confirm any actual products, stock and image rights before selling.', filterCategory: 'campaign', sourceType: 'campaign', previewNote: 'CAMPAIGN REFERENCE · SKU NOT CONFIRMED' },
    'cat-cow': { name: 'Cat Cow Flow Together', category: 'BLACKED CAMPAIGN CONCEPT', image: 'owner-ref-cat-cow-flow.jpg', description: 'A movement and wellness campaign concept with the BLACKED visual identity.', note: 'Campaign concept only; not a verified separate garment SKU.', filterCategory: 'campaign', sourceType: 'campaign', previewNote: 'CAMPAIGN CONCEPT · SKU NOT CONFIRMED' },
    'bow-lace': { name: 'Bow Lace Collection', category: 'BLACKED DESIGN CONCEPT', image: 'owner-ref-bow-lace-collection.jpg', description: 'Pink lace with contrasting bows and strap-detail styling from your supplied visual.', note: 'Concept only; not a confirmed product, inventory, price or size range.', filterCategory: 'concept', sourceType: 'concept', previewNote: 'BLACKED CONCEPT · STOCK NOT CONFIRMED' },
    'move-upload': { name: 'Move Together · supplied alternate', category: 'BLACKED CAMPAIGN REFERENCE', image: 'owner-ref-move-together-upload.jpg', description: 'An additional owner-uploaded campaign image for reference.', note: 'Visual reference only; not a new confirmed stock item.', filterCategory: 'campaign', sourceType: 'campaign', previewNote: 'CAMPAIGN REFERENCE · SKU NOT CONFIRMED' },
    'stretch-upload': { name: 'Movement & Stretch · supplied alternate', category: 'MOVEMENT DESIGN REFERENCE', image: 'owner-ref-stretch-upload.jpg', description: 'The latest uploaded movement/stretch visual, kept as a separate reference image.', note: 'Design/photo reference only. It does not establish exact product specifications or sale stock.', filterCategory: 'campaign', sourceType: 'campaign', previewNote: 'MOVEMENT REFERENCE · SKU NOT CONFIRMED' },
    'syrn-garter-pose': { name: 'Garter Skirt · alternate reference', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-garter-skirt-pose.jpg', description: 'Alternate model-view crop from one of the external product screenshots you supplied.', note: 'External-brand reference only; no SYRN website is linked or embedded. Not BLACKED stock.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-luxury': { name: 'Luxury Collection · supplied inspiration', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-luxury.jpg', description: 'A user-supplied external-brand style concept image for design research.', note: 'Image contains external-brand identity. Inspiration only, not BLACKED inventory; obtain rights before public commercial reuse.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-bridal': { name: 'Bridal Edit · supplied inspiration', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-bridal.jpg', description: 'A user-supplied bridal-style external reference image.', note: 'External-brand inspiration only. This prototype does not link to or embed the external brand website.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-gift': { name: 'Gift Collection · supplied inspiration', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-gift.jpg', description: 'A user-provided external-brand gift collection reference.', note: 'External-brand inspiration only; not BLACKED stock or an authorized collaboration.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-romance': { name: 'Soft Romance · supplied inspiration', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-romance.jpg', description: 'A pink lace and floral styling reference supplied by you.', note: 'External-brand inspiration only; not BLACKED inventory or a product for sale.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-garter-front': { name: 'Garter Skirt · front product reference', category: 'EXTERNAL BRAND · DESIGN REFERENCE', image: 'external-ref-syrn-garter-skirt-front.jpg', description: 'Clean crop of the front product photo from your supplied external screenshot.', note: 'Reference only, not BLACKED stock. No direct external-store link has been added.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-skirting-editorial': { name: 'Skirting Around Garter Skirt · campaign reference', category: 'USER-SUPPLIED EXTERNAL BRAND REFERENCE', image: 'external-ref-syrn-skirting-garter-editorial.png', description: 'Full editorial reference image uploaded by you, showing a black lace bra, garter skirt and stockings look.', note: 'External-brand reference only, not BLACKED inventory. No external website is embedded or linked; public commercial reuse needs appropriate permission.', gallery: ['external-ref-syrn-garter-skirt-front.jpg','external-ref-syrn-garter-skirt-back.jpg','external-ref-syrn-garter-back-full.png'], external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-own-night': { name: 'Own the Night · campaign reference', category: 'USER-SUPPLIED EXTERNAL BRAND REFERENCE', image: 'external-ref-syrn-own-the-night.png', description: 'Black lace editorial direction supplied by you for inspiration.', note: 'External-brand reference only; not BLACKED stock or an authorized collaboration.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-curves-confidence': { name: 'Curves & Confidence · campaign reference', category: 'USER-SUPPLIED EXTERNAL BRAND REFERENCE', image: 'external-ref-syrn-curves-confidence.png', description: 'Campaign-style reference supplied by you, for private style planning.', note: 'External-brand reference only; not BLACKED stock or an authorized collaboration.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-signature-lace': { name: 'The Signature Lace Set · reference', category: 'USER-SUPPLIED EXTERNAL BRAND REFERENCE', image: 'external-ref-syrn-signature-lace.png', description: 'Lace set and garter skirt styling reference uploaded by you.', note: 'External-brand reference only. It does not confirm BLACKED product availability or usage rights.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-midnight-allure': { name: 'Midnight Allure · campaign reference', category: 'USER-SUPPLIED EXTERNAL BRAND REFERENCE', image: 'external-ref-syrn-midnight-allure.png', description: 'Dark editorial styling reference from your supplied images.', note: 'External-brand reference only; not BLACKED stock and not a product link.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' },
    'syrn-garter-back-full': { name: 'Garter Skirt · full back-view reference', category: 'USER-SUPPLIED EXTERNAL BRAND REFERENCE', image: 'external-ref-syrn-garter-back-full.png', description: 'Full back-view reference photo supplied by you.', note: 'External-brand reference only. Do not use as a BLACKED product listing without rights and product confirmation.', external: true, filterCategory: 'external', sourceType: 'external', previewNote: 'EXTERNAL DESIGN REFERENCE · NOT BLACKED STOCK' }
  });

  // Product reference metadata for non-commercial prototype decisions. These are visual references, not confirmed SKUs.
  const productMeta = {
    move: { source: 'BLACKED campaign visual', look: 'Charcoal / sporty set', styles: ['movement', 'everyday'], colors: ['black'], coverage: 'Balanced, active-inspired', sku: 'Not confirmed' },
    yoga: { source: 'BLACKED campaign visual', look: 'Movement-inspired set', styles: ['movement'], colors: ['black'], coverage: 'Balanced, active-inspired', sku: 'Not confirmed' },
    redlace: { source: 'Design reference', look: 'Red lace / strappy bodysuit', styles: ['lace', 'statement'], colors: ['red'], coverage: 'Statement / minimal', sku: 'Not confirmed' },
    stretch: { source: 'Shoot reference', look: 'Black movement styling', styles: ['movement', 'everyday'], colors: ['black'], coverage: 'Sport-inspired', sku: 'Not confirmed' },
    blacklace: { source: 'Design reference', look: 'Black lace / cut-out set', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Statement / minimal', sku: 'Not confirmed' },
    velvet: { source: 'Design reference', look: 'Pink velvet / black lace', styles: ['lace', 'statement'], colors: ['pink'], coverage: 'Statement / minimal', sku: 'Not confirmed' },
    rose: { source: 'Product-detail reference', look: 'Red decorative straps / rose accents', styles: ['statement'], colors: ['red'], coverage: 'Strappy / minimal', sku: 'Not confirmed' },
    butterfly: { source: 'Detail reference', look: 'Pink butterfly-inspired lace detail', styles: ['lace', 'statement'], colors: ['pink'], coverage: 'Detail reference only', sku: 'Not confirmed' },
    signature: { source: 'BLACKED campaign visual', look: 'Black comfort set', styles: ['everyday'], colors: ['black'], coverage: 'Comfort-led', sku: 'Not confirmed' },
    together: { source: 'BLACKED campaign visual', look: 'Black / red-accent comfort styling', styles: ['everyday', 'statement'], colors: ['black', 'red'], coverage: 'Comfort-led', sku: 'Not confirmed' },
    sculpt: { source: 'BLACKED concept', look: 'Charcoal / black lace', styles: ['lace', 'statement', 'everyday'], colors: ['black'], coverage: 'Balanced', sku: 'Concept only' },
    midnight: { source: 'BLACKED concept', look: 'Black floral lace / straps', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Minimal-detail reference', sku: 'Concept only' },
    scarlet: { source: 'BLACKED concept', look: 'Burgundy satin / lace', styles: ['lace', 'statement'], colors: ['red'], coverage: 'Balanced', sku: 'Concept only' },
    ivory: { source: 'BLACKED concept', look: 'Ivory floral embroidery', styles: ['lace', 'everyday'], colors: ['pink'], coverage: 'Balanced', sku: 'Concept only' },
    'syrn-demi': { source: 'User-supplied external-brand reference', look: 'Ivory basque / lace', styles: ['lace', 'statement'], colors: ['pink'], coverage: 'Basque reference', sku: 'External reference only' },
    'syrn-balconette': { source: 'User-supplied external-brand reference', look: 'Black garter skirt', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Skirt reference', sku: 'External reference only' },
    'syrn-bodysuit': { source: 'User-supplied external-brand reference', look: 'Black garter skirt, rear view', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Skirt reference', sku: 'External reference only' },
    'midnight-lace-alt': { source: 'Owner-supplied concept', look: 'Black floral lace', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Not confirmed', sku: 'Concept only' },
    'midnight-lace-upload': { source: 'Latest owner-supplied concept', look: 'Black floral lace', styles: ['lace', 'statement'], colors: ['black'], coverage: 'Not confirmed', sku: 'Concept only' },
    'midnight-sculpt-alt': { source: 'Owner-supplied concept', look: 'Charcoal / black lace', styles: ['lace', 'everyday'], colors: ['black'], coverage: 'Not confirmed', sku: 'Concept only' },
    'noir-rose': { source: 'Owner-supplied concept', look: 'Black halter / rose demi', styles: ['lace', 'statement'], colors: ['black', 'pink'], coverage: 'Not confirmed', sku: 'Concept only' },
    'scarlet-ivory-grid': { source: 'Owner-supplied concept board', look: 'Scarlet and ivory lace directions', styles: ['lace', 'statement'], colors: ['red', 'pink'], coverage: 'Not confirmed', sku: 'Concept only' },
    'curve-comfort': { source: 'Owner-supplied concept', look: 'Burgundy fuller-coverage set', styles: ['everyday', 'lace'], colors: ['red'], coverage: 'More coverage direction', sku: 'Concept only' },
    'model-duo': { source: 'Owner-supplied campaign reference', look: 'Two-look editorial', styles: ['everyday'], colors: ['black'], coverage: 'Not specified', sku: 'Reference only' },
    'duo-campaign': { source: 'Owner-supplied campaign concept', look: 'Move / Better Together', styles: ['everyday', 'movement'], colors: ['black', 'red'], coverage: 'Not specified', sku: 'Concept only' },
    'ivory-alt': { source: 'Owner-supplied concept', look: 'Ivory floral lace', styles: ['lace', 'everyday'], colors: ['pink'], coverage: 'Not confirmed', sku: 'Concept only' },
    'move-alt': { source: 'Owner-supplied campaign reference', look: 'Movement-inspired', styles: ['movement', 'everyday'], colors: ['black'], coverage: 'Not specified', sku: 'Reference only' },
    'cat-cow': { source: 'Owner-supplied campaign concept', look: 'Yoga / movement', styles: ['movement'], colors: ['black'], coverage: 'Not specified', sku: 'Concept only' },
    'bow-lace': { source: 'Owner-supplied concept', look: 'Pink bow lace', styles: ['lace', 'statement'], colors: ['pink'], coverage: 'Not confirmed', sku: 'Concept only' },
    'move-upload': { source: 'Owner-supplied campaign reference', look: 'Movement-inspired', styles: ['movement', 'everyday'], colors: ['black'], coverage: 'Not specified', sku: 'Reference only' },
    'stretch-upload': { source: 'Owner-supplied movement reference', look: 'Stretch / active style', styles: ['movement'], colors: ['black'], coverage: 'Not specified', sku: 'Reference only' },
    'syrn-garter-pose': { source: 'User-supplied external-brand reference', look: 'Garter skirt photo', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-luxury': { source: 'User-supplied external-brand reference', look: 'Black lace set', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-bridal': { source: 'User-supplied external-brand reference', look: 'Ivory lace', styles: ['lace'], colors: ['pink'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-gift': { source: 'User-supplied external-brand reference', look: 'Red gift collection', styles: ['lace', 'statement'], colors: ['red'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-romance': { source: 'User-supplied external-brand reference', look: 'Pink floral lace', styles: ['lace', 'statement'], colors: ['pink'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-garter-front': { source: 'User-supplied external-brand reference', look: 'Garter skirt front view', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-skirting-editorial': { source: 'User-supplied external-brand reference', look: 'Garter skirt / lace editorial', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-own-night': { source: 'User-supplied external-brand reference', look: 'Black lace night editorial', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-curves-confidence': { source: 'User-supplied external-brand reference', look: 'Black lace editorial', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-signature-lace': { source: 'User-supplied external-brand reference', look: 'Black signature lace', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-midnight-allure': { source: 'User-supplied external-brand reference', look: 'Black garter and lace look', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' },
    'syrn-garter-back-full': { source: 'User-supplied external-brand reference', look: 'Garter skirt back view', styles: ['lace', 'statement'], colors: ['black'], coverage: 'External reference', sku: 'External reference only' }
  };

  // Add every additional supplied image as its own catalog/reference card (without external store links).
  function renderAddedCatalogCards() {
    const grid = $('#productGrid');
    if (!grid) return;
    const present = new Set($$('.product-card', grid).map(card => card.dataset.product));
    Object.entries(products).forEach(([id, product]) => {
      if (present.has(id)) return;
      const category = product.filterCategory || (product.external ? 'external' : product.sourceType === 'campaign' ? 'campaign' : 'concept');
      const card = document.createElement('article');
      card.className = 'product-card';
      card.dataset.category = category;
      card.dataset.product = id;
      card.innerHTML = `<button class="product-image-button" type="button" data-open-product="${id}" aria-label="Open ${product.name} details"><img src="${product.image}" alt="${product.name} — user-supplied visual reference" loading="lazy"><span class="product-open" aria-hidden="true">↗</span></button><div class="product-meta"><div><p class="product-kicker">${product.category}</p><h3>${product.name}</h3></div><span class="product-mark" aria-hidden="true">${product.external ? '↗' : '♡'}</span></div><p class="product-desc">${product.description}</p><button class="product-link" type="button" data-preview-product="${id}">View selected photo <span aria-hidden="true">→</span></button>`;
      grid.appendChild(card);
    });
  }
  function updateCatalogFilterCounts() {
    const cards = $$('.product-card');
    $$('[data-filter-count]').forEach((span) => {
      const button = span.closest('[data-filter]');
      const filter = button?.dataset.filter || 'all';
      span.textContent = String(filter === 'all' ? cards.length : cards.filter(card => card.dataset.category === filter).length);
    });
  }
  renderAddedCatalogCards();
  updateCatalogFilterCounts();

  // v1.1 catalog search and sorting work on the fully rendered catalog, not only the original ten cards.
  const catalogSearch = $('#catalogSearch');
  const catalogSort = $('#catalogSort');
  const catalogClear = $('#catalogClear');
  const catalogStatus = $('#catalogStatus');
  const catalogEmpty = $('#catalogEmpty');
  const catalogGrid = $('#productGrid');
  const catalogInitialOrder = new Map($$('.product-card', catalogGrid).map((card, index) => [card.dataset.product, index]));
  const catalogFilterButtons = $$('.filter-chip[data-filter]');
  function applyCatalogView() {
    if (!catalogGrid) return;
    const query = String(catalogSearch?.value || '').trim().toLowerCase();
    const allCards = $$('.product-card', catalogGrid);
    const sortMode = String(catalogSort?.value || catalogSortMode);
    catalogSortMode = sortMode;
    const ordered = [...allCards].sort((a, b) => {
      if (sortMode === 'name-asc' || sortMode === 'name-desc') {
        const an = String(products[a.dataset.product]?.name || a.querySelector('h3')?.textContent || '').toLocaleLowerCase();
        const bn = String(products[b.dataset.product]?.name || b.querySelector('h3')?.textContent || '').toLocaleLowerCase();
        const result = an.localeCompare(bn);
        return sortMode === 'name-desc' ? -result : result;
      }
      return (catalogInitialOrder.get(a.dataset.product) ?? 9999) - (catalogInitialOrder.get(b.dataset.product) ?? 9999);
    });
    ordered.forEach(card => catalogGrid.appendChild(card));
    let shown = 0;
    ordered.forEach(card => {
      const categoryMatch = activeCatalogFilter === 'all' || card.dataset.category === activeCatalogFilter;
      const haystack = `${products[card.dataset.product]?.name || ''} ${products[card.dataset.product]?.description || ''} ${card.textContent || ''}`.toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      const visible = categoryMatch && queryMatch;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    catalogFilterButtons.forEach(button => {
      const active = button.dataset.filter === activeCatalogFilter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (catalogStatus) catalogStatus.textContent = `${shown} of ${allCards.length} references shown${query ? ` · search: “${query}”` : ''}${activeCatalogFilter !== 'all' ? ` · filter: ${activeCatalogFilter}` : ''}. Reference images and concepts are not confirmed stock SKUs.`;
    if (catalogEmpty) catalogEmpty.hidden = shown > 0;
    if (catalogClear) catalogClear.disabled = !query && activeCatalogFilter === 'all' && catalogSortMode === 'featured';
  }
  catalogFilterButtons.forEach(button => button.addEventListener('click', () => {
    activeCatalogFilter = button.dataset.filter || 'all';
    applyCatalogView();
  }));
  catalogSearch?.addEventListener('input', applyCatalogView);
  catalogSort?.addEventListener('change', applyCatalogView);
  catalogClear?.addEventListener('click', () => {
    activeCatalogFilter = 'all'; catalogSortMode = 'featured';
    if (catalogSearch) catalogSearch.value = '';
    if (catalogSort) catalogSort.value = 'featured';
    applyCatalogView();
    catalogSearch?.focus();
  });
  applyCatalogView();

  // Device-local wishlist: stores only selected reference IDs, never personal photos.
  const wishlistKey = 'blacked-fit-studio-wishlist-v03';
  let savedProducts = new Set();
  try {
    const storedWishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    if (Array.isArray(storedWishlist)) savedProducts = new Set(storedWishlist.filter(id => Object.prototype.hasOwnProperty.call(products, id)));
  } catch (_) { /* local storage may be unavailable in private/restricted browser modes */ }
  const compareProducts = new Set();
  const wishlistGrid = $('#wishlistGrid');
  const comparePanel = $('#comparePanel');
  const compareResults = $('#compareResults');
  const savedCount = $('#savedCount');

  function persistWishlist() {
    try { localStorage.setItem(wishlistKey, JSON.stringify([...savedProducts])); }
    catch (_) { /* wishlist continues to work for this session if storage is blocked */ }
  }

  function renderWishlist() {
    if (savedCount) savedCount.textContent = String(savedProducts.size);
    if (!wishlistGrid) return;
    if (!savedProducts.size) {
      wishlistGrid.innerHTML = '<div class="saved-empty"><span>♡</span><p>Your wishlist is empty. Tap “Save style” on any reference to keep it here.</p></div>';
      return;
    }
    wishlistGrid.innerHTML = [...savedProducts].map(id => {
      const product = products[id];
      const meta = productMeta[id] || {};
      return `<article class="saved-style-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div class="saved-style-copy"><p class="product-kicker">${meta.source || 'Original reference'}</p><h4>${product.name}</h4><p>${product.description}</p><div class="saved-style-actions"><button type="button" class="button button-dark button-small" data-saved-try="${id}">Open in try-on</button><button type="button" class="subtle-button" data-saved-remove="${id}">Remove</button></div></div></article>`;
    }).join('');
    $$('[data-saved-try]', wishlistGrid).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.savedTry, 'set')));
    $$('[data-saved-remove]', wishlistGrid).forEach(button => button.addEventListener('click', () => toggleWishlist(button.dataset.savedRemove)));
  }

  function toggleWishlist(productId) {
    if (!products[productId]) return;
    if (savedProducts.has(productId)) {
      savedProducts.delete(productId);
      toast('Removed from saved styles.');
    } else {
      savedProducts.add(productId);
      toast('Saved on this device.');
    }
    persistWishlist();
    updateProductActionButtons();
    renderWishlist();
  }

  function updateProductActionButtons() {
    $$('[data-wishlist-toggle]').forEach(button => {
      const isSaved = savedProducts.has(button.dataset.wishlistToggle);
      button.classList.toggle('is-saved', isSaved);
      button.setAttribute('aria-pressed', String(isSaved));
      button.textContent = isSaved ? '♥ Saved' : '♡ Save style';
    });
    $$('[data-quiz-save]').forEach(button => {
      const isSaved = savedProducts.has(button.dataset.quizSave);
      button.classList.toggle('is-saved', isSaved);
      button.setAttribute('aria-pressed', String(isSaved));
      button.textContent = isSaved ? '♥ Saved' : '♡ Save';
    });
    $$('[data-compare-toggle]').forEach(button => {
      const isCompared = compareProducts.has(button.dataset.compareToggle);
      button.classList.toggle('is-compared', isCompared);
      button.setAttribute('aria-pressed', String(isCompared));
      button.textContent = isCompared ? '✓ Comparing' : '+ Compare';
    });
  }

  // Attach concise controls to each original reference card.
  $$('.product-card').forEach(card => {
    const productId = card.dataset.product;
    const tryButton = card.querySelector('[data-preview-product]');
    if (!productId || !tryButton || card.querySelector('.product-action-row')) return;
    tryButton.insertAdjacentHTML('afterend', `<div class="product-action-row"><button type="button" class="save-style-button" data-wishlist-toggle="${productId}" aria-pressed="false">♡ Save style</button><button type="button" class="compare-style-button" data-compare-toggle="${productId}" aria-pressed="false">+ Compare</button></div>`);
  });
  $$('[data-wishlist-toggle]').forEach(button => button.addEventListener('click', () => toggleWishlist(button.dataset.wishlistToggle)));
  $$('[data-compare-toggle]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.compareToggle;
    if (compareProducts.has(id)) {
      compareProducts.delete(id);
    } else {
      if (compareProducts.size >= 3) { toast('Compare up to three references at a time.'); return; }
      compareProducts.add(id);
    }
    updateProductActionButtons();
    renderCompare();
    if (comparePanel && !comparePanel.hidden) comparePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }));

  function renderCompare() {
    if (!comparePanel || !compareResults) return;
    comparePanel.hidden = compareProducts.size === 0;
    if (!compareProducts.size) { compareResults.innerHTML = ''; return; }
    if (compareProducts.size === 1) {
      const id = [...compareProducts][0];
      compareResults.innerHTML = `<div class="compare-one"><p><strong>${products[id].name}</strong> selected. Add one more reference to compare them side by side.</p></div>`;
      return;
    }
    compareResults.innerHTML = [...compareProducts].map(id => {
      const product = products[id];
      const meta = productMeta[id] || {};
      return `<article class="compare-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div class="compare-card-copy"><p class="product-kicker">${meta.source || 'Original reference'}</p><h4>${product.name}</h4><p>${product.description}</p><dl><div><dt>Visual direction</dt><dd>${meta.look || 'Reference visual'}</dd></div><div><dt>Coverage cue</dt><dd>${meta.coverage || 'Not specified'}</dd></div><div><dt>Confirmed SKU / price / stock</dt><dd>Not confirmed</dd></div></dl><button type="button" class="subtle-button" data-compare-remove="${id}">Remove from comparison</button><button type="button" class="text-link" data-compare-try="${id}">Open in try-on <span aria-hidden="true">→</span></button></div></article>`;
    }).join('');
    $$('[data-compare-remove]', compareResults).forEach(button => button.addEventListener('click', () => {
      compareProducts.delete(button.dataset.compareRemove);
      updateProductActionButtons(); renderCompare();
    }));
    $$('[data-compare-try]', compareResults).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.compareTry, 'set')));
  }
  $('#clearCompare')?.addEventListener('click', () => { compareProducts.clear(); updateProductActionButtons(); renderCompare(); });
  $('#clearWishlist')?.addEventListener('click', () => {
    savedProducts.clear(); persistWishlist(); updateProductActionButtons(); renderWishlist(); toast('Saved styles cleared from this device.');
  });
  renderWishlist();
  updateProductActionButtons();
  renderCompare();

  const productDialog = $('#productDialog');
  const dialogImage = $('#dialogImage');
  const dialogTitle = $('#dialogTitle');
  const dialogDescription = $('#dialogDescription');
  const dialogClose = $('#dialogClose');
  const dialogPreview = $('#dialogPreview');
  const dialogGallery = $('#dialogGallery');
  let activeProduct = 'signature';
  let dialogLayer = 'set';

  function openProduct(productId) {
    const product = products[productId];
    if (!product || !productDialog) return;
    activeProduct = productId;
    dialogTitle.textContent = product.name;
    dialogDescription.textContent = `${product.description} ${product.note}`;
    dialogImage.src = product.image;
    dialogImage.alt = `${product.name} — selected reference image`;
    if (dialogGallery) {
      const galleryImages = [...new Set([product.image, ...(Array.isArray(product.gallery) ? product.gallery : []), ...(product.previewImage && product.previewImage !== product.image ? [product.previewImage] : [])])];
      dialogGallery.innerHTML = galleryImages.map((src, index) => `<button type="button" class="dialog-thumb${index === 0 ? ' is-active' : ''}" data-dialog-thumb="${src}" aria-label="View image ${index + 1} of ${galleryImages.length}" aria-pressed="${index === 0 ? 'true' : 'false'}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
      $$('[data-dialog-thumb]', dialogGallery).forEach(button => button.addEventListener('click', () => {
        dialogImage.src = button.dataset.dialogThumb; dialogImage.alt = `${product.name} — gallery image`;
        $$('[data-dialog-thumb]', dialogGallery).forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', String(selected)); });
      }));
    }
    dialogLayer = 'set';
    if (typeof productDialog.showModal === 'function') {
      productDialog.showModal();
      document.body.classList.add('dialog-open');
    } else {
      productDialog.setAttribute('open', '');
      document.body.classList.add('dialog-open');
    }
  }
  function closeProduct() {
    if (!productDialog) return;
    if (typeof productDialog.close === 'function' && productDialog.open) productDialog.close();
    else productDialog.removeAttribute('open');
    document.body.classList.remove('dialog-open');
  }
  $$('[data-open-product]').forEach(button => button.addEventListener('click', () => openProduct(button.dataset.openProduct)));
  dialogClose?.addEventListener('click', closeProduct);
  productDialog?.addEventListener('click', event => {
    if (event.target === productDialog) closeProduct();
  });
  productDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  // Manual, browser-local try-on illustration studio. No photo file is posted to a server.
  const canvas = $('#tryCanvas');
  const ctx = canvas?.getContext('2d');
  const photoUpload = $('#photoUpload');
  const canvasBadge = $('#canvasBadge');
  const canvasHint = $('#canvasHint');
  const studioStatus = $('#studioStatus');
  const layerScale = $('#layerScale');
  const layerRotate = $('#layerRotate');
  const scaleOutput = $('#scaleOutput');
  const rotateOutput = $('#rotateOutput');
  const downloadPreview = $('#downloadPreview');
  const colorButtons = $$('.swatch');
  const layerButtons = $$('[data-layer]');
  const previewModeButtons = $$('[data-preview-mode]');
  const manualModeControls = $('#manualModeControls');
  const referenceImageCache = new Map();
  const referenceImageErrors = new Set();

  const studioState = {
    photo: null,
    photoUrl: null,
    activeLayer: 'top',
    mode: 'set',
    color: '#252123',
    items: {
      top: { x: 360, y: 383, baseW: 238, baseH: 148, scale: 100, angle: 0 },
      bottom: { x: 360, y: 557, baseW: 190, baseH: 135, scale: 100, angle: 0 }
    },
    dragging: false,
    dragStart: null,
    selectedProduct: 'signature',
    previewMode: 'reference',
    referenceView: 'detail'
  };
  const canvasW = canvas?.width || 720;
  const canvasH = canvas?.height || 960;

  function setStudioStatus(message) {
    if (studioStatus) studioStatus.textContent = message;
  }
  function layerVisible(key) {
    return studioState.mode === 'set' || studioState.mode === key;
  }
  function currentItem() {
    return studioState.items[studioState.activeLayer];
  }
  function itemSize(item) {
    return { w: item.baseW * item.scale / 100, h: item.baseH * item.scale / 100 };
  }


  function drawSelectedReference() {
    const product = products[studioState.selectedProduct] || products.signature;
    const displayImage = studioState.referenceView === 'detail' && product.previewImage ? product.previewImage : product.image;
    ctx.fillStyle = '#eee1da';
    ctx.fillRect(0, 0, canvasW, canvasH);
    let image = referenceImageCache.get(displayImage);
    if (!image) {
      image = new Image();
      referenceImageCache.set(displayImage, image);
      image.onload = () => {
        const current = products[studioState.selectedProduct] || products.signature;
        const selectedDisplay = studioState.referenceView === 'detail' && current.previewImage ? current.previewImage : current.image;
        if (studioState.previewMode === 'reference' && selectedDisplay === displayImage) drawScene();
      };
      image.onerror = () => {
        referenceImageErrors.add(displayImage);
        const current = products[studioState.selectedProduct] || products.signature;
        const currentDisplay = studioState.referenceView === 'detail' && current.previewImage ? current.previewImage : current.image;
        if (studioState.previewMode === 'reference' && currentDisplay === displayImage) {
          drawScene();
          setStudioStatus(`The selected image for “${current.name}” could not load. No other product image was substituted.`);
        }
      };
      image.src = displayImage;
    }
    if (referenceImageErrors.has(displayImage)) {
      ctx.fillStyle = '#49363b';
      ctx.font = '600 20px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Selected image unavailable', canvasW / 2, canvasH / 2 - 12);
      ctx.font = '13px Arial, sans-serif';
      ctx.fillText('Check that this product image file exists in the repository.', canvasW / 2, canvasH / 2 + 18);
    } else if (image.complete && image.naturalWidth) {
      const padX = 22, padTop = 18, padBottom = 92;
      const scale = Math.min((canvasW - padX * 2) / image.naturalWidth, (canvasH - padTop - padBottom) / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const x = (canvasW - width) / 2;
      const y = padTop + ((canvasH - padTop - padBottom) - height) / 2;
      ctx.drawImage(image, x, y, width, height);
    } else {
      ctx.fillStyle = '#89737a';
      ctx.font = '500 20px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Loading selected reference photo…', canvasW / 2, canvasH / 2);
    }
    const panelY = canvasH - 85;
    ctx.fillStyle = 'rgba(33, 25, 28, .88)';
    ctx.fillRect(0, panelY, canvasW, 85);
    ctx.fillStyle = '#f9e9ed';
    ctx.textAlign = 'center';
    ctx.font = '700 20px Arial, sans-serif';
    const title = product.name.length > 36 ? product.name.slice(0, 33) + '…' : product.name;
    ctx.fillText(title, canvasW / 2, panelY + 31);
    ctx.fillStyle = '#e8d2d7';
    ctx.font = '12px Arial, sans-serif';
    const note = product.previewNote || 'SELECTED REFERENCE · NOT A BODY-FIT SIMULATION';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText(note.length > 62 ? note.slice(0, 59) + '…' : note, canvasW / 2, panelY + 55);
  }

  function drawPhoto() {
    const photo = studioState.photo;
    if (!photo) {
      // Never show a demo mannequin as if it were the selected garment.
      drawSelectedReference();
      return;
    }
    ctx.fillStyle = '#ded0c8';
    ctx.fillRect(0, 0, canvasW, canvasH);
    const ratio = Math.min(canvasW / photo.naturalWidth, canvasH / photo.naturalHeight);
    const width = photo.naturalWidth * ratio;
    const height = photo.naturalHeight * ratio;
    const x = (canvasW - width) / 2;
    const y = (canvasH - height) / 2;
    ctx.drawImage(photo, x, y, width, height);
    // Soft edge treatment so the image always fits the studio frame.
    ctx.strokeStyle = 'rgba(42,25,29,.08)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvasW - 2, canvasH - 2);
  }

  function drawTop(item) {
    const { w, h } = itemSize(item);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle * Math.PI / 180);
    ctx.fillStyle = studioState.color;
    ctx.strokeStyle = 'rgba(255,246,247,.65)';
    ctx.lineWidth = Math.max(1.6, w * .008);
    // Simple stylised bralette silhouette — deliberately illustrative, not a real garment model.
    ctx.beginPath();
    ctx.moveTo(-w * .48, h * .02);
    ctx.bezierCurveTo(-w * .52, -h * .22, -w * .42, -h * .53, -w * .22, -h * .48);
    ctx.bezierCurveTo(-w * .09, -h * .46, -w * .035, -h * .12, 0, h * .03);
    ctx.bezierCurveTo(w * .035, -h * .12, w * .09, -h * .46, w * .22, -h * .48);
    ctx.bezierCurveTo(w * .42, -h * .53, w * .52, -h * .22, w * .48, h * .02);
    ctx.lineTo(w * .40, h * .24);
    ctx.quadraticCurveTo(0, h * .43, -w * .40, h * .24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Cup seam
    ctx.beginPath();
    ctx.moveTo(0, h * .02); ctx.quadraticCurveTo(-w * .20, h * .03, -w * .29, -h * .11);
    ctx.moveTo(0, h * .02); ctx.quadraticCurveTo(w * .20, h * .03, w * .29, -h * .11);
    ctx.stroke();
    // Band
    ctx.beginPath();
    ctx.moveTo(-w * .4, h * .22); ctx.quadraticCurveTo(0, h * .39, w * .4, h * .22);
    ctx.lineWidth = Math.max(3, w * .032); ctx.stroke();
    // Straps
    ctx.beginPath();
    ctx.moveTo(-w * .3, -h * .22); ctx.quadraticCurveTo(-w * .28, -h * .72, -w * .14, -h * .78);
    ctx.moveTo(w * .3, -h * .22); ctx.quadraticCurveTo(w * .28, -h * .72, w * .14, -h * .78);
    ctx.lineWidth = Math.max(3, w * .027); ctx.stroke();
    // Small centre accent
    ctx.fillStyle = '#f4c5d2';
    ctx.beginPath(); ctx.arc(0, h * .07, Math.max(3, w * .018), 0, Math.PI * 2); ctx.fill();
    drawLaceDetails(w, h);
    ctx.restore();
  }

  function drawBottom(item) {
    const { w, h } = itemSize(item);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle * Math.PI / 180);
    ctx.fillStyle = studioState.color;
    ctx.strokeStyle = 'rgba(255,246,247,.66)';
    ctx.lineWidth = Math.max(1.6, w * .008);
    ctx.beginPath();
    ctx.moveTo(-w * .48, -h * .35);
    ctx.quadraticCurveTo(-w * .24, -h * .22, 0, -h * .30);
    ctx.quadraticCurveTo(w * .24, -h * .22, w * .48, -h * .35);
    ctx.lineTo(w * .39, -h * .02);
    ctx.lineTo(w * .23, h * .47);
    ctx.quadraticCurveTo(0, h * .39, -w * .23, h * .47);
    ctx.lineTo(-w * .39, -h * .02);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-w * .48, -h * .35); ctx.quadraticCurveTo(0, -h * .2, w * .48, -h * .35);
    ctx.lineWidth = Math.max(3, w * .035); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -h * .25); ctx.quadraticCurveTo(-w * .04, h * .05, 0, h * .28);
    ctx.strokeStyle = 'rgba(255,246,247,.5)'; ctx.lineWidth = Math.max(1.5, w * .01); ctx.stroke();
    drawLaceDetails(w, h);
    ctx.restore();
  }

  function drawLaceDetails(w, h) {
    // Subtle repeat dots make the illustration read as fabric without pretending to be photo-realistic.
    ctx.save();
    ctx.fillStyle = 'rgba(255,235,241,.28)';
    const step = Math.max(10, w * .065);
    for (let row = 0; row < 3; row += 1) {
      for (let col = -3; col <= 3; col += 1) {
        ctx.beginPath();
        ctx.arc(col * step, -h * .1 + row * step, Math.max(1.2, w * .006), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawSelection(item) {
    const { w, h } = itemSize(item);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.angle * Math.PI / 180);
    ctx.strokeStyle = 'rgba(255,255,255,.9)';
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 6]);
    ctx.strokeRect(-w * .58, -h * .85, w * 1.16, h * 1.7);
    ctx.setLineDash([]);
    ctx.fillStyle = '#fffaf7';
    ctx.strokeStyle = '#8f435b';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(w * .58, -h * .85, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawScene(showSelection = true) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasW, canvasH);
    if (studioState.previewMode === 'reference' || !studioState.photo) {
      // Product/reference photo always wins unless a customer has uploaded a photo
      // and explicitly switched to the optional manual guide mode.
      drawSelectedReference();
      return;
    }
    drawPhoto();
    if (layerVisible('top')) drawTop(studioState.items.top);
    if (layerVisible('bottom')) drawBottom(studioState.items.bottom);
    if (showSelection) {
      const item = currentItem();
      if (item && layerVisible(studioState.activeLayer)) drawSelection(item);
    }
  }

  function updatePreviewModeUI() {
    const isReference = studioState.previewMode === 'reference';
    const manualButton = $('[data-preview-mode="manual"]');
    if (manualButton) {
      manualButton.disabled = !studioState.photo;
      manualButton.title = studioState.photo ? 'Show your local photo with a generic manual illustration overlay' : 'Choose your own photo first; the selected product photo stays visible by default';
    }
    previewModeButtons.forEach(button => {
      const selected = button.dataset.previewMode === studioState.previewMode;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (manualModeControls) manualModeControls.hidden = isReference;
    if (canvasBadge) canvasBadge.textContent = isReference ? 'SELECTED PRODUCT / REFERENCE PHOTO' : (studioState.photo ? 'YOUR PHOTO · LOCAL' : 'ILLUSTRATION GUIDE');
    if (canvasHint) canvasHint.textContent = isReference
      ? 'This canvas shows the selected item’s own image: a supplied product-detail concept view when available, otherwise its exact original reference image. It does not simulate body fit.'
      : (studioState.photo
        ? 'Your photo is local to this browser. Drag the generic illustration to explore placement; the selected reference remains above for comparison.'
        : 'This generic illustration is only a positioning guide. Select a product photo to return to the real selected image.');
    const shell = $('#canvasShell');
    if (shell) shell.classList.toggle('is-reference-mode', isReference);
    drawScene();
  }

  previewModeButtons.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.previewMode === 'manual' && !studioState.photo) {
      setStudioStatus('Choose your own photo first. The selected product photo stays in the main preview until you explicitly switch modes.');
      return;
    }
    studioState.previewMode = button.dataset.previewMode === 'manual' ? 'manual' : 'reference';
    updatePreviewModeUI();
    setStudioStatus(studioState.previewMode === 'reference'
      ? 'Selected product/reference photo is now shown in the canvas.'
      : 'Illustration guide is active. It is a generic guide, not the selected garment; tap Selected Product Photo to return to the selected image.');
  }));

  function updateLayerControls() {
    const item = currentItem();
    if (layerScale) layerScale.value = String(item.scale);
    if (layerRotate) layerRotate.value = String(item.angle);
    if (scaleOutput) scaleOutput.value = `${item.scale}%`;
    if (rotateOutput) rotateOutput.value = `${item.angle}°`;
    layerButtons.forEach(button => {
      const active = button.dataset.layer === studioState.mode;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function setLayer(layer) {
    if (layer === 'set') {
      studioState.mode = 'set';
      studioState.activeLayer = 'top';
    } else {
      studioState.mode = layer;
      studioState.activeLayer = layer;
    }
    updateLayerControls();
    drawScene();
    setStudioStatus(layer === 'set' ? 'Set view selected. Tap or drag either garment layer to reposition it.' : `${layer === 'top' ? 'Top' : 'Bottom'} layer selected. Drag it on the canvas or use the controls below.`);
  }
  layerButtons.forEach(button => button.addEventListener('click', () => setLayer(button.dataset.layer)));

  colorButtons.forEach(button => button.addEventListener('click', () => {
    studioState.color = button.dataset.colour;
    colorButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
    drawScene();
    setStudioStatus('Colour updated for the illustration. This is a manual visual mockup only.');
  }));

  layerScale?.addEventListener('input', () => {
    currentItem().scale = Number(layerScale.value);
    updateLayerControls();
    drawScene();
  });
  layerRotate?.addEventListener('input', () => {
    currentItem().angle = Number(layerRotate.value);
    updateLayerControls();
    drawScene();
  });

  function resetPlacement() {
    studioState.items.top = { x: 360, y: 383, baseW: 238, baseH: 148, scale: 100, angle: 0 };
    studioState.items.bottom = { x: 360, y: 557, baseW: 190, baseH: 135, scale: 100, angle: 0 };
    studioState.activeLayer = 'top';
    studioState.mode = 'set';
    updateLayerControls();
    drawScene();
    setStudioStatus('Placement reset. Drag layers to suit your photo; the tool does not detect body proportions.');
  }
  $('#resetLayer')?.addEventListener('click', resetPlacement);

  function loadPhoto(file) {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setStudioStatus('Please choose a JPG, PNG or WEBP image.');
      if (photoUpload) photoUpload.value = '';
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setStudioStatus('That image is larger than 12 MB. Choose a smaller image to keep the preview fast.');
      if (photoUpload) photoUpload.value = '';
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (studioState.photoUrl) URL.revokeObjectURL(studioState.photoUrl);
      studioState.photo = image;
      studioState.photoUrl = url;
      // Keep the actual selected product/reference as the main preview after upload.
      // The customer must tap the separate guide button to see a generic overlay.
      studioState.previewMode = 'reference';
      updatePreviewModeUI();
      setStudioStatus('Your photo is ready in this browser. The selected product photo remains the main preview. Tap “My photo + guide” only if you want a generic illustration over your photo.');
      if (photoUpload) photoUpload.value = '';
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setStudioStatus('That image could not be opened. Try a different JPG, PNG or WEBP file.');
      if (photoUpload) photoUpload.value = '';
    };
    image.src = url;
  }
  photoUpload?.addEventListener('change', event => loadPhoto(event.target.files?.[0]));
  $('#clearPhoto')?.addEventListener('click', () => {
    if (studioState.photoUrl) URL.revokeObjectURL(studioState.photoUrl);
    studioState.photo = null;
    studioState.photoUrl = null;
    if (photoUpload) photoUpload.value = '';
    studioState.previewMode = 'reference';
    updatePreviewModeUI();
    setStudioStatus('Your uploaded photo was cleared from the preview. The selected original reference photo is shown again.');
  });

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvasW / rect.width, y: (event.clientY - rect.top) * canvasH / rect.height };
  }
  function hitTest(point, key) {
    const item = studioState.items[key];
    const { w, h } = itemSize(item);
    const angle = -item.angle * Math.PI / 180;
    const dx = point.x - item.x;
    const dy = point.y - item.y;
    const localX = dx * Math.cos(angle) - dy * Math.sin(angle);
    const localY = dx * Math.sin(angle) + dy * Math.cos(angle);
    return Math.abs(localX) <= w * .6 && Math.abs(localY) <= h * .9;
  }
  if (canvas) {
    canvas.addEventListener('pointerdown', event => {
      if (!ctx || studioState.previewMode !== 'manual') return;
      const point = canvasPoint(event);
      let selected = studioState.activeLayer;
      if (studioState.mode === 'set') {
        if (hitTest(point, 'bottom')) selected = 'bottom';
        else if (hitTest(point, 'top')) selected = 'top';
      } else {
        selected = studioState.mode;
      }
      studioState.activeLayer = selected;
      studioState.dragging = true;
      studioState.dragStart = { pointer: point, x: studioState.items[selected].x, y: studioState.items[selected].y };
      canvas.setPointerCapture?.(event.pointerId);
      updateLayerControls();
      drawScene();
      setStudioStatus(`Moving ${selected} layer. Release to finish positioning.`);
      event.preventDefault();
    });
    canvas.addEventListener('pointermove', event => {
      if (!studioState.dragging || !studioState.dragStart) return;
      const point = canvasPoint(event);
      const dx = point.x - studioState.dragStart.pointer.x;
      const dy = point.y - studioState.dragStart.pointer.y;
      const item = currentItem();
      item.x = Math.max(25, Math.min(canvasW - 25, studioState.dragStart.x + dx));
      item.y = Math.max(25, Math.min(canvasH - 25, studioState.dragStart.y + dy));
      drawScene();
    });
    const endDrag = () => {
      if (studioState.dragging) setStudioStatus('Placement updated. This is a visual mockup, not a fit prediction.');
      studioState.dragging = false;
      studioState.dragStart = null;
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('keydown', event => {
      if (studioState.previewMode !== 'manual') return;
      const move = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[event.key];
      if (!move) return;
      const item = currentItem();
      item.x = Math.max(25, Math.min(canvasW - 25, item.x + move[0]));
      item.y = Math.max(25, Math.min(canvasH - 25, item.y + move[1]));
      drawScene();
      setStudioStatus('Placement moved with keyboard.');
      event.preventDefault();
    });
  }

  downloadPreview?.addEventListener('click', () => {
    if (!canvas) return;
    try {
      drawScene(false);
      const saveCanvas = document.createElement('canvas');
      saveCanvas.width = canvasW;
      saveCanvas.height = canvasH;
      const saveCtx = saveCanvas.getContext('2d');
      saveCtx.drawImage(canvas, 0, 0);
      drawScene(true);
      saveCanvas.toBlob(blob => {
        if (!blob) {
          setStudioStatus('Could not create the image. Try again or choose a different photo.');
          return;
        }
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'blacked-manual-preview.png';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1200);
        setStudioStatus('Preview saved to your device. The image was generated in your browser.');
        toast('Your manual preview is ready to save.');
      }, 'image/png');
    } catch (error) {
      drawScene(true);
      setStudioStatus('Preview could not be saved. Try a smaller personal photo or switch back to the selected reference photo.');
    }
  });

  // The ten original references are selectable inside Try-On Studio itself.
  const studioProductGrid = $('#studioProductGrid');
  const studioSelectedImage = $('#studioSelectedImage');
  const studioSelectedCategory = $('#studioSelectedCategory');
  const studioSelectedName = $('#studioSelectedName');
  const studioSelectedDescription = $('#studioSelectedDescription');
  const studioSelectedDetailImage = $('#studioSelectedDetailImage');
  const studioProductCount = $('#studioProductCount');

  function syncStudioProductPicker() {
    const productId = studioState.selectedProduct || activeProduct || 'signature';
    const product = products[productId];
    if (!product) return;
    if (studioSelectedImage) { studioSelectedImage.src = product.image; studioSelectedImage.alt = `${product.name} — supplied campaign or reference image`; }
    if (studioSelectedDetailImage) {
      if (product.previewImage && product.previewImage !== product.image) {
        studioSelectedDetailImage.src = product.previewImage;
        studioSelectedDetailImage.alt = `${product.name} — separate garment-detail concept view`;
        studioSelectedDetailImage.hidden = false;
      } else {
        studioSelectedDetailImage.removeAttribute('src');
        studioSelectedDetailImage.hidden = true;
      }
    }
    if (studioSelectedCategory) studioSelectedCategory.textContent = product.category;
    if (studioSelectedName) studioSelectedName.textContent = product.name;
    if (studioSelectedDescription) studioSelectedDescription.textContent = product.description;
    const referenceViewButton = $('[data-studio-view="reference"]');
    const detailViewButton = $('[data-studio-view="detail"]');
    if (referenceViewButton) {
      referenceViewButton.disabled = false;
      referenceViewButton.setAttribute('aria-pressed', String(studioState.referenceView !== 'detail' || !product.previewImage));
      referenceViewButton.classList.toggle('is-selected', studioState.referenceView !== 'detail' || !product.previewImage);
    }
    if (detailViewButton) {
      detailViewButton.disabled = !product.previewImage;
      detailViewButton.setAttribute('aria-pressed', String(studioState.referenceView === 'detail' && Boolean(product.previewImage)));
      detailViewButton.classList.toggle('is-selected', studioState.referenceView === 'detail' && Boolean(product.previewImage));
      detailViewButton.title = product.previewImage ? 'Show the separate supplied garment-detail view' : 'This reference has no separate product-detail image';
    }
    if (studioProductCount) studioProductCount.textContent = `${Object.keys(products).length} options`;
    const pickerHeading = $('.studio-picker-heading h4'); if (pickerHeading) pickerHeading.textContent = `${Object.keys(products).length} image options`;
    $$('[data-studio-product]', studioProductGrid || document).forEach(button => {
      const selected = button.dataset.studioProduct === productId;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function renderStudioProductPicker() {
    if (!studioProductGrid) return;
    let lastGroup = '';
    const entries = Object.entries(products);
    studioProductGrid.innerHTML = entries.map(([id, product], index) => {
      const isExternal = Boolean(product.external) || id.startsWith('syrn-');
      const isConcept = product.sourceType === 'concept' || ['sculpt', 'midnight', 'scarlet', 'ivory'].includes(id);
      const isCampaign = product.sourceType === 'campaign';
      const group = isExternal ? 'USER-SUPPLIED EXTERNAL BRAND REFERENCES · INSPIRATION ONLY' : isConcept ? 'BLACKED DESIGN CONCEPTS · STOCK NOT CONFIRMED' : isCampaign ? 'CAMPAIGN REFERENCES · NOT STOCK SKUS' : 'YOUR ORIGINAL REFERENCES';
      const divider = group !== lastGroup ? `<div class="studio-picker-group-label">${group}</div>` : '';
      lastGroup = group;
      const thumb = product.previewImage || product.image;
      return `${divider}<button type="button" class="studio-product-option" data-studio-product="${id}" aria-pressed="${id === (studioState.selectedProduct || 'signature') ? 'true' : 'false'}">
        <img src="${thumb}" alt="" loading="lazy"><span class="studio-product-number">${String(index + 1).padStart(2, '0')}</span><span class="studio-product-name">${product.name}</span><span class="studio-product-type">${(productMeta[id]?.source || 'Original reference')}</span>
      </button>`;
    }).join('');
    $$('[data-studio-product]', studioProductGrid).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.studioProduct, 'set')));
    syncStudioProductPicker();
  }

  // Product actions launch the manual studio, with no AI inference.
  function goToStudio(productId, layer = 'set') {
    activeProduct = productId || activeProduct;
    studioState.selectedProduct = activeProduct;
    studioState.previewMode = 'reference';
    const product = products[activeProduct];
    studioState.referenceView = product?.previewImage ? 'detail' : 'reference';
    const suggestedColors = {
      redlace: '#b84f70', blacklace: '#252123', velvet: '#6e4259', rose: '#b84f70', sculpt: '#252123', midnight: '#252123', scarlet: '#70253a', ivory: '#d8c5ad', 'syrn-demi': '#c7978d', 'syrn-balconette': '#242026', 'syrn-bodysuit': '#7d384f',
      butterfly: '#b84f70', move: '#252123', yoga: '#252123', stretch: '#252123',
      signature: '#252123', together: '#252123', 'midnight-lace-alt': '#252123', 'midnight-lace-upload': '#252123', 'midnight-sculpt-alt': '#252123', 'noir-rose': '#252123', 'scarlet-ivory-grid': '#70253a', 'curve-comfort': '#70253a', 'model-duo': '#252123', 'duo-campaign': '#252123', 'ivory-alt': '#d8c5ad', 'move-alt': '#252123', 'cat-cow': '#252123', 'bow-lace': '#b84f70', 'move-upload': '#252123', 'stretch-upload': '#252123', 'syrn-garter-pose': '#252123', 'syrn-luxury': '#252123', 'syrn-bridal': '#d8c5ad', 'syrn-gift': '#70253a', 'syrn-romance': '#b84f70', 'syrn-garter-front': '#252123', 'syrn-skirting-editorial': '#252123', 'syrn-own-night': '#252123', 'syrn-curves-confidence': '#252123', 'syrn-signature-lace': '#252123', 'syrn-midnight-allure': '#252123', 'syrn-garter-back-full': '#252123'
    };
    studioState.color = suggestedColors[activeProduct] || '#252123';
    updatePreviewModeUI();
    syncStudioProductPicker();
    colorButtons.forEach(button => {
      const active = button.dataset.colour === studioState.color;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    setLayer(layer);
    $('#studio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    drawScene();
    toast('Selected reference photo updated in the Try-On Studio.');
  }
  renderStudioProductPicker();
  $$('[data-studio-view]').forEach(button => button.addEventListener('click', () => {
    const product = products[studioState.selectedProduct || activeProduct || 'signature'];
    if (button.dataset.studioView === 'detail' && !product?.previewImage) {
      setStudioStatus('No separate product-detail image exists for this reference. The original reference image remains selected.');
      return;
    }
    studioState.referenceView = button.dataset.studioView === 'detail' ? 'detail' : 'reference';
    syncStudioProductPicker();
    drawScene();
    setStudioStatus(studioState.referenceView === 'detail' ? 'Showing this item’s associated garment-detail concept image.' : 'Showing this item’s exact original campaign/reference image.');
  }));
  $$('[data-preview-product]').forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.previewProduct, 'set')));
  dialogPreview?.addEventListener('click', () => {
    closeProduct();
    goToStudio(activeProduct, dialogLayer);
  });

  // Preference-based Style Quiz: deterministic rules only; no AI or external request.
  const styleQuizForm = $('#styleQuizForm');
  const styleQuizResults = $('#styleQuizResults');
  const quizProductIds = Object.keys(products).filter(id => !products[id].external && !id.startsWith('syrn-')); // keep external-brand references separate from BLACKED recommendations
  styleQuizForm?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(styleQuizForm);
    const style = String(data.get('quizStyle') || 'everyday');
    const coverage = String(data.get('quizCoverage') || 'balanced');
    const color = String(data.get('quizColor') || 'any');
    const ranked = quizProductIds.map((id, index) => {
      const product = products[id];
      const meta = productMeta[id] || {};
      let score = 0;
      if ((meta.styles || []).includes(style)) score += 5;
      if (style === 'everyday' && ['move', 'stretch', 'signature', 'together'].includes(id)) score += 1;
      if (style === 'lace' && ['redlace', 'blacklace', 'velvet', 'butterfly'].includes(id)) score += 1;
      if (style === 'statement' && ['redlace', 'blacklace', 'velvet', 'rose', 'butterfly'].includes(id)) score += 1;
      if (style === 'movement' && ['move', 'yoga', 'stretch'].includes(id)) score += 1;
      if (coverage === 'more' && ['signature', 'move', 'stretch', 'together'].includes(id)) score += 2;
      if (coverage === 'minimal' && ['rose', 'butterfly', 'redlace', 'blacklace', 'velvet'].includes(id)) score += 2;
      if (coverage === 'balanced' && ['move', 'yoga', 'stretch', 'signature', 'together'].includes(id)) score += 1;
      if (color !== 'any' && (meta.colors || []).includes(color)) score += 3;
      return { id, product, meta, score, index };
    }).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 3);
    if (!styleQuizResults) return;
    styleQuizResults.innerHTML = `<div class="quiz-results-heading"><span class="selected-look-kicker">YOUR STYLE EDIT</span><h3>Three references to explore.</h3><p>Matched to your preferences, not a claim about garment fit or stock.</p></div><div class="quiz-result-grid">${ranked.map(({id, product, meta}) => `<article class="quiz-result-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div><p class="product-kicker">${meta.source || 'Original reference'}</p><h4>${product.name}</h4><p>${product.description}</p><div class="quiz-result-actions"><button type="button" class="button button-dark button-small" data-quiz-try="${id}">View in try-on</button><button type="button" class="save-style-button" data-quiz-save="${id}">♡ Save</button></div></div></article>`).join('')}</div>`;
    $$('[data-quiz-try]', styleQuizResults).forEach(button => button.addEventListener('click', () => goToStudio(button.dataset.quizTry, 'set')));
    $$('[data-quiz-save]', styleQuizResults).forEach(button => button.addEventListener('click', () => toggleWishlist(button.dataset.quizSave)));
    toast('Your style edit is ready.');
  });


  // Build a local style moodboard from two of the user's original image references.
  const boardPrimary = $('#boardPrimary');
  const boardAccent = $('#boardAccent');
  const boardPreview = $('#styleBoardPreview');
  const downloadStyleBoard = $('#downloadStyleBoard');
  const boardSelectIds = [boardPrimary, boardAccent];
  function fillBoardSelect(select, defaultId) {
    if (!select) return;
    select.innerHTML = Object.entries(products).map(([id, product]) => `<option value="${id}">${product.name}</option>`).join('');
    select.value = products[defaultId] ? defaultId : Object.keys(products)[0];
  }
  fillBoardSelect(boardPrimary, 'signature');
  fillBoardSelect(boardAccent, 'velvet');
  function renderStyleBoard() {
    if (!boardPrimary || !boardAccent) return;
    const mainId = boardPrimary.value;
    const accentId = boardAccent.value;
    const main = products[mainId];
    const accent = products[accentId];
    if (!main || !accent) return;
    $('#boardPrimaryImage').src = main.image;
    $('#boardPrimaryImage').alt = `${main.name} original reference`;
    $('#boardPrimaryName').textContent = main.name;
    $('#boardPrimaryKicker').textContent = productMeta[mainId]?.source || 'Main look';
    $('#boardAccentImage').src = accent.image;
    $('#boardAccentImage').alt = `${accent.name} original reference`;
    $('#boardAccentName').textContent = accent.name;
    $('#boardAccentKicker').textContent = productMeta[accentId]?.source || 'Pairing idea';
    if (boardPreview) boardPreview.hidden = false;
    if (downloadStyleBoard) downloadStyleBoard.disabled = false;
  }
  $('#buildStyleBoard')?.addEventListener('click', () => { renderStyleBoard(); toast('Your style moodboard is ready.'); });
  boardSelectIds.forEach(select => select?.addEventListener('change', () => { if (boardPreview && !boardPreview.hidden) renderStyleBoard(); }));
  downloadStyleBoard?.addEventListener('click', async () => {
    if (!boardPrimary || !boardAccent) return;
    const chosen = [products[boardPrimary.value], products[boardAccent.value]];
    if (chosen.some(item => !item)) return;
    try {
      const images = await Promise.all(chosen.map(product => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Could not load a reference image.'));
        img.src = product.image;
      })));
      const out = document.createElement('canvas');
      out.width = 1200; out.height = 720;
      const c = out.getContext('2d');
      c.fillStyle = '#f7eee8'; c.fillRect(0, 0, out.width, out.height);
      c.fillStyle = '#261e21'; c.font = '700 26px Arial, sans-serif'; c.fillText('BLACKED INNERWEAR · STYLE MOODBOARD', 54, 56);
      c.fillStyle = '#966075'; c.font = '15px Arial, sans-serif'; c.fillText('Original reference pairing · inspiration only, not confirmed stock', 54, 84);
      const cardX = [54, 620];
      images.forEach((img, i) => {
        const x = cardX[i], y = 112, w = 526, h = 500;
        c.fillStyle = '#fffaf7'; c.fillRect(x, y, w, h);
        c.fillStyle = '#ecded7'; c.fillRect(x + 15, y + 15, w - 30, 390);
        const ratio = Math.min((w - 42) / img.naturalWidth, 360 / img.naturalHeight);
        const dw = img.naturalWidth * ratio, dh = img.naturalHeight * ratio;
        c.drawImage(img, x + (w - dw) / 2, y + 28 + (360 - dh) / 2, dw, dh);
        c.fillStyle = '#9d5b70'; c.font = '700 12px Arial, sans-serif'; c.fillText(i === 0 ? 'MAIN LOOK' : 'PAIRING IDEA', x + 19, y + 432);
        c.fillStyle = '#281f22'; c.font = '600 20px Arial, sans-serif';
        const name = chosen[i].name.length > 42 ? chosen[i].name.slice(0, 39) + '…' : chosen[i].name;
        c.fillText(name, x + 19, y + 463);
      });
      c.fillStyle = '#745e64'; c.font = '13px Arial, sans-serif'; c.fillText('For design exploration only · BLACKED product specs and stock are not confirmed', 54, 665);
      const blob = await new Promise(resolve => out.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Could not create PNG.');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'blacked-style-moodboard.png'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast('Moodboard saved to your device.');
    } catch (_) {
      toast('Moodboard could not be saved. Check that the local images are present.');
    }
  });

  // Measurement finder validates entries and offers a local Fit Passport; no size is guessed without a verified chart.
  let unit = 'in';
  const measurementIds = ['bust', 'underbust', 'waist', 'hips'];
  const unitButtons = $$('.unit-button');
  const fitForm = $('#fitForm');
  const fitError = $('#fitError');
  const fitResult = $('#fitResult');
  const VERIFIED_BLACKED_SIZE_CHART_CONFIGURED = false; // Set true only after owner supplies verified product-specific charts.

  const fitPassportKey = 'blacked-fit-passport-v040';
  const saveFitPassportToggle = $('#saveFitPassport');
  const fitPassportStatus = $('#fitPassportStatus');

  function setPassportStatus(message) {
    if (fitPassportStatus) fitPassportStatus.textContent = message;
  }
  function restoreFitPassport() {
    try {
      const profile = JSON.parse(localStorage.getItem(fitPassportKey) || 'null');
      if (!profile || !profile.values) return;
      measurementIds.forEach(id => {
        if (Number.isFinite(Number(profile.values[id]))) $(`#${id}`).value = String(profile.values[id]);
      });
      if (saveFitPassportToggle) saveFitPassportToggle.checked = true;
      setPassportStatus('Saved Fit Passport loaded from this device. It has not been sent to a server.');
    } catch (_) {
      setPassportStatus('This browser does not allow local storage right now. The size finder still works without saving.');
    }
  }
  function clearFitPassport(clearInputs = true) {
    try { localStorage.removeItem(fitPassportKey); } catch (_) {}
    if (saveFitPassportToggle) saveFitPassportToggle.checked = false;
    if (clearInputs) measurementIds.forEach(id => { const input = $(`#${id}`); if (input) input.value = ''; });
    if (fitResult) fitResult.hidden = true;
    if (fitError) fitError.hidden = true;
    setPassportStatus('Saved Fit Passport cleared from this device.');
  }
  saveFitPassportToggle?.addEventListener('change', () => {
    if (!saveFitPassportToggle.checked) {
      try { localStorage.removeItem(fitPassportKey); } catch (_) {}
      setPassportStatus('Saved Fit Passport removed. Measurements will not be saved.');
    } else {
      setPassportStatus('Your measurements will be saved on this device after your next size check.');
    }
  });
  $('#clearFitPassport')?.addEventListener('click', () => clearFitPassport(true));

  function getMeasurementInches(id) {
    const raw = Number($(`#${id}`).value);
    return unit === 'cm' ? raw / 2.54 : raw;
  }

  unitButtons.forEach(button => button.addEventListener('click', () => {
    const nextUnit = button.dataset.unit;
    if (nextUnit === unit) return;
    measurementIds.forEach(id => {
      const input = $(`#${id}`);
      if (input.value.trim()) {
        const converted = nextUnit === 'cm' ? Number(input.value) * 2.54 : Number(input.value) / 2.54;
        input.value = String(Math.round(converted * 10) / 10);
      }
    });
    unit = nextUnit;
    unitButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    $$('.unit-label').forEach(label => { label.textContent = unit; });
    const ranges = unit === 'cm' ? { bust: [50, 165], underbust: [50, 165], waist: [45, 165], hips: [50, 190] } : { bust: [20, 65], underbust: [20, 65], waist: [18, 65], hips: [20, 75] };
    measurementIds.forEach(id => {
      const input = $(`#${id}`);
      input.min = ranges[id][0]; input.max = ranges[id][1];
      input.placeholder = id === 'bust' ? (unit === 'cm' ? 'e.g. 86' : 'e.g. 34')
        : id === 'underbust' ? (unit === 'cm' ? 'e.g. 76' : 'e.g. 30')
        : id === 'waist' ? (unit === 'cm' ? 'e.g. 71' : 'e.g. 28')
        : (unit === 'cm' ? 'e.g. 91' : 'e.g. 36');
    });
    if (fitError) fitError.hidden = true;
    if (fitResult) fitResult.hidden = true;
  }));

  measurementIds.forEach(id => {
    $(`#${id}`)?.addEventListener('input', () => {
      if (fitError) fitError.hidden = true;
      if (fitResult) fitResult.hidden = true;
    });
  });

  fitForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (fitError) fitError.hidden = true;
    if (fitResult) fitResult.hidden = true;
    const values = {};
    for (const id of measurementIds) {
      const input = $(`#${id}`);
      const value = Number(input.value);
      if (!input.value.trim() || !Number.isFinite(value) || value < Number(input.min) || value > Number(input.max)) {
        if (fitError) {
          fitError.textContent = `Please enter a valid ${id} measurement in ${unit === 'in' ? 'inches' : 'centimetres'}.`;
          fitError.hidden = false;
        }
        input.focus();
        return;
      }
      values[id] = getMeasurementInches(id);
    }
    if (values.bust <= values.underbust) {
      if (fitError) {
        fitError.textContent = 'Bust is usually measured around the fullest part, so it should be greater than underbust. Please check those two values.';
        fitError.hidden = false;
      }
      $('#bust').focus();
      return;
    }
    if (VERIFIED_BLACKED_SIZE_CHART_CONFIGURED) {
      // Implement a per-product chart mapper here only after real garment data is supplied.
      $('#topSizeResult').textContent = 'Configured';
      $('#bottomSizeResult').textContent = 'Configured';
      $('#resultNote').textContent = 'Your measurements were checked against the configured BLACKED size chart. Check the selected product’s specific notes before deciding.';
    } else {
      $('#topSizeResult').textContent = 'Not set';
      $('#bottomSizeResult').textContent = 'Not set';
      $('#resultNote').textContent = 'A verified BLACKED product-specific size chart has not been configured yet, so this prototype will not guess a size. Your measurements have been validated locally. Use Fit Detective for general checks and compare against the real garment chart once supplied.';
    }
    if (saveFitPassportToggle?.checked) {
      try {
        localStorage.setItem(fitPassportKey, JSON.stringify({ values, unit: 'in' }));
        setPassportStatus('Fit Passport saved on this device only. Use “Clear saved profile” to remove it.');
      } catch (_) {
        setPassportStatus('Could not save in this browser; the size finder still works for this session.');
      }
    }
    if (fitResult) fitResult.hidden = false;
    fitResult?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  $('#editMeasurements')?.addEventListener('click', () => {
    fitResult.hidden = true;
    $('#bust').focus();
  });

  // General Fit Detective: educational prompts only, not size diagnosis or product promises.
  const fitDetectiveForm = $('#fitDetectiveForm');
  const fitDetectiveResult = $('#fitDetectiveResult');
  const fitAdvice = {
    band: { title: 'Check the band first', text: 'A band that rides up may be too loose or not sitting level. Recheck your measurements, fasten on a comfortable secure hook, and compare the actual band measurements on the product chart. Do not size down automatically.' },
    straps: { title: 'Check strap adjustment and shape', text: 'Adjust straps so they stay in place without digging in. If they continue slipping, strap placement or neckline shape may not suit your preference. Compare product photos and construction details.' },
    gap: { title: 'Check cup shape and volume', text: 'A cup gap can happen when the cup shape does not match your shape or the volume is too large. Recheck how the band sits and compare the product’s own cup-shape notes; don’t rely on a campaign photo alone.' },
    spill: { title: 'Recheck coverage and measurements', text: 'Spillage or a tight cup can mean the cup or coverage is too small for you, or the style shape is not right. Re-measure and compare against verified product-specific sizing before choosing.' },
    wire: { title: 'Comfort comes first', text: 'If an underwire pokes or causes discomfort, take the garment off and check the wire placement and size. You may prefer a wire-free option. A product photo cannot tell you how a wire will feel.' },
    brief: { title: 'Compare waist and hip measurements', text: 'If a brief waistband digs in, compare both waist and hip measurements with the real product chart, along with leg-opening and rise details. A general label such as M is not enough to predict fit.' }
  };
  fitDetectiveForm?.addEventListener('submit', event => {
    event.preventDefault();
    const issue = new FormData(fitDetectiveForm).get('fitIssue');
    const advice = fitAdvice[issue];
    if (!advice || !fitDetectiveResult) return;
    fitDetectiveResult.innerHTML = `<p class="product-kicker">YOUR FIT CHECK</p><h3>${advice.title}</h3><p>${advice.text}</p><a class="text-link" href="#collection">Explore product references <span aria-hidden="true">→</span></a>`;
    fitDetectiveResult.hidden = false;
    fitDetectiveResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Plus-One Club: transparent prototype-only planner; does not send or store any request.
  const companionForm = $('#companionRequestForm');
  const companionResult = $('#companionRequestResult');
  const companionMessage = $('#companionRequestMessage');
  const companionExperience = $('#companionExperience');
  const companionDate = $('#companionDate');
  const companionActivityLabels = {
    coffee: 'Coffee & conversation',
    event: 'Public event / exhibition',
    dinner: 'Dinner at a public venue',
    city: 'Museum / daytime city walk'
  };
  const companionStyleLabels = {
    easygoing: 'Easygoing conversation',
    outgoing: 'Friendly and outgoing',
    formal: 'Polished event plus-one',
    quiet: 'Quiet, low-pressure company'
  };
  if (companionDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    companionDate.min = `${yyyy}-${mm}-${dd}`;
  }
  $$('[data-companion-pick]').forEach(button => button.addEventListener('click', () => {
    if (companionExperience && companionActivityLabels[button.dataset.companionPick]) companionExperience.value = button.dataset.companionPick;
    companionForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    companionExperience?.focus({ preventScroll: true });
    toast('Experience selected. This prototype does not book or contact anyone.');
  }));
  companionForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!companionForm.reportValidity()) return;
    if (!$('#companionAdultCheck')?.checked || !$('#companionBoundaryCheck')?.checked || !$('#companionDemoCheck')?.checked) {
      toast('Please confirm all age, boundary and demo notices.');
      return;
    }
    const outing = companionActivityLabels[companionExperience?.value] || 'Public outing';
    const preferredDate = companionDate?.value ? new Date(`${companionDate.value}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'No date chosen';
    const style = companionStyleLabels[$('#companionStyle')?.value] || 'No preference';
    const durationLabels = { '60': 'around 1 hour', '90': 'around 90 minutes', '120': 'around 2 hours' };
    const touchLabels = { none: 'no physical contact', greeting: 'greeting/handshake only', ask: 'ask every time; no assumption' };
    const meetupLabels = { venue: 'meet at the public venue', separate: 'travel separately and meet there', trusted: 'share plan with a trusted person' };
    const duration = durationLabels[$('#companionDuration')?.value] || 'duration not selected';
    const touch = touchLabels[$('#companionTouch')?.value] || 'no physical contact';
    const meetup = meetupLabels[$('#companionMeetup')?.value] || 'meet at public venue';
    const trusted = $('#companionTrustedCheck')?.checked ? 'Trusted-person check-in: planned.' : 'Trusted-person check-in: not selected.';
    if (companionMessage) companionMessage.textContent = `${outing} · ${preferredDate} · ${style} · ${duration} · boundary: ${touch} · meetup: ${meetup}. ${trusted} Local preview only: no real provider is available and nothing has been sent or saved.`;
    if (companionResult) {
      companionResult.hidden = false;
      companionResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    toast('Preview created locally. No booking request sent.');
  });

  // Adult connection preferences: local in-memory preview only. No storage/network calls.
  const adultAgeConfirm = $('#adultAgeConfirm');
  const adultEnterButton = $('#adultEnterButton');
  const adultGateError = $('#adultGateError');
  const adultAccessGate = $('#adultAccessGate');
  const adultWorkspace = $('#adultWorkspace');
  const adultPreferencesForm = $('#adultPreferencesForm');
  const adultPreferencesResult = $('#adultPreferencesResult');
  const adultPreviewSummary = $('#adultPreviewSummary');
  const adultPreviewPrivacyText = $('#adultPreviewPrivacyText');
  const adultConversationStarters = $('#adultConversationStarters');
  const adultIntentLabels = {
    serious: 'Serious relationship / long-term connection',
    casual: 'Casual dating / no-pressure dates',
    open: 'Open relationship with agreed boundaries',
    couple: 'Couple / consensual group dating',
    explore: 'Explore first; not decided yet'
  };
  const adultGenderLabels = { men: 'Men / boyfriend preference', women: 'Women', any: 'No gender preference', couples: 'Couples', skip: 'Prefer not to say' };
  const adultTopicLabels = {
    interestGroup: 'Threesome / consensual group intimacy',
    interestBDSM: 'BDSM-aware interests',
    interestRoleplay: 'Consensual role-play',
    interestOpen: 'Consensual non-monogamy'
  };
  const adultAnswerLabels = {
    skip: 'Prefer not to say',
    interested: 'Interested',
    curious: 'Curious — want to learn first',
    trust: 'Only after trust is established',
    not: 'Not interested'
  };
  const adultSizeLabels = {
    private: 'Keep private / not selected',
    none: 'No particular preference',
    under12: 'Below 12 cm (optional preference)',
    '12-15': '12–15 cm (optional preference)',
    '15-18': '15–18 cm (optional preference)',
    over18: 'Above 18 cm (optional preference)',
    trust: 'Discuss only after trust',
    skip: 'Prefer not to answer'
  };
  adultEnterButton?.addEventListener('click', () => {
    if (!adultAgeConfirm?.checked) {
      if (adultGateError) adultGateError.hidden = false;
      adultAgeConfirm?.focus();
      return;
    }
    if (adultGateError) adultGateError.hidden = true;
    if (adultWorkspace) adultWorkspace.hidden = false;
    adultAccessGate?.classList.add('is-open');
    adultWorkspace?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast('Adult preference form opened. Answers stay in this page only.');
  });
  adultAgeConfirm?.addEventListener('change', () => { if (adultGateError) adultGateError.hidden = true; });

  function renderAdultPreferencePreview() {
    if (!adultPreferencesForm || !adultPreviewSummary || !adultPreferencesResult) return;
    const data = new FormData(adultPreferencesForm);
    const intent = adultIntentLabels[String(data.get('adultIntent') || 'serious')] || 'Not selected';
    const gender = adultGenderLabels[String(data.get('partnerGender') || 'skip')] || 'Prefer not to say';
    const range = String(data.get('ageRange') || 'skip');
    const ageLabels = { '18-24':'18–24', '25-34':'25–34', '35-44':'35–44', '45+':'45+', any:'Any adult age (18+ only)', skip:'Prefer not to say' };
    const size = adultSizeLabels[String(data.get('sizePreference') || 'private')] || 'Keep private';
    const sizeComfort = ({comfortable:'Comfortable with respectful conversation', trust:'Only after trust', 'not-now':'Not comfortable right now', skip:'Prefer not to answer'})[String(data.get('sizeComfort') || 'skip')] || 'Prefer not to answer';
    const visibility = String(data.get('visibility') || 'private');
    const visibilityLabels = { private:'Private — only you', interests:'Broad interests only after a mutual match (future capability)', selected:'Choose fields individually after a mutual match (future capability)' };
    const boundaries = data.getAll('boundary').map(v => ({
      'no-pressure':'No pressure; no/stop is respected',
      'public-first':'First meeting in a public place',
      'no-intimate-media':'No intimate media without clear permission',
      'health-talk':'Discuss health, protection and boundaries before intimacy'
    }[String(v)] || String(v)));
    const topics = Object.entries(adultTopicLabels).map(([key, label]) => ({ label, value: adultAnswerLabels[String(data.get(key) || 'skip')] || 'Prefer not to say' }));
    const publicTopics = topics.filter(t => ['Interested','Curious — want to learn first'].includes(t.value));
    const cards = [];
    cards.push(`<article class="adult-summary-item"><span>Connection goal</span><strong>${escapeHtml(intent)}</strong></article>`);
    cards.push(`<article class="adult-summary-item"><span>Partner preference</span><strong>${escapeHtml(gender)}</strong></article>`);
    cards.push(`<article class="adult-summary-item"><span>Preferred adult age range</span><strong>${escapeHtml(ageLabels[range] || 'Prefer not to say')}</strong></article>`);
    cards.push(`<article class="adult-summary-item adult-summary-private"><span>Intimate-size preference · private</span><strong>${escapeHtml(size)}</strong><small>${escapeHtml(sizeComfort)}</small></article>`);
    cards.push(`<article class="adult-summary-item adult-summary-wide"><span>Interests · local preview</span><div class="adult-summary-tags">${topics.map(t => `<span><b>${escapeHtml(t.label)}</b><small>${escapeHtml(t.value)}</small></span>`).join('')}</div></article>`);
    cards.push(`<article class="adult-summary-item adult-summary-wide"><span>Boundaries selected</span><div class="adult-summary-tags">${boundaries.length ? boundaries.map(v => `<span>${escapeHtml(v)}</span>`).join('') : '<span>No boundaries selected</span>'}</div></article>`);
    cards.push(`<article class="adult-summary-item adult-summary-wide"><span>Future sharing preference</span><strong>${escapeHtml(visibilityLabels[visibility] || visibilityLabels.private)}</strong></article>`);
    adultPreviewSummary.innerHTML = cards.join('');
    if (adultConversationStarters) {
      const starters = [
        'What helps each of us feel safe, heard and comfortable?',
        'How should we check in with each other if someone wants to pause or stop?'
      ];
      if (intent.startsWith('Serious relationship')) starters.push('What are we each hoping to get from dating right now?');
      if (intent.startsWith('Couple')) starters.push('What boundaries would every person need to agree on before considering a group setting?');
      if (String(data.get('interestGroup') || '') === 'interested' || String(data.get('interestGroup') || '') === 'curious') starters.push('What boundaries and expectations would need to be discussed before any group setting?');
      if (String(data.get('interestBDSM') || '') === 'interested' || String(data.get('interestBDSM') || '') === 'curious') starters.push('What are the hard limits, soft limits and stop signal each person wants respected?');
      if (String(data.get('interestOpen') || '') === 'interested' || String(data.get('interestOpen') || '') === 'curious') starters.push('Which relationship agreements would need to be clear and mutual?');
      if (sizeComfort === 'Only after trust' || sizeComfort === 'Not comfortable right now' || sizeComfort === 'Prefer not to answer') starters.push('Can we agree not to discuss intimate measurements unless both of us are comfortable?');
      const uniqueStarters = [...new Set(starters)].slice(0, 5);
      adultConversationStarters.replaceChildren();
      const heading = document.createElement('h4'); heading.textContent = 'Helpful conversation starters';
      const intro = document.createElement('p'); intro.textContent = 'These are private prompts for a future conversation—not compatibility scores or a real match.';
      const list = document.createElement('ul');
      uniqueStarters.forEach(prompt => { const item = document.createElement('li'); item.textContent = prompt; list.appendChild(item); });
      adultConversationStarters.append(heading, intro, list);
      adultConversationStarters.hidden = false;
    }
    if (adultPreviewPrivacyText) {
      const extra = visibility === 'private'
        ? 'All preferences are private in this preview. Nothing will be shown to another person.'
        : visibility === 'interests'
          ? `A future version could share only broad interests after mutual matching. This preview still shares nothing. ${publicTopics.length} interest(s) selected as interested/curious.`
          : 'A future version could let you explicitly choose fields after a mutual match. This preview still shares nothing.';
      adultPreviewPrivacyText.textContent = `${extra} The intimate-size preference is always kept private in this prototype.`;
    }
    adultPreferencesResult.hidden = false;
    adultPreferencesResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  adultPreferencesForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!adultAgeConfirm?.checked) {
      if (adultGateError) adultGateError.hidden = false;
      adultAccessGate?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!adultPreferencesForm.reportValidity()) return;
    renderAdultPreferencePreview();
    toast('Preference preview created locally. Nothing was transmitted or saved.');
  });
  $('#clearAdultPreferences')?.addEventListener('click', () => {
    adultPreferencesForm?.reset();
    if (adultPreferencesResult) adultPreferencesResult.hidden = true;
    if (adultPreviewSummary) adultPreviewSummary.replaceChildren();
    if (adultConversationStarters) { adultConversationStarters.replaceChildren(); adultConversationStarters.hidden = true; }
    toast('Adult preference answers cleared from this page.');
  });
  $('#editAdultPreferences')?.addEventListener('click', () => {
    adultPreferencesResult.hidden = true;
    adultPreferencesForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Wellness hub self-attestation gate; UI reminder only, not identity/age verification.
  const wellnessAgeConfirm = $('#wellnessAgeConfirm');
  const wellnessAgeError = $('#wellnessAgeError');
  const wellnessAgeGate = $('#wellnessAgeGate');
  const wellnessHubContent = $('#wellnessHubContent');
  $('#wellnessEnterButton')?.addEventListener('click', () => {
    if (!wellnessAgeConfirm?.checked) {
      if (wellnessAgeError) wellnessAgeError.hidden = false;
      wellnessAgeConfirm?.focus();
      return;
    }
    if (wellnessAgeError) wellnessAgeError.hidden = true;
    if (wellnessAgeGate) wellnessAgeGate.hidden = true;
    if (wellnessHubContent) wellnessHubContent.hidden = false;
    wellnessHubContent?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast('Intimate Wellness section opened. This is a category demo, not a live shop.');
  });
  wellnessAgeConfirm?.addEventListener('change', () => { if (wellnessAgeError) wellnessAgeError.hidden = true; });

  // v1.0.0 Intimate Wellness category discovery. All cards are concept categories, not live stock.
  const wellnessSearch = $('#wellnessSearch');
  const wellnessCards = $$('.wellness-item-card[data-wellness-item]');
  const wellnessFilterButtons = $$('[data-wellness-filter]');
  const wellnessNoResults = $('#wellnessNoResults');
  const wellnessFinderForm = $('#wellnessFinderForm');
  const wellnessFinderResult = $('#wellnessFinderResult');
  let activeWellnessFilter = 'all';
  let wellnessFinderActive = false;
  let wellnessFinderIds = new Set();

  function renderWellnessCategories() {
    const query = String(wellnessSearch?.value || '').trim().toLowerCase();
    let shown = 0;
    wellnessCards.forEach(card => {
      const audience = card.dataset.wellnessAudience || 'all';
      const filterMatch = activeWellnessFilter === 'all'
        || audience === activeWellnessFilter
        || (['her', 'him', 'couples'].includes(activeWellnessFilter) && audience === 'all');
      const haystack = `${card.dataset.wellnessTitle || ''} ${card.dataset.wellnessCopy || ''} ${card.textContent || ''}`.toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      const finderMatch = !wellnessFinderActive || wellnessFinderIds.has(card);
      const visible = filterMatch && queryMatch && finderMatch;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    wellnessFilterButtons.forEach(button => {
      const active = button.dataset.wellnessFilter === activeWellnessFilter;
      button.setAttribute('aria-pressed', String(active));
      if (button.classList.contains('wellness-filter-chip')) button.classList.toggle('is-active', active);
      if (button.classList.contains('wellness-category-tile')) button.classList.toggle('is-selected', active);
    });
    if (wellnessNoResults) wellnessNoResults.hidden = shown > 0;
  }

  wellnessFilterButtons.forEach(button => button.addEventListener('click', () => {
    wellnessFinderActive = false;
    wellnessFinderIds = new Set();
    if (wellnessFinderResult) wellnessFinderResult.hidden = true;
    activeWellnessFilter = button.dataset.wellnessFilter || 'all';
    renderWellnessCategories();
    if (button.classList.contains('wellness-category-tile')) {
      $('#wellness-catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));
  wellnessSearch?.addEventListener('input', () => {
    wellnessFinderActive = false;
    wellnessFinderIds = new Set();
    if (wellnessFinderResult) wellnessFinderResult.hidden = true;
    renderWellnessCategories();
  });
  wellnessFinderForm?.addEventListener('submit', event => {
    event.preventDefault();
    const audience = String($('#wellnessFinderAudience')?.value || 'all');
    const goal = String($('#wellnessFinderGoal')?.value || 'discover');
    const priority = String($('#wellnessFinderPriority')?.value || 'privacy');
    const goalTags = {
      discover: ['new', 'discovery', 'personal', 'guides'],
      personal: ['personal', 'comfort', 'her', 'care'],
      grooming: ['grooming', 'him', 'care'],
      couples: ['couples', 'shared', 'comfort'],
      learn: ['guides', 'learning', 'care', 'privacy'],
      gift: ['gifting', 'couples', 'new']
    }[goal] || ['new', 'discovery'];
    const priorityTags = { privacy: ['privacy', 'comfort'], care: ['care', 'ingredients', 'hygiene'], learning: ['guides', 'learning'], gifting: ['gifting', 'gift', 'couples'] }[priority] || [];
    const ranked = wellnessCards.map((card, index) => {
      const tags = String(card.dataset.wellnessTags || '').toLowerCase().split(/\s+/).filter(Boolean);
      const cardAudience = card.dataset.wellnessAudience || 'all';
      let score = 0;
      if (audience === 'all' || cardAudience === audience || cardAudience === 'all') score += cardAudience === audience && audience !== 'all' ? 4 : 1;
      goalTags.forEach(tag => { if (tags.includes(tag)) score += 3; });
      priorityTags.forEach(tag => { if (tags.includes(tag)) score += 2; });
      return { card, score, index };
    }).sort((a,b) => b.score - a.score || a.index - b.index).slice(0, 3);
    wellnessFinderIds = new Set(ranked.map(item => item.card));
    wellnessFinderActive = true;
    activeWellnessFilter = 'all';
    if (wellnessSearch) wellnessSearch.value = '';
    const names = ranked.map(item => item.card.querySelector('h4')?.textContent || 'Wellness category');
    if (wellnessFinderResult) {
      wellnessFinderResult.textContent = `Your starting points: ${names.join(' · ')}. These are category ideas, not product recommendations or medical advice.`;
      wellnessFinderResult.hidden = false;
    }
    renderWellnessCategories();
    $('#wellness-catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#wellnessResetFilter')?.addEventListener('click', () => {
    wellnessFinderActive = false; wellnessFinderIds = new Set();
    if (wellnessFinderResult) wellnessFinderResult.hidden = true;
    activeWellnessFilter = 'all';
    if (wellnessSearch) wellnessSearch.value = '';
    wellnessFinderForm?.reset();
    renderWellnessCategories();
    $('#wellness-categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  renderWellnessCategories();

  // A consistent year display; no analytics, external scripts or tracking are used.
  $('#year').textContent = String(new Date().getFullYear());
  updateLayerControls();
  restoreFitPassport();
  updatePreviewModeUI();
  drawScene();
})();
