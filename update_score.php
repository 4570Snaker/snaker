<?php
    $con=mysqli_connect('192.168.64.2','seem4570','1234','snaker');
    if($con)
	 echo "Hello World";
     if ($con->connect_error){
	echo "Failed to connect to MySQL: ".$con->connect_error;
	}
$score = $_POST["score"];
$username = $_POST["username"];
$level=$_POST["level"];
if ($level==1){
	$status = $con->query("INSERT INTO level1 (score) VALUES ($score)");
} elseif ($level==2){
        $status = $con->query("INSERT INTO level2 (score) VALUES ($score)");
} elseif ($level==3){
        $status = $con->query("INSERT INTO level3 (score) VALUES ($score)");
}if(!$status){
echo ("Error in inserting the score");
}
$con->close();
?>
