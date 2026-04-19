# Samuel Umuhoza Portfolio

A modern personal developer portfolio built as a static website. The project presents Samuel Umuhoza's profile, skills, education, featured work, and contact form with a stronger visual hierarchy and a more polished interactive experience.

## Overview

This portfolio was redesigned to feel more professional and developer-focused. The current version emphasizes:

- Clear personal branding
- Interactive and responsive layout
- Modern visual styling
- Better project presentation
- Simple static deployment

## Features

- Sticky responsive navigation
- Mobile menu for smaller screens
- Scroll progress indicator
- Section reveal animations
- Interactive hover lighting on cards
- Active navigation state while scrolling
- Animated stats in the hero section
- Contact form powered by Formspree
- Downloadable CV button

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts
- Formspree

## Project Structure

```text
samuel.um/
|-- index.html
|-- style.css
|-- script.js
|-- image/
|-- css/
|-- webfonts/
|-- UMUHOZA Samuel.pdf
|-- LICENSE
```

## Main Files

- `index.html`: Portfolio content and page structure
- `style.css`: Custom visual system, responsive layout, animation, and component styling
- `script.js`: Navigation behavior, reveal effects, scroll progress, and micro-interactions

## Removed Content

The old `calculator` folder was removed because it was not part of the portfolio experience and did not support the main personal brand.

## How To Run

This is a static site, so no build step is required.

1. Open `index.html` in a browser.
2. Or deploy the project directly to a static hosting service such as Vercel, Netlify, or GitHub Pages.

## Customization

To update the portfolio:

- Edit text and section content in `index.html`
- Adjust colors, spacing, and layout in `style.css`
- Update interactions in `script.js`
- Replace project screenshots inside the `image/` folder
- Replace `UMUHOZA Samuel.pdf` with the latest CV when needed

## Contact Form

The contact form posts to Formspree using the configured endpoint in `index.html`. If you want to use another email service or backend, replace the form `action` URL.

## Deployment

This project is suitable for static hosting. You can deploy it by uploading the repository files directly to:

- Vercel
- Netlify
- GitHub Pages

## License

This project includes a `LICENSE` file in the repository.
