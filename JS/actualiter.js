
const reqActu = () => {
let req = new XMLHttpRequest();
req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200){
         if(req.response){
            console.log(JSON.parse(req.response))
            initActu(JSON.parse(req.response))
         }
    }else{
        ''
    }
}
req.open('POST', './BackEnd/PHP/index.php?redirAll=actualite')
req.send(JSON.stringify({Game : NamePageGame}))
}


const initActu = (response) => {
    const contentActu = document.querySelector('.listeNews');
    response.forEach( actu => {
        contentActu.innerHTML += new Actualite(actu).createDivNexActu();
    });
}









class Actualite {

    constructor(data){
        this.Actus = data?.newActu;
        this.Date = data?.dateActu;
        this.like = data?.like;
        this.dislike = data?.dislike;
    }


    createDivNexActu(){

        return `
            <article class="actualite">
            <p class="contenu">${this.Actus}</p>
            <p class="date">${this.Date}</p>
                <div>
                    <button><i class="fa-sharp fa-solid fa-thumbs-up"></i><span>${this.like}</span>J'aime</button>
                    <hr>
                    <button><i class="fa-sharp fa-solid fa-thumbs-down"></i><span>${this.dislike}</span>J'aime pas</button>
                </div>
            </article>
        `
    }
}