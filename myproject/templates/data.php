<?php
// Step 1: Connect to the database
$servername = "localhost";
$username = "root";
$password = "abc123";
$dbname = "intern";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve data from the database
$sql = "SELECT topic, COUNT(*) as count FROM your_table GROUP BY topic";

$result = $conn->query($sql);

// Fetch the data from the result set
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[$row['topic']] = $row['count'];
}

// Close the database connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
