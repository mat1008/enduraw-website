# Configuration du système de réservation Stripe - Guide complet

## ✅ Ce qui a été fait

1. **Installation des dépendances Stripe**
   - `@stripe/stripe-js` et `@stripe/react-stripe-js` pour le frontend
   - `stripe` pour le backend

2. **Composant de réservation créé**
   - `src/components/ChamonixBooking.tsx` : Interface de sélection et réservation de créneaux
   - Interface moderne avec sélection de protocole et calendrier de créneaux
   - Modal de confirmation avec formulaire client

3. **API Backend créée**
   - `api/create-checkout-session.js` : Création des sessions Stripe Checkout
   - `api/stripe-webhook.js` : Gestion des webhooks pour confirmer les paiements

4. **Intégration dans TestingPage**
   - Remplacement du formulaire de contact par le système de réservation
   - Interface cohérente avec la nouvelle direction artistique

## 🔧 Configuration requise pour vous

### 1. Obtenir les clés Stripe

1. Créez un compte sur [Stripe Dashboard](https://dashboard.stripe.com)
2. Récupérez vos clés :
   - **Clé publique** (pk_test_...) : pour le frontend
   - **Clé secrète** (sk_test_...) : pour le backend

### 2. Configurer les variables d'environnement

Modifiez le fichier `.env.local` avec vos vraies clés :

```bash
# Remplacez par vos vraies clés Stripe
STRIPE_SECRET_KEY=sk_test_votre_vraie_cle_secrete_ici
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret_ici
```

### 3. Configurer la clé publique dans le frontend

Dans `src/components/ChamonixBooking.tsx`, ligne 6 :
```typescript
const stripePromise = loadStripe('pk_test_votre_vraie_cle_publique_ici');
```

### 4. Configurer les webhooks Stripe

1. Allez sur [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Cliquez sur "Add endpoint"
3. URL du webhook : `https://votre-domaine.com/api/stripe-webhook`
4. Sélectionnez ces événements :
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
5. Copiez le "Signing secret" dans `STRIPE_WEBHOOK_SECRET`

## 🚀 Fonctionnalités du système

### Interface utilisateur
- **Sélection de protocole** : VO2Max (150€) ou Run/Walk (50€)
- **Calendrier de créneaux** : Créneaux disponibles avec date/heure
- **Formulaire client** : Nom, prénom, email, téléphone
- **Paiement sécurisé** : Redirection vers Stripe Checkout

### Gestion backend
- **Sessions Stripe** : Création automatique avec métadonnées de réservation
- **Webhooks** : Confirmation automatique des paiements
- **URLs de retour** : Gestion des succès et annulations

## 📋 Créneaux disponibles actuels (exemple)

Le système inclut des créneaux d'exemple :
- **20 décembre 2024** : VO2Max à 9h00 et 11h00
- **21 décembre 2024** : Run/Walk à 9h00, VO2Max à 16h00
- **22 décembre 2024** : Run/Walk à 10h00, VO2Max à 15h00

### Comment modifier les créneaux

Dans `src/components/ChamonixBooking.tsx`, modifiez l'array `availableSlots` :

```typescript
const availableSlots: TimeSlot[] = [
  { 
    id: '1', 
    date: '2024-12-20', 
    time: '09:00', 
    available: true, 
    protocol: 'vo2max', 
    price: 150 
  },
  // Ajoutez vos créneaux ici
];
```

## 🎨 Personnalisation du design

Le système utilise la nouvelle direction artistique :
- **Couleurs** : Fond noir, textes blancs, accents bleu foncé (#1e40af) et violet (#7c3aed)
- **Effets** : Glassmorphism, animations 3D, hover effects
- **Responsive** : Interface adaptée mobile/desktop

## 🔄 Workflow complet

1. **Client visite la page Testing** → Sélectionne "Testing in Chamonix"
2. **Choisit un protocole** → VO2Max ou Run/Walk
3. **Sélectionne un créneau** → Date et heure disponibles
4. **Remplit ses informations** → Nom, email, téléphone
5. **Clique "Payer"** → Redirection vers Stripe Checkout
6. **Paiement réussi** → Webhook confirme la réservation
7. **Email de confirmation** → (à implémenter selon vos besoins)

## 📧 Prochaines étapes recommandées

1. **Base de données** : Implémenter un système de stockage des réservations
2. **Email automatique** : Envoyer confirmations et rappels
3. **Gestion admin** : Interface pour gérer les créneaux et réservations
4. **Calendrier synchronisé** : Intégration avec Google Calendar ou similaire

## 🚨 Points d'attention

- **Mode test** : Actuellement configuré en mode test Stripe
- **Créneaux statiques** : Les créneaux sont codés en dur, à connecter à une base de données
- **Gestion des conflits** : Implémenter la vérification de disponibilité en temps réel
- **Sécurité** : Valider les données côté serveur

Le système est opérationnel et prêt à recevoir des réservations dès que vous aurez configuré vos clés Stripe !