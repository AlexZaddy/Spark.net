const head = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');
const searchBarre = document.querySelector('.searchBarre');
const idSearch = document.getElementById('resultSearch');
let NamePageGame = '';



const reqGames = () => {
    const cnn = new XMLHttpRequest();
    cnn.onreadystatechange = function () {
        if (cnn.readyState === 4 && cnn.status === 200) {
            const Games = JSON.parse(cnn.response);
            tabGames = [];
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
    ERC = document.querySelector('.ERC')
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

const PageUser = async () => {
    const NavBarre = document.getElementById('navigation');

    header.innerHTML = '';
    main.innerHTML = new searchGame().searchBarre();
    NavBarre.style.display = 'flex'
    reqGames()
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

        /*
         Tab?.forEach(elmt => {
             if (parseInt(elmt.idGame) == parseInt(article.attributes?.id)) {
                 body.style.background = ``;
                 body.style.background = `url(${elmt.imgGame})`;
                 console.log(elmt.idGame);
             } else {
                 console.log(elmt)
 
             }
         })*/
    }

    articles.forEach(article => {
        article.addEventListener('click', () => {
            pageGame(article.innerText.toLowerCase());
            NamePageGame = article.innerText.toLowerCase()
            return NamePageGame = NamePageGame.trim()
        })
    })

}



const infoGame = (json) => {
    const cnn = new XMLHttpRequest();
    cnn.onreadystatechange = function () {
        if (cnn.readyState === 4 && cnn.status === 200) {
            console.log(cnn.response)
        }
    }
    cnn.open('POST', './BackEnd/PHP/index.php?redirAll=gamePage', true);
    cnn.send(json);

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
    }, 400)
    abonnement();

    backArrow();
}


const backArrow = () => {
    const arrowBack = document.querySelector('.backArrow');


    const searchShow = () => {
        main.innerHTML = new searchGame().searchBarre();
    }

    arrowBack.addEventListener('click', () => {
        searchShow()
        main.style.marginTop = '15%';
        body.style.background = '#e0e0e0';
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
        cnn.send(JSON.stringify({ Mail: MAIL, NAMEGAME: NamePageGame }));


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
    cnn.send(JSON.stringify({ Mail: mail, NAMEGAME: NamePageGame }));
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
        <div class="content-search">
            <input class="searchBarre" type="text" placeholder="Recherche" onfocus="search()">
        </div>
        <div id="resultSearch">
            
        </div>
        `
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