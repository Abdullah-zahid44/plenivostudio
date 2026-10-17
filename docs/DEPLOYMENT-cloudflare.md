# Deploying Plenivostudio to Cloudflare Pages

This guide covers deploying the Plenivostudio marketing site (`site/`) to Cloudflare Pages.
The planner product itself is a standalone HTML file and is not deployed here;
it is delivered to customers through Lemon Squeezy's digital delivery.

## Prerequisites

- A GitHub account with the `plenivostudio` repository pushed (see step 1).
- A Cloudflare account (free plan is sufficient).
- Node.js 18 or later on your local machine for verification builds.

## Step 1 — Push the repository to GitHub

```bash
cd ~/workspace/plenivostudio
git init
git add .
git commit -m "Initial Plenivostudio release"
gh repo create Abdullah-zahid44/plenivostudio --public --source=. --push
```

If you prefer to create the repository in the GitHub web UI first, add it as
the remote afterwards:

```bash
git remote add origin https://github.com/Abdullah-zahid44/plenivostudio.git
git branch -M main
git push -u origin main
```

## Step 2 — Connect Cloudflare Pages to the repository

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize the GitHub integration and select the `Abdullah-zahid44/plenivostudio` repository.
4. In **Set up builds and deployments**, configure:
   - **Production branch:** `main`
   - **Root directory:** `site`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** leave default, or set `18` (or newer) under
     **Settings → Environment variables → NODE_VERSION** if the build requires it.

## Step 3 — Environment variables

Add the following under **Pages → Settings → Environment variables**
(set for both Production and Preview):

| Variable   | Value                                  | Purpose                                  |
|------------|----------------------------------------|------------------------------------------|
| `SITE_URL` | `https://plenivostudio.pages.dev` (or your custom domain) | Canonical URL used for SEO tags, sitemap, structured data |

Update `SITE_URL` to your custom domain once one is attached (step 5).
Rebuild after changing it so canonical URLs and the sitemap regenerate.

## Step 4 — Deploy

Click **Save and Deploy**. The first build takes a few minutes.
Cloudflare assigns a `*.pages.dev` subdomain automatically, e.g.
`https://plenivostudio-xyz.pages.dev`.

Verify the deployment:

- Home page loads and all navigation links resolve (no 404s except the
  intentional 404 page test).
- `/demo` loads the interactive demo.
- Checkout buttons show the honest disabled state
  ("Purchasing opens after store activation") until Lemon Squeezy is configured.
- `https://<your-subdomain>/sitemap.xml` and `/robots.txt` are served.

## Step 5 — Custom domain (optional)

1. In **Pages → Custom domains**, click **Set up a custom domain**.
2. Enter your domain (e.g. `plenivostudio.example.com`) and follow the DNS prompts.
   Cloudflare configures SSL automatically.
3. Update the `SITE_URL` environment variable to the custom domain and trigger
   a redeploy (**Deployments → Retry deployment** or push a commit).

The `*.pages.dev` subdomain keeps working alongside the custom domain.

## Step 6 — Preview deployments

Every push to a non-`main` branch, and every pull request, gets its own
preview URL automatically (e.g. `https://<hash>.plenivostudio-xyz.pages.dev`).
Use previews to review changes before merging to `main`. Preview builds use
the Preview environment variables.

## Ongoing workflow

```bash
# make changes, then:
git add .
git commit -m "Describe the change"
git push origin main   # production redeploys automatically
```

To redeploy without a code change: **Deployments → ⋯ → Retry deployment**.

## Troubleshooting

- **Build fails on `npm run build`:** run `cd site && npm install && npm run build`
  locally and fix the reported error first.
- **Blank page / wrong asset paths:** confirm the build output directory is
  `dist` and the root directory is `site`. Astro is configured with
  `output: 'static'`, so no server-side adapter is involved.
- **Stale canonical URLs:** you changed domains but not `SITE_URL` — update it
  and redeploy.
