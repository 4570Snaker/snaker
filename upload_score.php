<?php
// Create connection
$con = new mysqli("server_name", "username","password";

// Check connection
if ($con->connect_error){
echo "Failed to connect to MySQL: ".$con->connect_error;
}

$score = $_POST["score"];
$status = $con->query("INSERT INTO player_score (score) VALUES ($score)");
if(!$status){
echo ("Error in inserting the score");
}

$con->close(); // close the connection is good practice
?>
