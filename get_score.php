<?php
 $con = new mysqli("192.168.64.2", "seem4570","1234", "snaker");
  // Check connection
 if ($con->connect_error){
 echo "Failed to connect to MySQL: ".$con->connect_error;
        }

        $result = $con->query("SELECT * FROM player_score ORDER BY score DESC LIMIT 10");
	$con->close();
        // close the connection is good practice
        $data = $result->fetch_all(MYSQLI_ASSOC);

	echo json_encode($data);
?>
