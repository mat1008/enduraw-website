require('dotenv').config({ path: '../.env.local' });
const express = require('express');
const cors = require('cors');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // COMMENTÉ POUR PUBLICATION
// const { slotsAPI, bookingsAPI } = require('./database'); // COMMENTÉ POUR PUBLICATION
const { sendContactEmail } = require('./emailService'); // Garde seulement le service email de contact
// const { sendConfirmationEmail, sendReminderEmail } = require('./emailService'); // COMMENTÉ POUR PUBLICATION

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/* ===== ROUTES SYSTÈME DE RÉSERVATION TESTS - COMMENTÉES POUR PUBLICATION =====

// Routes pour les créneaux
app.get('/api/slots', (req, res) => {
  try {
    // Nettoyer les réservations expirées avant de récupérer les créneaux
    bookingsAPI.cleanupExpiredPending();
    
    const { protocol } = req.query;
    
    let slots;
    if (protocol) {
      slots = slotsAPI.getByProtocol(protocol);
    } else {
      slots = slotsAPI.getAvailable();
    }
    
    res.json({ success: true, data: slots });
  } catch (error) {
    console.error('Erreur récupération créneaux:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.get('/api/slots/:id', (req, res) => {
  try {
    const slot = slotsAPI.getById(req.params.id);
    
    if (!slot) {
      return res.status(404).json({ success: false, error: 'Créneau non trouvé' });
    }
    
    res.json({ success: true, data: slot });
  } catch (error) {
    console.error('Erreur récupération créneau:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// Vérifier la disponibilité d'un créneau en temps réel
app.get('/api/slots/:id/availability', (req, res) => {
  try {
    const slot = slotsAPI.getById(req.params.id);
    
    if (!slot) {
      return res.status(404).json({ success: false, error: 'Créneau non trouvé' });
    }
    
    res.json({ 
      success: true, 
      data: { 
        id: slot.id, 
        available: slot.available,
        date: slot.date,
        time: slot.time,
        protocol: slot.protocol
      } 
    });
  } catch (error) {
    console.error('Erreur vérification disponibilité:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// Créer une session de paiement Stripe
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { slotId, protocol, customerInfo, date, time } = req.body;

    // Vérifier la disponibilité du créneau en temps réel
    const slot = slotsAPI.getById(slotId);
    if (!slot || !slot.available) {
      return res.status(400).json({ 
        success: false, 
        error: 'Ce créneau n\'est plus disponible' 
      });
    }

    // Créer la réservation en base (statut pending)
    const booking = bookingsAPI.create({
      slotId,
      protocol,
      customer: customerInfo,
      date,
      time,
      price: slot.price
    });

    if (!booking) {
      return res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de la création de la réservation' 
      });
    }

    // Déterminer le nom du produit
    const productName = protocol === 'vo2max' 
      ? 'VO2Max Protocol - Testing Chamonix' 
      : 'Run/Walk Protocol - Testing Chamonix';

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
              description: `${date} à ${time} - ${customerInfo.firstName} ${customerInfo.lastName}`,
            },
            unit_amount: slot.price * 100, // Prix en centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/services/testing`,
      metadata: {
        bookingId: booking.id,
        slotId: slotId,
        protocol: protocol,
        date: date,
        time: time,
        customerEmail: customerInfo.email,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`
      },
    });

    res.json({ success: true, id: session.id, bookingId: booking.id });

  } catch (error) {
    console.error('Erreur création session Stripe:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de la création de la session de paiement' 
    });
  }
});

// Webhook Stripe pour confirmer les paiements
app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Erreur webhook signature:', err.message);
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const bookingId = session.metadata.bookingId;
        
        // Confirmer la réservation
        const confirmedBooking = bookingsAPI.confirm(bookingId, session.id);
        
        if (confirmedBooking) {
          console.log(`Réservation ${bookingId} confirmée`);
          
          // Envoyer l'email de confirmation
          try {
            await sendConfirmationEmail(confirmedBooking);
          } catch (emailError) {
            console.error('Erreur envoi email confirmation:', emailError);
          }
        }
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object;
        const expiredBookingId = expiredSession.metadata.bookingId;
        
        // Annuler la réservation et libérer le créneau
        bookingsAPI.cancel(expiredBookingId, 'expired');
        console.log(`Réservation ${expiredBookingId} expirée`);
        break;

      case 'payment_intent.payment_failed':
        console.log('Paiement échoué:', event.data.object.id);
        break;

      default:
        console.log(`Type d'événement non géré: ${event.type}`);
    }

    res.json({received: true});
  } catch (error) {
    console.error('Erreur traitement webhook:', error);
    res.status(500).json({ error: 'Erreur traitement webhook' });
  }
});

// Routes pour les réservations
app.get('/api/bookings', (req, res) => {
  try {
    const { email } = req.query;
    
    let bookings;
    if (email) {
      bookings = bookingsAPI.getByEmail(email);
    } else {
      bookings = bookingsAPI.getAll();
    }
    
    // Enrichir avec les informations de créneaux
    const enrichedBookings = bookings.map(booking => {
      const slot = slotsAPI.getById(booking.slotId);
      return {
        ...booking,
        slot
      };
    });
    
    res.json({ success: true, data: enrichedBookings });
  } catch (error) {
    console.error('Erreur récupération réservations:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.get('/api/bookings/:id', (req, res) => {
  try {
    const booking = bookingsAPI.getById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Réservation non trouvée' });
    }
    
    const slot = slotsAPI.getById(booking.slotId);
    
    res.json({ 
      success: true, 
      data: { ...booking, slot } 
    });
  } catch (error) {
    console.error('Erreur récupération réservation:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// Routes administrateur
app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = bookingsAPI.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Erreur récupération statistiques:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// CRUD pour les créneaux (Admin)
app.post('/api/admin/slots', (req, res) => {
  try {
    const { date, time, protocol, price } = req.body;
    
    console.log('Données reçues pour création créneau:', { date, time, protocol, price });
    
    // Validation plus détaillée
    if (!date) {
      return res.status(400).json({ success: false, error: 'La date est requise' });
    }
    if (!time) {
      return res.status(400).json({ success: false, error: 'L\'heure est requise' });
    }
    if (!protocol) {
      return res.status(400).json({ success: false, error: 'Le protocole est requis' });
    }
    if (price === undefined || price === null || isNaN(price)) {
      return res.status(400).json({ success: false, error: 'Le prix est requis et doit être un nombre valide' });
    }
    if (!['vo2max', 'runwalk'].includes(protocol)) {
      return res.status(400).json({ success: false, error: 'Le protocole doit être vo2max ou runwalk' });
    }
    
    const newSlot = slotsAPI.create({
      date,
      time,
      protocol,
      price: parseFloat(price)
    });
    
    if (newSlot) {
      console.log('Créneau créé avec succès:', newSlot.id);
      res.json({ success: true, data: newSlot });
    } else {
      res.status(500).json({ success: false, error: 'Erreur création créneau' });
    }
  } catch (error) {
    console.error('Erreur création créneau:', error);
    res.status(500).json({ success: false, error: `Erreur serveur: ${error.message}` });
  }
});

app.put('/api/admin/slots/:id', (req, res) => {
  try {
    const updatedSlot = slotsAPI.update(req.params.id, req.body);
    
    if (updatedSlot) {
      res.json({ success: true, data: updatedSlot });
    } else {
      res.status(404).json({ success: false, error: 'Créneau non trouvé' });
    }
  } catch (error) {
    console.error('Erreur mise à jour créneau:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.delete('/api/admin/slots/:id', (req, res) => {
  try {
    const deleted = slotsAPI.delete(req.params.id);
    
    if (deleted) {
      res.json({ success: true, message: 'Créneau supprimé' });
    } else {
      res.status(404).json({ success: false, error: 'Créneau non trouvé' });
    }
  } catch (error) {
    console.error('Erreur suppression créneau:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

// Récupérer tous les créneaux pour l'admin
app.get('/api/admin/slots', (req, res) => {
  try {
    const slots = slotsAPI.getAll();
    res.json({ success: true, data: slots });
  } catch (error) {
    console.error('Erreur récupération créneaux admin:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

===== FIN ROUTES SYSTÈME DE RÉSERVATION TESTS ===== */

