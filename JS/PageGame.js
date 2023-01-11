let game = document.location.href.split('=')[1];
const main = document.querySelector('main')
let USERINFO = null;
for (let i = 0; i < game.length; i++) {
    game =  game.replace('%20', ' ')
}

const infouser = () => {
    const req = new XMLHttpRequest();

    req.onreadystatechange = () =>{
        if(req.status == 200 && req.readyState == 4){
            USERINFO = JSON.parse(req.response);
        }
    }
    req.open('POST','./BackEnd/PHP/index.php?redirAll=userInfo',true );
    req.send(JSON.stringify({EMAIL: MAIL}));
}



const pageGame = (nameGame) => {
    let gameMedia = null
    main.innerHTML = '';
    main.innerHTML = new GAME().contentArticle();

    const listField = document.querySelector('.listeUser')
    main.style.marginTop = '0';

    const cnn = new XMLHttpRequest();
    cnn.open('POST', './BackEnd/PHP/index.php?redirAll=gamePage', true);
    cnn.send(JSON.stringify({ NAMEGAME: nameGame }));

    cnn.onreadystatechange = () => {
        if (cnn.readyState === 4 && cnn.status === 200) {
            gameMedia = JSON.parse(cnn.response)
            gameMedia.forEach(game => {
                listField.innerHTML += new GAME(game).listeUser();
            })
        }
    }
    /// attendre resolve function pagegame
    setTimeout(() => {
        aboCheck();
        addUserFriends();
        reqActu();
        newAddActu();
        btnNewAddActu();
        infouser();
        backArrow();
    }, 400)
    abonnement();
    
}
const backArrow = () => {
    const arrow = document.querySelector('.backArrow');
    arrow.addEventListener('click', ()=> {

        document.location.href = 'index.html' 
    })
}


const abonnement = () => {
    const abonne = document.querySelector('.abonne');

    abonne.addEventListener('click', () => {
        const cnn = new XMLHttpRequest();
        cnn.onreadystatechange = function () {
            if (cnn.readyState === 4 && cnn.status === 200) {
                const Res = JSON.parse(cnn.response);
                if (Res.refus == 'acces-denied') {
                    abonne.innerHTML = 'Abonné';
                } else {
                    ''
                }
            }
        }
        cnn.open('POST', './BackEnd/PHP/index.php?redirAll=abonne', true);
        cnn.send(JSON.stringify({ Mail: MAIL, NAMEGAME: game }));


    })
}


const aboCheck = () => {
    const cnn = new XMLHttpRequest();
    const abonne = document.querySelector('.abonne');
    let mail = JSON.parse(localStorage.getItem('SPARKCONCT')).Mail
    cnn.onreadystatechange = function () {
        if (cnn.status == 200 && cnn.readyState == 4) {
            if (cnn.response && JSON.parse(cnn.response) != '') {
                abonne.innerHTML = 'Abonné';
                console.log(JSON.parse(cnn.response))
            } else {
                ''
            }
        }
    }
    cnn.open('POST', './BackEnd/PHP/index.php?redirAll=aboCheck', true);
    cnn.send(JSON.stringify({ Mail: mail, NAMEGAME: game }));
}


class GAME {
    constructor(data) {
        this.name = data?.PSEUDO;

    }

    contentArticle() {
        return `
        <div class="backArrow">
        <p>Retour</p>
        </div>
        <button class="abonne">s'abonner</button>
         <div class="content-list">
            <div class="listeUser">
            </div>

            <div class="listeNews">
            </div>
         </div>
        `
    }


    listeUser() {
        return `
        <article>
            <p>${this.name}</p>
            <button class="addFriends" value="${this.name}"><i class="fa-solid fa-user-plus"></i></button>
        </article>
        `
    }

}

pageGame(game);