const { slotsAPI } = require('../../server/database');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        // Récupérer tous les créneaux (admin)
        const slots = slotsAPI.getAll();
        return res.status(200).json({
          success: true,
          data: slots
        });

      case 'POST':
        // Créer un nouveau créneau
        const { date, time, protocol, price } = req.body;

        if (!date || !time || !protocol || !price) {
          return res.status(400).json({
            success: false,
            error: 'Tous les champs sont requis (date, time, protocol, price)'
          });
        }

        // Validation du protocole
        if (!['vo2max', 'runwalk'].includes(protocol)) {
          return res.status(400).json({
            success: false,
            error: 'Le protocole doit être "vo2max" ou "runwalk"'
          });
        }

        // Validation du prix
        if (isNaN(price) || price <= 0) {
          return res.status(400).json({
            success: false,
            error: 'Le prix doit être un nombre positif'
          });
        }

        // Vérifier que la date n'est pas dans le passé
        const slotDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (slotDate < today) {
          return res.status(400).json({
            success: false,
            error: 'La date ne peut pas être dans le passé'
          });
        }

        const newSlot = slotsAPI.create({
          date,
          time,
          protocol,
          price: parseInt(price)
        });

        if (newSlot) {
          return res.status(201).json({
            success: true,
            data: newSlot,
            message: 'Créneau créé avec succès'
          });
        } else {
          return res.status(500).json({
            success: false,
            error: 'Erreur lors de la création du créneau'
          });
        }

      default:
        return res.status(405).json({
          success: false,
          error: 'Méthode non autorisée'
        });
    }
  } catch (error) {
    console.error('Erreur API admin/slots:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur interne'
    });
  }
}