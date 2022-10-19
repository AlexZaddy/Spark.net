const inpEmail = document.querySelector('.Email')
const contentInp = document.querySelector('.content-input')
const contentConnect = document.querySelector('.content-connect')




inpEmail.addEventListener('click', () => {
    contentInp.style.zIndex = '0';
    contentConnect.innerHTML = new Login().createLogin()
    arrowBack()

})

const arrowBack = () => {
    const arrow = document.querySelector('.arrow')
    const divLogin = document.querySelector('.login')

    arrow?.addEventListener('click', () => {
        divLogin.style.opacity = 0;
        contentConnect.innerHTML = ''

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
                        <input type="button" class="submit" value="CONNEXION">
                    </div>
                    </form>
            </div> `
    }
}