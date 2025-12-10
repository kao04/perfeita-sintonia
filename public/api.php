<?php
// api.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$file = 'database.json';

// Cria o arquivo se não existir
if (!file_exists($file)) {
    file_put_contents($file, json_encode(['users' => []]));
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);
$db = json_decode(file_get_contents($file), true);

// 1. REGISTRO DE USUÁRIO
if ($method === 'POST' && !isset($data['action'])) {
    $newUser = [
        'id' => uniqid(),
        'name' => $data['name'],
        'partnerName' => $data['partnerName'] ?? '', // <--- CAMPO ADICIONADO
        'email' => $data['email'],
        'phone' => $data['phone'],
        'status' => 'pending', // pending, paid
        'date' => date('Y-m-d H:i:s'),
        'profile' => 'Em análise' // Será atualizado se você enviar o resultado
    ];
    
    $db['users'][] = $newUser;
    file_put_contents($file, json_encode($db));
    
    echo json_encode(['success' => true, 'id' => $newUser['id']]);
    exit;
}

// 2. ATUALIZAR STATUS PARA PAGO
if ($method === 'POST' && isset($data['action']) && $data['action'] === 'update_payment') {
    $email = $data['email'];
    $found = false;
    
    foreach ($db['users'] as &$user) {
        if ($user['email'] === $email) {
            $user['status'] = 'paid';
            $found = true;
            break;
        }
    }
    
    if ($found) {
        file_put_contents($file, json_encode($db));
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado']);
    }
    exit;
}

// 3. LOGIN DO ADMIN E DADOS
if ($method === 'POST' && isset($data['action']) && $data['action'] === 'admin_login') {
    $user = $data['username'];
    $pass = $data['password'];
    
    if ($user === 'valdecir' && $pass === 'Sucesso25#') {
        // Calcula estatísticas simples
        $totalUsers = count($db['users']);
        $paidUsers = 0;
        $revenue = 0;
        
        foreach ($db['users'] as $u) {
            if ($u['status'] === 'paid') {
                $paidUsers++;
                $revenue += 49.90; // Valor fixo do produto
            }
        }
        
        echo json_encode([
            'success' => true,
            'data' => [
                'users' => array_reverse($db['users']), // Mais recentes primeiro
                'stats' => [
                    'total' => $totalUsers,
                    'paid' => $paidUsers,
                    'revenue' => $revenue
                ]
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Credenciais inválidas']);
    }
    exit;
}
?>