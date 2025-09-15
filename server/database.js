const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, 'data');
const SLOTS_FILE = path.join(DATA_DIR, 'slots.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialiser les fichiers JSON s'ils n'existent pas
if (!fs.existsSync(SLOTS_FILE)) {
  const initialSlots = [
    { 
      id: '1', 
      date: '2024-12-20', 
      time: '09:00', 
      protocol: 'vo2max', 
      price: 150,
      available: true,
      created_at: new Date().toISOString()
    },
    { 
      id: '2', 
      date: '2024-12-20', 
      time: '11:00', 
      protocol: 'vo2max', 
      price: 150,
      available: true,
      created_at: new Date().toISOString()
    },
    { 
      id: '3', 
      date: '2024-12-21', 
      time: '09:00', 
      protocol: 'runwalk', 
      price: 50,
      available: true,
      created_at: new Date().toISOString()
    },
    { 
      id: '4', 
      date: '2024-12-21', 
      time: '16:00', 
      protocol: 'vo2max', 
      price: 150,
      available: true,
      created_at: new Date().toISOString()
    },
    { 
      id: '5', 
      date: '2024-12-22', 
      time: '10:00', 
      protocol: 'runwalk', 
      price: 50,
      available: true,
      created_at: new Date().toISOString()
    }
  ];
  fs.writeFileSync(SLOTS_FILE, JSON.stringify(initialSlots, null, 2));
}

if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

// Fonction pour lire les données
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lecture ${filePath}:`, error);
    return [];
  }
}

// Fonction pour écrire les données
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Erreur écriture ${filePath}:`, error);
    return false;
  }
}

