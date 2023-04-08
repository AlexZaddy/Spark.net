import { dataLocal } from "./login";
import { commente , initActu, reqActu} from "./actualiter";
import { abonnement ,backArrow , game} from "./PageGame";
import { addNote } from "./detailGame";
import { AllInfoUser } from "./PageUser";


const newAddActu = () => {
    const BODY = document.querySelector('body');
    BODY.innerHTML += new AddActu().BtnAddActu(); 
    
}

const btnNewAddActu = () => {
    const btnAddActu = document.getElementById('addActu');
    btnAddActu.addEventListener('click',()=>{
        createModalAddActu()
    })
}


const createModalAddActu = () => {
    const body = document.querySelector('body');
    body.innerHTML += new ModalNewAddActu().createModal();

    const cssModalNewActu = document.getElementById('ModalNewActu');
    const cssContentModal = document.querySelector('.content-Modal');
    const Main = document.querySelector('main');
    Main.style.filter = 'blur(1rem) !important';
    cssContentModal.style.width = '100%';
    cssContentModal.style.height = '100vh';
    cssContentModal.style.position = 'fixed';
    cssContentModal.style.top = '0';
    cssContentModal.style.backgroundColor = '#0e0e0ee6';
    cssContentModal.style.zIndex = '3';
    cssModalNewActu.style.position = 'fixed';
    cssModalNewActu.style.width = '55vh';
    cssModalNewActu.style.backgroundColor = '#1b1818';
    cssModalNewActu.style.maxHeight = '45vh';
    cssModalNewActu.style.display = 'flex';
    cssModalNewActu.style.flexDirection = 'column';
    cssModalNewActu.style.left = '35%';
    cssModalNewActu.style.color = 'white';
    cssModalNewActu.style.padding = '1%';
    cssModalNewActu.style.borderRadius = '5px';
    cssModalNewActu.style.top = '25%';
    cssModalNewActu.style.zIndex = '4';
    cssModalNewActu.style.boxShadow = ' black 0px 0px 4px 2px';

    removeModalActu();
    sendActu();
}

const removeModalActu = () => {
    const cancel = document.querySelector('.cancel');
    const cssContentModal = document.querySelector('.content-Modal');

    cancel.addEventListener('click', () => {
        cssContentModal.remove();
    })
    btnNewAddActu();
    commente();
    abonnement();
    backArrow();
    addNote();
}


const sendActu = async () => {
    const comACTU = document.getElementById('comACTU');
    const send = document.querySelector('.SendAddActu');
    const cssContentModal = document.querySelector('.content-Modal');

    send.addEventListener('click',() => {

        reqAddActu(comACTU.value);
        cssContentModal.remove();
    })
    
     refreshActu()
}

const reqAddActu = async (comACTU) => {
    const date = new Date().toLocaleDateString('fr')
    const req = new XMLHttpRequest();
    req.open('POST', './BackEnd/PHP/index.php?redirAll=addActu');
    req.send(JSON.stringify({NAMEGAME:game , USERNAME :AllInfoUser.UserPseudo , comACTU : comACTU ,
    DATE : date}));
    req.onreadystatechange = async () => {
        req.readyState === 4 && req.response != "" ?  refreshActu() : ''
    }
    
}

const refreshActu = async () => {
        reqActu();
        initActu();
}

class AddActu {

    constructor(){

    }

    BtnAddActu(){
        return`
        <div id="addActu">
            <i class="fa-solid fa-plus"></i>
        </div>
        `
    }
}

class ModalNewAddActu {
    constructor(){

    }

    createModal(){
        return`
        <div class="content-Modal">
            <div id="ModalNewActu">
            <h3>${AllInfoUser.UserPseudo}</h3>
            <hr class="separ">
                <textarea id="comACTU"></textarea>
                <hr class="separ">
                <div>
                    <button class="cancel">Annuler</button>
                    <button class="SendAddActu">Envoyer</button>
                </div>
            </div>
        </div>
        `
    }
}

export {newAddActu , btnNewAddActu, sendActu ,reqAddActu, createModalAddActu };