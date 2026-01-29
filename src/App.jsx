/**
 * Contact Restorer App
 * Main application component with clean, modular architecture
 */
import { useState } from "react";
import "./App.css";

// Utils
import parseContactsFromHTML from "./utils/contactParser";
import {
  convertToCSV,
  convertToVCard,
  convertToJSON,
  downloadFile,
} from "./utils/contactConverter";
import {
  findDuplicates,
  mergeContacts,
  initializeMergeSelections,
} from "./utils/duplicateHandler";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadScreen from "./components/UploadScreen";
import LoadingScreen from "./components/LoadingScreen";
import MergeScreen from "./components/MergeScreen";
import Alert from "./components/Alert";
import InfoSection from "./components/InfoSection";
import ExportSection from "./components/ExportSection";

function App() {
  // State management
  const [contacts, setContacts] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [duplicates, setDuplicates] = useState([]);
  const [mergeSelections, setMergeSelections] = useState({});
  const [showMergeScreen, setShowMergeScreen] = useState(false);

  /**
   * Handles file upload and parsing
   */
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".html")) {
      setError("❌ Please upload an HTML file (.html)");
      return;
    }

    // Reset state
    setIsLoading(true);
    setUploadProgress(0);
    setError("");
    setSuccess("");

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) =>
          prev >= 90 ? prev : prev + Math.random() * 30,
        );
      }, 100);

      // Read and parse file
      const htmlContent = await file.text();
      setUploadProgress(95);

      const parsedContacts = parseContactsFromHTML(htmlContent);
      setUploadProgress(100);
      clearInterval(progressInterval);

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Handle parsed results
      if (parsedContacts.length === 0) {
        setError(
          "❌ No contacts found. Please verify this is a synced_contacts.html file.",
        );
      } else {
        setContacts(parsedContacts);
        setFileName(file.name.replace(".html", ""));
        setSuccess(`✅ Successfully loaded ${parsedContacts.length} contacts!`);

        // Check for duplicates
        const dups = findDuplicates(parsedContacts);
        setDuplicates(dups);

        if (dups.length > 0) {
          setShowMergeScreen(true);
          setMergeSelections(initializeMergeSelections(dups));
        }
      }
    } catch (err) {
      setError(`❌ Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  /**
   * Handles merge selection for duplicate contacts
   */
  const handleMergeSelection = (phone, selectedName) => {
    setMergeSelections((prev) => ({ ...prev, [phone]: selectedName }));
  };

  /**
   * Completes the merge process
   */
  const handleCompleteMerge = () => {
    const mergedContacts = mergeContacts(contacts, duplicates, mergeSelections);
    setContacts(mergedContacts);
    setShowMergeScreen(false);
    setSuccess(`✅ Merged! Now have ${mergedContacts.length} unique contacts!`);
  };

  /**
   * Handles file download in different formats
   */
  const handleDownload = (format) => {
    if (contacts.length === 0) {
      setError("❌ No contacts to download");
      return;
    }

    const formatConfig = {
      csv: {
        converter: convertToCSV,
        mimeType: "text/csv",
        extension: "csv",
      },
      vcard: {
        converter: convertToVCard,
        mimeType: "text/vcard",
        extension: "vcf",
      },
      json: {
        converter: convertToJSON,
        mimeType: "application/json",
        extension: "json",
      },
    };

    const config = formatConfig[format];
    if (!config) return;

    const content = config.converter(contacts);
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `${fileName || "contacts"}_${timestamp}.${config.extension}`;

    downloadFile(content, filename, config.mimeType);
    setSuccess(`✅ Downloaded: ${filename}`);
  };

  // Render loading screen
  if (isLoading) {
    return <LoadingScreen uploadProgress={uploadProgress} />;
  }

  // Render merge screen
  if (showMergeScreen && duplicates.length > 0) {
    return (
      <MergeScreen
        duplicates={duplicates}
        mergeSelections={mergeSelections}
        onMergeSelection={handleMergeSelection}
        onCompleteMerge={handleCompleteMerge}
        onBack={() => setShowMergeScreen(false)}
      />
    );
  }

  // Render main screen
  return (
    <div className="app">
      <Header
        title="Contact Restorer"
        subtitle="Convert HTML to CSV • vCard • JSON"
      />

      <main className="main">
        <div className="container">
          <UploadScreen onFileUpload={handleFileUpload} />

          <Alert type="error" message={error} />
          <Alert type="success" message={success} />

          <InfoSection contactCount={contacts.length} fileName={fileName} />

          <ExportSection
            contactCount={contacts.length}
            onDownload={handleDownload}
          />
        </div>
      </main>

      <Footer
        message="✨ Contact Restorer | Fast • Secure • Free"
        secondaryMessage="100% browser-based processing • No data uploaded"
      />
    </div>
  );
}

export default App;
