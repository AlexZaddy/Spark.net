<?php 


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