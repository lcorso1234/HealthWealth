# Rumi Healing Arts — Static Site

This repository holds a small static site (HTML/CSS/JS). Below are quick steps to publish it and connect the custom domain `rumihealingarts.com`.

Prerequisites
- Git installed
- A GitHub account (for GitHub Pages) or Netlify account (for Netlify)
- Control of the DNS for `rumihealingarts.com`

Option A — GitHub Pages (recommended when you already use GitHub)

1. Create a new repository on GitHub.
2. From your local project folder run:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:<your-username>/<repo-name>.git
git push -u origin main
```

3. The included GitHub Actions workflow will build and publish the `main` branch to GitHub Pages. You can find it under `.github/workflows/pages.yml`.
4. In your GitHub repo settings -> Pages, ensure the source is "GitHub Actions".
5. GitHub Pages will serve the site at `https://<your-username>.github.io/<repo-name>/` or, when configured with a CNAME, at `https://rumihealingarts.com`.

6. DNS: Add an A record pointing to GitHub Pages (use GitHub's documented IPs) or add an ALIAS/ANAME to `username.github.io`. Alternatively, create a CNAME pointing `www` to `<your-username>.github.io` and use a redirect for the root.

Option B — Netlify

1. Create a site on Netlify and connect your GitHub repo (or drag-and-drop the site folder in the Netlify UI).
2. Add the domain `rumihealingarts.com` in Netlify's Domain settings and follow the DNS instructions. Netlify will provide A records or nameservers to set.
3. Netlify automatically provisions HTTPS via Let's Encrypt.

DNS notes
- If you prefer `www.rumihealingarts.com` as canonical, create a CNAME for `www` to point to the hosting provider and set a redirect from the root to `www`.
- DNS propagation can take up to 48 hours, but usually completes within a few minutes to a few hours.

Files added
- `CNAME` — contains the domain name for GitHub Pages.
- `.github/workflows/pages.yml` — GitHub Actions workflow to publish to GitHub Pages.
- `netlify.toml` — optional Netlify config.

If you want, I can:
- Initialize git and make the initial commit here.
- Create the GitHub repo for you (I can't do that without access but I can give exact commands and the workflow is ready).
- Walk you through DNS changes at your registrar.
