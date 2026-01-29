/**
 * Utility functions for handling duplicate contacts
 * @module duplicateHandler
 */

/**
 * Finds contacts with duplicate phone numbers
 * @param {Array<Object>} contactList - Array of contact objects with phone and name properties
 * @returns {Array<Object>} Array of duplicate groups, each containing phone and contacts array
 * @example
 * const duplicates = findDuplicates(contacts);
 * // Returns: [{ phone: '+1234567890', contacts: [{name: 'John', phone: '...'}, {name: 'Johnny', phone: '...'}] }]
 */
export const findDuplicates = (contactList) => {
    const phoneMap = {};

    // Group contacts by phone number
    contactList.forEach((contact, index) => {
        const phone = contact.phone?.trim();
        if (phone) {
            if (!phoneMap[phone]) {
                phoneMap[phone] = [];
            }
            phoneMap[phone].push(index);
        }
    });

    // Filter groups with 2+ contacts and map to duplicate groups
    const duplicateGroups = Object.entries(phoneMap)
        .filter(([_, indices]) => indices.length > 1)
        .map(([phone, indices]) => ({
            phone,
            contacts: indices.map(i => ({ ...contactList[i], originalIndex: i }))
        }));

    return duplicateGroups;
};

/**
 * Merges contacts based on user selections
 * @param {Array<Object>} contacts - Original contacts array
 * @param {Array<Object>} duplicates - Duplicate groups array
 * @param {Object} mergeSelections - Map of phone number to selected name
 * @returns {Array<Object>} Filtered array of merged contacts
 * @example
 * const merged = mergeContacts(contacts, duplicates, { '+1234567890': 'John Doe' });
 */
export const mergeContacts = (contacts, duplicates, mergeSelections) => {
    return contacts.filter((contact) => {
        const phone = contact.phone?.trim();

        // Keep contacts without phone numbers
        if (!phone) return true;

        // Check if this phone is in duplicates
        const duplicate = duplicates.find(d => d.phone === phone);

        // Keep non-duplicate contacts
        if (!duplicate) return true;

        // Keep only if this contact's name matches the selected name
        return contact.name === mergeSelections[phone];
    });
};

/**
 * Initializes merge selections with the first contact of each duplicate group
 * @param {Array<Object>} duplicates - Duplicate groups array
 * @returns {Object} Initial selections map
 */
export const initializeMergeSelections = (duplicates) => {
    const initialSelections = {};
    duplicates.forEach(group => {
        initialSelections[group.phone] = group.contacts[0].name;
    });
    return initialSelections;
};
