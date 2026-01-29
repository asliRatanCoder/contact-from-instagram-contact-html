# Contact Restorer 📇

A professional web application to convert HTML contact files (like Instagram/Facebook exported contacts) to multiple formats: CSV, vCard (.vcf), and JSON.

## Features ✨

- **Easy Upload**: Drag & drop or click to upload HTML files
- **Multiple Formats**: Export to CSV, vCard, and JSON
- **Smart Parser**: Automatically detects and extracts contacts from various HTML structures
- **Professional UI**: Beautiful, responsive design with smooth animations
- **No Backend Required**: Runs entirely in the browser - your data never leaves your device
- **GitHub Pages Ready**: Deploy for free with GitHub Pages

## Supported HTML Formats

The application can parse contacts from:

- vCard format within HTML (BEGIN:VCARD/END:VCARD)
- HTML tables with contact information
- DIV/SPAN structures with contact data
- Plain text formatted contacts

## Installation & Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/contact-from-instagram-contact-html.git
   cd contact-from-instagram-contact-html
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## Deployment on GitHub Pages

### Step 1: Update package.json

The `homepage` field in `package.json` should match your GitHub repository:

```json
"homepage": "https://<your-username>.github.io/contact-from-instagram-contact-html"
```

Replace `<your-username>` with your actual GitHub username.

### Step 2: Install gh-pages (if not already installed)

```bash
npm install gh-pages --save-dev
```

### Step 3: Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:

1. Build the application for production
2. Push the build to the `gh-pages` branch
3. Make it available at your GitHub Pages URL

### Step 4: Configure GitHub Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **gh-pages** branch
5. Click **Save**

Your app will be live at: `https://<your-username>.github.io/contact-from-instagram-contact-html`

## Usage

1. **Upload HTML File**: Click the upload area or drag-drop your HTML file containing contacts
2. **Preview Contacts**: View the extracted contacts in the preview table
3. **Download**: Select your desired format (CSV, vCard, or JSON)
4. **Use the Contacts**: Import the downloaded file into your contacts app

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Professional styling
├── utils/
│   ├── contactParser.js   # HTML parsing logic
│   └── contactConverter.js # Format conversion functions
├── main.jsx               # Application entry point
└── index.css              # Global styles

public/                     # Static assets
vite.config.js             # Vite configuration
package.json               # Dependencies and scripts
```

## How It Works

### Contact Parsing

The parser tries multiple approaches to extract contacts:

1. **vCard Parsing**: Extracts vCard formatted data
2. **Table Parsing**: Scans HTML tables for contact info
3. **DIV Parsing**: Looks for contact-like div structures
4. **Text Parsing**: Falls back to plain text extraction

### Format Conversion

- **CSV**: Standard comma-separated values format
- **vCard (ICS)**: Universal contact format compatible with most apps
- **JSON**: Structured format for programmatic use

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technologies Used

- **React 19** - UI framework
- **Vite** - Fast build tool
- **Vanilla CSS** - Professional styling
- **Rolldown** - Experimental bundler

## Performance

- **Zero Dependencies**: Only React and Vite
- **Fast Processing**: Parses large HTML files instantly
- **Lightweight Build**: ~50KB gzipped

## Privacy & Security

✅ All processing happens in your browser
✅ No server uploads - your data stays private
✅ No tracking or analytics
✅ Open source code - fully transparent

## Troubleshooting

### "No contacts found" error

- Ensure your HTML file contains valid contact information
- Check that names, emails, or phone numbers are present
- Try different HTML formats if your file is from a different source

### File download not working

- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser

### Deployment issues

- Verify the `base` URL in `vite.config.js` matches your repository name
- Check that the `gh-pages` branch exists and is enabled in GitHub Pages settings
- Clear browser cache and rebuild

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ for easier contact management**
