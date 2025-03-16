/**
 * @interface EmailPayload
 * @property {string} id - Unique identifier for the user
 * @property {string} from_email - The email address of the user
 * @property {string} subject - The subject of the email
 * @property {string} body - The body content of the email
 * @property {string} timestamp - The timestamp of when the email was sent
 */


/**
 * Download emails from a Google account.
 * @module download_emails
 * @description This module provides functionality to download emails from a Google account using the Gmail API.
 * @param {string} authToken - The authentication token for accessing the Gmail API.
 * @param {string} from_email - The email address to download emails from.
 * @return {EmailPayload[]} - Returns an array of email payloads.
 */
async function downloadEmails(authToken, from_email) {
    const { google } = require('googleapis');
    const gmail = google.gmail({ version: 'v1', auth: authToken });

    const res = await gmail.users.messages.list({
        userId: 'me',
        q: `from:${from_email}`
    });

    const emails = [];

    if (res.data.messages) {
        for (const message of res.data.messages) {
            const emailRes = await gmail.users.messages.get({
                userId: 'me',
                id: message.id
            });

            const emailData = emailRes.data;
            const payload = {
                id: emailData.id,
                from_email: from_email,
                subject: emailData.payload.headers.find(header => header.name === 'Subject').value,
                body: emailData.snippet,
                timestamp: emailData.internalDate
            };
            emails.push(payload);
        }
    }

    return emails;
}