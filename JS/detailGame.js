//fonction calcule de moyenne 
import { dataLocal } from "./login";
import { btnNewAddActu} from "./addActu";
import { commente } from "./actualiter";
import { abonnement ,backArrow } from "./PageGame";
import { game } from "./PageGame";


const BODY = document.querySelector('body');
const calculeMoyenne = (Tab) => {
    let addition = null;
    Tab.forEach( nombre => {
         addition = addition + nombre;
    })
    return Math.round(addition/tabResponseGame.length)
}

const addNote = () => {
    const divGameMoyenne = document.querySelector('.Game-Moyenne');
    divGameMoyenne.addEventListener('mouseover', () => {
        BODY.innerHTML += new DetailGame().createDivNoteUser();
        newNoteUser();
        submitNoteUser();
        btnNewAddActu();
        commente();
        abonnement();
        backArrow();
        reqMoyenne();
    })

    const newNoteUser = () => {
    const inpAddNote = document.getElementById('note-range');
    inpAddNote?.addEventListener('input', () => {
       const NoteUser = document.getElementById('NoteUser');
        NoteUser.innerHTML = `${inpAddNote.value}/5`;
        });
    }

    const reqMoyenne = () => {
        const moyenne = document.getElementById('moyenneGame-note');
        const cnn = new XMLHttpRequest();
        cnn.open('POST', './BackEnd/PHP/index.php?redirAll=GameMoyenne', true);
        cnn.send(JSON.stringify({nameGame : game}));
        cnn.onreadystatechange = () => {
            if(cnn.readyState === 4 && cnn.status === 200){
                moyenne.innerHTML = JSON.parse(cnn.response).response
            }

        }
    }


    const submitNoteUser = () => {
        const btnSubmit = document.getElementById('submitNote');
        const inpAddNote = document.getElementById('note-range');
        const UserAddNote = {
            nameUser : dataLocal.UserPseudo,
            noteUser : inpAddNote.value,
            nameGame : game,
    };

        btnSubmit.addEventListener('click', () => {
            const cnn = new XMLHttpRequest();
            cnn.open('POST', './BackEnd/PHP/index.php?redirAll=addNoteUser', true);
            UserAddNote.noteUser = inpAddNote.value;  
            console.log(UserAddNote);
            cnn.send(JSON.stringify(UserAddNote));
        })
    }

}

const DivMoyenneGame = async (div) => {
    div.innerHTML += new DetailGame().createDivMoyenne();
    setTimeout(()=>{
        addNote();
    },550)
}



class DetailGame {

    constructor(data){
    
    }

    createDivMoyenne(){
        return`
            <div class="Game-Moyenne">
                <div>
                   <svg viewBox="0 0 100 100 ">
                        <circle id="moyenneGame-circle" cx="45" cy="45" r="35"></circle>
                    </svg>
                </div>
                <span id="moyenneGame-note"></span>
            </div>
        `;
    }

    createDivNoteUser(){
        return `
            <div class="addNoteUser">
                <p id="NoteUser">0/5</p>
                <i id="submitNote" class="fa-solid fa-check"></i>
            </div>

            <div class="addNote">
            <h3>Note</h3>
            <input id="note-range" type="range" min="0" max="5" value="">
        </div>
        `;
    }
}
DivMoyenneGame(BODY);
export { calculeMoyenne , DetailGame, DivMoyenneGame , addNote};