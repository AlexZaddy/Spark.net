import { game, infiniteScroll } from "./PageGame";
import { AllInfoUser } from "./PageUser";


const reqActu = () => {
let req = new XMLHttpRequest();
req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200){
         if(req.response){
            const tabRes = JSON.parse(req.response)
            const resultTab = tabRes.sort()

            initActu(resultTab);
         }
    }else{
        ''
    }
}
req.open('POST', './BackEnd/PHP/index.php?redirAll=actualite')
req.send(JSON.stringify({Game : game , Offset : 0 }))
}


const initActu = (response) => {
    const contentActu = document.querySelector('.listeNews');
    //contentActu.innerHTML = ''
    response?.forEach( actu => {
        contentActu.innerHTML += new Actualite(actu).createDivNexActu();
    });

    contentActu.innerHTML += `<div class="loading-actu"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;
    likeActu();
    commente()
    infiniteScroll();
}




const likeActu = () => {
   const likeActus = document.querySelectorAll('.like');

        likeActus.forEach( btnLike => {
            let status = null;
            btnLike.addEventListener('click', () => {
                if(status == null){
                    status = 'like';
                    let numberLike =  parseInt(btnLike.childNodes[1].innerText) + 1
                    btnLike.childNodes[1].innerText = numberLike
                }else{
                    status = null
                    let numberDisLike = parseInt(btnLike.childNodes[1].innerText) - 1
                    btnLike.childNodes[1].innerText = numberDisLike
                }
            })
        })

    const dislike = document.querySelectorAll('.dislike');

        dislike.forEach( btnLike => {
            let status = null;
            btnLike.addEventListener('click', ()=>{
                if(status == null){
                    status = 'like';
                    let numberLike =  parseInt(btnLike.childNodes[1].innerText) + 1
                    btnLike.childNodes[1].innerText = numberLike
                }else{
                    status = null
                    let numberLike = parseInt(btnLike.childNodes[1].innerText) - 1
                    btnLike.childNodes[1].innerText = numberLike
                }
            })
        })

}

const recupCom = (idActu, newDiv) => {
   let Send = {
        IDActu : idActu,
        }

    const req = new XMLHttpRequest();
    req.onreadystatechange = async() => {
        if (req.readyState === 4 && req.status === 200){
    
            await loadingCom(JSON.parse(req.response), newDiv);
        }
    }
    req.open('POST','./BackEnd/PHP/index.php?redirAll=recupCom');
    req.send(JSON.stringify(Send));
}


const commente = async () => {
    const btnCommentAll = document.querySelectorAll('.commente');
    btnCommentAll.forEach( btnCom => { 
        let id = btnCom.parentElement.parentElement.querySelector('.hidden');
        let DIVCOM = btnCom.parentNode.parentNode.querySelector('.showComment');
        DIVCOM.style.display = 'none';
        DIVCOM.innerHTML = new Commentaire().commentaire();
        const divComment = DIVCOM.querySelector('.com');
        btnCom.addEventListener('click',() => {
            if(DIVCOM.style.display == 'none'){
            DIVCOM.style.display = ''
           // DIVCOM.innerHTML = new Commentaire().commentaire();
            envoyerCom();
            return divComment;
            }else{
                DIVCOM.style.display = 'none'; 
            }
    }) 
    const newDiv = divComment;
    recupCom(id.value,newDiv);
    })
}



const UserCom = async(messages , idActu) => {

    let All = {
        IDUser1: null,
        messages: null,
        date: null,
        IDActu : null,
    }

    All.IDUser1 = AllInfoUser.idUser;
    All.messages = messages;
    All.date = new Date().toLocaleDateString('fr')
    All.IDActu = idActu;
    
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {}
    req.open('POST','./BackEnd/PHP/index.php?redirAll=newCom');
    req.send(JSON.stringify(All));
    //console.log(response);
}

const loadingCom =  async(tab , div) => {
      const afficheLesCom = async() => {
          tab.forEach(elmt => {
          div.innerHTML += new Commentaire(elmt).showCom();
        })
        return div
    }
    afficheLesCom();
}

const envoyerCom = () => {
    const AllActu = document.querySelectorAll('.actualite');
    
    AllActu.forEach( actu => {
        const btnSend = actu.querySelector('.send');
        const hidden = actu.querySelector('.hidden');
        const SendCom = actu.querySelector('.SendCom');
        btnSend?.addEventListener('click', () => {
            SendCom.value != ''? UserCom(SendCom.value, hidden.value): console.log(SendCom.innerHTML);
           SendCom.value = '';

            //setTimeout( ()=>{ loadingCom(hidden.value,actu);recupCom(); },3000);
        })
    })
}

class Actualite {

    constructor(data){
        this.Actus = data?.newActu;
        this.Date = data?.dateActu;
        this.like = data?.like;
        this.dislike = data?.dislike;
        this.Type = data?.Type;
        this.pseudo = data?.PSEUDO;
        this.idActu = data?.idActu;
        this.idUser = data?.idUser;
    }


    createDivNexActu(){
        if(this.Type == 'spark'){
            return `
                <article class="actualite">
                <p class="contenu">${this.Actus}</p>
                <p class="date">${this.Date}</p>
                    <div>
                        <button class="like"><i class="fa-sharp fa-solid fa-thumbs-up"></i><span>${this.like}</span>J'aime</button>
                        <hr>
                        <button class="dislike"><i class="fa-sharp fa-solid fa-thumbs-down"></i><span>${this.dislike}</span>J'aime pas</button>
                    </div>
                </article>
            `
        }else if(this.Type == 'userActu'){
            return `
                <article class="actualite">
                    <aside>
                        <span>${this.pseudo}</span>
                        <i class="fa-solid fa-ellipsis addUserFriends"></i>
                        <input class="hidden" type="hidden" value="${this.idActu}">
                        <input id="infoAddUser" class="hidden" type="hidden" value="${this.idUser}">
                        </aside>
                        <hr class="separ">
                    <p class="contenu">${this.Actus}</p>
                    <p class="date">${this.Date}</p>
                <div class="cont-props">
                    <div id="likeDislike">
                        <button class="like"><i class="fa-sharp fa-solid fa-thumbs-up"></i><span>${this.like}</span>J'aime</button>
                        <hr>
                        <button class="dislike"><i class="fa-sharp fa-solid fa-thumbs-down"></i><span>${this.dislike}</span>J'aime pas</button>
                    </div>
                    <div class="commente">
                        <i class="fa-regular fa-comment"></i>
                        <p>commentaire</p>
                    </div>
                    <div>
                    <i class="fa-sharp fa-solid fa-share"></i>
                        <p>Share</p>
                    </div>
                </div>
                <hr class="separ">
                <div class="showComment">

                </div>
                </article>
            `
        }else{
            return `
            error...
            `
        }
    }
}

class Commentaire{

    constructor(data){
        this.name   = data?.PSEUDO;
        this.newCom = data?.comment;
        this.date   = data?.Date;
        this.idActu = data?.idActu;

    }

    commentaire(){
        return `
        <div class="content-com">
            <div class="newComment">
                <input class="SendCom" type="text" placeholder="Commente...">
                <button class="send"><i class="fa-regular fa-paper-plane"></i>Envoyer</button>
            </div>
            <div class="com">
                
            </div>
        </div>
        `;
    }

    showCom(){
        return `
            <div class="userCom">
                <span>${this.name}</span>
                <p>${this.newCom}</p>
                <span class="date">${this.date}</span>
            </div>
        `;
    }
}

export {reqActu , commente, initActu,Actualite, likeActu};