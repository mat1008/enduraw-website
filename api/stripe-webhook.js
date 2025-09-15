const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { bookingsAPI } = require('../server/database');
const { sendConfirmationEmail } = require('../server/emailService');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Erreur de signature webhook:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gérer l'événement
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Paiement réussi:', session.id);

        // Récupérer les métadonnées de la réservation
        const metadata = session.metadata;
        
        try {
          // Confirmer la réservation dans la base de données
          const confirmedBooking = bookingsAPI.confirm(metadata.bookingId, session.id);
          
          if (confirmedBooking) {
            console.log(`✅ Réservation ${metadata.bookingId} confirmée`);
            
            // Envoyer l'email de confirmation
            try {
              await sendConfirmationEmail(confirmedBooking);
            } catch (emailError) {
              console.error('❌ Erreur envoi email confirmation:', emailError);
            }
          } else {
            console.error('❌ Impossible de confirmer la réservation:', metadata.bookingId);
          }
          
          console.log('Paiement traité pour:', metadata.customerEmail);
          
        } catch (error) {
          console.error('Erreur lors de la confirmation de réservation:', error);
        }
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object;
        console.log('Session expirée:', expiredSession.id);
        
        try {
          // Annuler la réservation et libérer le créneau
          const cancelledBooking = bookingsAPI.cancel(expiredSession.metadata.bookingId, 'expired');
          
          if (cancelledBooking) {
            console.log(`✅ Réservation ${expiredSession.metadata.bookingId} annulée (expirée)`);
          } else {
            console.error(`❌ Impossible d'annuler la réservation: ${expiredSession.metadata.bookingId}`);
          }
        } catch (error) {
          console.error('❌ Erreur annulation réservation expirée:', error);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Paiement échoué:', failedPayment.id);
        break;

      default:
        console.log(`Type d'événement non géré: ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};