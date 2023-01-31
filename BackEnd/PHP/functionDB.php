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
    $cnn->closeCursor();
}

function abonement($mail,$game) {
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('SELECT IDUSER, MAIL FROM user WHERE MAIL=?');
    $cnn->execute([$mail]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
    $USER = $data[0]['IDUSER'];
     
    $cnn = $bdd->prepare('SELECT idGame , nameGame FROM game WHERE nameGame=?');
    $cnn->execute([$game]);

    $data1 = $cnn->fetchAll(PDO::FETCH_ASSOC);
    $GAME = $data1[0]['idGame'];

    $cnn = $bdd->prepare('SELECT * FROM relationgameuser WHERE idGame = ? AND IDUSER = ?');
    $cnn->execute([$GAME,$USER]);
    $data2 = $cnn->fetchAll(PDO::FETCH_ASSOC);
    if(!empty($data2)){
        echo json_encode($Response->{'refus'});
    }else{
        $cnn = $bdd->prepare('INSERT INTO relationgameuser (IDUSER,IDGAME) VALUES(?,?)');
        $cnn->execute([$USER,$GAME]);
        echo json_encode($Response->{'acces'});
    }
    /*
    $cnn = $bdd->prepare('INSERT INTO relationgameuser (IDUSER,IDGAME) VALUES(?,?)');
    $cnn->execute([$USER,$GAME]);

    */
    $cnn->closeCursor();
}

function abonneCheck($mail,$game){
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('SELECT IDUSER, MAIL FROM user WHERE MAIL=?');
    $cnn->execute([$mail]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    $IDUSER = $data[0]['IDUSER'];

    $cnn = $bdd->prepare('SELECT idGame , nameGame FROM game WHERE nameGame=?');
    $cnn->execute([$game]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    $IDGAME = $data[0]['idGame'];


   $cnn = $bdd->prepare('SELECT * FROM relationgameuser WHERE idGame = ? AND IDUSER = ?');
   $cnn->execute([$IDGAME,$IDUSER]);
   $data2 = $cnn->fetchAll(PDO::FETCH_ASSOC);
   if(!empty($data2)){
       echo json_encode($Response->{'refus'});
   }
   $cnn->closeCursor();
}

function addFriends($user1, $user2) {
    include('conncetDB.php');
    include('Reqresponse.php');
    
    if(!empty($user1) && !empty($user2)){
        $user1 = htmlspecialchars($user1);
        $user2 = htmlspecialchars($user2);
//
        $cnn = $bdd->prepare('SELECT IDUSER FROM `user` WHERE mail = ?');
        $cnn->execute([$user1]);
        $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
        $IDUSER1 = $data[0]['IDUSER'];
//     
        $cnn = $bdd->prepare('SELECT IDUSER FROM `user` WHERE PSEUDO = ?');
        $cnn->execute([$user2]);
        $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
        $IDUSER2 = $data[0]['IDUSER'];
        $demamnde = 'attente';

        if($IDUSER1 != $IDUSER2 && $IDUSER1 != '' && $IDUSER2 != ''){
        $cnn = $bdd->prepare('INSERT INTO amis (user1id, user2id,invitation) VALUES (?,?,?)');
        $cnn->execute([$IDUSER1,$IDUSER2,$demamnde]);
        echo json_encode($Response->{'refus'});
        $cnn->closeCursor();
        }else{
        $cnn->closeCursor();
        }
    }
}

function contact($mail){
    include('conncetDB.php');
    include('Reqresponse.php');

    if(!empty($mail) && $mail != ''){
        $cnn = $bdd->prepare('SELECT IDUSER FROM `user` WHERE mail = ?');
        $cnn->execute([$mail]);
        $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
        $ID = $data[0]['IDUSER'];

        $cnn = $bdd->prepare('SELECT amis.invitation, user.PSEUDO FROM `amis` INNER JOIN user ON user.IDUSER = amis.user1id  WHERE user2id = ?');
        $cnn->execute([$ID]);
        $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        $cnn->closeCursor();
        
    } 
}

function acceptIvitation($mail ,$nameUSER2) {
    include('conncetDB.php');
    include('Reqresponse.php');
     
    $ACCES = 'acces';
    $cnn = $bdd->prepare('SELECT IDUSER FROM `user` WHERE mail = ?');
    $cnn->execute([$mail]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
    $IDUSER1 = $data[0]['IDUSER'];

    $cnn = $bdd->prepare('SELECT IDUSER FROM `user` WHERE PSEUDO = ?');
    $cnn->execute([$nameUSER2]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
    $IDUSER2 = $data[0]['IDUSER'];

    $cnn = $bdd->prepare('UPDATE amis SET `invitation` = ? WHERE user1id = ? and user2id = ?');
    $cnn->execute([$ACCES, $IDUSER1,$IDUSER2]);
    $cnn->closeCursor();

    echo json_encode($Response->{'acces'});

}

function actuGame($game){
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('SELECT idGame , nameGame FROM game WHERE nameGame=?');
    $cnn->execute([$game]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    $IDGAME = $data[0]['idGame'];


    $cnn = $bdd->prepare('SELECT actualite.idActu, actualite.idGame, actualite.idUser, actualite.newActu, 
                                actualite.dateActu, actualite.like, actualite.dislike, actualite.Type,user.PSEUDO FROM actualite 
                                LEFT JOIN user 
                                ON user.IDUSER = actualite.idUser 
                                WHERE idGame=?
                                ');
    $cnn->execute([$IDGAME]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}

function loading($nameame){
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('SELECT * FROM `game` WHERE namegame = ?');
    $cnn->execute([$nameame]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($data);
}

function recupUser($mail){
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('SELECT PSEUDO, IDUSER FROM `user` WHERE MAIL=?');
    $cnn->execute([$mail]);
    
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}

function recupCommentActu($idActu){
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('SELECT commentaire.comment , commentaire.Date , user.PSEUDO FROM `commentaire` RIGHT JOIN user ON  user.IDUSER = commentaire.idUser WHERE idActu =?');

    $cnn->execute([$idActu]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}

function newCom ($idUSer, $messages, $date, $idActu) {
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('INSERT INTO commentaire (idActu, idUser, comment, Date) VALUES (?,?,?,?)');
    $cnn->execute([$idActu, $idUSer, $messages, $date]);

    echo json_encode($Response->{'acces'});
}

function infoUser($email){
    include('conncetDB.php');

    $cnn = $bdd->prepare('SELECT PSEUDO FROM `user` WHERE MAIL=?');
    $cnn->execute([$email]);

    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}

function addActu($nameGame, $username , $ACTU , $DATE){
    include('conncetDB.php');

    $cnn = $bdd->prepare('SELECT IDUSER FROM `user` WHERE PSEUDO=?');
    $cnn->execute([$username]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);


    $cnn = $bdd->prepare('SELECT idGame FROM `game` WHERE nameGame=?');
    $cnn->execute([$nameGame]);
    $data1 = $cnn->fetchAll(PDO::FETCH_ASSOC);


    $USER = $data[0]['IDUSER'];
    $GAME = $data1[0]['idGame'];
    $TYPE = 'userActu';

    $cnn = $bdd->prepare('INSERT INTO `actualite` (idGame,idUser,newActu,dateActu,`like`,dislike,Type ) VALUES (?,?,?,?,?,?,?)');
    $cnn->execute([$GAME,$USER,$ACTU,$DATE,'0','0',$TYPE]);

    echo 'nice';
}