// Route pour envoyer des emails de contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, reason, message } = req.body;
    
    console.log('Données reçues pour contact:', { name, email, reason });
    
    // Validation
    if (!name || !email || !reason || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tous les champs sont requis' 
      });
    }

    // Créer l'email de contact
    const contactEmail = {
      to: 'contact.enduraw@gmail.com',
      subject: `${reason} - Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Nouveau message de contact</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <strong style="color: #1e40af;">Nom:</strong> ${name}
            </div>
            <div style="margin-bottom: 20px;">
              <strong style="color: #1e40af;">Email:</strong> ${email}
            </div>
            <div style="margin-bottom: 20px;">
              <strong style="color: #1e40af;">Sujet:</strong> ${reason}
            </div>
            <div style="margin-bottom: 20px;">
              <strong style="color: #1e40af;">Message:</strong>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
              <p>Message envoyé depuis le formulaire de contact d'Enduraw</p>
              <p>Répondre directement à: ${email}</p>
            </div>
          </div>
        </div>
      `
    };

    // Envoyer l'email
    try {
      await sendContactEmail(contactEmail);
      console.log('Email de contact envoyé avec succès');
      res.json({ success: true, message: 'Message envoyé avec succès' });
    } catch (emailError) {
      console.error('Erreur envoi email de contact:', emailError);
      res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de l\'envoi de l\'email' 
      });
    }

  } catch (error) {
    console.error('Erreur API contact:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur' 
    });
  }
});

