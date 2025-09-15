const { slotsAPI } = require('../server/database');

module.exports = async (req, res) => {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
  }

  try {
    const { protocol } = req.query;
    
    let slots;
    if (protocol) {
      slots = slotsAPI.getByProtocol(protocol);
    } else {
      slots = slotsAPI.getAvailable();
    }
    
    // Filtrer les créneaux passés
    const now = new Date();
    const currentDateStr = now.toISOString().split('T')[0];
    const currentTime = now.getHours() * 100 + now.getMinutes(); // Format HHMM
    
    const futureSlots = slots.filter(slot => {
      const slotDate = slot.date;
      const slotTime = parseInt(slot.time.replace(':', ''));
      
      // Garder les créneaux futurs
      if (slotDate > currentDateStr) return true;
      if (slotDate === currentDateStr && slotTime > currentTime) return true;
      
      return false;
    });
    
    res.json({ success: true, data: futureSlots });
  } catch (error) {
    console.error('Erreur récupération créneaux:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
};