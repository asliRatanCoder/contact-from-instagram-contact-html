/**
 * Convert contacts to different formats
 */

// Convert contacts to CSV format with proper UTF-8 support for Hindi/multilingual names
export const convertToCSV = (contacts) => {
    if (!contacts || contacts.length === 0) {
        return 'Name,Phone,Email,Address\n';
    }

    const headers = ['Name', 'Phone', 'Email', 'Address'];
    const rows = contacts.map((contact) => [
        `"${(contact.name || '').replace(/"/g, '""')}"`,
        `"${(contact.phone || '').replace(/"/g, '""')}"`,
        `"${(contact.email || '').replace(/"/g, '""')}"`,
        `"${(contact.address || '').replace(/"/g, '""')}"`,
    ]);

    let csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    // Add BOM (Byte Order Mark) for proper UTF-8 encoding in Excel
    // This ensures Hindi and other Unicode characters display correctly
    csv = '\ufeff' + csv;

    return csv;
};

// Convert contacts to vCard format
export const convertToVCard = (contacts) => {
    const vCards = contacts
        .map((contact) => {
            const lines = [
                'BEGIN:VCARD',
                'VERSION:3.0',
                `FN:${contact.name || ''}`,
                `N:${(contact.name || '').split(' ').reverse().join(';')}`,
            ];

            if (contact.phone) {
                lines.push(`TEL;TYPE=VOICE:${contact.phone}`);
            }

            if (contact.email) {
                lines.push(`EMAIL;TYPE=INTERNET:${contact.email}`);
            }

            if (contact.address) {
                lines.push(`ADR;TYPE=HOME:;;${contact.address};;`);
            }

            lines.push('END:VCARD');

            return lines.join('\n');
        })
        .join('\n\n');

    return vCards;
};

// Convert contacts to JSON format
export const convertToJSON = (contacts) => {
    return JSON.stringify(contacts, null, 2);
};

// Download file helper with proper UTF-8 encoding support
export const downloadFile = (content, filename, mimeType = 'text/plain') => {
    const element = document.createElement('a');

    // Use Blob for proper UTF-8 handling, especially for non-Latin characters
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    element.setAttribute('href', url);
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Clean up the URL object
    URL.revokeObjectURL(url);
};

export default {
    convertToCSV,
    convertToVCard,
    convertToJSON,
    downloadFile,
};
