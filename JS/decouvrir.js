const divCarroussel1 = document.querySelector(".caroussel-img1");
const divCarroussel2 = document.querySelector(".caroussel-img2");
const divCarroussel3 = document.querySelector(".caroussel-img3");
const btnContinue = document.querySelector('.btn-continue');
const btnfinish = document.querySelector('.btn-finish');
const contPresent = document.getElementById('presentation-text')

const animeDecouvrir = () => {
    const btnDecouvre = document.getElementById('decouvrir');
    
    btnDecouvre.addEventListener('click', ()=> {
      if(divCarroussel1.style.width > "0%"){
        
            divCarroussel1.style.width = "0%";
            divCarroussel2.style.width = "100%";
            btnContinue.style.opacity = '1';
            contPresent.style.margin = '2%';
            contPresent.style.display = 'flex';
            contPresent.style.height = '25vh';
            contPresent.style.justifyContent = 'space-between';
            contPresent.innerHTML = '';
            contPresent.innerHTML += new Decouvrir().createDivCoop();
            contPresent.innerHTML += new Decouvrir().createDivAvis();
            contPresent.innerHTML += new Decouvrir().createDivTournoi();
            
      }
    })
}

const animeDecouvrir2 = () => {
  btnContinue.addEventListener('click',()=> {
    divCarroussel2.style.width = "0%";
    btnContinue.style.opacity = '0';
    divCarroussel3.style.width = "100%";
    btnfinish.style.opacity = "1";
    contPresent.innerHTML = '';
    contPresent.innerHTML = new Decouvrir().eventduMois();
  })
}

const animeDecouvrir3 = () => {
  btnfinish.addEventListener('click', () => {
    divCarroussel3.style.width = "0%";
    divCarroussel1.style.width = "100%";
    btnfinish.style.opacity = "0";
    contPresent.innerHTML = '';
    contPresent.innerHTML = new Decouvrir().questionPresent()
  })
}




const debugCSSCarrousel = () => {
    divCarroussel1.style.width = "100%";
    btnfinish.style.opacity = "0";
}


class Decouvrir {

  constructor(data){

  }

  createDivCoop(){
    return`
        <article>
            <div>
              <img src="./IMG-GAME/apex-legend-cover.jpg" alt="image jeux">
            </div>
              <p>
                <span>
                  Trouve tes co-equipiers
                  ou 
                </span>
                 <span>
                 crée ton équipe
                 </span>
                 <span>
                    interagie avec les autre équipe explore les jeux avec ton crew
                  </span>
              </p>
        </article>
    `;
  }

  createDivAvis(){
    return`
    <article>
        <div>
          <img src="./IMG-GAME/fall-Guys-cover.jpeg" alt="image jeux">
        </div>
          <p>
            Abonne-toi à un jeux commente 
            partage ton avis avec tous le monde 
          </p>
    </article>
  `;
  }

  createDivTournoi(){
    return`
    <article>
        <div>
          <img src="./IMG-GAME/for-honor-cover.jpg" alt="image jeux">
        </div>
          <p>

           <span> 
              Monte sur scène
            </span> 
            <span> 
              participe aux tournoix organisé ou
            </span>
            <span>
               pourquoi pas en organiser un
            </span>
          </p>
    </article>
  `;
  }


  eventduMois(){
    return `
      <article class="art-event">
        <div class="event-Month">
          <img src="./IMG-GAME/LOL-cover.jpg" alt="image de l'evenement en cours">
        </div>
        <p>
          <img src="./Logo-Spark/S.png" >
        </p>
      </article>
      
      <article class="art-event">
      <div class="event-Month">
        <img src="./IMG-GAME/nfs-2015-cover.png" alt="image de l'evenement en cours">
      </div>
      <p>
        <img src="./Logo-Spark/S.png" >
      </p>
    </article>

    <article class="art-event">
      <div class="event-Month">
        <img src="./IMG-GAME/Valorant-cover.jpg" alt="image de l'evenement en cours">
      </div>
      <p class="event-Text">
        <img src="./Logo-Spark/S.png" >
      </p>
    </article>
      
  `
  }

  questionPresent(){
    return `
    <ul>
      <li class="text-presente1">Tu cherche des coéquipier ?</li>
      <li class="text-presente2">Tu veux connaitre l'avis des joueur sur un jeu en particulier ?
      </li>
      <li class="text-presente3">
          Tu cherche à remporter des tournois ?
      </li>
    </ul>

    `
  }

}

debugCSSCarrousel();
animeDecouvrir();
animeDecouvrir2();
animeDecouvrir3();
