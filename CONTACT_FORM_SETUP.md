# Contact Form Setup - Hostinger Version

## Overview
A complete contact form implementation that sends emails without database storage, optimized for Hostinger hosting.

## Components Created

### Frontend (`src/components/ContactForm.tsx`)
- React component with `react-hook-form` + `zod` validation
- Fields: name, email, message
- UX states: loading, success, error
- Invisible honeypot field for spam protection
- Dark theme styling matching the site design

### Backend (`api/contact.php`)
- PHP script compatible with Hostinger hosting
- Email sending via PHPMailer (recommended) or native mail()
- Server-side validation and sanitization
- CORS enabled for React frontend

## Configuration Required

### 1. Upload Files to Hostinger
Upload these files to your Hostinger hosting:
- `api/contact.php` (main handler)
- `api/install-phpmailer.php` (optional, for PHPMailer installation)

### 2. Email Configuration
Edit `api/contact.php` and modify these variables:

```php
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587;
$smtp_user = 'your-email@gmail.com';
$smtp_pass = 'your-app-password';  // Use Gmail App Password
$recipient_email = 'contact.enduraw@gmail.com';
```

### 3. Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App Passwords
3. Use the App Password in `$smtp_pass`

### 4. Install PHPMailer (Optional but Recommended)
For better email delivery reliability:
1. Access your file manager in Hostinger
2. Navigate to your `/api` directory
3. Run: `php install-phpmailer.php` (if you have SSH access)
4. Or manually download PHPMailer and place in `vendor/phpmailer/` folder

## Usage

### Basic Usage
```tsx
import ContactForm from './components/ContactForm';

function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <ContactForm />
    </div>
  );
}
```

### With Success Callback
```tsx
<ContactForm 
  onSubmitSuccess={() => {
    // Custom success handling
    console.log('Message sent successfully!');
  }} 
/>
```

## Features

✅ **Form Validation**: Client and server-side validation  
✅ **Spam Protection**: Invisible honeypot field  
✅ **UX States**: Loading, success, and error states  
✅ **Email Sending**: SMTP-based email delivery  
✅ **Responsive Design**: Mobile-friendly dark theme  
✅ **No Database**: Direct email sending without storage  
✅ **Security**: CORS enabled, validation on both ends

## Testing

1. Set up environment variables
2. Deploy to Vercel or run locally
3. Test the form with various inputs
4. Verify emails are received at `RECIPIENT_EMAIL`

## Alternative Email Providers

The code can be easily modified to use other email services:
- **Resend**: Replace nodemailer with Resend SDK
- **SendGrid**: Use SendGrid's API
- **AWS SES**: Configure with AWS credentials

## Deployment Notes for Hostinger

### File Structure on Server:
```
your-domain.com/
├── public_html/
│   ├── (your React build files)
│   └── api/
│       ├── contact.php
│       ├── install-phpmailer.php (optional)
│       └── vendor/
│           └── phpmailer/ (if using PHPMailer)
```

### Steps to Deploy:
1. Build your React app: `npm run build`
2. Upload build files to `public_html/`
3. Upload `api/contact.php` to `public_html/api/`
4. Edit the email configuration in `contact.php`
5. Test the contact form

### Alternative SMTP Services for Hostinger:
- **Hostinger's SMTP**: Use your hosting email account
- **Gmail SMTP**: Use Gmail with app password
- **Outlook SMTP**: smtp-mail.outlook.com:587

### Troubleshooting:
- If emails don't send, check PHP error logs in Hostinger control panel
- Ensure your domain has proper SPF/DKIM records for better delivery
- Test with simple mail() function first, then upgrade to PHPMailer