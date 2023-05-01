<?php
$NAMEDB = 'spark';
$IDCONNECT = 'root';
$MDP = 'ZADDY93270!92270';


//echo $_SERVER['SERVER_ADDR'];
if($_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['SERVER_ADDR'] == '127.0.0.1'){
    try {
        $bdd = new PDO('mysql:host='.$_SERVER['HTTP_HOST'].';dbname='.$NAMEDB.';charset=utf8', $IDCONNECT,$MDP);
    } catch (Exception $e) {
        die('Erreur : ' .$e->getMessage());
    }
}else{

}