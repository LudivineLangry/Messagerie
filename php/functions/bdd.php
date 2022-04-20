<?php
include 'jointures/header.php';
?>

    <title>Base de données</title>

<?php
include 'jointures/body.php';
?>

    <h1>Base de données MySQL</h1>

<?php

    $servername = 'localhost';
    $username = 'root';
    $password = 'root';

    //On établit la connexion
    $conn = mysql_connect($servername, $username, $password);

    //On vérifie la connexion
    if(!$conn){
        die('Erreur : ' .mysql_connect_error());
    }
    echo 'Connexion réussie';

?>