# Dale's Study Space

This is a deploy-ready React project configured to be uploaded to GitHub and deployed on Vercel.

Features:
- Study planner / task tracker (localStorage)
- Calendar-style schedule (simple view)
- Progress chart (Chart.js)
- Notes section
- Minimalist design, Times New Roman font, light green theme
- Mobile / tablet friendly

## Quick deploy (tablet-friendly)
1. Create a GitHub repo named `dales-study-space` at https://github.com/new
2. From your tablet browser, on the repo page click **Add file → Upload files** and upload the entire contents of this project (you can upload the zip contents by extracting on your tablet first).
3. Commit changes.
4. Go to https://vercel.com → Import Project → Connect your GitHub account → select `dales-study-space` → Deploy.
   - Build Command: `npm run build`
   - Output Directory: `build`
5. After deploy, your site will be at `https://<your-vercel-project>.vercel.app` (you can rename in Vercel to `dalesstudyspace` to get `dalesstudyspace.vercel.app`).

## Local testing (optional)
On a device with Node.js installed:

```bash
npm install
npm start
```
