<?php
// Create connection
$con = new mysqli("server_name", "root","","snaker";
if($con)
         echo "Your score is uploaded";
// Check connection
if ($con->connect_error){
echo "Failed to connect to MySQL: ".$con->connect_error;
}
$name  = $_POST["name"];
$score = $_POST["score"];
$status = $con->query("INSERT INTO player_score (name,score) VALUES ('$name',$score)");
if(!$status){
echo ("Error in inserting the score");
}

$con->close(); // close the connection is good practice
?>
