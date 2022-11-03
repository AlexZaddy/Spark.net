const hex1 = document.querySelector('.hex1');
const hex2 = document.querySelector('.hex2');
const hex3 = document.querySelector('.hex3');
const hex4 = document.querySelector('.hex4');
const hex5 = document.querySelector('.hex5');
const hex6 = document.querySelector('.hex6');
const hex7 = document.querySelector('.hex7');
const head = document.querySelector('header');
const main = document.querySelector('main');
const body = document.querySelector('body');
const searchBarre = document.querySelector('.searchBarre');
const idSearch = document.getElementById('resultSearch');



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



const PageUser = async () => {

    const animeHexagone = () => {
        hex1.style.transform = 'translateY(65.2vh) translateX(-42.8vh)';
        hex2.style.transform = 'translateY(65.3vh)';
        hex2.style.translate = '44.7vh';
        hex3.style.translate = '-125vh';
        hex5.style.transform = 'translateY(-65.6vh) translateX(-40.8vh)';
        hex6.style.transform = 'translateY(-65.6vh)';
        hex6.style.translate = '44.7vh';
        hex7.style.translate = '125vh';
        hex4.style.display = 'none';
        head.innerHTML = '';
    }


    const searchShow = () => {
        setTimeout(() => {
            contentHex.style.display = 'none'
        }, 1000)
        main.innerHTML = new searchGame().searchBarre();
    }
    reqGames()
    animeHexagone();
    searchShow();
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
            Tab?.forEach(elmt => {
                if (elmt.idGame) {
                    body.style.background = ``;
                    body.style.background = `url(${elmt.imgGame})`;
                    //console.log(body.style.background);
                }
                //console.log(elmt)
            })

        })
    })

    articles.forEach(article => {
        article.addEventListener('click', () => { pageGame(article.innerText.toLowerCase()) })
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
    cnn.send(JSON.stringify({ NAMEGAME: nameGame }))
        ;
    cnn.onreadystatechange = () => {
        if (cnn.readyState === 4 && cnn.status === 200) {
            gameMedia = JSON.parse(cnn.response)
            gameMedia.forEach(game => {
                listField.innerHTML += new GAME(game).listeUser();
            })
        }
    }
    backArrow()
}


const backArrow = () => {
    const arrowBack = document.querySelector('.backArrow');


    const searchShow = () => {
        setTimeout(() => {
            contentHex.style.display = 'none'
        }, 1000)
        main.innerHTML = new searchGame().searchBarre();
    }
    arrowBack.addEventListener('click', () => {
        searchShow()
        main.style.marginTop = '15%';
    })

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
        <p>retour</p>
        </div>
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
            <button><i class="fa-solid fa-user-plus"></i></button>
        </article>
        `
    }

}