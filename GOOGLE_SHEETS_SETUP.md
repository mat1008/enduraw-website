# Google Sheets API Setup Guide

This guide will help you set up Google Sheets integration for the Enduraw website booking system.

## Overview

The booking system will automatically save all testing session bookings to a Google Sheet with the following columns:
- Date, Time, Name, Email, Phone, Notes, Timestamp, Status

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Enduraw Testing Bookings"
4. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
   Save this ID - you'll need it later.

## Step 2: Set up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Name: `enduraw-sheets-service`
   - Description: `Service account for Enduraw booking system`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

## Step 4: Generate Service Account Key

1. Find your service account in the credentials list
2. Click on it to open details
3. Go to "Keys" tab
4. Click "Add Key" > "Create new key"
5. Select "JSON" format
6. Click "Create" - this will download a JSON file
7. **Keep this file secure** - it contains your private key

## Step 5: Share the Google Sheet

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from the JSON file) as an editor:
   - Find `client_email` in the JSON file
   - Add this email with "Editor" permissions
4. Uncheck "Notify people" since it's a service account

## Step 6: Set up Environment Variables

From the JSON file, extract these values and set them as environment variables:

### For Local Development (.env file):
```bash
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
```

### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add these variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

**Important:** For the private key, copy the entire key including the BEGIN/END lines and replace actual line breaks with `\n`.

## Step 7: Install Dependencies

In your project root:
```bash
cd api
npm install google-spreadsheet google-auth-library
```

## Step 8: Deploy and Test

1. Deploy your website
2. Test the booking system
3. Check that bookings appear in your Google Sheet

## Troubleshooting

### Common Issues:

1. **"Permission denied" error:**
   - Make sure you shared the sheet with the service account email
   - Verify the service account has editor permissions

2. **"Invalid credentials" error:**
   - Check that all environment variables are set correctly
   - Ensure the private key includes proper line breaks (`\n`)

3. **"Sheet not found" error:**
   - Verify the Google Sheet ID is correct
   - Make sure the Sheets API is enabled

### Testing the Integration:

You can test the API endpoint directly:
```bash
curl -X POST https://your-domain.com/api/book-testing \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "date": "2024-01-10",
    "time": "10:00",
    "notes": "Test booking"
  }'
```

## Sheet Structure

The system will automatically create a sheet named "Testing Bookings" with these headers:
- **Date**: Booking date (YYYY-MM-DD)
- **Time**: Booking time (HH:MM)
- **Name**: Client's full name
- **Email**: Client's email address
- **Phone**: Client's phone number
- **Notes**: Additional notes from client
- **Timestamp**: When the booking was submitted
- **Status**: Booking status (defaults to "Pending")

## Security Notes

- Never commit the service account JSON file to version control
- Use environment variables for all sensitive data
- The service account should only have access to the specific sheet
- Regularly rotate service account keys if needed

## Support

If you encounter any issues, check:
1. Google Cloud Console for API usage and errors
2. Vercel function logs for deployment issues
3. Browser developer tools for frontend errors

The system includes a CSV download fallback if the Google Sheets integration fails.