const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Déploiement Enduraw Website...\n');

try {
  // 1. Build du projet React
  console.log('📦 Building React app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // 2. Créer le dossier de déploiement
  const deployDir = 'deploy';
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true });
  }
  fs.mkdirSync(deployDir);
  
  console.log('📁 Copie des fichiers de production...');
  
  // 3. Copier les fichiers build
  execSync(`xcopy build\\* ${deployDir} /s /e /h /y`, { stdio: 'inherit' });
  
  // 4. Copier les fichiers API
  const apiDir = path.join(deployDir, 'api');
  fs.mkdirSync(apiDir, { recursive: true });
  
  if (fs.existsSync('api/contact.php')) {
    fs.copyFileSync('api/contact.php', path.join(apiDir, 'contact.php'));
  }
  
  if (fs.existsSync('api/install-phpmailer.php')) {
    fs.copyFileSync('api/install-phpmailer.php', path.join(apiDir, 'install-phpmailer.php'));
  }
  
  // 5. Créer un fichier de configuration pour Hostinger
  const htaccess = `
# Redirection pour React Router (si utilisé)
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Handle Angular and React requests
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Sécurité pour les fichiers sensibles
<Files ".env">
  Order allow,deny
  Deny from all
</Files>

# Cache pour les assets statiques
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
`;
  
  fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccess.trim());
  
  console.log('✅ Build terminé !');
  console.log(`📤 Uploade le contenu du dossier '${deployDir}' vers public_html/ sur Hostinger`);
  console.log('\n📋 Instructions de déploiement :');
  console.log('1. Connecte-toi à ton panel Hostinger');
  console.log('2. Va dans Gestionnaire de fichiers');
  console.log(`3. Upload tout le contenu du dossier '${deployDir}' dans public_html/`);
  console.log('4. Configure les paramètres email dans api/contact.php');
  console.log('5. Teste le formulaire de contact');
  
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
}