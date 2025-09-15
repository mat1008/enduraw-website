import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/fancy.css';

const API_BASE_URL = 'http://localhost:3001';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51QwOSwKsEoaU8nvdboXULfb8cbp92iJOb24zLBZmDLzWkBF21Js0yjqTGokcp0L5eWfXtxhhOlAwZwCV3NY4PlMJ00CKyNzqlH');

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  protocol: 'vo2max' | 'runwalk';
  price: number;
}

interface ChamonixBookingProps {
  onBookingSuccess?: (bookingData: any) => void;
}

const ChamonixBooking: React.FC<ChamonixBookingProps> = ({ onBookingSuccess }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<'vo2max' | 'runwalk'>('vo2max');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // État pour les créneaux dynamiques
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Charger les créneaux depuis l'API
  const loadSlots = async (protocol: 'vo2max' | 'runwalk') => {
    setLoadingSlots(true);
    setSlotsError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/slots?protocol=${protocol}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableSlots(data.data);
      } else {
        setSlotsError('Erreur lors du chargement des créneaux');
      }
    } catch (error) {
      console.error('Erreur chargement créneaux:', error);
      setSlotsError('Impossible de charger les créneaux');
    } finally {
      setLoadingSlots(false);
    }
  };

  // Charger les créneaux quand le protocole change
  useEffect(() => {
    loadSlots(selectedProtocol);
  }, [selectedProtocol]);

  const filteredSlots = availableSlots;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSlotSelection = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setIsBookingFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Vérifier la disponibilité d'un créneau en temps réel
  const checkSlotAvailability = async (slotId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/slots/${slotId}/availability`);
      const data = await response.json();
      return data.success && data.data.available;
    } catch (error) {
      console.error('Erreur vérification disponibilité:', error);
      return false;
    }
  };

  const handleStripePayment = async () => {
    if (!selectedSlot || !customerInfo.email) return;

    setIsLoading(true);

    try {
      // Vérifier la disponibilité en temps réel avant le paiement
      const isStillAvailable = await checkSlotAvailability(selectedSlot.id);
      
      if (!isStillAvailable) {
        alert('Désolé, ce créneau n\'est plus disponible. Veuillez en choisir un autre.');
        setIsBookingFormOpen(false);
        // Recharger les créneaux
        await loadSlots(selectedProtocol);
        return;
      }

      // Créer la session de paiement
      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slotId: selectedSlot.id,
          protocol: selectedProtocol,
          customerInfo,
          date: selectedSlot.date,
          time: selectedSlot.time
        }),
      });

      const session = await response.json();
      
      if (!response.ok) {
        if (session.code === 'SLOT_UNAVAILABLE') {
          alert('Ce créneau n\'est plus disponible. Veuillez en choisir un autre.');
          setIsBookingFormOpen(false);
          await loadSlots(selectedProtocol);
          return;
        }
        throw new Error(session.error || 'Erreur lors de la création de la session de paiement');
      }
      
      // Rediriger vers Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error('Erreur Stripe:', result.error);
          alert('Erreur lors de la redirection vers le paiement');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const protocolInfo = {
    vo2max: {
      title: 'VO2Max Protocol',
      price: 150,
      duration: '90 minutes',
      description: 'Test complet avec mesure de la VO2max, seuils ventilatoires, zones d\'entraînement'
    },
    runwalk: {
      title: 'Run/Walk Protocol', 
      price: 50,
      duration: '60 minutes',
      description: 'Analyse de l\'économie de course et de marche, gradients critiques'
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 gradient-text-blue text-center">
          Réservez votre créneau à Chamonix
        </h2>
        
        {/* Sélection du protocole */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Choisissez votre protocole :</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(protocolInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setSelectedProtocol(key as 'vo2max' | 'runwalk')}
                className={`p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedProtocol === key 
                    ? 'glass-card border-blue-400' 
                    : 'glass-card border-white/20 hover:border-white/40'
                }`}
              >
                <h4 className="text-xl font-bold text-white mb-2">{info.title}</h4>
                <p className="text-2xl font-bold gradient-text-blue mb-2">{info.price}€</p>
                <p className="text-sm text-gray-300 mb-2">Durée : {info.duration}</p>
                <p className="text-sm text-gray-200">{info.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Créneaux disponibles */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Créneaux disponibles - {protocolInfo[selectedProtocol].title}
          </h3>
          
          {loadingSlots ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-300">Chargement des créneaux...</p>
            </div>
          ) : slotsError ? (
            <div className="text-center py-8">
              <p className="text-red-400 mb-2">❌ {slotsError}</p>
              <button 
                onClick={() => loadSlots(selectedProtocol)}
                className="btn-gradient inline-block px-4 py-2 text-sm rounded-lg"
              >
                Réessayer
              </button>
            </div>
          ) : filteredSlots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-300">Aucun créneau disponible pour ce protocole.</p>
              <p className="text-sm text-gray-400 mt-2">
                Contactez-nous pour d'autres dates ou options.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotSelection(slot)}
                  className="stat-card p-4 text-center hover:scale-105 transform transition-all duration-300"
                >
                  <div className="text-white mb-2">
                    <div className="font-semibold">{formatDate(slot.date)}</div>
                    <div className="text-2xl font-bold text-blue-400">{slot.time}</div>
                    <div className="text-sm text-gray-300">{slot.price}€</div>
                  </div>
                  <div className="btn-gradient inline-block px-4 py-2 text-sm rounded-lg">
                    Réserver
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de réservation */}
      {isBookingFormOpen && selectedSlot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Confirmer la réservation</h3>
              <button
                onClick={() => setIsBookingFormOpen(false)}
                className="text-white hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Récapitulatif */}
            <div className="mb-6 p-4 bg-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Récapitulatif</h4>
              <p className="text-gray-200">Protocol: {protocolInfo[selectedProtocol].title}</p>
              <p className="text-gray-200">Date: {formatDate(selectedSlot.date)}</p>
              <p className="text-gray-200">Heure: {selectedSlot.time}</p>
              <p className="text-gray-200">Durée: {protocolInfo[selectedProtocol].duration}</p>
              <p className="text-xl font-bold text-blue-400 mt-2">Prix: {selectedSlot.price}€</p>
            </div>

            {/* Formulaire client */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsBookingFormOpen(false)}
                  className="flex-1 py-3 px-6 border border-white/40 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Annuler
                </button>
                <button
                  onClick={handleStripePayment}
                  disabled={isLoading || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email}
                  className="flex-1 btn-gradient py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Redirection...' : `Payer ${selectedSlot.price}€`}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              Paiement sécurisé via Stripe. Vous serez redirigé vers la page de paiement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChamonixBooking;