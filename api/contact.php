<?php
// Include PHPMailer (if installed)
if (file_exists('vendor/phpmailer/src/PHPMailer.php')) {
    require_once 'vendor/phpmailer/src/PHPMailer.php';
    require_once 'vendor/phpmailer/src/SMTP.php';
    require_once 'vendor/phpmailer/src/Exception.php';
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validation
$errors = [];

if (empty($input['name']) || strlen($input['name']) < 2) {
    $errors[] = 'Name must be at least 2 characters';
}

if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address';
}

if (empty($input['message']) || strlen($input['message']) < 10) {
    $errors[] = 'Message must be at least 10 characters';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['message' => 'Validation error', 'errors' => $errors]);
    exit;
}

// Sanitize input
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($input['message']));

// Email configuration - you can set these directly or use environment variables
$smtp_host = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
$smtp_port = $_ENV['SMTP_PORT'] ?? 587;
$smtp_user = $_ENV['SMTP_USER'] ?? 'your-email@gmail.com';
$smtp_pass = $_ENV['SMTP_PASS'] ?? 'your-app-password';
$recipient_email = $_ENV['RECIPIENT_EMAIL'] ?? 'contact.enduraw@gmail.com';

// Check if using PHPMailer (recommended) or native mail()
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    // Using PHPMailer (recommended)
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = $smtp_host;
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_user;
        $mail->Password = $smtp_pass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtp_port;

        // Recipients
        $mail->setFrom($smtp_user, 'Enduraw Website');
        $mail->addAddress($recipient_email);
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission from $name";
        $mail->Body = "
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                <h2 style='color: #333;'>New Contact Form Submission</h2>
                <div style='background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;'>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
                    <p><strong>Message:</strong></p>
                    <div style='background: white; padding: 15px; border-radius: 3px; margin-top: 10px;'>
                        " . nl2br($message) . "
                    </div>
                </div>
                <p style='color: #666; font-size: 12px;'>
                    This message was sent from the Enduraw website contact form.
                </p>
            </div>
        ";
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage:\n\n$message";

        $mail->send();
        echo json_encode(['message' => 'Message sent successfully']);
    } catch (Exception $e) {
        error_log("Contact form error: " . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode(['message' => 'Failed to send message. Please try again later.']);
    }
} else {
    // Fallback to native mail() function (less reliable)
    $to = $recipient_email;
    $subject = "New Contact Form Submission from $name";
    $email_message = "Name: $name\nEmail: $email\nMessage:\n\n$message";
    $headers = "From: $smtp_user\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $email_message, $headers)) {
        echo json_encode(['message' => 'Message sent successfully']);
    } else {
        error_log("Contact form error: mail() function failed");
        http_response_code(500);
        echo json_encode(['message' => 'Failed to send message. Please try again later.']);
    }
}
?>