<?php
include('conncetDB.php');
include('functionDB.php');
$url = $_GET['redirAll'];


switch ($url) {
    case 'Uconnect':

    var_dump($url);
        break;
    
    case 'Uvisit':

        break;
    case 'Unewuser':
       $data = json_decode(file_get_contents('php://input'));
        echo json_encode($data);
        //newUser(htmlspecialchars($data->{'PSEUDO'}),htmlspecialchars($data->{'EMAIL'}),htmlspecialchars($data->{'MDP'}));
        break;


    default: 
        $err =  [ "err" => 'error'];
        echo json_encode($err);
        break;
}