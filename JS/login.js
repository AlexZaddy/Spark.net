const inpEmail = document.querySelector('.Email')
const contentInp = document.querySelector('.content-input')
const contentConnect = document.querySelector('.content-connect')
let contentHex = document.querySelector('.content-hex');
const header = document.querySelector('header');



// afficher formulaire de connexion
inpEmail.addEventListener('click', () => {
    contentHex.style.filter = 'blur(1rem)';
    header.style.filter = 'blur(1rem)';
    contentInp.style.zIndex = '0';
    contentConnect.innerHTML = new Login().createLogin()
    arrowBack()
    pageSignUp()
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

    })

}

//changer de formulaire (formulaire connexion)
const pageSignIn = () => {
    const signIn = document.querySelector('.sign-in');

    signIn?.addEventListener('click', () => {
        contentConnect.innerHTML = new Login().createLogin()
        arrowBack();
        pageSignUp();
    })
}


class Login {
    constructor(data) {

    }

    createLogin() {

        return ` <div class="login">
                    <div>
                        <img class="arrow" src="../CSS/ICON/arrow-left-solid.svg" />
                        <h2>CONNEXION</h2>
                    </div>
                    <form action="" method="post">
                    <label for="mail">
                        <input type="text" placeholder="Email">
                    </label>

                    <label for="password">
                        <input type="password" placeholder="Mot de passe">
                    </label>

                    <div>
                        <input type="button" class="unsubmit" value="VISITEUR">
                        <input type="button" class="submit" value="INSCRIPTION">
                    </div>
                    </form>

                    <a href="#" class="sign-up">Je n'est pas de Compte</a>
            </div> `
    }


    createSignUp() {

        return ` <div class="login">
                    <div>
                        <img class="arrow" src="../CSS/ICON/arrow-left-solid.svg" />
                        <h2>INSCRIPTION</h2>
                    </div>
                    <form action="" method="post">
                    <label for="mail">
                        <input type="text" placeholder="Email">
                    </label>

                    <label for="password">
                        <input type="password" placeholder="Mot de passe">
                    </label>

                    <label for="password">
                    <input type="password" placeholder="Comfimer Mot de passe">
                    </label>


                    <div>
                        <input type="button" class="unsubmit" value="VISITEUR">
                        <input type="button" class="submit" value="CONNEXION">
                    </div>
                    </form>

                    <a href="#" class="sign-in">Se Connecter</a>
                </div> `

    }

}