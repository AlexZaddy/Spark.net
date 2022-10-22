const inpEmail = document.querySelector('.Email')
const contentInp = document.querySelector('.content-input')
const contentConnect = document.querySelector('.content-connect')
let contentHex = document.querySelector('.content-hex');
const header = document.querySelector('header');
const Alert = document.getElementById('Alert');



// afficher formulaire de connexion
inpEmail.addEventListener('click', () => {
    contentHex.style.filter = 'blur(1rem)';
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
        contentHex.style.filter = '';
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
    })
}

// se connecter a son compte
const connectUser = () => {
    const userMail = document.getElementById('MAIL');
    const userMDP = document.getElementById('MDP');
    const submit = document.querySelector('.submit')

    let userData = {

        EMAIL: userMail.value,
        MDP: userMDP.value,
    }

    userMail.addEventListener('keyup', () => { userData.EMAIL = userMail.value })
    userMDP.addEventListener('keyup', () => { userData.MDP = userMDP.value })
    submit.addEventListener('click', () => { console.log(userData) })

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
        fetch(`./BackEnd/PHP/index.php?redirAll=Unewuser`, {
            method: 'POST',
            body: JSON.stringify(newUserSpark),
        })
            .then(res => res.ok ? res.json() : '')
            .then(data => {
                if (data.ok && data.refus != 'acces' || data.refus == 'acces-denied') {
                    Alert.style.display = 'flex';
                    Alert.style.background = '#ff3939'
                    Alert.innerHTML = new MessageAlert().createMsgAlert()
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