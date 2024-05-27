<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "sneaker_auction";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (strlen($password) > 255) {
        echo "Password is too long!";
        exit;
    }

    $checkUserSql = "SELECT id FROM users WHERE username = ?";
    
    $stmt = $conn->prepare($checkUserSql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->close();
        echo "Username already exists!";
    } else {
        // No hashing here, directly use the password
        $insertSql = "INSERT INTO users (username, password) VALUES (?, ?)";
        
        $stmt = $conn->prepare($insertSql);
        $stmt->bind_param("ss", $username, $password); // Note: No hashing here

        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $stmt->error;
        }
        
        $stmt->close();
    }
}

$conn->close();
?>