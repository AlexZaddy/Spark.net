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
        $response = (object) ['response' =>$DataUser, 'acces' => $Response->{'acces'}];
        echo json_encode($response);
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
    
    if(!empty($user1) && !empty($user2)){
        $user1 = htmlspecialchars($user1);
        $user2 = htmlspecialchars($user2);
        $demamnde = 'attente';
        $response = (object) ['acces' => "succes"];

        $cnn = $bdd->prepare('SELECT * FROM `amis` WHERE user1id = ? AND user2id = ?');
        $cnn->execute([$user1,$user2]);
        $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
        if(empty(json_encode($data))){
            
        }else{

        if($user1 != $user2 && $user1 != '' && $user2 != ''){
            $cnn = $bdd->prepare('INSERT INTO amis (user1id, user2id,invitation,id_lanceur) VALUES (?,?,?,?)');
            $cnn->execute([$user1,$user2,$demamnde,$user1]);
            echo json_encode($response);
            $cnn->closeCursor();
            }else{
            $cnn->closeCursor();
            }
        }
    }
}

function contact($idUser){
    include('conncetDB.php');
    include('Reqresponse.php');

    if(!empty($idUser) && $idUser != ''){
        $cnn = $bdd->prepare('SELECT amis.invitation, user.PSEUDO, user.IDUSER FROM `amis` INNER JOIN user ON user.IDUSER = amis.user1id  WHERE user2id = ?');
        $cnn->execute([$idUser]);
        $data = $cnn->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        $cnn->closeCursor();
        
    } 
}

function acceptIvitation($IDUSER1,$IDUSER2) {
    include('conncetDB.php');
    include('Reqresponse.php');
     
    $ACCES = 'acces';

    $cnn = $bdd->prepare('UPDATE amis SET `invitation` = ? WHERE user1id = ? and user2id = ?');
    $cnn->execute([$ACCES, $IDUSER1,$IDUSER2]);
    $cnn->closeCursor();

    echo json_encode($Response->{'acces'});

}

function actuGame($game,$offset){
    include('conncetDB.php');
    include('Reqresponse.php');

    $cnn = $bdd->prepare('SELECT idGame , nameGame FROM game WHERE nameGame=?');
    $cnn->execute([$game]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    $IDGAME = $data[0]['idGame'];


    $cnn = $bdd->prepare('SELECT actualite.idActu, actualite.idGame, actualite.idUser, actualite.newActu,actualite.dateActu, actualite.like, actualite.dislike, actualite.Type,user.PSEUDO FROM actualite  
            LEFT JOIN user ON user.IDUSER = actualite.idUser 
            WHERE idGame = ? 
            GROUP BY actualite.idActu 
            ORDER BY actualite.idActu 
            DESC LIMIT 5 OFFSET '.$offset.'
    ');
    $cnn->execute([$IDGAME]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    if($data != ''){
    echo json_encode($data);
    }else{
    $data = (object) ['resp'=> 'Nada'];
    }
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

    $dateExplod = explode('/',$date);
    $date = $dateExplod[2].'-'.$dateExplod[1].'-'.$dateExplod[0];
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

    $dateFormated = explode('/',$DATE);
    $DATE = $dateFormated[2]. '-' .$dateFormated[1]. '-'.$dateFormated[0];

    $cnn = $bdd->prepare('INSERT INTO `actualite` (idGame,idUser,newActu,dateActu,`like`,dislike,Type ) VALUES (?,?,?,?,?,?,?)');
    $cnn->execute([$GAME,$USER,$ACTU,$DATE,'0','0',$TYPE]);
    $RESP = (object) ['RESP' => $ACTU];
    echo json_encode($RESP);
}

function addNoteUser($nameGame, $nameUser, $noteUser ){
    include('conncetDB.php');

    $cnn = $bdd->prepare('INSERT INTO `gamenote` (nameUser,Note,namegame) VALUES (?,?,?)');
    $cnn->execute([$nameUser,$noteUser,$nameGame]);
    $res = (object) ['Game' => $nameGame, 'NoteGame' => $noteUser, 'Req' => 'Succes'];
    $cnn->closeCursor();
    echo json_encode($res);
}

function GameMoyenne($nameGame){
    include('conncetDB.php');
    $cnn = $bdd->prepare('SELECT namegame, Note FROM `gamenote` WHERE namegame = ?');
    $cnn->execute([$nameGame]);
    $data = $cnn->fetchAll(PDO::FETCH_ASSOC);

    $result = null;
    foreach($data as $TabData){
        $calcul = $TabData['Note'] + $result;
        $result = $calcul;
    }
    $response = (object) ['response' => $result/count($data)];

    echo json_encode($response);
    //echo count($data);
}


function infoAddUserFriends($idUser){
    include('conncetDB.php');
    $cnn = $bdd->prepare('SELECT user.PSEUDO, game.nameGame, game.imgGame FROM `relationgameuser` 
    RIGHT JOIN game on relationgameuser.idGame = game.idGame
    INNER JOIN user on user.IDUSER = relationgameuser.IDUSER
    WHERE user.IDUSER = ?');
    $cnn->execute([$idUser]);
    $response = $cnn->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($response);
}

function notifUser($idUser){
    include('conncetDB.php');
    $cnn = $bdd->prepare('SELECT amis.invitation, user.PSEUDO, user.IDUSER FROM `amis` 
    INNER JOIN user ON user.IDUSER = amis.user1id  
    WHERE user2id = ?');
    $cnn->execute([$idUser]);
    $response = $cnn->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($response);
}
?>