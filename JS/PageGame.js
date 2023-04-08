import { newAddActu ,btnNewAddActu } from "./addActu";
import { addUserFriends } from "./addFriends";
import { reqActu, Actualite,likeActu, commente } from "./actualiter";
import { MAIL } from "./verifConnection";


let offset = 0;

let game = document.location.href.split('=')[1];
const main = document.querySelector('main')

for (let i = 0; i < game.length; i++) {
    game =  game.replace('%20', ' ')
}


const pageGame = async (nameGame) => {
    //let gameMedia = null
    main.innerHTML = '';
    main.innerHTML = new GAME().contentArticle();

    //const listField = document.querySelector('.listeUser')
    main.style.marginTop = '0';
    main.style.height = '100%';

    const cnn = new XMLHttpRequest();
    cnn.open('POST', './BackEnd/PHP/index.php?redirAll=gamePage', true);
    cnn.send(JSON.stringify({ NAMEGAME: nameGame }));

    cnn.onreadystatechange = () => {
        let gameMedia = null;
        if (cnn.readyState === 4 && cnn.status === 200) {
            gameMedia = JSON.parse(cnn.response)
           /* gameMedia.forEach(game => {
                listField.innerHTML += new GAME(game).listeUser();
            })*/
            
        }
        return gameMedia
    }
    /// attendre resolve function pagegame
    
}

const initOldactu = async () => {
    likeActu();
    commente()
    infiniteScroll();
    console.log('oui');
}

const infiniteScroll = async () => {
    const loadingActu = document.querySelector('.loading-actu')
 
    

    const reqOldActu = async (offset) => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === 4 && req.status === 200){
                 if(req.response){
                    showOldActu(JSON.parse(req.response));
                 }
            }else{
                ''
            }
        }
        req.open('POST', './BackEnd/PHP/index.php?redirAll=actualite')
        req.send(JSON.stringify({Game : game , Offset : offset}))
    }


    const showOldActu = async (resultTab) => {
        const contentActu = document.querySelector('.listeNews');
        resultTab.forEach( actu  => {
            contentActu.innerHTML += new Actualite(actu).createDivNexActu();
        });
        initOldactu();
        contentActu.innerHTML += `<div class="loading-actu">Chargement des Donnée</div>`;
    }

    const observerScroll = async (entry) => {
        if(entry[0].isIntersecting){
            loadingActu.remove();
            offset = offset + 5;
            console.log(offset);
            reqOldActu(offset);
        }
    }

    const testPageinifinite = async () => {
    if (loadingActu){
        console.log('ouioui');
        new IntersectionObserver(observerScroll).observe(loadingActu);
    }else{
        await showOldActu()
        console.log('non');
        new IntersectionObserver(observerScroll).observe(loadingActu);
    }

    }

    testPageinifinite()
}




const backArrow = () => {
    const arrow = document.querySelector('.backArrow');
    arrow?.addEventListener('click', (e)=> {
        document.location.href = 'index.html' 
        e.stopImmediatePropagation()
    })
}

const RemoveNavParams = () => {
    const searchBarre = document.querySelector('#navigation');
    searchBarre?.remove();
}


const abonnement = () => {
    const abonne = document.querySelector('.abonne');

    abonne?.addEventListener('click', () => {
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


const aboCheck = async () => {
    await pageGame(game);
    const cnn = new XMLHttpRequest();
    const abonne = document.querySelector('.abonne');
    const mail = JSON.parse(localStorage.getItem('SPARKCONCT')).Mail
    cnn.open('POST', './BackEnd/PHP/index.php?redirAll=aboCheck', true);
    cnn.send(JSON.stringify({ Mail: mail, NAMEGAME: game }));

    cnn.onreadystatechange = async () => {
        if (cnn.status == 200 && cnn.readyState == 4) {
                cnn.response && JSON.parse(cnn.response).refus ? abonne.innerHTML='Abonne' : '';
            }
        }
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
           <!-- <div class="listeUser">
                <div class="search-user">
                    <input type="text" placeholder="RECHERCHE">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
            </div> -->

            <div class="listeNews">
            </div>
         </div>
        `;
    }


    listeUser() {
        return `
        <article>
            <p>${this.name}</p>
            <button class="addFriends" value="${this.name}"><i class="fa-solid fa-user-plus"></i></button>
        </article>
        `;
    }

}

const initPageGame = async () => {
    pageGame(game);
    abonnement();
    addUserFriends();
    newAddActu();
    btnNewAddActu();
    backArrow();
    RemoveNavParams();
    aboCheck();
    reqActu(0)
 
} 
initPageGame()

export {game , abonnement , backArrow , aboCheck, infiniteScroll};