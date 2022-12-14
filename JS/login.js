const inpEmail = document.querySelector('.Email')
const contentInp = document.querySelector('.content-input')
const contentConnect = document.querySelector('.content-connect');
const header = document.querySelector('header');
const Alert = document.getElementById('Alert');

let dataLocal = {
    acces: { acces: '', page: '' },
    Mail: '',
    DisplayMode: '',
    UserPseudo:'',
}

// afficher formulaire de connexion
inpEmail.addEventListener('click', () => {
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




        req = new XMLHttpRequest();
        req.open('POST', './BackEnd/PHP/index.php?redirAll=Uconnect', true);
        req.send(JSON.stringify(userData))

        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {
                if (JSON.parse(req.response).refus == "acces-denied") {

                    Alert.style.display = 'flex';
                    Alert.style.background = '#ff3939';
                    Alert.innerHTML = new MessageAlert().createMsgAlert()
                    setTimeout(() => {
                        Alert.innerHTML = '';
                        Alert.style.display = 'none';
                    }, 4500);

                } else if (JSON.parse(req.response).acces == "acces-accepter") {
                    const divLogin = document.querySelector('.login')
                    divLogin.style.opacity = 0;
                    contentConnect.innerHTML = '';
                    header.style.filter = '';
                    dataLocal.acces.acces = 'acces';
                    dataLocal.Mail = userMail.value;
                    localStorage.setItem('SPARKCONCT', JSON.stringify(dataLocal))
                    MAIL = JSON.parse(localStorage.getItem('SPARKCONCT')).Mail
                    NavBarre.style.display = 'flex'
                    PageUser();
                    console.log()
                    return dataLocal
                } else {
                    ''
                }

            } else { '' }
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
        console.log(newUserSpark);
        newUserSpark.PSEUDO = userPseudo.value;
        newUserSpark.EMAIL = userMail.value;
        newUserSpark.MDP = userMDP.value;
        newUserSpark.MDP2 = userMDP2.value;
        /* let req = new XMLHttpRequest();
 
         req.onreadystatechange = function () {
             console.log(this)
             req.readyState === 4 && req.status === 200 ?
                 this.response : ''
         }
 
         req.open('POST', './BackEnd/PHP/index.php?redirAll=Unewuser', true);
         req.send(JSON.stringify(newUserSpark))
         */
        fetch(`./BackEnd/PHP/index.php?redirAll=Unewuser`, {
            method: 'POST',
            body: JSON.stringify(newUserSpark),
        })
            .then(res => res.ok ? res.json() : '')
            .then(data => {
                if (data.ok && data.refus != 'acces' || data.refus == 'acces-denied') {
                    Alert.style.display = 'flex';
                    Alert.style.background = '#ff3939';
                    Alert.innerHTML = new MessageAlert().createMsgAlert()
                    console.log(data)
                    setTimeout(() => {
                        Alert.innerHTML = '';
                        Alert.style.display = 'none';
                    }, 4500);
                }
            });
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
                        <input type="button" class="unsubmit" value="VISITEUR">
                        <input type="button" class="submit" value="CONNEXION">
                    </div>
                    </form>

                    <a href="#" class="sign-up">Je n'est pas de Compte</a>
            </div> `
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
                    <input id="MDP2" type="password" placeholder="Comfimer Mot de passe">
                    </label>


                    <div>
                        <input type="button" class="unsubmit" value="VISITEUR">
                        <input type="button" class="submit" value="INSCRIPTION">
                    </div>
                    </form>

                    <a href="#" class="sign-in">Se Connecter</a>
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
            <p>une erreur est survenue !</p>
        </div>
        `;
    }
}