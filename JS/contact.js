
const contacts = () => {

    const btnContact = document.querySelector('.contact');
    const IDUSER = JSON.parse(localStorage.getItem('SPARKCONCT')).idUser
    btnContact?.addEventListener('click', () => {
        modal.style.display = 'initial';
        const cnn = new XMLHttpRequest();
        cnn.onreadystatechange = () => {
            if (cnn.readyState === 4 && cnn.status === 200) {
                //console.log(JSON.parse(cnn.response));
                createHTLM();
                createListeAmis(JSON.parse(cnn.response));
            }
        }
        cnn.open('POST', './BackEnd/PHP/index.php?redirAll=contact');
        cnn.send(JSON.stringify({ idUser: IDUSER }));
    })
}

const createHTLM = () => {

    modal.innerHTML = new Contact().createHTLM()
    CSSmodalContact();
    closeModalContact();
}

const validInvitation = () => {
    const IDUSER1 = JSON.parse(localStorage.getItem('SPARKCONCT'));

    const btnRefus = document.querySelector('.refus');
    const btnAccept = document.querySelector('.accept');

    btnRefus?.addEventListener('click', () => { reqRefus() })
    btnAccept?.addEventListener('click', () => { reqValid() })


    const reqValid = () => {
        const nameUSER2 = document.querySelector('.nameContactUser').innerText
        const cnn = new XMLHttpRequest;
        cnn.onreadystatechange = () => {
            if (cnn.readyState === 4 && cnn.status === 200) {
                //console.log(JSON.parse(cnn.response))
            }
        }
        cnn.open('POST', './BackEnd/PHP/index.php?redirAll=aceeptInvite')
        cnn.send(JSON.stringify({ IDUSER1: IDUSER1, nameUSER2: nameUSER2 }))
    }

    const reqRefus = () => {
        const cnn = new XMLHttpRequest;
        cnn.onreadystatechange = () => {
            if (cnn.readyState === 4 && cnn.status === 200) {

            }
        }
        cnn.open();
        cnn.send();
    }
}

const closeModalContact = () => {
    const cross = document.querySelector('.back');
    cross.style.color = 'white'

    cross.addEventListener('click', () => {
        cross.style.color = 'black'
        modal.style.display = 'none'
    })
}

const createListeAmis = (rep) => {
    const divContentContact = document.querySelector('.content-contact');
    let html = null;
    rep.forEach(elmt => {
        if (html == null) {
            if (elmt.invitation == 'attente') {
                html = new Contact(elmt).createContact();
            } else if (elmt.invitation == 'acces') {
                //html = new Contact(elmt).createContactAcceptInvite();
            }
        } else {
            if (elmt.invitation == 'attente') {
                html += new Contact(elmt).createContact();
            } else if (elmt.invitation == 'acces') {
                html += new Contact(elmt).createContactAcceptInvite();
            }
        }
    });
    divContentContact.innerHTML = html;
}

const CSSmodalContact = () => {
    const divModal = document.getElementById('modal');
    const divContentContact = document.querySelector('.content-contact');

    divModal.style.background = '#3c3939';
    divContentContact.style.width = '25%';
    divContentContact.style.height = '95%'; 
    divContentContact.style.display = 'flex';
    divContentContact.style.flexDirection = 'column';
    divContentContact.style.alignItems = 'center';
}

class Contact {
    constructor(data) {
        this.pseudo = data?.PSEUDO;
        this.invitation = data?.invitation;
        this.idUser = data?.IDUSER;
    }

    createHTLM() {
        return `
        <p class="back"><i class="fa-sharp fa-solid fa-xmark"></i></p>
            <section id="section-panel-user">
                <div class="content-contact">
                    
                </div>

                <div class="content-message">

                </div>

                <article class="card-user">
                    
                </article>
            <section>
        `
    }

    createContact() {
        if (this.invitation == 'attente') {
            return `
            <div class="contact" >
                <p class="nameContactUser">${this.pseudo}</p>
                <div class="msg">
                    <button class="refus">Refuser</button>
                    <button class="accept">Accepter</button>
                </div>
            </div>
        `;
        } else {

        }
    }

    createContactAcceptInvite() {
        if (this.invitation == 'acces') {
            return `
            <div class="contact" >
                <p class="nameContactUser">${this.pseudo}</p>
                <div class="userMsg">
                <i class="fa-solid fa-message"></i>
                <hr>
                <p class="lastMsg">
                    Aucun Message reçu
                </p>
                </div>
            </div>
            `
        }
    }

    createContactAttentRes() {
        if (this.invitation == 'attente') {
            return `
            <div class="contact" >
                <p class="nameContactUser">${this.pseudo}</p>
                <div class="userMsg">
                <i class="fa-solid fa-message"></i>
                <hr>
                <p class="lastMsg">
                    Aucun Message reçu
                </p>
                <hr>
                </div>
                <div class="msg">
                    <button class="refus">Refuser</button>
                    <button class="accept">Accepter</button>
                </div>
                <input type="hidden" value="${this.idUser}"/>
            </div>
        `;
        }
    }
}
contacts();