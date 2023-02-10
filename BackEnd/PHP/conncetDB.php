<?php
$NAMEDB = 'spark';
$IDCONNECT = 'root';
$MDP = 'ZADDY93270!92270';

if($_SERVER['HTTP_HOST'] == 'localhost'){
    try {
        $bdd = new PDO('mysql:host='.$_SERVER['HTTP_HOST'].';dbname='.$NAMEDB.';charset=utf8', $IDCONNECT,$MDP);
    } catch (Exception $e) {
        die('Erreur : ' .$e->getMessage());
    }
}else{

}