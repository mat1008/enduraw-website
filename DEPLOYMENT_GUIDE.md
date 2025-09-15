# Guide de Déploiement Git → Hostinger

## Workflow de Développement et Déploiement

### 1. Développement Local

```bash
# Installation des dépendances
npm install

# Développement en local
npm start

# Tests
npm test
```

### 2. Build et Déploiement

#### Option A : Script Automatique (Recommandé)
```bash
# Build + préparation des fichiers pour Hostinger
npm run deploy:hostinger
```

Ce script va :
- ✅ Builder l'application React (`npm run build`)
- ✅ Créer un dossier `deploy/` avec tous les fichiers prêts
- ✅ Copier les fichiers API PHP
- ✅ Ajouter le fichier `.htaccess` pour Hostinger
- ✅ Afficher les instructions d'upload

#### Option B : Manuel
```bash
# Build seulement
npm run build

# Puis upload manuel des fichiers
```

### 3. Structure des Fichiers après Build

```
deploy/
├── index.html                 # Page principale React
├── static/                    # Assets CSS/JS/images
│   ├── css/
│   ├── js/
│   └── media/
├── api/                       # Scripts PHP
│   ├── contact.php           # Formulaire de contact
│   └── install-phpmailer.php # Installation PHPMailer
└── .htaccess                 # Configuration Apache
```

### 4. Upload vers Hostinger

1. **Accès au panneau Hostinger**
   - Va dans ton panneau Hostinger
   - Section "Gestionnaire de fichiers"

2. **Upload des fichiers**
   - Sélectionne TOUT le contenu du dossier `deploy/`
   - Upload dans `public_html/` (pas dans un sous-dossier)

3. **Structure finale sur Hostinger** :
   ```
   public_html/
   ├── index.html              # ← Depuis deploy/
   ├── static/                 # ← Depuis deploy/
   ├── api/                    # ← Depuis deploy/
   └── .htaccess              # ← Depuis deploy/
   ```

### 5. Configuration Post-Upload

#### A. Configuration Email
Édite `public_html/api/contact.php` directement sur Hostinger :

```php
$smtp_user = 'contact.enduraw@gmail.com';
$smtp_pass = 'ton-mot-de-passe-app-gmail';
$recipient_email = 'contact.enduraw@gmail.com';
```

#### B. Test du Site
- Visite ton domaine pour tester l'app React
- Teste le formulaire de contact sur `/contact` (ou où tu l'as mis)

### 6. Git Workflow

#### Workflow Standard :
```bash
# 1. Développement
git add .
git commit -m "Add contact form feature"
git push origin main

# 2. Déploiement
npm run deploy:hostinger
# → Upload manuel du dossier deploy/ vers Hostinger

# 3. Test en production
# Visite ton site pour tester
```

#### Workflow avec Branches :
```bash
# Branche feature
git checkout -b feature/contact-form
# ... développement ...
git commit -m "Implement contact form"
git push origin feature/contact-form

# Merge vers main
git checkout main
git merge feature/contact-form
npm run deploy:hostinger

# Deploy vers production
```

### 7. Automatisation Avancée (Optionnel)

Si tu veux automatiser encore plus, tu peux :

#### A. Script FTP (avec Node.js)
```bash
npm install ftp --save-dev
```

#### B. GitHub Actions (si hébergé sur GitHub)
Créer `.github/workflows/deploy.yml` pour auto-deploy à chaque push.

#### C. Utilisation de rsync (si SSH disponible)
```bash
rsync -avz deploy/ user@your-server:/public_html/
```

### 8. Maintenance et Mises à Jour

```bash
# Pour chaque nouvelle version :
git pull origin main
npm run deploy:hostinger
# Upload du nouveau dossier deploy/
```

### 9. Troubleshooting

#### Le site ne se charge pas :
- Vérifier que `index.html` est bien à la racine de `public_html/`
- Vérifier les chemins dans `.htaccess`

#### Le formulaire ne fonctionne pas :
- Vérifier que `api/contact.php` est bien uploadé
- Tester l'URL directement : `ton-site.com/api/contact.php`
- Vérifier les logs PHP dans le panneau Hostinger

#### Erreurs de routing React :
- Vérifier que `.htaccess` est présent et contient les règles de redirection

### 10. Fichiers Git

**À commiter :**
- ✅ Source code (`src/`, `public/`, `package.json`, etc.)
- ✅ Scripts de build (`deploy.js`)
- ✅ Configuration (`api/contact.php`)

**À ignorer (.gitignore) :**
- ❌ `build/` et `deploy/` (générés automatiquement)
- ❌ `node_modules/`
- ❌ `.env` (secrets)

Cette configuration te permet de développer en local avec Git et déployer facilement sur Hostinger !