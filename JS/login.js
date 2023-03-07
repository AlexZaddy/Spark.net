import { PageUser } from "./../PageUser";
import { initDecouvrir } from "./decouvrir";
initDecouvrir();

const inpEmail = document.querySelector('.Email')
const contentInp = document.querySelector('.content-input')
const contentConnect = document.querySelector('.content-connect');
const header = document.querySelector('header');
const Alert = document.getElementById('Alert');

let dataLocal = {
    acces: { acces: '', page: '' },
    Mail: JSON.parse(localStorage.getItem('SPARKCONCT'))?.Mail,
    DisplayMode: '',
    UserPseudo:'',
}

// afficher formulaire de connexion
inpEmail?.addEventListener('click', () => {
    header.style.filter = 'blur(1rem)';
    contentInp.style.zIndex = '0';
    contentConnect.innerHTML = new Login().createLogin()
    arrowBack()
    pageSignUp()
    connectUser()

})

//retour home pages 
const arrowBack = () => {
    const arrow = document.querySelector('.arrow')
    const divLogin = document.querySelector('.login')

    arrow?.addEventListener('click', () => {
        divLogin.style.opacity = 0;
        contentConnect.innerHTML = '';
        header.style.filter = '';

    })
}


//changer de  fomulaire (fomulaire d'inscription)
const pageSignUp = () => {
    const signUp = document.querySelector('.sign-up');

    signUp?.addEventListener('click', () => {
        contentConnect.innerHTML = new Login().createSignUp()
        arrowBack()
        pageSignIn()
        newUserSignUp()

    })

}

//changer de formulaire (formulaire connexion)
const pageSignIn = () => {
    const signIn = document.querySelector('.sign-in');
    signIn?.addEventListener('click', () => {
        contentConnect.innerHTML = new Login().createLogin()
        arrowBack();
        pageSignUp();
        connectUser();
        userConnectSpark();
    })
}

const alertPageLogRefus = () => {

    Alert.style.display = 'flex';
    Alert.style.background = '#ff3939';
    Alert.innerHTML = new MessageAlert().createMsgAlert()
    setTimeout(() => {
        Alert.innerHTML = '';
        Alert.style.display = 'none';
    }, 4500);
}


// se connecter a son compte
const connectUser = () => {
    const userMail = document.getElementById('MAIL');
    const userMDP = document.getElementById('MDP');
    const submit = document.querySelector('.submit');
    const NavBarre = document.getElementById('navigation');


    let userData = {

        EMAIL: userMail.value,
        MDP: userMDP.value,
    }

    userMail.addEventListener('keyup', () => { userData.EMAIL = userMail.value });
    userMDP.addEventListener('keyup', () => { userData.MDP = userMDP.value });

    submit.addEventListener('click', () => {
        userData.EMAIL = userMail.value;
        userData.MDP = userMDP.value;




        const req = new XMLHttpRequest();
        req.open('POST', './BackEnd/PHP/index.php?redirAll=Uconnect', true);
        req.send(JSON.stringify(userData))

        req.onreadystatechange = function () {
    
            if (req.readyState == 4 && req.status == 200) {
                if (JSON.parse(req.response).acces == "acces-accepter") {
                    const divLogin = document.querySelector('.login')
                    divLogin.style.opacity = 0;
                    contentConnect.innerHTML = '';
                    header.style.filter = '';
                    dataLocal.acces.acces = 'acces';
                    dataLocal.Mail = userMail.value;
                    localStorage.setItem('SPARKCONCT', JSON.stringify(dataLocal))
                    const MAIL = JSON.parse(localStorage.getItem('SPARKCONCT')).Mail
                    NavBarre.style.display = 'flex';
                    PageUser();
                    return dataLocal

                } else {
                    alertPageLogRefus();
                } 

            } else {
                console.log('err: req non-init');
            }
        }


        /*.then(res => {
            if (res.ok && res.acces == 'acces-accepter') {
                contentHex.style.filter = '';
                header.style.filter = '';
                contentInp.style.zIndex = '';
                contentConnect.innerHTML = '';
                console.log(res.acces);
                // PageUser();
            } else {
                console.log(res.json())
            }
        })*/

    })

}