// Route pour envoyer des emails de demande de training camp
app.post('/api/training-camp', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, trainingCamp, message } = req.body;
    
    console.log('Données reçues pour training camp:', { firstName, lastName, email, trainingCamp });
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !trainingCamp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tous les champs obligatoires sont requis' 
      });
    }

    // Options de training camp pour l'affichage
    const trainingCampOptions = {
      'stage1': '1st IMMERSIVE STAGE (Oct 3rd-7th)',
      'stage2': '2nd IMMERSIVE STAGE (Oct 9th-12th)',
      'stage3': '3rd IMMERSIVE STAGE (Oct 15th-19th)',
      'stage4': '4th IMMERSIVE STAGE (Oct 20th-24th)'
    };

    const trainingCampLabel = trainingCampOptions[trainingCamp] || trainingCamp;

    // Créer l'email de demande de training camp
    const trainingCampEmail = {
      to: 'contact.enduraw@gmail.com',
      subject: `Training Camp Request - ${firstName} ${lastName} (${trainingCampLabel})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c, #dc2626); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🏃‍♂️ Nouvelle demande de Training Camp</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Performance Center - Chamonix</p>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 25px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 18px;">Stage demandé</h3>
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: #78350f;">${trainingCampLabel}</p>
            </div>
            
            <h3 style="color: #ea580c; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #fed7aa; padding-bottom: 5px;">Informations du participant</h3>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #ea580c;">Nom complet:</strong> ${firstName} ${lastName}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #ea580c;">Email:</strong> ${email}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #ea580c;">Téléphone:</strong> ${phone}
            </div>
            
            ${message ? `
            <div style="margin: 25px 0;">
              <strong style="color: #ea580c;">Message additionnel:</strong>
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 10px; white-space: pre-wrap; color: #78350f;">${message}</div>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
              <h4 style="margin: 0 0 10px 0; color: #0c4a6e;">Actions à effectuer</h4>
              <ul style="margin: 0; padding-left: 20px; color: #0369a1;">
                <li>Vérifier la disponibilité pour le stage demandé</li>
                <li>Envoyer les informations détaillées et tarifs</li>
                <li>Programmer un appel de découverte si nécessaire</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
              <p>Demande envoyée depuis le formulaire Training Camp d'Enduraw</p>
              <p>Répondre directement à: ${email}</p>
              <p style="font-style: italic;">⚡ Répondre rapidement pour maximiser les conversions</p>
            </div>
          </div>
        </div>
      `
    };

    // Envoyer l'email
    try {
      await sendContactEmail(trainingCampEmail);
      console.log('Email de demande de training camp envoyé avec succès');
      res.json({ success: true, message: 'Demande de training camp envoyée avec succès' });
    } catch (emailError) {
      console.error('Erreur envoi email training camp:', emailError);
      res.status(500).json({ 
        success: false, 
        error: 'Erreur lors de l\'envoi de la demande' 
      });
    }

  } catch (error) {
    console.error('Erreur API training camp:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur' 
    });
  }
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Serveur API fonctionnel',
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route non trouvée' });
});

// Route pour le formulaire Athletes Support
app.post('/api/athlete-support', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    console.log('Données reçues pour athlete support:', { name, email });
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tous les champs sont requis' 
      });
    }

    // Créer l'email pour athlete support
    const athleteSupportEmail = {
      to: 'contact.enduraw@gmail.com',
      subject: `Athletes Support - Nouvelle demande de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">
              🏃‍♂️ Athletes Support Request
            </h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
              Nouvelle demande de support athlète
            </p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="margin-bottom: 25px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #06b6d4; padding-bottom: 8px;">
                📋 Informations de contact
              </h3>
              <p style="margin: 8px 0; color: #374151; font-size: 16px;">
                <strong>Nom:</strong> ${name}
              </p>
              <p style="margin: 8px 0; color: #374151; font-size: 16px;">
                <strong>Email:</strong> ${email}
              </p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">
                🎯 Objectifs et demande
              </h3>
              <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #06b6d4; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #f1f5f9; border-radius: 8px;">
              <p style="margin: 0; color: #475569; font-size: 14px;">
                📧 Email envoyé automatiquement depuis le site Enduraw
              </p>
              <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">
                ${new Date().toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Envoyer l'email
    await sendContactEmail(athleteSupportEmail);
    console.log('Email athlete support envoyé avec succès');

    res.json({ 
      success: true, 
      message: 'Demande de support envoyée avec succès' 
    });

  } catch (error) {
    console.error('Erreur envoi email athlete support:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de l\'envoi de la demande' 
    });
  }
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
});

// Démarrage du serveur
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur API démarré sur le port ${PORT}`);
    console.log(`📊 Dashboard admin: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;