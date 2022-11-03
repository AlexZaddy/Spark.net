<?php
//include('conncetDB.php');
include('functionDB.php');
$url = $_GET['redirAll'];


switch ($url) {
    case 'Uconnect':
    $data = json_decode(file_get_contents('php://input'));
    userConnect(htmlspecialchars($data->{'EMAIL'}),htmlspecialchars($data->{'MDP'}));
    //var_dump($data);
        break;
    
    case 'Uvisit':

        break;
    case 'Unewuser':
       $data = json_decode(file_get_contents('php://input'));
        //echo json_encode($data);
        newUser(htmlspecialchars($data->{'PSEUDO'}),htmlspecialchars($data->{'EMAIL'}),htmlspecialchars($data->{'MDP'}));
        break;
    case 'gameIn':
        readGame();
        break;
    case 'gamePage':
       $data = json_decode(file_get_contents('php://input'));
        inGame($data->{'NAMEGAME'});
        break;

    default: 
        $err =  [ "err" => 'error'];
        echo json_encode($err);
        break;
}