import { userNotifFriends } from "./addUserFriends.js";
import { dataLocal } from "./login.js";

const head = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');
const searchBarre = document.querySelector('.searchBarre');
const idSearch = document.getElementById('resultSearch');
let NamePageGame = '';
let tabGames = [];
const AllInfoUser = JSON.parse(localStorage.getItem('SPARKCONCT'));


const reqGames = () => {
    const cnn = new XMLHttpRequest();
    cnn.onreadystatechange = function () {
        if (cnn.readyState === 4 && cnn.status === 200) {
            const Games = JSON.parse(cnn.response);
            Games.forEach(game => {
                tabGames.push(game)
            });
            console.log(tabGames);
            return tabGames
        } else {
            ''
        }
    }
    cnn.open('GET', './BackEnd/PHP/index.php?redirAll=gameIn', true);
    cnn.send();
}



const fullscreen = () => {
    const ERC = document.querySelector('.ERC')
    ERC.addEventListener('click', async () => {
        if (document.fullscreenElement) {
            dataLocal.DisplayMode = '!fullscreen'
            localStorage.setItem('SPARKCONCT', JSON.stringify(dataLocal))
            await document.exitFullscreen()
        } else {
            dataLocal.DisplayMode = 'fullscreen'
            localStorage.setItem('SPARKCONCT', JSON.stringify(dataLocal))
            await document.documentElement.requestFullscreen();
        }

    })
}

const PageUser = () => {
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    header.innerHTML = '';
    main.innerHTML = new searchGame().searchBarre();
    const NavBarre = document.getElementById('navigation');
    NavBarre.style.display = 'flex';
    reqGames();
    initSearch();
    reqNotifUser();
}


const searchTabGame = (Tab) => {
    const idSearch = document.getElementById('resultSearch');
    idSearch ? idSearch.innerHTML = '' : '';
    Tab.forEach(elmt => {
        idSearch ? idSearch.innerHTML += new searchGame(elmt).resultSearch() :
            idSearch.innerHTML = '';
    })
    showImg(Tab);
}


const search = () => {
    const searchBarre = document.querySelector('.searchBarre');
    const idSearch = document.getElementById('resultSearch');

    let newSearch = []

    searchBarre.addEventListener('keyup', (e) => {
        let result = searchBarre.value;
        e.key == "Backspace" ? newSearch = [] : '';
        e.key == "Backspace" ? idSearch.innerHTML = '' : '';
        tabGames.forEach(elmt => {
            let NomdDuJeux = elmt.nameGame.toLowerCase();
            if (NomdDuJeux.substring(0, result.length) == result && result != '') {
                newSearch.includes(elmt) ? '' : newSearch.push(elmt);
            } else {

            }
        })
        searchTabGame(newSearch)
    })
}


const showImg = (Tab) => {
    const articles = document.querySelectorAll('.content-resultSearch');

    articles.forEach(article => {
        article.addEventListener('mouseover', () => {
            filtreArticle(article)
        })
    })

    const filtreArticle = (article) => {

        Tab?.forEach(elmt => {
            if (elmt.idGame && elmt.idGame == article.attributes.id.value) {
                body.style.background = `url(${elmt.imgGame})`;
            }
        })
    }

    articles.forEach(article => {
        article.addEventListener('click', () => {
            NamePageGame = article.innerText.toLowerCase()
            NamePageGame = NamePageGame.trim()

            document.location.href = `Page-Game.html?Game=${NamePageGame}`;
        })
    })

}

const reqNotifUser = () => {
    const IDUSER = JSON.parse(localStorage.getItem('SPARKCONCT')).idUser
    const req = new XMLHttpRequest();
    req.open('POST', './BackEnd/PHP/index.php?redirAll=notifUser', true);
    req.send( JSON.stringify({IDUSER : IDUSER}));
    req.onreadystatechange = () => {req.status == 200 && req.readyState == 4 ? userNotifFriends(JSON.parse(req.response)) : ''};
    
}

function infoGame(json) {
    const cnn = new XMLHttpRequest();
    cnn.onreadystatechange = function () {
        if (cnn.readyState === 4 && cnn.status === 200) {
            console.log(cnn.response);
        }
    };
    cnn.open('POST', './BackEnd/PHP/index.php?redirAll=gamePage', true);
    cnn.send(json);

}

const initSearch = () => {
    search()
}

class searchGame {
    constructor(Data) {
        this.id = Data?.idGame;
        this.Games = Data?.nameGame;
        this.logo = Data?.logoGame;
        this.image = Data?.imgGames;

    }


    searchBarre() {
        return `
        <div id="content-logo">
            
        </div>
        <div class="content-search">
            <input class="searchBarre" type="text" placeholder="Recherche" onfocus="search()">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div id="resultSearch">
            
        </div>

        <section class="notifFriends">

        </section>
        `;
    }

    resultSearch() {
        return `
        <article class="content-resultSearch" id="${this.id}" >
            <div class="logoGame"><img src="${this.logo}" alt="Logo du jeux" srcset=""></div>
            <div class="nameGame"><p>${this.Games}</p></div>
        </article>
        `
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

export {PageUser, fullscreen, search, AllInfoUser };
