

const btnNewCardAddUser = () => {
    const btnEllipsis = document.querySelectorAll('.addUserFriends');
    const sectionAddUserFriends = document.getElementById('addUserFriends');
    let IDADDUSER = null ;
    const IDUSER = JSON.parse(localStorage.getItem('SPARKCONCT'));
    
    btnEllipsis.forEach( btnAddUser => {
    btnAddUser.addEventListener('click', () => {
       
       if(sectionAddUserFriends.style.display != 'flex'){
           sectionAddUserFriends.style.display = 'flex';
            sectionAddUserFriends.style.left = '78%';
            const idUserInfo = btnAddUser.parentElement.querySelector('#infoAddUser').value;
            IDADDUSER = idUserInfo;
            const req = new XMLHttpRequest();
            req.open('POST','./BackEnd/PHP/index.php?redirAll=infoAddUserFriends');
            req.send(JSON.stringify({idUser : idUserInfo }));
            req.onreadystatechange = () =>{
                if(req.readyState == 4 && req.status == 200){
                    //new AddUserFriends(JSON.parse(req.response)).createHTML();
                    sectionAddUserFriends.innerHTML = new AddUserFriends(JSON.parse(req.response)).infoAddUser();
                    addFriends(idUserInfo);
                    closeSectionAddFriends();
                }
            }
            
       }else{
        const idUserInfo = btnAddUser.parentElement.querySelector('#infoAddUser').value;
        sectionAddUserFriends.style.left = '101%';
        const req = new XMLHttpRequest();
        req.open('POST','./BackEnd/PHP/index.php?redirAll=infoAddUserFriends');
        req.send(JSON.stringify({idUser : idUserInfo }));
        req.onreadystatechange = () =>{
            if(req.readyState == 4 && req.status == 200){
                //new AddUserFriends(JSON.parse(req.response)).createHTML();
                sectionAddUserFriends.innerHTML = new AddUserFriends(JSON.parse(req.response)).infoAddUser();
                addFriends(idUserInfo);
                closeSectionAddFriends();
                setTimeout(()=>{sectionAddUserFriends.style.left = '78%';},440);
            }
        }
       }


    });
        
    })
    const addFriends = (params) =>{
        const btnAddUser = document.querySelector('.btnAddUser');
        btnAddUser.addEventListener('click', () => {
            const req = new XMLHttpRequest();
            req.open('POST','./BackEnd/PHP/index.php?redirAll=addFriends');
            req.send(JSON.stringify({USER1: IDUSER.idUser, USER2: params}))
            req.onreadystatechange = () => {
                if(req.readyState == 4 && req.status == 200){
                    const response = JSON.parse(req.response).acces;
                    response == "succes" ? btnAddUser.value = "Attente" : "";
                }
            }
        })
    }

    const closeSectionAddFriends = () => {
        const btnClose = document.querySelector('.btnCloseSection');
        btnClose.addEventListener('click', () => {
            const sectionAddUserFriends = document.getElementById('addUserFriends');
            sectionAddUserFriends.style.left = '102%';
            sectionAddUserFriends.style.flex = 'none';
    
        })

    }
}

const userNotifFriends = (tab) => {
    const notifAlert = document.querySelector('.notifFriends');
    if(tab){
       let i = 0;
        setInterval(() => {
            i < tab.length? notifAlert.innerHTML = new AddUserFriends().createNotif(tab[i].PSEUDO): notifAlert.innerHTML = ''
            i++;
        },1500); 
        return
    }
    else{
        return
    }
}



class AddUserFriends {

    constructor(data){
        this.AllGame = data;
    }

    infoAddUser(){
        return `
                <article>
                    <div class="art-content">
                        <h3>Ces Jeux</h3>
                        <div class="game-content">
                            ${this.createHTML()}
                        </div>
                    </div>

                    <div class="btn-content">
                        <input class="btnAddUser" type="button" value="Ajouter" />
                        <input class="btnCloseSection" type="button" value="Fermer" />
                    </div>
                </article>
        `;
    }

    createHTML(){
        let ShowGame = '';
        this.AllGame.forEach( game => {
            ShowGame += `<div class="useGame" style="background-image: url(${game.imgGame})">
                           <span>${game.nameGame}</span>
                        </div>`
        })
        return ShowGame
    }

    createNotif(params){
        return`
        <div id="notif-addUser" class="showME">
            <p>l'utilisateur ${params? params : '????'} vous à ajouter en ami</p>
            <i class="fa-solid fa-user-plus"></i>
        </div>
        `
    }
}


export {btnNewCardAddUser , userNotifFriends};