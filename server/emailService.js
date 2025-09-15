const nodemailer = require('nodemailer');

// Configuration email (à adapter selon votre fournisseur)
const transporter = nodemailer.createTransport({
  // Gmail example - remplacer par vos paramètres
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // votre email
    pass: process.env.EMAIL_PASS  // mot de passe d'application
  }
});

// Template email de confirmation
function getConfirmationEmailTemplate(booking) {
  const protocolName = booking.protocol === 'vo2max' ? 'VO2Max' : 'Run/Walk';
  
  return {
    subject: `Confirmation de votre réservation - ${protocolName} à Chamonix`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; }
          .booking-details { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #e2e8f0; }
          .detail-label { font-weight: bold; color: #475569; }
          .detail-value { color: #1e293b; }
          .price { font-size: 24px; font-weight: bold; color: #1e40af; text-align: center; margin: 20px 0; }
          .footer { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .button { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Réservation Confirmée</h1>
            <p>Votre créneau de test à Chamonix est confirmé !</p>
          </div>
          
          <div class="content">
            <p>Bonjour ${booking.customer.firstName},</p>
            
            <p>Votre paiement a été traité avec succès. Voici les détails de votre réservation :</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Protocol :</span>
                <span class="detail-value">${protocolName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date :</span>
                <span class="detail-value">${new Date(booking.date).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Heure :</span>
                <span class="detail-value">${booking.time}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Lieu :</span>
                <span class="detail-value">Performance Center - Chamonix</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Client :</span>
                <span class="detail-value">${booking.customer.firstName} ${booking.customer.lastName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email :</span>
                <span class="detail-value">${booking.customer.email}</span>
              </div>
              ${booking.customer.phone ? `
              <div class="detail-row">
                <span class="detail-label">Téléphone :</span>
                <span class="detail-value">${booking.customer.phone}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="price">
              Montant payé : ${booking.price}€
            </div>
            
            <p><strong>Que devez-vous apporter ?</strong></p>
            <ul>
              <li>Tenue de sport confortable</li>
              <li>Chaussures de running</li>
              <li>Une bouteille d'eau</li>
              <li>Une serviette</li>
            </ul>
            
            <p><strong>Informations importantes :</strong></p>
            <ul>
              <li>Arrivez 15 minutes avant votre créneau</li>
              <li>Évitez de manger 2h avant le test</li>
              <li>Hydratez-vous normalement</li>
            </ul>
            
            <p>En cas de question ou d'empêchement, contactez-nous à <a href="mailto:contact@enduraw.com">contact@enduraw.com</a></p>
            
            <p>Nous avons hâte de vous accueillir !</p>
            
            <p>L'équipe Enduraw</p>
          </div>
          
          <div class="footer">
            <p>Enduraw Performance Center - Chamonix</p>
            <p>🌐 www.enduraw.com | 📧 contact@enduraw.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Confirmation de votre réservation - ${protocolName} à Chamonix
      
      Bonjour ${booking.customer.firstName},
      
      Votre paiement a été traité avec succès. Voici les détails :
      
      Protocol : ${protocolName}
      Date : ${new Date(booking.date).toLocaleDateString('fr-FR')}
      Heure : ${booking.time}
      Montant : ${booking.price}€
      
      Que devez-vous apporter ?
      - Tenue de sport confortable
      - Chaussures de running
      - Une bouteille d'eau
      - Une serviette
      
      Arrivez 15 minutes avant votre créneau.
      
      Contact : contact@enduraw.com
      
      L'équipe Enduraw
    `
  };
}

// Template email de rappel
function getReminderEmailTemplate(booking) {
  const protocolName = booking.protocol === 'vo2max' ? 'VO2Max' : 'Run/Walk';
  const testDate = new Date(booking.date);
  
  return {
    subject: `Rappel - Votre test ${protocolName} demain à Chamonix`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #7c3aed, #1e40af); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; }
          .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
          .checklist { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { background: #1f2937; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Rappel - Test demain</h1>
            <p>N'oubliez pas votre rendez-vous !</p>
          </div>
          
          <div class="content">
            <p>Bonjour ${booking.customer.firstName},</p>
            
            <p>Nous vous rappelons que votre test ${protocolName} est prévu <strong>demain</strong> :</p>
            
            <div class="highlight">
              <p><strong>📅 ${testDate.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</strong></p>
              <p><strong>🕒 ${booking.time}</strong></p>
              <p><strong>📍 Performance Center - Chamonix</strong></p>
            </div>
            
            <div class="checklist">
              <h3>✅ Check-list pour demain :</h3>
              <ul>
                <li>Tenue de sport confortable</li>
                <li>Chaussures de running</li>
                <li>Bouteille d'eau</li>
                <li>Serviette</li>
                <li>Arrivée 15 minutes avant (${booking.time})</li>
              </ul>
            </div>
            
            <p><strong>Recommandations :</strong></p>
            <ul>
              <li>🚫 Évitez de manger 2h avant le test</li>
              <li>💧 Hydratez-vous normalement</li>
              <li>😴 Bonne nuit de sommeil</li>
              <li>☕ Évitez l'excès de caféine</li>
            </ul>
            
            <p>En cas d'empêchement de dernière minute, contactez-nous rapidement à <a href="mailto:contact@enduraw.com">contact@enduraw.com</a> ou au 04.50.XX.XX.XX</p>
            
            <p>À demain !</p>
            
            <p>L'équipe Enduraw</p>
          </div>
          
          <div class="footer">
            <p>Enduraw Performance Center - Chamonix</p>
            <p>🌐 www.enduraw.com | 📧 contact@enduraw.com</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

// Envoyer email de confirmation
async function sendConfirmationEmail(booking) {
  if (!process.env.EMAIL_USER) {
    console.log('📧 Configuration email manquante - Email de confirmation non envoyé');
    return false;
  }

  try {
    const emailTemplate = getConfirmationEmailTemplate(booking);
    
    const mailOptions = {
      from: `"Enduraw" <${process.env.EMAIL_USER}>`,
      to: booking.customer.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email de confirmation envoyé à ${booking.customer.email}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation:', error);
    return false;
  }
}

// Envoyer email de rappel
async function sendReminderEmail(booking) {
  if (!process.env.EMAIL_USER) {
    console.log('📧 Configuration email manquante - Email de rappel non envoyé');
    return false;
  }

  try {
    const emailTemplate = getReminderEmailTemplate(booking);
    
    const mailOptions = {
      from: `"Enduraw" <${process.env.EMAIL_USER}>`,
      to: booking.customer.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email de rappel envoyé à ${booking.customer.email}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur envoi email rappel:', error);
    return false;
  }
}

// Fonction pour envoyer les rappels automatiques (à exécuter daily)
async function sendDailyReminders() {
  try {
    const { bookingsAPI } = require('./database');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const allBookings = bookingsAPI.getAll();
    const tomorrowBookings = allBookings.filter(booking => 
      booking.status === 'confirmed' && 
      booking.date === tomorrowStr
    );

    console.log(`📬 Envoi de ${tomorrowBookings.length} rappels pour demain`);

    for (const booking of tomorrowBookings) {
      await sendReminderEmail(booking);
      // Délai entre chaque email
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return tomorrowBookings.length;
  } catch (error) {
    console.error('❌ Erreur envoi rappels daily:', error);
    return 0;
  }
}

// Fonction pour envoyer un email de contact
async function sendContactEmail(emailData) {
  try {
    const mailOptions = {
      from: `"Enduraw Contact" <${process.env.EMAIL_USER}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      replyTo: emailData.replyTo || process.env.EMAIL_USER
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de contact envoyé:', info.messageId);
    return info;
  } catch (error) {
    console.error('Erreur envoi email de contact:', error);
    throw error;
  }
}

module.exports = {
  sendConfirmationEmail,
  sendReminderEmail,
  sendDailyReminders,
  sendContactEmail
};