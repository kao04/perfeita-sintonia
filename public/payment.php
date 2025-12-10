<?php
// payment.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// SUAS CREDENCIAIS DE PRODUÇÃO
$access_token = "APP_USR-46293781492125-120917-44177472ba25aabc34221f4d7609a493-1153648";

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => 'No data provided']);
    exit;
}

// URL base do seu site (recebido do frontend)
$baseUrl = $data['baseUrl'] ?? 'http://localhost:5173'; 

$preference_data = [
    "items" => [
        [
            "title" => "Relatório Completo de Compatibilidade - Perfeita Sintonia",
            "quantity" => 1,
            "currency_id" => "BRL",
            "unit_price" => 0.10
        ]
    ],
    "payer" => [
        "email" => $data['email'],
        "name" => $data['name']
    ],
    "back_urls" => [
        "success" => $baseUrl . "/report",
        "failure" => $baseUrl . "/premium", // Só volta pro Premium se FALHAR (cartão recusado)
        "pending" => $baseUrl . "/report"   // Se estiver PENDENTE, vai pro relatório tentar liberar
    ],
    "auto_return" => "approved",
    "statement_descriptor" => "PERFEITA SINTONIA", // Nome na fatura do cartão
    "external_reference" => $data['email'], // Identificador interno
    "binary_mode" => true // Aprova ou rejeita na hora (sem pendente)
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.mercadopago.com/checkout/preferences",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($preference_data),
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer " . $access_token
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo json_encode(['error' => "cURL Error: " . $err]);
} else {
    $json_response = json_decode($response, true);
    
    if (isset($json_response['init_point'])) {
        echo json_encode(['payment_url' => $json_response['init_point']]);
    } else {
        echo $response;
    }
}
?>