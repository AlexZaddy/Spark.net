import { game, infiniteScroll } from "./PageGame";

const btnNewCardAddUser = () => {
    const btnEllipsis = document.querySelectorAll('.addUserFriends');
    const sectionAddUserFriends = document.getElementById('addUserFriends');
    
    btnEllipsis.forEach( btnAddUser => {
    btnAddUser.addEventListener('click', () => {
       const idUserInfo = document.getElementById('infoAddUser').value;
       
       if(sectionAddUserFriends.style.display != 'flex'){
           sectionAddUserFriends.style.display = 'flex';
            sectionAddUserFriends.style.left = '78%';

            const req = new XMLHttpRequest();
            req.open('POST','./BackEnd/PHP/index.php?redirAll=infoAddUserFriends');
            req.send(JSON.stringify({idUser : idUserInfo }));
            req.onreadystatechange = () =>{
                if(req.readyState == 4 && req.status == 200){
                    //new AddUserFriends(JSON.parse(req.response)).createHTML();
                    sectionAddUserFriends.innerHTML = new AddUserFriends(JSON.parse(req.response)).infoAddUser();
                }
            }
            
       }else{
        sectionAddUserFriends.style.left = '101%';
        const req = new XMLHttpRequest();
        req.open('POST','./BackEnd/PHP/index.php?redirAll=infoAddUserFriends');
        req.send(JSON.stringify({idUser : idUserInfo }));
        req.onreadystatechange = () =>{
            if(req.readyState == 4 && req.status == 200){
                //new AddUserFriends(JSON.parse(req.response)).createHTML();
                sectionAddUserFriends.innerHTML = new AddUserFriends(JSON.parse(req.response)).infoAddUser();
                setTimeout(()=>{sectionAddUserFriends.style.left = '78%';},440);
            }
        }
       }
    });
        
    })
    
}
/*const test =  () => {
    btnNewCardAddUser();
    infiniteScroll();
}
*/


class AddUserFriends {

    constructor(data){
        this.AllGame = data;
    }

    infoAddUser(){
        return `
                <article>
                    <div>
                        <h3>Ces Jeux</h3>
                        <div>
                            ${this.createHTML()}
                        </div>
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
}


export {btnNewCardAddUser};