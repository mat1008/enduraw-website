const { slotsAPI } = require("../../../server/database");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Méthode non autorisée"
    });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "ID du créneau requis"
    });
  }

  try {
    const slot = slotsAPI.getById(id);
    
    if (!slot) {
      return res.status(404).json({
        success: false,
        error: "Créneau non trouvé"
      });
    }

    // Vérifier si le créneau est dans le futur
    const now = new Date();
    const slotDateTime = new Date(`${slot.date}T${slot.time}:00`);
    const isFuture = slotDateTime > now;

    return res.status(200).json({
      success: true,
      data: {
        id: slot.id,
        available: slot.available && isFuture,
        date: slot.date,
        time: slot.time
      }
    });
  } catch (error) {
    console.error("Erreur API slots/[id]/availability:", error);
    return res.status(500).json({
      success: false,
      error: "Erreur serveur interne"
    });
  }
}
