const divCarroussel1 = document.querySelector(".caroussel-img1");
const divCarroussel2 = document.querySelector(".caroussel-img2");
const divCarroussel3 = document.querySelector(".caroussel-img3");
const btnContinue = document.querySelector('.btn-continue');
const btnfinish = document.querySelector('.btn-finish');

const animeDecouvrir = () => {
    const btnDecouvre = document.getElementById('decouvrir');
    
    btnDecouvre.addEventListener('click', ()=> {
      if(divCarroussel1.style.width > "0%"){
            console.log('oui');
            divCarroussel1.style.width = "0%";
            divCarroussel2.style.width = "100%";
            btnContinue.style.opacity = '1';
            
      }
    })
}

const animeDecouvrir2 = () => {
  btnContinue.addEventListener('click',()=> {
    divCarroussel2.style.width = "0%";
    btnContinue.style.opacity = '0';
    divCarroussel3.style.width = "100%";
    btnfinish.style.opacity = "1";
  })
}

const animeDecouvrir3 = () => {
  btnfinish.addEventListener('click', () => {
    divCarroussel3.style.width = "0%";
    divCarroussel1.style.width = "100%";
    btnfinish.style.opacity = "0";
  })
}




const debugCSSCarrousel = () => {
    divCarroussel1.style.width = "100%";
    btnfinish.style.opacity = "0";
}

debugCSSCarrousel();
animeDecouvrir();
animeDecouvrir2();
animeDecouvrir3();
