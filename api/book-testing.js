// Vercel serverless function for Google Sheets integration
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Enable CORS
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get environment variables
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Sheets configuration');
    }

    // Initialize JWT auth
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Get or create the bookings sheet
    let sheet;
    try {
      sheet = doc.sheetsByTitle['Testing Bookings'];
    } catch (error) {
      // Create sheet if it doesn't exist
      sheet = await doc.addSheet({ 
        title: 'Testing Bookings',
        headerValues: ['Date', 'Time', 'Name', 'Email', 'Phone', 'Notes', 'Timestamp', 'Status']
      });
    }

    // If sheet exists but has no headers, add them
    await sheet.loadHeaderRow();
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow(['Date', 'Time', 'Name', 'Email', 'Phone', 'Notes', 'Timestamp', 'Status']);
    }

    // Extract booking data from request
    const { date, time, name, email, phone, notes } = req.body;

    // Validate required fields
    if (!date || !time || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add booking to sheet
    await sheet.addRow({
      Date: date,
      Time: time,
      Name: name,
      Email: email,
      Phone: phone,
      Notes: notes || '',
      Timestamp: new Date().toISOString(),
      Status: 'Pending'
    });

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Booking saved successfully' 
    });

  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ 
      error: 'Failed to save booking', 
      details: error.message 
    });
  }
}

module.exports = allowCors(handler);