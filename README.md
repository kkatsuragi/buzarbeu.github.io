# Buzar Beu Bacaltos — GitHub Pages portfolio

A complete responsive portfolio with a dark tech design. Built with HTML, CSS, and JavaScript; no installation, build step, API key, or external assets required.

## Start here

1. Extract this ZIP.
2. Open `index.html` in your browser to preview the site.
3. Open `config.js` in a text editor and review the name, location, introduction, and skills. The content uses your supplied résumé: Buzar Beu (Bube) Bacaltos, developer and project manager. Employment dates are copied from that résumé; no ongoing employment is inferred.
4. Your résumé email and PDF download are already configured. Add your GitHub and LinkedIn profile URLs if desired. Keep unknown fields as empty strings (`""`); those links are hidden until configured.
5. Review all public wording. Work cards are representative examples created for this portfolio, not completed client projects or verified outcomes. Replace them with approved real projects when available.

## Publish with GitHub’s website — no command line

1. Sign in at https://github.com. Create an account first if needed.
2. Click the **+** menu, then **New repository**.
3. Name the repository **YOUR-USERNAME.github.io**, replacing YOUR-USERNAME with your exact GitHub username. Example: username `bube123` → repository `bube123.github.io`.
4. Choose **Public**, enable **Add README**, and click **Create repository**.
5. On the repository’s **Code** tab, choose **Add file → Upload files**. Drag in the extracted files and the `assets` folder. Upload the contents of `portfolio`, not the outer folder or ZIP. `index.html` must be in the repository root, beside `styles.css`, `script.js`, and `config.js`.
6. Commit the upload to **main**. You can replace GitHub’s initial README with this one.
7. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Select **main** and **/(root)**, then click **Save**.
8. Wait for the deployment to complete. The **Actions** tab shows progress, and **Settings → Pages** displays the live link.
9. Visit **https://YOUR-USERNAME.github.io/**. Check the site on your phone and try the contact buttons.

Alternative: name the repository `portfolio`. Publish it using the same settings. The address will be `https://YOUR-USERNAME.github.io/portfolio/`. All main-page asset paths are relative, so both options work. For a project repository, edit the home link in `404.html` from `href="/"` to `href="/portfolio/"` (or your actual repository name).

If `.nojekyll` is hidden or skipped by the browser upload, use **Add file → Create new file**, name it `.nojekyll`, and commit it. This package uses plain static files and does not need Jekyll.

## Edit and update

- **Name, email, social links, introduction, skills:** `config.js`.
- **Hero, services, work cards, other text:** `index.html`.
- **Project popup descriptions:** the `projects` object in `script.js`.
- **Colors, spacing, responsive design:** `styles.css`.
- **Browser icon:** `assets/favicon.svg`.
- **Résumé:** put your PDF at `assets/resume.pdf` (your supplied résumé is already included), then set `resume: "assets/resume.pdf"` in `config.js`. The download link appears automatically.
- **Share previews:** update the static `<title>` and description in `index.html` when changing the name; many crawlers do not run JavaScript. You can add an Open Graph image later with your actual public URL.

Keep the JavaScript quotes, commas, and braces intact. Do not paste secrets or credentials into configuration. All uploaded website files are public.

After publishing, open a file in GitHub, click the pencil icon, make an edit, and commit. Updates redeploy from `main`. Add approved real screenshots to `assets/` and use relative image paths such as `assets/my-project.jpg`.

## Résumé and personal information

The downloadable PDF is an unchanged copy of your supplied résumé, including its contact details and address. The visible page uses only Davao City for location and your professional email. Review the PDF before publishing if you want to remove its street address or telephone number.

## Contact behavior

GitHub Pages hosts static files; this package has no inbox or backend. It does not silently send or store messages.

- With your email configured, **Prepare email** opens the visitor’s email application with an addressed draft. They must send it from there.
- **Copy inquiry** copies a formatted message for sharing through another channel. When clipboard access is unavailable, a selectable text box appears for manual copying.
- If you leave email and profiles blank, visitors can prepare an inquiry but have no direct recipient link. Add at least one real contact method before publishing for professional use.
- Forms use browser validation for the visitor’s name, email, and message.

## Preview using a local server (optional)

If Python is installed, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. Press Ctrl+C in the terminal to stop. You can also simply double-click `index.html`; clipboard permissions vary by browser.

## Optional Git workflow

Use this when you prefer Git and have already created the repository. Start in the extracted portfolio folder. Replace YOUR-USERNAME in the remote URL. For a new empty repository:

```bash
git init
git add .
git commit -m "Add professional portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

For a repository that already has a README or other commits, clone it first and copy these files into the clone, then commit and push. Do not force-push over existing work. Configure Pages as described above.

## Troubleshooting

- **404 on the home page:** check `index.html` is at the top level of `main`, confirm Pages uses `main` and `/(root)`, then check the deployment in Actions.
- **Style or scripts missing:** preserve filenames and the folder structure, including lowercase spelling. Do not rename only one side of a reference.
- **Old content:** confirm the latest deployment completed, then refresh with Ctrl+Shift+R.
- **Missing contact links:** set full `https://` GitHub/LinkedIn URLs or a valid real email in `config.js`.
- **Email draft does not open:** the visitor needs a configured email app. Use Copy inquiry as an alternative.
- **404 recovery link on a custom domain:** edit `404.html`’s home link if you move the site into a custom subdirectory.

## Verification

JavaScript syntax and local asset references were checked. The download package and résumé copy were verified. Automated browser checks could not run because a browser executable was unavailable and its download failed; desktop/mobile visual rendering and interactive behavior still need a browser check before publication. Responsive CSS covers mobile, tablet, and desktop layouts.

## Included files

```text
index.html        Main portfolio
styles.css        Dark design and responsive layouts
config.js         Personal details and contact settings
script.js         Navigation, filters, dialogs, contact drafts
404.html          Friendly error page
.nojekyll         Static publishing marker
assets/favicon.svg
assets/resume.pdf  Your supplied résumé
README.md         These instructions
```

## Official publishing references

Verified October 8, 2026:
- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

The site is ready to upload; this download has not been published to your GitHub account.
