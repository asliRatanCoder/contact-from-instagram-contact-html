# GitHub Pages Deployment Guide

## Automatic Deployment with GitHub Actions

For automatic deployment on every push, create this workflow file:

### Step 1: Create GitHub Actions Workflow

Create a file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: yourdomain.com # Optional: for custom domain
```

### Step 2: Manual Deployment Steps

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Install gh-pages if not already installed
npm install gh-pages --save-dev

# Deploy to GitHub Pages
npm run deploy
```

## Configuring Custom Domain (Optional)

If you have a custom domain:

1. Update `vite.config.js`:

```javascript
export default defineConfig({
  base: "/", // Use root for custom domain
  // ... rest of config
});
```

2. Create `public/CNAME` file with your domain:

```
yourdomain.com
```

3. Update DNS records at your domain registrar to point to GitHub Pages

## Troubleshooting

### App not loading at GitHub Pages URL

- Check that `base` in `vite.config.js` matches your repository URL structure
- Clear browser cache (Ctrl+Shift+Del)
- Check GitHub Actions workflow logs for build errors

### 404 errors on page refresh

- This is because GitHub Pages is serving from a subdirectory
- The `base` configuration in `vite.config.js` should handle this
- Make sure your routes use `<HashRouter>` if using React Router

### CSS/images not loading

- Ensure all asset paths are relative
- Verify the `base` setting in vite.config.js

## Monitoring Deployments

1. Go to your GitHub repository
2. Click **Actions** tab
3. View workflow runs and their logs
4. Check the deployment status

## Rollback

If something goes wrong:

```bash
# View all branches
git branch -a

# Switch to gh-pages branch
git checkout gh-pages

# View previous versions
git log --oneline

# Revert to previous version
git reset --hard <commit-hash>

# Push changes
git push origin gh-pages -f
```

## Performance Tips

1. Enable gzip compression in vite.config.js
2. Optimize images before uploading
3. Use lazy loading for components
4. Monitor bundle size with `npm run build`

## Security Considerations

- Keep dependencies updated: `npm update`
- Check for vulnerabilities: `npm audit`
- Use HTTPS (automatic with GitHub Pages)
- Keep secrets out of repository

## Custom Analytics (Optional)

To add privacy-respecting analytics, consider:

- Plausible Analytics
- Fathom Analytics
- GoAccess logs analysis

These services respect user privacy while providing useful insights.