// API pour les créneaux
const slotsAPI = {
  // Récupérer tous les créneaux
  getAll: () => {
    return readJsonFile(SLOTS_FILE);
  },

  // Récupérer les créneaux disponibles
  getAvailable: () => {
    const slots = readJsonFile(SLOTS_FILE);
    const bookings = readJsonFile(BOOKINGS_FILE);
    
    // Filtrer les créneaux qui ont une réservation pending récente (moins de 1 heure)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentPendingSlots = bookings
      .filter(booking => 
        booking.status === 'pending' && 
        new Date(booking.created_at) > oneHourAgo
      )
      .map(booking => booking.slotId);
    
    return slots.filter(slot => 
      slot.available && 
      !recentPendingSlots.includes(slot.id)
    );
  },

  // Récupérer les créneaux par protocole
  getByProtocol: (protocol) => {
    const slots = readJsonFile(SLOTS_FILE);
    const bookings = readJsonFile(BOOKINGS_FILE);
    
    // Filtrer les créneaux qui ont une réservation pending récente (moins de 1 heure)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentPendingSlots = bookings
      .filter(booking => 
        booking.status === 'pending' && 
        new Date(booking.created_at) > oneHourAgo
      )
      .map(booking => booking.slotId);
    
    return slots.filter(slot => 
      slot.protocol === protocol && 
      slot.available && 
      !recentPendingSlots.includes(slot.id)
    );
  },

  // Récupérer un créneau par ID
  getById: (id) => {
    const slots = readJsonFile(SLOTS_FILE);
    return slots.find(slot => slot.id === id);
  },

  // Créer un nouveau créneau
  create: (slotData) => {
    const slots = readJsonFile(SLOTS_FILE);
    const newSlot = {
      id: uuidv4(),
      ...slotData,
      created_at: new Date().toISOString(),
      available: true
    };
    slots.push(newSlot);
    
    if (writeJsonFile(SLOTS_FILE, slots)) {
      return newSlot;
    }
    return null;
  },

  // Mettre à jour un créneau
  update: (id, updateData) => {
    const slots = readJsonFile(SLOTS_FILE);
    const slotIndex = slots.findIndex(slot => slot.id === id);
    
    if (slotIndex === -1) return null;
    
    slots[slotIndex] = {
      ...slots[slotIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };
    
    if (writeJsonFile(SLOTS_FILE, slots)) {
      return slots[slotIndex];
    }
    return null;
  },

  // Marquer un créneau comme non disponible
  markUnavailable: (id) => {
    return slotsAPI.update(id, { available: false });
  },

  // Marquer un créneau comme disponible
  markAvailable: (id) => {
    return slotsAPI.update(id, { available: true });
  },

  // Supprimer un créneau
  delete: (id) => {
    const slots = readJsonFile(SLOTS_FILE);
    const filteredSlots = slots.filter(slot => slot.id !== id);
    
    if (slots.length !== filteredSlots.length) {
      return writeJsonFile(SLOTS_FILE, filteredSlots);
    }
    return false;
  }
};

// API pour les réservations
const bookingsAPI = {
  // Récupérer toutes les réservations
  getAll: () => {
    return readJsonFile(BOOKINGS_FILE);
  },

  // Récupérer une réservation par ID
  getById: (id) => {
    const bookings = readJsonFile(BOOKINGS_FILE);
    return bookings.find(booking => booking.id === id);
  },

  // Récupérer les réservations par email client
  getByEmail: (email) => {
    const bookings = readJsonFile(BOOKINGS_FILE);
    return bookings.filter(booking => booking.customer.email === email);
  },

  // Créer une nouvelle réservation
  create: (bookingData) => {
    const bookings = readJsonFile(BOOKINGS_FILE);
    
    // Vérifier que le créneau est toujours disponible
    const slot = slotsAPI.getById(bookingData.slotId);
    if (!slot || !slot.available) {
      throw new Error('Créneau non disponible');
    }

    const newBooking = {
      id: uuidv4(),
      ...bookingData,
      status: 'pending', // pending, confirmed, cancelled, expired
      created_at: new Date().toISOString()
    };

    // NE PAS marquer le créneau comme non disponible immédiatement
    // Il sera marqué indisponible seulement après confirmation du paiement
    
    bookings.push(newBooking);
    
    if (writeJsonFile(BOOKINGS_FILE, bookings)) {
      return newBooking;
    }
    return null;
  },

  // Confirmer une réservation (après paiement)
  confirm: (id, stripeSessionId) => {
    const bookings = readJsonFile(BOOKINGS_FILE);
    const bookingIndex = bookings.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) return null;
    
    const booking = bookings[bookingIndex];
    
    // Marquer le créneau comme indisponible maintenant que le paiement est confirmé
    slotsAPI.markUnavailable(booking.slotId);
    
    bookings[bookingIndex] = {
      ...booking,
      status: 'confirmed',
      stripe_session_id: stripeSessionId,
      confirmed_at: new Date().toISOString()
    };
    
    if (writeJsonFile(BOOKINGS_FILE, bookings)) {
      return bookings[bookingIndex];
    }
    return null;
  },

  // Annuler une réservation
  cancel: (id, reason = 'cancelled') => {
    const bookings = readJsonFile(BOOKINGS_FILE);
    const booking = bookings.find(b => b.id === id);
    
    if (!booking) return null;
    
    // Rendre le créneau disponible
    slotsAPI.markAvailable(booking.slotId);
    
    const bookingIndex = bookings.findIndex(b => b.id === id);
    bookings[bookingIndex] = {
      ...booking,
      status: reason,
      cancelled_at: new Date().toISOString()
    };
    
    if (writeJsonFile(BOOKINGS_FILE, bookings)) {
      return bookings[bookingIndex];
    }
    return null;
  },

  // Nettoyer les réservations pending expirées
  cleanupExpiredPending: () => {
    const bookings = readJsonFile(BOOKINGS_FILE);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    let cleaned = 0;
    const updatedBookings = bookings.map(booking => {
      if (booking.status === 'pending' && new Date(booking.created_at) < oneHourAgo) {
        cleaned++;
        return {
          ...booking,
          status: 'expired',
          expired_at: new Date().toISOString()
        };
      }
      return booking;
    });
    
    if (cleaned > 0) {
      writeJsonFile(BOOKINGS_FILE, updatedBookings);
      console.log(`${cleaned} réservations pending expirées nettoyées`);
    }
    
    return cleaned;
  },

  // Récupérer les statistiques
  getStats: () => {
    // Nettoyer les réservations expirées avant de calculer les stats
    bookingsAPI.cleanupExpiredPending();
    
    const bookings = readJsonFile(BOOKINGS_FILE);
    const slots = readJsonFile(SLOTS_FILE);
    
    return {
      total_bookings: bookings.length,
      confirmed_bookings: bookings.filter(b => b.status === 'confirmed').length,
      pending_bookings: bookings.filter(b => b.status === 'pending').length,
      cancelled_bookings: bookings.filter(b => b.status === 'cancelled').length,
      total_slots: slots.length,
      available_slots: slots.filter(s => s.available).length,
      total_revenue: bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + (b.price || 0), 0)
    };
  }
};

module.exports = {
  slotsAPI,
  bookingsAPI
};