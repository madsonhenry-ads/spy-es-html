<?php
// Garante compatibilidade da função getallheaders() em servidores Nginx / PHP-FPM
if (!function_exists('getallheaders')) {
    function getallheaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) === 'HTTP_') {
                $headerName = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($name, 5)))));
                $headers[$headerName] = $value;
            }
        }
        return $headers;
    }
}

header('Content-Type: application/json');

require_once __DIR__ . '/../functions.php';

$allowed_domains = [
    '0ab9feaa-00ba-4d10-a640-98b735c3fc29-00-3t5gnmq56t0f1.kirk.replit.dev',
    'new.betrayaldetect.site'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] ? $_SERVER['HTTP_ORIGIN'] : 'https://' . ($_SERVER['HTTP_HOST'] ?? '');
$referer = isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] ? $_SERVER['HTTP_REFERER'] : 'https://' . ($_SERVER['HTTP_HOST'] ?? '');

error_log("=== API Request Debug ===");
error_log("Request Origin: " . $origin);
error_log("Request Referer: " . $referer);
error_log("Request Method: " . ($_SERVER['REQUEST_METHOD'] ?? 'not set'));
error_log("HTTP Host: " . ($_SERVER['HTTP_HOST'] ?? 'not set'));
error_log("Remote Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'not set'));
error_log("Request Headers: " . print_r(getallheaders(), true));
error_log("=== End API Request Debug ===");

$is_allowed = false;
$origin_domain = validateDomain($origin);
$referer_domain = validateDomain($referer);

error_log("=== Domain Validation Results ===");
error_log("Validated Origin Domain: " . ($origin_domain ?: 'none'));
error_log("Validated Referer Domain: " . ($referer_domain ?: 'none'));

if ($origin_domain || $referer_domain) {
    foreach ($allowed_domains as $allowed_domain) {
        error_log("Checking against allowed domain: $allowed_domain");
        // Comparação exata de strings
        if ($origin_domain === $allowed_domain || $referer_domain === $allowed_domain) {
            $is_allowed = true;
            error_log("Domain exactly matched: " . ($origin_domain ?: $referer_domain));
            if ($origin) {
                header('Access-Control-Allow-Origin: ' . $origin);
            }
            break;
        }
    }
}

if (!$is_allowed) {
    error_log("=== API Access Denied ===");
    error_log("Origin domain: " . ($origin_domain ?: 'none'));
    error_log("Referer domain: " . ($referer_domain ?: 'none'));
    error_log("Raw Origin: " . $origin);
    error_log("Raw Referer: " . $referer);
    error_log("=== End API Access Denied ===");

    http_response_code(403);
    echo json_encode(['error' => 'Access Denied', 'status' => 403]);
    exit;
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $input = file_get_contents('php://input');
    error_log("Received request body: " . $input);

    $data = json_decode($input, true);
    if (!$data || !isset($data['phone'])) {
        throw new Exception('Phone number is required');
    }

    $phone = preg_replace('/[^0-9]/', '', $data['phone']);

    $ch = curl_init();
    $url = "https://primary-production-aac6.up.railway.app/webhook/request_photo?tel={$phone}";
    error_log("Making request to WhatsApp API URL: " . $url);

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPGET => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
            'Origin: https://whatspy.chat'
        ]
    ]);

    $response = curl_exec($ch);
    $curl_error = curl_errno($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    error_log("API Response Code: " . $http_code);
    error_log("API Raw Response: " . $response);

    curl_close($ch);

    if ($curl_error) {
        throw new Exception("cURL Error: " . curl_strerror($curl_error));
    }

    if ($http_code !== 200) {
        throw new Exception("API returned status code: " . $http_code);
    }

    $result = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response from API: " . json_last_error_msg());
    }

    $is_default_image = strpos($result['link'], 'no-user-image-icon') !== false;

    error_log("Photo link: " . $result['link']);
    error_log("Is default image: " . ($is_default_image ? 'true' : 'false'));

    echo json_encode([
        'success' => true,
        'result' => $result['link'],
        'is_photo_private' => $is_default_image
    ]);

} catch (Exception $e) {
    error_log("Error in WhatsApp API: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