const newUserSignUp = () => {
    const userPseudo = document.getElementById('PSEUDO');
    const userMail = document.getElementById('MAIL');
    const userMDP = document.getElementById('MDP');
    const userMDP2 = document.getElementById('MDP2');
    const submit = document.querySelector('.submit')

    let newUserSpark = {
        PSEUDO: '',
        EMAIL: '',
        MDP: '',
        MDP2: '',
    }


    userPseudo.addEventListener('keyup', () => { newUserSpark.PSEUDO = userPseudo.value });
    userMail.addEventListener('keyup', () => { newUserSpark.EMAIL = userMail.value });
    userMDP.addEventListener('keyup', () => { newUserSpark.MDP = userMDP.value });
    userMDP2.addEventListener('keyup', () => { newUserSpark.MDP2 = userMDP2.value });
    submit.addEventListener('click', () => {
      
        newUserSpark.PSEUDO = userPseudo.value;
        newUserSpark.EMAIL = userMail.value;
        newUserSpark.MDP = userMDP.value;
        newUserSpark.MDP2 = userMDP2.value;
        
        
        if(newUserSpark.MDP === newUserSpark.MDP2 ){
        fetch(`./BackEnd/PHP/index.php?redirAll=Unewuser`, {
            method: 'POST',
            body: JSON.stringify(newUserSpark),
        })
            .then(res => res.ok ? res.json() : '')
            .then(data => {
                if (data.ok && data.refus != 'acces' || data.refus == 'acces-denied' || data.err) {
                    Alert.style.display = 'flex';
                    Alert.style.background = '#ff3939';
                    Alert.innerHTML = new MessageAlert().createMsgAlert();
                    setTimeout(() => {
                        Alert.innerHTML = '';
                        Alert.style.display = 'none';
                    }, 
                    4500);
                }else{
                    Alert.style.display = 'flex';
                    Alert.style.background = '#68ff00';
                    Alert.innerHTML = new MessageAlert().createMsgAlertsucces()
                    setTimeout(()=>{
                        Alert.innerHTML = '';
                        Alert.style.display = 'none';
                    },4500)
                }
            });
        }else{
            userMDP.style.border = 'red 1px solid';
            userMDP2.style.border = 'red 1px solid';
        }
    });
}



class Login {
    constructor(data) {

    }

    createLogin() {

        return ` <div class="login">
                    <div>
                        <img class="arrow" src="./CSS/ICON/arrow-left-solid.svg" />
                        <h2>CONNEXION</h2>
                    </div>
                    <form action="">
                    <label for="mail">
                        <input id="MAIL" type="text" placeholder="Email">
                    </label>

                    <label for="password">
                        <input id="MDP" type="password" placeholder="Mot de passe">
                    </label>

                    <div>
                        <input type="button" class="submit" value="CONNEXION">
                    </div>
                    </form>

                    <button class="btn-newU">
                            <a href="#" class="sign-up">Cree  Un  Compte</a>
                    </button>
            </div> 
            `
    }


    createSignUp() {

        return ` <div class="login">
                    <div>
                        <img class="arrow" src="./CSS/ICON/arrow-left-solid.svg" />
                        <h2>INSCRIPTION</h2>
                    </div>
                    <form action="" method="post">
                    <label for="pseudo">
                        <input id="PSEUDO" type="text" placeholder="Pseudo">
                    </label>

                    <label for="mail">
                        <input id="MAIL" type="text" placeholder="Email">
                    </label>

                    <label for="password">
                        <input id="MDP" type="password" placeholder="Mot de passe">
                    </label>

                    <label for="password">
                    <input id="MDP2" type="password" placeholder="Confirmer Mot de passe">
                    </label>


                    <div>
                        <button class="sign-in">Se Connecter</button>
                        <input type="button" class="submit" value="INSCRIPTION">
                    </div>
                    </form>

                    
                </div> `

    }

}

class MessageAlert {
    constructor(data) {
        //this.donne = data.donne;
    }


    createMsgAlert() {
        return `
        <div class="msg-Alert">
            <p>Une Erreur est survenue lors de la connexion </p>
        </div>
        `;
    }

    createMsgAlertsucces(){

        return`
        <div class="msg-Alert succes">
        <p>Votre compte a bien été enregistrer !</p>
    </div>
        `
    }
}


export {dataLocal}