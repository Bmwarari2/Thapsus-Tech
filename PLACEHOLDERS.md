# Placeholders to replace before launch

Everything below is either shown on the site in `[SQUARE BRACKETS]` or needs confirming so the site stays accurate. Work top to bottom: the first section affects the most pages.

## 1. Settings: `src/config/site.ts`

- [x] **Email address** (`contact.email`): set to `admin@thapsus.uk`. It shows in the footer, contact page and legal pages, and is the default inbox for enquiries.
- [ ] **ICO registration number** (`legal.icoNumber`): shown in the privacy policy. Leave it as an empty string `""` to hide it.
- [x] **Cal.com booking link** (`booking.calLink`): set to `thapsusadmin/30min`. Change it to `thapsusadmin/15min`, or `thapsusadmin` to let visitors choose.
- [ ] **Google Analytics 4 ID** (`analytics.gaMeasurementId`), e.g. `G-XXXXXXX`. Leave it empty if you don't want analytics.
- [ ] **Prices** (`pricing.plans`): setup fee, monthly fee and number of users for Starter and Growth.
- [ ] **Plan features:** "Up to [X] connected tools" (Growth) and `supportHours` ("[X] hours a month").
- [ ] **Set `pricing.isPlaceholder` to `false`** once the prices are real. This removes the "£[X]" and "Sample prices" labels.
- [ ] **Calculator tools** (`calculator.tools`): check the example per-user prices look sensible for your market.

## 2. Hosting and email (Railway variables)

- [x] `RESEND_API_KEY`: set in Railway. The enquiry form is live and tested.
- [x] `CONTACT_TO_EMAIL`: optional. Enquiries go to `admin@thapsus.uk` (from `contact.email`) unless this is set.
- [x] `CONTACT_FROM_EMAIL`: set in Railway (domain verified in Resend).
- [ ] Custom domain `tech.thapsus.uk`: add the CNAME record Railway gives you.

## 3. Claims to confirm are true

These are stated on the site as fact, based on your answers. Please double-check each one.

- [ ] **"Hosted in the UK"** (Home trust grid, FAQ, How it works): this is about where **client systems** are hosted. The website itself runs on Railway in its Europe West region (the Netherlands), as Railway has no UK region. The privacy policy covers that separately.
- [ ] **Daily backups, kept as long as needed**
- [ ] **No lock-in, and code handover if Thapsus closes**
- [ ] **Priced per plan, not per seat**
- [ ] **GDPR-compliant, with a data processing agreement as part of client contracts** (Pricing FAQ)
- [ ] **"The people who build your system support it"** (About, How it works)

## 4. How it works (`src/content/process.ts`)

- [x] Build timeline: about one month for development and testing.
- [x] Support: small issues in working hours, emergencies 24/7.

## 5. Pricing FAQ (`src/content/faq.ts`)

- [x] Handover, support, cancellation and build-time answers are filled in.

## 6. Work: case studies (`src/content/work.ts`)

- [x] Heritage Global Solutions (ERP), Cebuka (tender and trade ERP) and Potter’s House Church (discipleship) are written up from the systems themselves.
- [ ] **Cebuka or Hadari?** The Cebuka system was renamed **Hadari** in August. Change `client` in `src/content/work.ts` (and `name` in `src/content/testimonials.ts`) if the client now trades as Hadari.
- [ ] The screens are illustrations based on each real workflow, using sample data. Swap in real screenshots if the clients agree.

## 7. Testimonials (`src/content/testimonials.ts`)

- [ ] Three **draft** quotes are written, one per client. Send each client their draft to approve or edit, then set `approved: true`. Until at least one is approved, the Home page shows the three case studies instead, and nothing appears as a quote.

## 8. Legal pages

- [x] Reviewed and finalised. The "Template for review" notice has been removed.
- [ ] **ICO registration number** (`legal.icoNumber` in `src/config/site.ts`): add it if you have one. The sentence stays hidden while it's empty.
- [ ] When you add Google Analytics, set GA4's data retention to **14 months** (Admin → Data collection → Data retention) to match the privacy and cookie policies.

## 9. Optional polish

- [ ] **Logo:** if your designer has the original vector file, replace `public/brand/thapsus-mark.svg` and the drawing in `src/components/brand/Logo.tsx`.
- [ ] **About page story** (`src/app/about/page.tsx`): written from your brief. Personalise it if you'd like.
- [ ] **Social sharing image** (`src/app/opengraph-image.png`): regenerate it if the headline changes.
