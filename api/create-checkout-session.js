const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { slotsAPI, bookingsAPI } = require('../server/database');

module.exports = async (req, res) => {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { 
        slotId, 
        protocol, 
        price, 
        customerInfo, 
        date, 
        time 
      } = req.body;

      // Validation des données
      if (!slotId || !protocol || !customerInfo || !date || !time) {
        return res.status(400).json({ error: 'Données manquantes' });
      }

      if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
        return res.status(400).json({ error: 'Informations client incomplètes' });
      }

      // Vérifier la disponibilité du créneau en temps réel
      const slot = slotsAPI.getById(slotId);
      if (!slot || !slot.available) {
        return res.status(400).json({ 
          error: 'Ce créneau n\'est plus disponible',
          code: 'SLOT_UNAVAILABLE' 
        });
      }

      const price = slot.price; // Utiliser le prix de la base de données

      // Déterminer le nom du produit selon le protocole
      const productName = protocol === 'vo2max' 
        ? 'Test VO2Max - Chamonix' 
        : 'Test Run/Walk - Chamonix';

      const description = `Test le ${new Date(date).toLocaleDateString('fr-FR')} à ${time}`;

      // Créer la réservation en base AVANT la session Stripe (statut pending)
      const booking = bookingsAPI.create({
        slotId,
        protocol,
        customer: customerInfo,
        date,
        time,
        price: price
      });

      if (!booking) {
        return res.status(500).json({ 
          error: 'Erreur lors de la création de la réservation' 
        });
      }

      console.log(`✅ Réservation créée: ${booking.id} pour le créneau: ${slotId}`);

      // Créer la session Stripe Checkout
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: productName,
                description: description,
                images: ['https://your-website.com/images/testing.png'], // Remplacez par votre URL d'image
              },
              unit_amount: price * 100, // Stripe utilise les centimes
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        
        // Métadonnées pour identifier la réservation
        metadata: {
          bookingId: booking.id,
          slotId: slotId,
          protocol: protocol,
          date: date,
          time: time,
          customerEmail: customerInfo.email,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerPhone: customerInfo.phone || ''
        },

        // Informations client pré-remplies
        customer_email: customerInfo.email,
        
        // URLs de redirection (à adapter selon votre domaine)
        success_url: `${req.headers.origin || 'https://your-website.com'}/services/testing?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'https://your-website.com'}/services/testing?canceled=true`,
        
        // Options supplémentaires
        payment_intent_data: {
          setup_future_usage: 'off_session',
        },
        
        // Collecte des informations de facturation
        billing_address_collection: 'auto',
        
        // Expire la session après 30 minutes
        expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
      });


      res.status(200).json({ 
        id: session.id,
        url: session.url,
        bookingId: booking.id
      });

    } catch (error) {
      console.error('Erreur Stripe:', error);
      res.status(500).json({ 
        error: 'Erreur lors de la création de la session de paiement',
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};