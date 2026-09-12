NARDOUW WEBSITE — GITHUB PAGES PRODUCTION BUILD
Updated: 12 September 2026

DOMAIN
- nardouw.co.za
- Registrar/DNS: Truehost
- Hosting: GitHub Pages

PAGES
- index.html
- accommodation.html
- activities.html
- our-story.html
- enquire.html
- contact.html
- success.html

LOCKED SITE DECISIONS INCLUDED
- Site name: Nardouw.
- Farm Shop removed.
- “Book Your Stay” replaced with “Enquire”.
- Main navigation: Home / Accommodation / Activities / Our Story / Enquire / Contact Us.
- Enquiry form permits only 1 or 2 guests.
- WhatsApp/phone: 083 645 8334 (+27 83 645 8334 links).
- Email: nardouwcamping@gmail.com.
- Footer: Nardouw / “Escape to the Cederberg.”
- No online booking engine; enquiry only.
- Accommodation rates: R1,188 (1 guest), R1,688 (2 guests), 2-night minimum.
- Indemnity requirement retained.
- Rooibos Tours included in Activities.
- 12-image accommodation gallery with lightbox.
- Responsive mobile navigation.

ENQUIRY FORM
- The Enquire page posts to FormSubmit and forwards submissions to nardouwcamping@gmail.com.
- The first real/test submission will trigger an activation email from FormSubmit. Click the activation link once.
- After activation, submissions are emailed directly to Gmail.
- reCAPTCHA remains enabled by default.
- Successful submissions return to https://nardouw.co.za/success.html.

IMAGE NOTE
This build currently uses the current Wix CDN image URLs from the user's design reference. The images display correctly while the Wix URLs remain public, but they should eventually be replaced by local image files so the repository is fully independent of Wix.

GITHUB PAGES DEPLOYMENT
1. Create a public GitHub repository for the site (for example: nardouw-website).
2. Upload/push all files in this folder to the repository root.
3. In repository Settings > Pages, publish from the main branch and /(root).
4. Set the custom domain to nardouw.co.za. The included CNAME file already contains this domain.
5. At Truehost DNS, point the apex/root domain to GitHub Pages using the four GitHub A records below.
6. Set www as a CNAME to <your-github-username>.github.io.
7. Remove any conflicting old A/AAAA/CNAME records for @ or www.
8. After DNS resolves, enable Enforce HTTPS in GitHub Pages.
9. Submit one enquiry yourself and click FormSubmit's activation email sent to nardouwcamping@gmail.com.
10. Submit a second enquiry and confirm it arrives successfully.

GITHUB PAGES A RECORDS (official values checked 12 Sep 2026)
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

Do not add wildcard DNS records.


LOCAL IMAGES
All site photographs in /images are local copies derived from the user-supplied originals. The tortoise image was intentionally omitted because the original file was unavailable. No Wix image URLs are required by the pages in this package.
