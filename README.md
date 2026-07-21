# Aromystic — The Scent of Secrets

A customer-friendly Angular showcase site for **Aromystic**, a new artisan perfume brand.
Built with Angular 19 (standalone components), SCSS, and a soft pastel theme. Runs entirely on
mock data — no backend required.

## Run it

    npm install      # first time only
    npm start        # dev server at http://localhost:4200
    npm run build    # production build to dist/aromystic

## Pages

| Page                | Route          | Highlights                                                        |
|---------------------|----------------|-------------------------------------------------------------------|
| Home                | /              | Hero, perks, collections, bestsellers, quiz CTA, new, testimonials|
| Shop                | /shop          | Product grid with family/gender filters + sorting                 |
| Product             | /product/:id   | Notes pyramid, quantity, add-to-bag, related items                |
| Collections         | /collections   | Four themed worlds with anchor navigation                         |
| Our Story           | /our-story     | Brand narrative, values, craft steps                              |
| Discover Your Scent | /discover      | Interactive 3-question quiz that recommends fragrances            |
| Contact             | /contact       | Validated form, info cards, accordion FAQ                         |

Shared: sticky navbar with slide-out cart drawer (signal-based CartService) and footer newsletter.

## Structure

    src/app/
      core/
        models.ts                 # interfaces
        data/catalog.service.ts   # mock products, collections, quiz
        services/cart.service.ts  # in-memory cart (signals)
      shared/                     # navbar, footer, product-tile, collection-tile
      pages/                      # home, shop, product-detail, collections, our-story, discover, contact

## Theme

Pastel palette (blush, lavender, mint, powder blue, cream) with muted gold accents, defined as
CSS variables in src/styles.scss. Playfair Display headings + Poppins body.

Mock showcase — cart/checkout are illustrative only. Ready to wire to a real backend next.
