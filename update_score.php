<?php
    $con=mysqli_connect('192.168.64.2','seem4570','1234','snaker');
    if($con)
	 echo "Hello World";
     if ($con->connect_error){
	echo "Failed to connect to MySQL: ".$con->connect_error;
	}
$score = $_POST["score"];
$status = $con->query("INSERT INTO player_score (score) VALUES ($score)");
if(!$status){
echo ("Error in inserting the score");
}
$con->close();
?>
