const { slotsAPI } = require('../../../server/database');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'ID du créneau requis'
    });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Récupérer un créneau spécifique
        const slot = slotsAPI.getById(id);
        if (!slot) {
          return res.status(404).json({
            success: false,
            error: 'Créneau non trouvé'
          });
        }
        return res.status(200).json({
          success: true,
          data: slot
        });

      case 'PUT':
        // Mettre à jour un créneau
        const { available, date, time, protocol, price } = req.body;

        // Vérifier que le créneau existe
        const existingSlot = slotsAPI.getById(id);
        if (!existingSlot) {
          return res.status(404).json({
            success: false,
            error: 'Créneau non trouvé'
          });
        }

        const updateData = {};
        
        // Mettre à jour seulement les champs fournis
        if (available !== undefined) {
          updateData.available = Boolean(available);
        }
        if (date) updateData.date = date;
        if (time) updateData.time = time;
        if (protocol && ['vo2max', 'runwalk'].includes(protocol)) {
          updateData.protocol = protocol;
        }
        if (price && !isNaN(price) && price > 0) {
          updateData.price = parseInt(price);
        }

        const updatedSlot = slotsAPI.update(id, updateData);
        
        if (updatedSlot) {
          return res.status(200).json({
            success: true,
            data: updatedSlot,
            message: 'Créneau mis à jour avec succès'
          });
        } else {
          return res.status(500).json({
            success: false,
            error: 'Erreur lors de la mise à jour'
          });
        }

      case 'DELETE':
        // Supprimer un créneau
        const deleteResult = slotsAPI.delete(id);
        
        if (deleteResult) {
          return res.status(200).json({
            success: true,
            message: 'Créneau supprimé avec succès'
          });
        } else {
          return res.status(404).json({
            success: false,
            error: 'Créneau non trouvé ou erreur lors de la suppression'
          });
        }

      default:
        return res.status(405).json({
          success: false,
          error: 'Méthode non autorisée'
        });
    }
  } catch (error) {
    console.error('Erreur API admin/slots/[id]:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur interne'
    });
  }
}