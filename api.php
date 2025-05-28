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

// Função para extrair domínio de uma URL (necessária para as mensagens de log)
function validateDomain($url) {
    $parsedUrl = parse_url($url);
    return isset($parsedUrl['host']) ? $parsedUrl['host'] : null;
}

// Cabeçalhos CORS e tipo de conteúdo
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gerenciar requisições OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$origin = isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] ? $_SERVER['HTTP_ORIGIN'] : 'https://' . ($_SERVER['HTTP_HOST'] ?? '');
$referer = isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] ? $_SERVER['HTTP_REFERER'] : 'https://' . ($_SERVER['HTTP_HOST'] ?? '');

error_log("=== API Request Debug ===");
error_log("Request Origin: " . $origin);
error_log("Request Referer: " . $referer);
error_log("Request Method: " . ($_SERVER['REQUEST_METHOD'] ?? 'not set'));
error_log("HTTP Host: " . ($_SERVER['HTTP_HOST'] ?? 'not set'));
error_log("Remote Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'not set'));
error_log("Request Headers: " . print_r(getallheaders(), true));

try {
    // Suportar tanto GET quanto POST
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Método GET - pegar parâmetros da URL
        $tel = isset($_GET['tel']) ? $_GET['tel'] : (isset($_GET['phone']) ? $_GET['phone'] : null);
        $country = isset($_GET['country']) ? $_GET['country'] : null;
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Método POST - pegar parâmetros do corpo JSON
        $input = file_get_contents('php://input');
        error_log("Received request body: " . $input);
        
        $data = json_decode($input, true);
        if (!$data) {
            // Se não for JSON, tenta pegar do POST normal
            $tel = isset($_POST['tel']) ? $_POST['tel'] : (isset($_POST['phone']) ? $_POST['phone'] : null);
            $country = isset($_POST['country']) ? $_POST['country'] : null;
        } else {
            // Se for JSON, extrai dali
            $tel = isset($data['tel']) ? $data['tel'] : (isset($data['phone']) ? $data['phone'] : null);
            $country = isset($data['country']) ? $data['country'] : null;
        }
    } else {
        // Método não suportado
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
    }

    // Verifica se o número de telefone foi fornecido
    if (!$tel) {
        throw new Exception('Número de telefone é obrigatório');
    }

    // Remove caracteres não numéricos do número
    $tel = preg_replace('/[^0-9]/', '', $tel);

    // Adiciona o código do país ao número, se fornecido
    $fullNumber = $tel;
    if ($country) {
        $country = preg_replace('/[^0-9]/', '', $country);
        
        // Verifica se o número já começa com o código do país
        if (substr($tel, 0, strlen($country)) !== $country) {
            $fullNumber = $country . $tel;
        }
    }

    // Adiciona o símbolo "+" se não estiver presente
    if (substr($fullNumber, 0, 1) !== '+') {
        $fullNumber = '+' . $fullNumber;
    }

    error_log("Consultando WhatsApp para o número: " . $fullNumber);
    $url = "https://primary-production-aac6.up.railway.app/webhook/request_photo?tel={$fullNumber}";
    error_log("Making request to WhatsApp API URL: " . $url);

    // Faz a requisição para a API externa
    $ch = curl_init();
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
        throw new Exception("Erro cURL: " . curl_strerror($curl_error));
    }

    if ($http_code !== 200) {
        throw new Exception("API retornou código de status: " . $http_code);
    }

    $result = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Resposta JSON inválida da API: " . json_last_error_msg());
    }

    // Verificar se o resultado contém link null (indica que a foto é privada)
    $is_photo_private = !isset($result['link']) || $result['link'] === null;
    
    // Verificar se a imagem é a padrão (usuário não tem foto ou é privada)
    $is_default_image = !$is_photo_private && strpos($result['link'], 'no-user-image-icon') !== false;
    
    // URL para imagem padrão de perfil privado (usando nossa imagem SVG local)
    $default_private_photo = "private_profile.svg";
    
    error_log("Photo link: " . ($result['link'] ?? 'null (private photo)'));
    error_log("Is default image: " . ($is_default_image ? 'true' : 'false'));
    error_log("Is photo private: " . ($is_photo_private ? 'true' : 'false'));

    echo json_encode([
        'success' => true,
        'result' => $is_photo_private || $is_default_image ? $default_private_photo : ($result['link'] ?? $default_private_photo),
        'is_photo_private' => $is_photo_private || $is_default_image
    ]);

} catch (Exception $e) {
    error_log("Erro na API do WhatsApp: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>