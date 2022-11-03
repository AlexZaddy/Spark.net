<?php 

// fonction de d'inscription sur le site 
function  newUser($pseudo,$mail,$mdp) {
    include('ReqResponse.php');
    include('conncetDB.php');
    $cnn = $bdd->prepare('SELECT * FROM user WHERE MAIL=?');
    $cnn->execute([$mail]);
    $user = $cnn->fetch();

    if($user){
        echo(json_encode($Response->{'refus'}));
    }else{

    $cnn = $bdd->prepare('INSERT INTO user (PSEUDO,MAIL,MDP) VALUES(?,?,?)');
    $cnn->execute([$pseudo,$mail,$mdp]);
    $cnn->closeCursor();
    echo json_encode($Response->{'acces'}) ;
    }
}


// fonction de connexion au site 

function userConnect($mail,$mdp) {
    include('Reqresponse.php');
    include('conncetDB.php');

    $cnn = $bdd->prepare('SELECT * FROM user WHERE MAIL=?');
    $cnn->execute([$mail]);
    
    $DataUser = $cnn->fetch(PDO::FETCH_ASSOC);
    $cnn->closeCursor();

    if($DataUser && $DataUser['MDP'] === $mdp){
        echo (json_encode($Response->{'acces'}));
    }else{
        echo(json_encode($Response->{'refus'}));
    }
}


// fonction pour voir tout les jeux disponible a la recherche

function readGame(){
    include('conncetDB.php');
    $cnn = $bdd->prepare('SELECT * FROM game');
    $cnn->execute();

    $dataGame = $cnn->fetchALL(PDO::FETCH_ASSOC);
    $cnn->closeCursor();
    echo(json_encode($dataGame));
}

function inGame($nameGame){
    include('conncetDB.php');

    $cnn = $bdd->prepare('SELECT user.IDUSER, user.PSEUDO, game.idGame, game.nameGame
    FROM `relationgameuser` 
    LEFT JOIN user 
    ON user.IDUSER = relationgameuser.IDUSER 
    LEFT JOIN game 
    ON relationgameuser.idGame = game.idGame
     WHERE game.nameGame=?
    ');

    $cnn->execute([$nameGame]);
    $DataGame = $cnn->fetchALL(PDO::FETCH_ASSOC);
    echo json_encode($DataGame);
}