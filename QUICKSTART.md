# Contact Restorer - Quick Start Guide

Welcome to Contact Restorer! This guide will help you get started quickly.

## 🚀 Getting Started (6 minutes)

### 1. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Navigate to http://localhost:3000
```

### 2. Upload and Convert

1. **Click or drag** your HTML file into the upload area
2. **Review** the extracted contacts in the preview
3. **Download** in your preferred format (CSV, vCard, or JSON)

## 📦 Export Formats

### CSV (Comma-Separated Values)

- **Best for**: Excel, Google Sheets, most contact managers
- **File**: `.csv`
- **Import in**: Excel, Google Contacts, Outlook
- **Columns**: Name, Phone, Email, Address

### vCard (.vcf)

- **Best for**: Universal contact format
- **File**: `.vcf`
- **Import in**: Apple Contacts, Google Contacts, Thunderbird, Outlook
- **Compatibility**: Highest compatibility across platforms

### JSON

- **Best for**: Data processing, APIs, developers
- **File**: `.json`
- **Import in**: Custom applications, databases
- **Structure**: Structured contact data

## 🌐 Deploy to GitHub Pages (2 steps)

### Step 1: Update Repository Reference

Edit `package.json` and change:

```json
"homepage": "https://YOUR_USERNAME.github.io/contact-from-instagram-contact-html"
```

### Step 2: Deploy

```bash
npm run deploy
```

Your app is now live! 🎉

## 🔧 Troubleshooting

### Q: The app won't build locally

**A**: Make sure you have Node.js 16+ installed

```bash
node --version  # Should be v16.0.0 or higher
npm install     # Try reinstalling
npm run build   # Try building again
```

### Q: File upload fails

**A**:

- Make sure the file is in HTML format
- File must contain contact information (name, phone, or email)
- Try opening the HTML file in a text editor to verify it's valid

### Q: Downloads not working

**A**:

- Check if JavaScript is enabled in your browser
- Try a different browser
- Check browser console (F12) for errors

### Q: GitHub Pages deployment fails

**A**:

1. Check that `gh-pages` branch exists
2. Verify `homepage` in package.json is correct
3. Check GitHub Actions logs for detailed error messages
4. Make sure repository is public (or adjust permissions)

## 📚 File Locations

```
📁 contact-from-instagram-contact-html/
├── 📄 README.md              # Full documentation
├── 📄 DEPLOYMENT.md          # Detailed deployment guide
├── 📄 JAVA_BACKEND.md        # Optional backend setup
├── 📄 QUICKSTART.md          # This file
├── package.json              # Project configuration
├── vite.config.js            # Build configuration
├── 📁 src/
│   ├── App.jsx              # Main component
│   ├── App.css              # Styling
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── 📁 utils/
│       ├── contactParser.js   # HTML parsing logic
│       └── contactConverter.js # Format conversion
└── 📁 .github/
    └── 📁 workflows/
        └── deploy.yml        # Auto-deployment config
```

## 💡 Tips & Tricks

### For Instagram/Facebook Exports

1. Export your contacts from Instagram settings
2. You'll get a `synced_contacts.html` file
3. Upload it directly to Contact Restorer
4. Choose your preferred format and download!

### For Best Results

- Make sure your HTML file has complete contact information
- Check the preview for accuracy before downloading
- Use vCard format for maximum compatibility

### Performance

- The app works entirely in your browser
- Your data is never uploaded anywhere
- Large files (1000+ contacts) process in seconds

## 🔐 Privacy & Security

✅ **Your data is safe:**

- Everything runs in your browser
- No server uploads
- No tracking
- No data collection
- Open source code

## 🤝 Need Help?

1. Check the troubleshooting section above
2. Read [README.md](README.md) for detailed documentation
3. See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
4. Open an issue on GitHub

## 🚀 Next Steps

1. ✅ Test locally: `npm run dev`
2. ✅ Build for production: `npm run build`
3. ✅ Deploy to GitHub Pages: `npm run deploy`
4. ✅ Share with friends!

## 📝 Project Structure Explained

```
src/
├── App.jsx                  # Main UI component with upload, download, preview
├── App.css                  # Beautiful professional styling
├── utils/
│   ├── contactParser.js    # Parses HTML and extracts contacts
│   └── contactConverter.js  # Converts to CSV/vCard/JSON
```

## 🛠️ Development

Make changes to any file and see them instantly with HMR (Hot Module Reload):

```bash
npm run dev
```

Before committing, ensure quality:

```bash
npm run build  # Verify build works
npm run lint   # Check code quality (if configured)
```

## 📦 Build Output

When you run `npm run build`, it creates:

```
dist/
├── index.html           # Main HTML file
├── assets/
│   ├── index-xxxxx.css  # Minified styles (~2KB)
│   └── index-xxxxx.js   # Minified JavaScript (~62KB)
```

Total size: ~65KB - super lightweight! ⚡

## 🎓 Learning Resources

- **React**: [react.dev](https://react.dev)
- **Vite**: [vite.dev](https://vitejs.dev)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)

## 🎯 Common Tasks

### Run locally

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

### Check for linting errors

```bash
npm run lint
```

## 🏆 Features Overview

| Feature         | Details                                   |
| --------------- | ----------------------------------------- |
| **Upload**      | Drag & drop or click to upload HTML       |
| **Parse**       | Extracts names, phones, emails, addresses |
| **Preview**     | View extracted contacts before download   |
| **Export**      | CSV, vCard (.vcf), JSON formats           |
| **Download**    | Direct browser download with timestamp    |
| **UI**          | Professional, responsive design           |
| **Performance** | Lightweight (~65KB), instant processing   |
| **Privacy**     | 100% browser-based, no data sent          |

## ✨ What's Included

✅ React 19 - Modern UI framework
✅ Vite - Lightning-fast build tool
✅ Professional CSS - Beautiful styling
✅ Smart HTML Parser - Multiple format support
✅ Format Converters - CSV, vCard, JSON
✅ Responsive Design - Works on all devices
✅ GitHub Pages Setup - Ready to deploy
✅ GitHub Actions - Auto-deployment
✅ Docker Support - Optional containerization
✅ Java Backend Guide - Optional backend service

## 🎉 You're Ready!

Start using Contact Restorer now:

```bash
npm install
npm run dev
```

Then deploy it:

```bash
npm run deploy
```

Happy contact converting! 📇✨
