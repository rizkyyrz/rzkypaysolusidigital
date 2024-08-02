<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// PHONE
if (empty($_POST["phone"])) {
    $errorMSG .= "Phone is required ";
} else {
    $phone = $_POST["phone"];
}

if ($errorMSG == "") {
    // URL tujuan
    $url = "https://example.com/submit-form";
    
    // Data yang akan dikirim
    $data = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone
    ];
    
    // Inisialisasi cURL
    $ch = curl_init($url);
    
    // Setel opsi cURL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    
    // Eksekusi cURL
    $response = curl_exec($ch);
    
    // Periksa apakah terjadi kesalahan
    if ($response === false) {
        $errorMSG = 'Curl error: ' . curl_error($ch);
    }
    
    // Tutup cURL
    curl_close($ch);
    
    // Tampilkan respons
    echo $response;
} else {
    echo $errorMSG;
}
?>
