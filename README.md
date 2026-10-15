# Lari Didone — Portfolio

Personal portfolio of Lari Didone, a product designer. Built with plain HTML and CSS, with accessibility as a first-class requirement.

## About the site

- **Pages:** Home, About, Projects, plus a case study template.
- **Stack:** HTML and CSS, with one small JavaScript file. No framework, no build step, so the site works without JavaScript.
- **Design:** Tokens (colors, type, spacing) live in `css/tokens.css` and mirror the variables in the Figma design file.
- **Typeface:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), self-hosted.

## Accessibility

The target is **WCAG 2.2 level AA**. In practice, that means:

- Semantic landmarks, one `h1` per page and a "Skip to content" link.
- Visible keyboard focus on every interactive element.
- Text contrast of at least 4.5:1, and text that scales up to 200% without breaking the layout.
- Touch targets of at least 24×24px, and a mobile layout that works from 320px wide.

## Run it locally

Open `index.html` in a browser, or use any static server (for example the VS Code Live Server extension).

To run the HTML validation and the accessibility audit, which need [Node.js](https://nodejs.org) 22 or newer:

```bash
npm install
npm run check
```

## Project structure

```
├── index.html, about.html, projects.html   pages
├── modelos/                                case study template
├── css/                                    tokens.css, styles.css, case-study.css
├── js/                                     text-size.js
├── assets/                                 fonts, icons and background pattern
├── scripts/a11y.mjs                        accessibility audit (axe-core)
└── docs/                                   design and decision notes
```

## Credits

- Typeface: Space Grotesk, SIL Open Font License 1.1 (`assets/fonts/`).
- Icons: [Phosphor Icons](https://phosphoricons.com), MIT License (`assets/icons/`).

© Lari Didone. All rights reserved.
