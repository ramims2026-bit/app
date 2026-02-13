"use server";

import { google } from 'googleapis';

const FOLDER_ID = '12Hnqog3tV83PGGXzQpg6xsnVEQu3RKOw';

// הזדהות מול Google Drive
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS!),
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export async function uploadProfileImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error("No file uploaded");

    // המרה ל-Uint8Array שמתאים לכל סביבת Runtime
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const response = await drive.files.create({
      requestBody: {
        name: `profile_${Date.now()}_${file.name}`,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.type,
        body: ReadableStream.from([uint8Array]) as any, // שימוש ב-Web Stream
      },
      fields: 'id, webViewLink, webContentLink',
    });

    // הפיכת הקובץ לנגיש לצפייה (Public Permission) - אופציונלי
    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return { 
      success: true, 
      fileId: response.data.id, 
      // webContentLink נותן קישור ישיר לתמונה
      url: response.data.webContentLink || response.data.webViewLink 
    };
  } catch (error) {
    console.error("Drive Upload Error:", error);
    return { success: false, error: "Failed to upload to Drive" };
  }
}
