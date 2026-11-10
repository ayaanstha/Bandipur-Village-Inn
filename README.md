# Bandipur Village Inn — website

A single-page, responsive website for Bandipur Village Inn, a boutique heritage hotel in Bandipur, Nepal.
Built with React 18, Vite 5, Tailwind CSS 3 and Lucide icons. Fonts (Cormorant Garamond and Manrope) are
self-hosted through Fontsource, so the site makes no requests to Google Fonts.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

Requires Node 18 or newer.

## Enquiries & booking

The previous WordPress site had no booking engine. Its "Book Now" button opened an enquiry form
(name, email, phone, arrival, departure). This site keeps that flow and improves it:

- **Book Your Stay** opens a reservation-enquiry dialog with dates, guests, room preference and special requests.
- The **Contact** section has a general enquiry form.
- Both have inline validation, including email format, dates not in the past, departure after arrival and phone format.
  They also have a hidden honeypot field for spam.

How enquiries are sent depends on `VITE_ENQUIRY_ENDPOINT` (see `.env.example`):

| Setting | Behaviour |
| --- | --- |
| Not set (default) | Opens the visitor's email app with the enquiry pre-filled and addressed to info@bandipurvillageinn.com. |
| Set to a form endpoint (Formspree, Basin, Getform or your own API) | The enquiry is POSTed as JSON, and the visitor sees a confirmation message on the page. |

### Connecting Formspree (enquiries straight to the inbox)

1. Sign up at [formspree.io](https://formspree.io), ideally with info@bandipurvillageinn.com, so submissions
   go to the hotel inbox. Verify that email address when Formspree asks.
2. Click **New form** and name it something like "Website enquiries". Copy the endpoint it shows, for example
   `https://formspree.io/f/abcdwxyz`.
3. In this project, copy `.env.example` to `.env` and set
   `VITE_ENQUIRY_ENDPOINT=https://formspree.io/f/abcdwxyz`.
4. Run `npm run build` and deploy `dist/`. If you use Netlify, Vercel or similar, add the same variable in the host's
   environment settings instead of `.env`.
5. Recommended Formspree settings: under the form's **Settings**, restrict submissions to the
   `bandipurvillageinn.com` domain, and keep reCAPTCHA off. The site already has a honeypot spam trap and
   submits via JavaScript.

Each enquiry arrives as an email with a clear subject line, such as *Booking enquiry: 2026-12-20 to 2026-12-23 –
Guest Name*. It lists the dates, guests, room preference and message, and pressing **Reply** goes straight to the
guest. If the endpoint is unreachable or returns an error, visitors see a message with the hotel's phone number
and email address, and nothing they typed is lost.

## Project structure

```
assets-source/originals/   Original photographs downloaded from the current website
public/images/             Optimised WebP renditions (generated)
public/                    favicon, robots.txt, sitemap.xml, og-image.jpg
scripts/optimize-images.mjs  Generates the WebP renditions and src/data/images.json
src/
  data/site.js             Contact details, rooms, amenities, experiences (all business info lives here)
  data/gallery.js          Gallery photos, categories and alt text
  data/images.json         Image dimensions and available widths (generated)
  components/              Header, Footer, BookingDialog, Lightbox, Img, Reveal, ornaments, form parts
  sections/                Hero, About, Destination, Accommodation, Experiences, BookingBand, Gallery, Contact
  hooks/                   Active-section tracking and the shared enquiry-form state
  lib/                     Enquiry sending and validation
```

### Adding or replacing photos

1. Put the original JPEG in `assets-source/originals/`.
2. Run `npm run images` to create the WebP renditions and update `src/data/images.json`.
3. Reference the image by its slug (the lowercase filename without extension) in `src/data/*.js` or a section.

## Content sources

All business information comes from the existing bandipurvillageinn.com: address, phone, email, room
categories and descriptions, amenities, travel distances, the history of Bandipur and the social links.
No prices, reviews or facilities have been added. Rooms show "Rates on request", and guest reviews link to the
hotel's Tripadvisor page.

## Deployment

`npm run build` outputs a static site in `dist/`. Any static host can serve it, for example Netlify, Vercel,
Cloudflare Pages or the current web host. Canonical URL, Open Graph tags, JSON-LD and the sitemap assume the
site is served at `https://www.bandipurvillageinn.com/`.
