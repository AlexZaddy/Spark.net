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

    case 'abonne':
        $data = json_decode(file_get_contents('php://input'));
        abonement($data->{'Mail'} , $data->{'NAMEGAME'});
        break;
    case 'aboCheck':
       $data = json_decode(file_get_contents('php://input'));
        abonneCheck($data->{'Mail'} , $data->{'NAMEGAME'});
        break;

    case 'addFriends': 
        $data = json_decode(file_get_contents('php://input'));
        addFriends($data->{'MAILUSER1'},$data->{'NAMEUSER2'});
        break;
    case 'contact':
        $data = json_decode(file_get_contents('php://input'));
        contact($data->{'MAIL'});
        break;
    case 'aceeptInvite':
        $data = json_decode(file_get_contents('php://input'));
        acceptIvitation($data->{'MAIL'} ,$data->{'nameUSER2'});
        break;
    case 'actualite': 
        $data = json_decode(file_get_contents('php://input'));
        actuGame($data->{'Game'});
        break;
    default: 
        $err =  [ "err" => 'error'];
        echo json_encode($err);
        break;
}