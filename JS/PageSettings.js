import { fullscreen } from "./PageUser";
import { dataLocal } from "./login";

const btnSettings = document.querySelector('.btnSettings');
const modal = document.getElementById('modal');


btnSettings.addEventListener('click', () => {
    createPage();
})

const CSSmodalSettings = () => {
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = '#e0e0e0'
}

const PageSettings = () => {
    crossBack();
    deconnect();
    fullscreen();
}

const deconnect = () => {
    const disconnect = document.querySelector('.deconnect');
    disconnect?.addEventListener('click', () => {
        dataLocal.Mail = "";
        dataLocal.acces.acces = "";
        localStorage.setItem('SPARKCONCT', JSON.stringify(dataLocal));
        location.reload()
    })
}

const crossBack = () => {
    const back = document.querySelector('.back');
    back?.addEventListener('click', () => {
        modal.style.display = 'none';
    })
}
const createPage = () => {
    modal.style.display = 'initial';
    modal.innerHTML = new PageSetting().createPage();
    CSSmodalSettings();
    crossBack();
    PageSettings();
}

class PageSetting {
    constructor() {

    }

    createPage() {
        return `
            <p class="back"><i class="fa-sharp fa-solid fa-xmark"></i></p>
            <div class="PageSettings">
            <div class="deconnect">
                <i class="fa-solid fa-right-to-bracket"></i>
                <p>
                    <span>Se déconnecter de:</span> 
                    ${JSON.parse(localStorage.getItem('SPARKCONCT')).Mail}
                </p>
            </div>
            <div class="ERC">
            <i class="fa-solid fa-maximize"></i>
            <p>Mettre en pleine écran</p>
            <div class="checked">
                <div></div>
            </div>
            </div
            </div>
        `
    }
}