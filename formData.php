<?php

echo "HELLO ";

if($_SERVER["REQUEST_METHOD"] == "POST" ){

    $formData=file_get_contents('php://input').PHP_EOL;
    $data = json_decode($formData); 
    echo "****".$data->name."***";
    $fileOpen = fopen('contactUsData.txt', 'a');
    fwrite($fileOpen,$formData);
    fclose($fileOpen);

    echo "<h1>Data saved </h1>";

}

?>