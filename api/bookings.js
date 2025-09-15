const { bookingsAPI } = require('../server/database');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Méthode non autorisée'
    });
  }

  try {
    const { email } = req.query;

    let bookings;
    if (email) {
      // Filtrer par email client
      bookings = bookingsAPI.getByEmail(email);
    } else {
      // Récupérer toutes les réservations (pour admin)
      bookings = bookingsAPI.getAll();
    }

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Erreur API bookings:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des réservations'
    });
  }
}