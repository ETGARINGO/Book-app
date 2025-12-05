// Google Sheets integration using Replit connector
// Based on the google-sheet blueprint

import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

// Spreadsheet configuration
const SPREADSHEET_NAME = 'Barbershop Bookings';
const SHEET_NAME = 'Bookings';
const HEADERS = ['ID', 'Customer Name', 'Email', 'Phone', 'Service', 'Barber', 'Date', 'Time', 'Notes', 'Status', 'Created At'];

let spreadsheetId: string | null = null;

// Get or create the spreadsheet for bookings
export async function getOrCreateSpreadsheet(): Promise<string> {
  if (spreadsheetId) {
    return spreadsheetId;
  }

  const sheets = await getUncachableGoogleSheetClient();
  const drive = google.drive({ version: 'v3', auth: (sheets as any)._options.auth });

  // Search for existing spreadsheet
  try {
    const response = await drive.files.list({
      q: `name='${SPREADSHEET_NAME}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name)',
    });

    if (response.data.files && response.data.files.length > 0) {
      spreadsheetId = response.data.files[0].id!;
      console.log('Found existing spreadsheet:', spreadsheetId);
      return spreadsheetId;
    }
  } catch (error) {
    console.log('Error searching for spreadsheet, will create new one:', error);
  }

  // Create new spreadsheet
  const createResponse = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: SPREADSHEET_NAME,
      },
      sheets: [
        {
          properties: {
            title: SHEET_NAME,
          },
        },
      ],
    },
  });

  spreadsheetId = createResponse.data.spreadsheetId!;
  console.log('Created new spreadsheet:', spreadsheetId);

  // Add headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_NAME}!A1:K1`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [HEADERS],
    },
  });

  return spreadsheetId;
}

// Append a new booking to the spreadsheet
export async function appendBooking(booking: {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  notes?: string;
  status: string;
  createdAt: string;
}): Promise<void> {
  const sheets = await getUncachableGoogleSheetClient();
  const ssId = await getOrCreateSpreadsheet();

  const row = [
    booking.id,
    booking.customerName,
    booking.customerEmail,
    booking.customerPhone,
    booking.serviceId,
    booking.barberId,
    booking.date,
    booking.time,
    booking.notes || '',
    booking.status,
    booking.createdAt,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: ssId,
    range: `${SHEET_NAME}!A:K`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });
}

// Get all bookings from the spreadsheet
export async function getAllBookings(): Promise<any[]> {
  const sheets = await getUncachableGoogleSheetClient();
  const ssId = await getOrCreateSpreadsheet();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: ssId,
    range: `${SHEET_NAME}!A2:K`,
  });

  const rows = response.data.values || [];
  
  return rows.map((row) => ({
    id: row[0] || '',
    customerName: row[1] || '',
    customerEmail: row[2] || '',
    customerPhone: row[3] || '',
    serviceId: row[4] || '',
    barberId: row[5] || '',
    date: row[6] || '',
    time: row[7] || '',
    notes: row[8] || '',
    status: row[9] || 'pending',
    createdAt: row[10] || '',
  }));
}

// Get booked slots for a specific date and barber
export async function getBookedSlots(date: string, barberId: string): Promise<string[]> {
  const bookings = await getAllBookings();
  
  return bookings
    .filter((b) => b.date === date && b.barberId === barberId && b.status !== 'cancelled')
    .map((b) => b.time);
}
