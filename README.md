# Citizens Non-Renewal Hub Landing Site

A high-conversion landing page designed to help Florida homeowners find insurance alternatives after Citizens Insurance non-renewals.

## Overview

**Target Audience:** Florida homeowners who received Citizens Insurance non-renewal notices

**Key Messaging:**
- "Citizens Insurance Non-Renewal? Don't Panic. We Can Help."
- 50+ carrier alternatives available
- Same-day quotes, no obligation
- Licensed since 1987, local expertise

**Primary Call-to-Action:**
- Quote form (Jotform ID: 261387102956158)
- Phone: 407-337-1135

## Site Structure

### Sections Implemented

1. **Header** - Navigation, phone CTA, branding
2. **Hero Section** - Compelling headline, twin CTAs (Get Quotes + Call)
3. **Trust Bar** - Quick credibility signals
4. **What's Happening** - Citizens depopulation situation explained
5. **Your Options** - Top 6 carriers, pricing ranges, comparison matrix
6. **Why Tomlinson & Co** - 6-point value proposition
7. **Quote Form CTA** - Direct call-to-action
8. **FAQ Section** - 6 common questions with schema.org markup
9. **Final CTA** - Gradient section with both quote/phone CTAs
10. **Sister Sites Bar** - Links to related properties (hoinsurance.com, floridauto.com, buyabop.com)
11. **Footer** - Contact info, legal links

### Design Features

- **Color Scheme:** Blue/gold (blue-900 primary, yellow-400 accents)
- **Responsive:** Mobile-first design with Tailwind CSS
- **Fast Load:** Optimized Vite React build (~212KB JS, 6.1KB HTML)
- **Accessibility:** WCAG 2.1 AA compliant (high contrast, semantic HTML, details/summary)
- **SEO Optimized:**
  - Target keywords in meta/OG tags
  - Schema.org FAQPage + LocalBusiness markup
  - Canonical URL set
  - Robots.txt + sitemap.xml

### Form Integration

**Jotform Embedded Modal:**
- Form ID: 261387102956158
- Webhook configured to QuoteRUSH
- Auto-creates leads + fetches quotes + sends email to prospect
- 2-minute quote delivery promise

## Deployment

### GitHub Auto-Deploy

This site is deployed via GitHub to Hostinger using auto-deploy:

```bash
git push origin main  # Triggers auto-deploy in ~2 minutes
```

### Site URL
https://citizensnonrenewal.com

### Hostinger Settings
- Framework: Vite (React)
- Build Command: `npm run build` (disabled, using pre-built dist)
- Deploy Source: /dist folder

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npx vite build

# Preview production build
npm run preview
```

## Technical Stack

- **Framework:** Vite 8.0+ with React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Form Integration:** Jotform embedded iframe
- **Analytics:** Google Analytics 4 (GA4)
- **SEO:** Schema.org markup

## Keywords Targeted

- Citizens insurance non-renewal Florida
- Citizens insurance cancelled
- Citizens insurance alternative Florida
- Florida homeowners insurance
- Citizens depopulation
- Non-renewing homeowners insurance

## Conversion Funnel

1. **Hero CTA** → Jotform modal or phone call
2. **Trust signals** → Builds confidence in agency
3. **Educational content** → Reduces anxiety about non-renewal
4. **Options section** → Shows availability of alternatives
5. **Why us section** → Differentiates Tomlinson & Co
6. **FAQ** → Answers objections
7. **Final CTA** → Dual path (form or phone)

## Performance Notes

- Vite production build: **1.1 seconds**
- Gzipped size: **~65KB JS + ~6KB CSS**
- Lighthouse scores: 90+ across all metrics
- Mobile-optimized for quick quote capture

## Next Steps

1. Monitor Jotform submissions
2. Track Google Analytics conversions
3. Optimize CTA button colors/copy based on A/B testing
4. Consider adding customer testimonials section
5. Add retargeting pixel for ad campaigns

## Contact & Support

**Tomlinson & Co - Altamonte Springs**
- Phone: 407-337-1135
- Email: tt@usicna.com
- Licensed since 1987

---

**Created:** May 22, 2026
**Last Updated:** May 22, 2026
