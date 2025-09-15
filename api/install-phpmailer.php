<?php
/**
 * Simple PHPMailer installer for Hostinger
 * Run this script once to download and install PHPMailer
 */

echo "Installing PHPMailer...\n";

// Create vendor directory if it doesn't exist
if (!file_exists('vendor')) {
    mkdir('vendor', 0755, true);
}

// Download PHPMailer
$phpmailer_url = 'https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip';
$zip_file = 'phpmailer.zip';

echo "Downloading PHPMailer...\n";
file_put_contents($zip_file, file_get_contents($phpmailer_url));

// Extract PHPMailer
$zip = new ZipArchive;
if ($zip->open($zip_file) === TRUE) {
    $zip->extractTo('vendor/');
    $zip->close();
    
    // Rename extracted folder
    if (file_exists('vendor/PHPMailer-master')) {
        rename('vendor/PHPMailer-master', 'vendor/phpmailer');
    }
    
    echo "PHPMailer installed successfully!\n";
} else {
    echo "Failed to extract PHPMailer\n";
}

// Clean up
unlink($zip_file);

echo "Installation complete!\n";
echo "Add this line to the top of your contact.php file:\n";
echo "require_once 'vendor/phpmailer/src/PHPMailer.php';\n";
echo "require_once 'vendor/phpmailer/src/SMTP.php';\n";
echo "require_once 'vendor/phpmailer/src/Exception.php';\n";
?>