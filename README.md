# Portfolio — Next.js

Your design portfolio, built with Next.js and ready to deploy on Vercel.

---

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx              ← root HTML shell + fonts
│   ├── globals.css             ← all styles (design tokens, layout, components)
│   ├── page.tsx                ← home page  (/)
│   └── case-study/
│       └── [slug]/
│           └── page.tsx        ← case study page  (/case-study/project-one)
├── components/
│   ├── Sidebar.tsx             ← left nav (shared between home + case study)
│   ├── Marquee.tsx             ← scrolling project cards on home page
│   └── DraggableCanvas.tsx    ← interactive research board on case study
├── lib/
│   └── caseStudies.ts          ← ✏️  YOUR CONTENT LIVES HERE
├── public/                     ← drop images/PDFs here
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## Step 1 — Install Node.js (if you haven't)

1. Go to https://nodejs.org and download the **LTS** version
2. Run the installer — just click through the defaults
3. Open Terminal (Mac) or PowerShell (Windows) and type:
   ```
   node --version
   ```
   You should see something like `v20.x.x`. If so, you're good.

---

## Step 2 — Get the project running locally

Open Terminal, navigate to this folder, and run:

```bash
# 1. Install dependencies (only needed once)
npm install

# 2. Start the local dev server
npm run dev
```

Then open your browser to **http://localhost:3000** — you'll see your portfolio.

The site auto-refreshes whenever you save a file. No need to restart.

---

## Step 3 — Customize your content

**Almost everything you need to edit is in one file:**

### `lib/caseStudies.ts`
This is where all your case study text lives. Each project is an object in the array.
Swap out the placeholder text with your real project info.

To **add a new case study**, copy the first object in the array, change the `slug`,
and fill in your content. Then add a card for it in `components/Marquee.tsx`.

### `components/Marquee.tsx`
Edit the `PROJECTS` array to match your actual project slugs and labels.
When you have real screenshots, replace the gradient `div` with a Next.js `<Image>`:
```tsx
import Image from 'next/image'
// ...
<Image src="/images/project-one-thumb.jpg" alt="Project One" fill className="marquee-card-img" />
```
Put your images in the `/public/images/` folder.

### `components/DraggableCanvas.tsx`
Edit the `CANVAS_ITEMS` array to use your own research artifacts.
Replace the SVG charts with screenshots of your actual data when you have them.

### `app/layout.tsx`
Update the `metadata` object with your real name and description.

### `app/globals.css`
Change the CSS variables at the top to restyle everything:
```css
:root {
  --bg:     #f5f3ee;  /* page background */
  --accent: #c8622a;  /* orange highlight color */
  --border: #ddd9d2;  /* line color */
}
```

---

## Step 4 — Add your images

Drop files into the `/public` folder. Reference them as `/filename.jpg` in code.

For the hero image on a case study, set `heroImage: '/images/my-project-hero.jpg'`
in `lib/caseStudies.ts`, then update the `hero-image` div in
`app/case-study/[slug]/page.tsx` to use Next.js `<Image>`.

For your resume: drop `resume.pdf` into `/public`. The links already point to `/resume.pdf`.

---

## Step 5 — Deploy to Vercel

Vercel is the easiest way to deploy a Next.js site — it's made by the same team.

### One-time setup:
1. Create a free account at **https://vercel.com** (sign up with GitHub)
2. Push your portfolio folder to a GitHub repository:
   - Go to https://github.com/new
   - Create a new repo called `portfolio`
   - Follow the instructions to push your local folder to it

### Deploy:
1. In Vercel, click **"Add New Project"**
2. Import your `portfolio` GitHub repo
3. Leave all settings as defaults — Vercel auto-detects Next.js
4. Click **Deploy**

Your site will be live at `yourname.vercel.app` in about 60 seconds.

**After that, every `git push` to your main branch auto-deploys.** You never
have to manually deploy again.

### Custom domain (optional):
In your Vercel project → Settings → Domains → add your domain.

---

## Common questions

**"I changed the text but the site didn't update"**
Make sure `npm run dev` is running in your terminal.

**"I see a TypeScript error"**
TypeScript errors usually appear in your terminal. Read the message — it usually
tells you exactly which file and line to fix.

**"How do I add a new page (like /about)?"**
Create a file at `app/about/page.tsx`. Next.js routing is folder-based —
the file path IS the URL path.

**"Can I use plain CSS classes instead of the design system?"**
Yes — all classes are in `app/globals.css`. Add new classes there freely.

---

Built with [Next.js](https://nextjs.org) · Deployed on [Vercel](https://vercel.com)
