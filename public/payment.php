<?php
// payment.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// SUAS CREDENCIAIS
$access_token = "TEST-5671954653479440-120510-7411a7b8d818e9678e233ad62dc36aa7-1153648";

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => 'No data provided']);
    exit;
}

// URL base do seu site (recebido do frontend ou definido manualmente)
$baseUrl = $data['baseUrl']; 

$preference_data = [
    "items" => [
        [
            "title" => "Relatório Completo de Compatibilidade - Perfeita Sintonia",
            "quantity" => 1,
            "currency_id" => "BRL",
            "unit_price" => 49.90
        ]
    ],
    "payer" => [
        "email" => $data['email'],
        "name" => $data['name']
    ],
    "back_urls" => [
        "success" => $baseUrl . "/report",
        "failure" => $baseUrl . "/premium",
        "pending" => $baseUrl . "/premium"
    ],
    "auto_return" => "approved"
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
    echo $response;
}
?>