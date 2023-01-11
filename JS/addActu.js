

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

    removeModalActu()
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
            <h3>${USERINFO[0].PSEUDO}</h3>
            <hr class="separ">
                <textarea></textarea>
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