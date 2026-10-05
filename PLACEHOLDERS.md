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

- [ ] `RESEND_API_KEY`: until this is set, the live form asks visitors to call or email instead.
- [x] `CONTACT_TO_EMAIL`: optional. Enquiries go to `admin@thapsus.uk` (from `contact.email`) unless this is set.
- [ ] `CONTACT_FROM_EMAIL`: must use a domain verified in Resend.
- [ ] Custom domain `tech.thapsus.uk`: add the CNAME record Railway gives you.

## 3. Claims to confirm are true

These are stated on the site as fact, based on your answers. Please double-check each one.

- [ ] **"Hosted in the UK"** (Home trust grid, FAQ, How it works): this is about where **client systems** are hosted. The website itself runs on Railway in its Europe West region (the Netherlands), as Railway has no UK region. The privacy policy covers that separately.
- [ ] **Daily backups, kept as long as needed**
- [ ] **No lock-in, and code handover if Thapsus closes**
- [ ] **Priced per plan, not per seat**
- [ ] **GDPR-compliant, with a data processing agreement as part of client contracts** (Pricing FAQ)
- [ ] **"The people who build your system support it"** (About, How it works)

## 4. How it works (`src/content/process.ts`, `src/app/how-it-works/page.tsx`)

- [ ] Step 1 timeline: `[X] days`
- [ ] Step 2 timeline: `[X] week`
- [ ] Step 3 timeline: `[X]–[X] weeks`
- [ ] Support hours and response times: `[SUPPORT HOURS AND RESPONSE TIMES — to be confirmed]`

## 5. Pricing FAQ (`src/content/faq.ts`) and Pricing page

- [ ] What happens if Thapsus closes: `[The handover terms will be set out in your contract.]`
- [ ] What if something breaks: `[Support hours and response times — to be confirmed.]`
- [ ] Can we cancel: `[NOTICE PERIOD]` and `[Options for keeping the software after you leave — to be confirmed.]`
- [ ] How long does a build take: `[X]–[X] weeks`
- [ ] VAT note under the plans: `[VAT — confirm whether prices include or exclude VAT.]`

## 6. Work: case studies (`src/content/work.ts`)

For both the **ERP system** and the **church discipleship system**:

- [ ] Headline
- [ ] Client type (sector, size, location, and whether you can name them)
- [ ] The problem
- [ ] What you built (modules, key details)
- [ ] Results: verified figures only, with the client's permission

The screens shown are illustrations with sample data and are labelled as such. Replace them with real screenshots if the client agrees.

## 7. Testimonials (`src/components/home/Testimonials.tsx`)

- [ ] Three testimonials, with name, role and business type. Use real quotes only, with permission. To hide the section until you have them, remove `<Testimonials />` from `src/app/page.tsx`.

## 8. Legal pages (templates, have them reviewed)

**Privacy policy** (`src/app/privacy/page.tsx`)

- [ ] `[BOOKING FORM FIELDS — confirm]`: what Cal.com collects when someone books
- [ ] `[MARKETING AND AUTOMATED DECISIONS — confirm …]`
- [ ] `[DATA PROCESSING TERMS — confirm these are in place with each provider]`
- [ ] `[HOSTING REGION — confirm]`: the Railway region your service runs in
- [ ] `[EMAIL PROVIDER — confirm]`: the service that hosts your inbox
- [ ] `[INTERNATIONAL TRANSFERS — confirm the safeguard used for each provider …]`
- [ ] `[RETENTION PERIOD — e.g. 12 months after our last contact]`
- [ ] `[CLIENT RECORDS RETENTION — e.g. 6 years …]`
- [ ] `[SERVER LOG RETENTION — …]`
- [ ] `[GA RETENTION — e.g. 14 months, confirm]`: set to match your GA4 data retention setting
- [ ] `[SECURITY MEASURES — confirm …]`

**Cookie policy** (`src/app/cookies/page.tsx`)

- [ ] `[GA RETENTION — …]`
- [ ] The cookie `_ga_<container-id>` is really named `_ga_` followed by your measurement ID without the `G-`.

**Terms** (`src/app/terms/page.tsx`)

- [ ] `[VAT — …]`

- [ ] Once all three have been reviewed, remove the "Template for review" notice in `src/components/legal/LegalDocument.tsx` and update the "Last updated" dates.

## 9. Optional polish

- [ ] **Logo:** if your designer has the original vector file, replace `public/brand/thapsus-mark.svg` and the drawing in `src/components/brand/Logo.tsx`.
- [ ] **About page story** (`src/app/about/page.tsx`): written from your brief. Personalise it if you'd like.
- [ ] **Social sharing image** (`src/app/opengraph-image.png`): regenerate it if the headline changes.
