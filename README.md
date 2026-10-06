# Thapsus website

The marketing website for **Thapsus**: custom software for UK businesses, built in Stockport.

- **Live address (planned):** https://tech.thapsus.uk
- **Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis smooth scrolling
- **Hosting:** Railway (Vercel and Netlify also work, see below)

Before launch, work through **[PLACEHOLDERS.md](PLACEHOLDERS.md)**. It lists every placeholder that still needs real content.

---

## 1. Run it on your computer

You need **Node.js 20.9 or newer** (22 recommended) from [nodejs.org](https://nodejs.org).

```bash
npm install          # first time only
npm run dev          # start a local copy at http://localhost:3000
```

The page reloads as you save changes.

To check a production build exactly as it will run online:

```bash
npm run build
npm start            # http://localhost:3000
```

Other useful commands:

```bash
npm run lint         # code style checks
npx tsc --noEmit     # type checks
```

---

## 2. Edit the content

### The settings file: `src/config/site.ts`

Most of what you'll want to change lives in this one file:

| Setting | What it controls |
| --- | --- |
| `url` | The live web address used in search results, the sitemap and social cards |
| `contact` | Email, phone and location shown in the footer, contact page and legal pages |
| `legal` | Company name, number and registered office (UK law requires these on your site) |
| `brand` | The accent colour (Evergreen) and its lighter and darker versions |
| `booking.calLink` | Your Cal.com booking link, e.g. `thapsus/software-review` |
| `analytics.gaMeasurementId` | Your Google Analytics 4 ID, e.g. `G-XXXXXXX`. Leave it empty to turn analytics off |
| `pricing` | Start fee, tool fee, most tools per plan, improvement time, minimum term, charity discount, and each plan's team fee, number of people and features |
| `calculator` | Default team size, the tools listed with their example prices (per person or flat), and whether the start fee is included |

Anything in `[SQUARE BRACKETS]` is a placeholder.

**Prices:** all prices exclude VAT. If `pricing.isPlaceholder` is set to `true`, the Pricing page shows `£[X]` and the calculator is labelled "Sample prices". A plan's monthly price is its team fee plus the tool fee for each tool. The pricing FAQ in `src/content/faq.ts` repeats a few figures (£200 start, £39 per tool, 12-month term, 30 minutes per tool), so update it too when prices change.

### Page copy: `src/content/`

| File | What it holds |
| --- | --- |
| `solutions.ts` | The 13 solutions: name, headline, summary, features, who it's for, what it replaces |
| `tools.ts` | The five tools in the pinned "Tools we build" story on the Home page |
| `process.ts` | The four steps (Home and How it works) and their timelines |
| `faq.ts` | Pricing FAQ questions and answers |
| `trust.ts` | The "Low risk. By design." tiles |
| `work.ts` | The case studies: Heritage Global Solutions, Cebuka and Potter’s House Church |
| `testimonials.ts` | Client quotes, each shown only once approved |
| `navigation.ts` | Header and footer links |

Headlines inside individual sections are in `src/components/home/*.tsx` and `src/app/*/page.tsx`.

### Legal pages

`src/app/privacy/page.tsx`, `src/app/cookies/page.tsx` and `src/app/terms/page.tsx` have been reviewed and finalised. Update the "Last updated" date in each file whenever you change one.

### Testimonials

Quotes live in `src/content/testimonials.ts`. Each has an `approved` flag, and a quote only appears while it's `true`. Only set that once the client has confirmed the exact wording. On the Home page each quote sits in its project's card; a project without an approved quote shows its headline instead. On the Work page the quote appears at the end of the case study.

### Logo

Vector files are in `public/brand/` (`thapsus-mark.svg`, `thapsus-mark-mono.svg`, `thapsus-mark.png`). The browser tab icon is `src/app/icon.svg` and the Apple touch icon is `src/app/apple-icon.png`. The logo used in the page itself is drawn in `src/components/brand/Logo.tsx`. If your designer has the original vector file, swap it into those places.

### Social sharing image

`src/app/opengraph-image.png` (1200 × 630) appears when the site is shared. Its alt text is in `opengraph-image.alt.txt`.

---

## 3. The enquiry form

Enquiries are checked in the browser, then sent to `/api/contact` (`src/app/api/contact/route.ts`). That endpoint:

- checks every field again;
- blocks spam with a hidden "honeypot" field and a minimum fill time;
- limits each visitor to 5 messages in 10 minutes;
- emails the enquiry to you using [Resend](https://resend.com), with Reply-To set to the visitor's email.

**Set up email (about 10 minutes):**

1. Create a free Resend account.
2. Add and verify your domain (for example `thapsus.uk`) by adding the DNS records Resend shows you.
3. Create an API key.
4. Add these environment variables in Railway (or in a local `.env.local` file; see `.env.example`):

| Variable | Example | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_…` | Lets the site send email |
| `CONTACT_TO_EMAIL` | `admin@thapsus.uk` | Where enquiries go. Defaults to `contact.email` in `site.ts`. Separate several addresses with commas |
| `CONTACT_FROM_EMAIL` | `Thapsus website <website@thapsus.uk>` | The sender. Must use your verified domain |

Until these are set, the live form says it can't send and asks visitors to call or email instead. In local development, enquiries are printed to the terminal.

---

## 4. Cookies, analytics and booking

- **Cookie banner:** shown on first visit. **Accept** and **Reject** are equally easy, and **Choose cookies** opens the full settings. The choice is stored for six months in the `thapsus_consent` cookie. "Cookie settings" in the footer reopens the settings.
- **Google Analytics 4:** loads **only** after a visitor accepts analytics. If they later withdraw consent, the site deletes the GA cookies and reloads. Add your ID to `analytics.gaMeasurementId`.
- **Cal.com calendar:** on the Contact page. It sets its own cookies, so it loads only once the visitor allows it. A direct "Open on cal.com" link always works. Add your link to `booking.calLink`.

The code is in `src/components/consent/ConsentProvider.tsx` and `src/lib/consent.ts`.

---

## 5. Motion

| Effect | Where |
| --- | --- |
| Hero entrance (CSS only, plays before any script loads) | `src/components/home/Hero.tsx`, `src/app/globals.css` (`.rise`, `.rise-soft`, `.rise-device`) |
| Hero depth on scroll | `src/components/home/HeroParallax.tsx` |
| Words brightening on scroll | `src/components/home/TextReveal.tsx` |
| Dashboard growing to full width | `src/components/home/GrowOnScroll.tsx` |
| Pinned laptop story | `src/components/home/PinnedStory.tsx` (desktop) and `ToolsShowcase.tsx` (stacked version) |
| Sideways "What we build" gallery | `src/components/home/HorizontalGallery.tsx` |
| Steps and progress line | `src/components/home/StepsReveal.tsx` |
| Counting numbers | `src/components/ui/Numbers.tsx` |
| Fade-up on any element | add `data-reveal` to it (handled in `src/components/motion/MotionProvider.tsx`) |

How it's built:

- GSAP and Lenis load **after** the page is visible and the browser is idle (`src/lib/motion.ts`), so they never slow down first paint.
- Only `transform` and `opacity` are animated.
- **Reduced motion:** visitors with "reduce motion" turned on get a calm, static site. Nothing pins, there's no smooth scrolling and everything is visible straight away.
- **Phones and tablets:** nothing pins long enough to trap scrolling. The gallery becomes a native swipe and the pinned story becomes a stacked list. Touch devices keep native scrolling.

To change how long the pinned story lasts, edit the `end` value in `PinnedStory.tsx`. It's currently 0.9 screen heights per tool.

---

## 6. Deploy

### Railway (current host)

The repository includes `railway.json`, so Railway knows how to build and start the site.

1. In [Railway](https://railway.com), create a project and choose **Deploy from GitHub repo**. Pick this repository and the branch you want to publish.
2. Railway detects Next.js, runs `npm ci` and `npm run build`, then starts the site with `npm run start`. The site listens on the `PORT` Railway provides.
3. Add the email variables from section 3 under **Variables**.
4. Under **Settings → Networking**, generate a Railway domain to test with.
5. **Custom domain:** add `tech.thapsus.uk` in the same place. Railway shows a CNAME record to add at your domain provider. HTTPS is set up automatically once DNS updates.

Every push to the connected branch redeploys automatically.

### Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js. Add the same environment variables and your domain.

### Netlify

Import the repository at [app.netlify.com](https://app.netlify.com). Netlify's Next.js runtime is applied automatically. Use build command `npm run build`, add the same environment variables and your domain.

### After going live

- Check that `url` in `src/config/site.ts` matches your live address.
- Submit `https://tech.thapsus.uk/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
- Test your structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

---

## 7. Quality

At handover, a production build tested with Lighthouse (mobile, simulated slow device) scored:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 96 | 100 | 100 | 100 |
| Solutions | 96 | 100 | 100 | 100 |
| Pricing | 97 | 100 | 100 | 100 |
| Contact | 97 | 100 | 100 | 100 |

Desktop performance is 100. Every page was also checked with axe against WCAG 2.2 AA, and the layouts were checked at phone, tablet and desktop widths.

Accessibility features include semantic landmarks and headings, a skip link, visible focus rings, labelled form fields with linked error messages, an accessible cookie dialog, alt text and labels for every mockup, and full reduced-motion support.

---

## 8. Project structure

```
src/
  app/                  pages, metadata, sitemap, robots, icons, API route
  components/
    home/               Home page sections and their animations
    layout/             header, footer, sub-nav, page intro
    mockups/            the example app screens (HTML/CSS)
    devices/            laptop, tablet and phone frames
    calculator/         savings calculator
    consent/            cookie banner, settings and analytics loader
    contact/            enquiry form and booking calendar
    legal/              layout for legal pages
    ui/                 buttons, icons, numbers, FAQ
  config/site.ts        ← the settings file
  content/              page copy
  lib/                  motion loader, savings maths, validation, metadata
  styles/               device frame and mockup styles
public/brand/           logo files
```
