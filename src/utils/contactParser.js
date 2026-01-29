/**
 * Parse HTML contacts from Instagram/Facebook exported HTML files
 * Optimized for synced_contacts.html format
 */

export const parseContactsFromHTML = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const contacts = [];

    // Parse Instagram/Facebook table format (Primary method)
    const parseInstagramFormat = () => {
        const tables = doc.querySelectorAll('table');
        const parsedContacts = [];
        let currentContact = {};

        tables.forEach((table) => {
            const rows = table.querySelectorAll('tr');
            rows.forEach((row) => {
                const td = row.querySelector('td');
                if (td) {
                    const text = td.textContent;
                    const divContent = td.querySelector('div div')?.textContent?.trim();

                    if (text.includes('First Name')) {
                        currentContact.firstName = divContent || '';
                    } else if (text.includes('Last Name')) {
                        currentContact.lastName = divContent || '';
                    } else if (text.includes('Contact Information') || text.includes('Phone')) {
                        currentContact.phone = divContent || '';
                    } else if (text.includes('Email')) {
                        currentContact.email = divContent || '';
                    } else if (text.includes('Address')) {
                        currentContact.address = divContent || '';
                    }

                    // Check if we have enough info to consider it a complete contact
                    if (currentContact.firstName || currentContact.lastName || currentContact.phone) {
                        if (
                            text.includes('Contact Information') ||
                            text.includes('Email') ||
                            text.includes('Address') ||
                            (row === rows[rows.length - 1]) // Last row
                        ) {
                            if (currentContact.firstName || currentContact.lastName || currentContact.phone) {
                                parsedContacts.push({
                                    name: `${currentContact.firstName || ''} ${currentContact.lastName || ''}`.trim(),
                                    phone: currentContact.phone || '',
                                    email: currentContact.email || '',
                                    address: currentContact.address || '',
                                });
                                currentContact = {};
                            }
                        }
                    }
                }
            });
        });

        return parsedContacts;
    };

    // Try to find contact information in various common formats
    const parseVCardFromHTML = () => {
        const vCardPattern = /BEGIN:VCARD([\s\S]*?)END:VCARD/g;
        const matches = htmlContent.matchAll(vCardPattern);
        const vCardContacts = [];

        for (const match of matches) {
            vCardContacts.push(parseVCard(match[0]));
        }

        return vCardContacts;
    };

    // Parse contacts from simple table format
    const parseTableContacts = () => {
        const tables = doc.querySelectorAll('table');
        const tableContacts = [];

        tables.forEach((table) => {
            const rows = table.querySelectorAll('tr');
            rows.forEach((row) => {
                const cells = row.querySelectorAll('td, th');
                if (cells.length >= 2) {
                    const contact = {
                        name: cells[0]?.textContent?.trim() || '',
                        phone: cells[1]?.textContent?.trim() || '',
                        email: cells[2]?.textContent?.trim() || '',
                        address: cells[3]?.textContent?.trim() || '',
                    };

                    if (contact.name) {
                        tableContacts.push(contact);
                    }
                }
            });
        });

        return tableContacts;
    };

    // Parse contacts from div/span structure
    const parseDivContacts = () => {
        const divContacts = [];
        const contactDivs = doc.querySelectorAll('[class*="contact"], [data-contact], .vcard');

        contactDivs.forEach((div) => {
            const contact = {
                name: div.querySelector('[class*="name"], [data-name"]')?.textContent?.trim() || '',
                phone: div.querySelector('[class*="phone"], [data-phone"]')?.textContent?.trim() || '',
                email: div.querySelector('[class*="email"], [data-email"]')?.textContent?.trim() || '',
                address: div.querySelector('[class*="address"], [data-address"]')?.textContent?.trim() || '',
            };

            if (contact.name) {
                divContacts.push(contact);
            }
        });

        return divContacts;
    };

    // Parse from text nodes (fallback for plain text)
    const parseTextContacts = () => {
        const textContacts = [];
        const text = doc.body.innerText;
        const lines = text.split('\n').filter((line) => line.trim());

        let currentContact = null;

        lines.forEach((line) => {
            const trimmedLine = line.trim();

            // Detect phone numbers
            if (/^\+?[\d\s\-()]+$/.test(trimmedLine) && trimmedLine.length > 5) {
                if (currentContact) {
                    currentContact.phone = trimmedLine;
                }
            }
            // Detect emails
            else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedLine)) {
                if (currentContact) {
                    currentContact.email = trimmedLine;
                }
            }
            // Assume it's a name if it doesn't match other patterns
            else if (trimmedLine && trimmedLine.length < 100) {
                if (currentContact && currentContact.name) {
                    textContacts.push(currentContact);
                }
                currentContact = {
                    name: trimmedLine,
                    phone: '',
                    email: '',
                    address: '',
                };
            }
        });

        if (currentContact && currentContact.name) {
            textContacts.push(currentContact);
        }

        return textContacts;
    };

    // Try all parsing methods - Instagram format first
    const instagramContacts = parseInstagramFormat();
    const vCardContacts = parseVCardFromHTML();
    const tableContacts = parseTableContacts();
    const divContacts = parseDivContacts();
    const textContacts = parseTextContacts();

    // Use Instagram format if found contacts, otherwise combine all
    let allContacts = instagramContacts.length > 0
        ? instagramContacts
        : [...vCardContacts, ...tableContacts, ...divContacts, ...textContacts];

    // Remove duplicates based on name and phone
    const uniqueContacts = allContacts.filter(
        (contact, index, self) =>
            index === self.findIndex(
                (c) => c.name.toLowerCase() === contact.name.toLowerCase() && c.phone === contact.phone
            )
    );

    return uniqueContacts.filter((c) => c.name); // Filter out empty contacts
};

const parseVCard = (vCardText) => {
    const contact = {
        name: '',
        phone: '',
        email: '',
        address: '',
    };

    const lines = vCardText.split('\n');

    lines.forEach((line) => {
        const [key, value] = line.split(':');

        if (!key || !value) return;

        const keyType = key.split(';')[0];

        switch (keyType) {
            case 'FN':
            case 'N':
                contact.name = value.trim();
                break;
            case 'TEL':
                contact.phone = value.trim();
                break;
            case 'EMAIL':
                contact.email = value.trim();
                break;
            case 'ADR':
                contact.address = value.trim();
                break;
            default:
                break;
        }
    });

    return contact;
};

export default parseContactsFromHTML;
