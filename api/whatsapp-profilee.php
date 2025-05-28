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

error_log("=== Depuración de Solicitud API ===");
error_log("Origen de la Solicitud: " . $origin);
error_log("Referente de la Solicitud: " . $referer);
error_log("Método de la Solicitud: " . ($_SERVER['REQUEST_METHOD'] ?? 'not set'));
error_log("Host HTTP: " . ($_SERVER['HTTP_HOST'] ?? 'not set'));
error_log("Dirección Remota: " . ($_SERVER['REMOTE_ADDR'] ?? 'not set'));
error_log("Encabezados de la Solicitud: " . print_r(getallheaders(), true));
error_log("=== Fin de Depuración de Solicitud API ===");

$is_allowed = false;
$origin_domain = validateDomain($origin);
$referer_domain = validateDomain($referer);

error_log("=== Resultados de Validación de Dominio ===");
error_log("Dominio de Origen Validado: " . ($origin_domain ?: 'none'));
error_log("Dominio de Referente Validado: " . ($referer_domain ?: 'none'));

if ($origin_domain || $referer_domain) {
    foreach ($allowed_domains as $allowed_domain) {
        error_log("Comprobando contra dominio permitido: $allowed_domain");
        // Comparação exata de strings
        if ($origin_domain === $allowed_domain || $referer_domain === $allowed_domain) {
            $is_allowed = true;
            error_log("Dominio coincidió exactamente: " . ($origin_domain ?: $referer_domain));
            if ($origin) {
                header('Access-Control-Allow-Origin: ' . $origin);
            }
            break;
        }
    }
}

if (!$is_allowed) {
    error_log("=== Acceso API Denegado ===");
    error_log("Dominio de origen: " . ($origin_domain ?: 'none'));
    error_log("Dominio de referente: " . ($referer_domain ?: 'none'));
    error_log("Origen Crudo: " . $origin);
    error_log("Referente Crudo: " . $referer);
    error_log("=== Fin de Acceso API Denegado ===");

    http_response_code(403);
    echo json_encode(['error' => 'Acceso denegado', 'status' => 403]);
    exit;
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

try {
    $input = file_get_contents('php://input');
    error_log("Cuerpo de la solicitud recibido: " . $input);

    $data = json_decode($input, true);
    if (!$data || !isset($data['phone'])) {
        throw new Exception('El número de teléfono es obligatorio');
    }

    $phone = preg_replace('/[^0-9]/', '', $data['phone']);

    $ch = curl_init();
    $url = "https://primary-production-aac6.up.railway.app/webhook/request_photo?tel={$phone}";
    error_log("Realizando solicitud a la URL de la API de WhatsApp: " . $url);

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

    error_log("Código de respuesta de la API: " . $http_code);
    error_log("Respuesta cruda de la API: " . $response);

    curl_close($ch);

    if ($curl_error) {
        throw new Exception("Error cURL: " . curl_strerror($curl_error));
    }

    if ($http_code !== 200) {
        throw new Exception("La API devolvió el código de estado: " . $http_code);
    }

    $result = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Respuesta JSON inválida de la API: " . json_last_error_msg());
    }

    $is_default_image = strpos($result['link'], 'no-user-image-icon') !== false;

    error_log("Enlace de la foto: " . $result['link']);
    error_log("Es imagen predeterminada: " . ($is_default_image ? 'true' : 'false'));

    echo json_encode([
        'success' => true,
        'result' => $result['link'],
        'is_photo_private' => $is_default_image
    ]);

} catch (Exception $e) {
    error_log("Error en la API de WhatsApp: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
