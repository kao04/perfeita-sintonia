<?php
// payment.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// SEU TOKEN DE PRODUÇÃO
$access_token = "APP_USR-46293781492125-120917-44177472ba25aabc34221f4d7609a493-1153648";

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => 'No data provided']);
    exit;
}

$baseUrl = $data['baseUrl'] ?? 'http://localhost:5173'; 

$preference_data = [
    "items" => [
        [
            "title" => "TESTE - Relatório Compatibilidade",
            "quantity" => 1,
            "currency_id" => "BRL",
            "unit_price" => 0.01 // Lembre de mudar para 49.90 depois!
        ]
    ],
    "payer" => [
        "email" => $data['email'],
        "name" => $data['name']
    ],
    "back_urls" => [
        "success" => $baseUrl . "/report",
        "failure" => $baseUrl . "/premium", 
        "pending" => $baseUrl . "/report" // IMPORTANTE: Se ficar pendente (Pix), manda pro relatório igual
    ],
    "auto_return" => "approved", // Redireciona sozinho se aprovado
    "statement_descriptor" => "PERFEITA SINTONIA",
    "external_reference" => $data['email'],
    "binary_mode" => false // Mudei para FALSE para aceitar Pix/Boleto corretamente
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