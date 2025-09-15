import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/fancy.css';

const API_BASE_URL = 'http://localhost:3001';

interface BookingDetails {
  id: string;
  protocol: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  date: string;
  time: string;
  price: number;
  status: string;
  created_at: string;
}

const BookingSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!sessionId) {
        setError('Aucune session de paiement trouvée');
        setLoading(false);
        return;
      }

      try {
        // Ici, on pourrait avoir une API pour récupérer les détails de la réservation
        // via l'ID de session Stripe, mais pour simplifier, on va juste confirmer le succès
        setLoading(false);
      } catch (err) {
        console.error('Erreur récupération détails:', err);
        setError('Erreur lors de la récupération des détails');
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [sessionId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen fancy-bg flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Vérification du paiement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen fancy-bg flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-white mb-4">Erreur</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link
            to="/services/testing"
            className="btn-gradient inline-block px-6 py-3 rounded-lg"
          >
            Retour aux tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen fancy-bg pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Success Animation Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          {/* Success Header */}
          <div className="glass-card p-8 mb-8 text-center">
            <div className="mb-6">
              <div className="text-8xl mb-4 animate-bounce">✅</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Paiement Confirmé !
              </h1>
              <p className="text-xl text-gray-200">
                Votre réservation a été enregistrée avec succès
              </p>
            </div>

            {/* Success Message */}
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                🎉 Félicitations !
              </h2>
              <p className="text-gray-200">
                Votre paiement a été traité avec succès. Un email de confirmation 
                vous a été envoyé avec tous les détails de votre réservation.
              </p>
            </div>

            {/* Session ID for reference */}
            {sessionId && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Référence de paiement :</span>
                </p>
                <p className="font-mono text-blue-400 text-xs break-all">
                  {sessionId}
                </p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              📋 Prochaines étapes
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📧</span>
                </div>
                <h3 className="font-bold text-white mb-2">Vérifiez vos emails</h3>
                <p className="text-gray-300 text-sm">
                  Un email de confirmation avec tous les détails vous a été envoyé
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🏃‍♂️</span>
                </div>
                <h3 className="font-bold text-white mb-2">Préparez-vous</h3>
                <p className="text-gray-300 text-sm">
                  Portez des vêtements de sport confortables et évitez les repas lourds
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📍</span>
                </div>
                <h3 className="font-bold text-white mb-2">Rendez-vous</h3>
                <p className="text-gray-300 text-sm">
                  Présentez-vous 15 minutes avant l'heure prévue à Chamonix
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              💬 Besoin d'aide ?
            </h2>
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Si vous avez des questions ou besoin de modifier votre réservation, 
                n'hésitez pas à nous contacter.
              </p>
              <Link
                to="/contact"
                className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services/testing"
                className="btn-gradient px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Réserver un autre test
              </Link>
              
              <Link
                to="/"
                className="px-8 py-3 rounded-lg border border-white/40 text-white hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Retour à l'accueil
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;