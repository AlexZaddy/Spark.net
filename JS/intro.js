
const lunchIntro = async() => {
    const body = document.querySelector('body');
    body.innerHTML += new INTRO().opennig();
}

const endIntro = async () => {
    await lunchIntro();
    const intro = document.querySelector('.intro');
    intro.style.zIndex = '-1';
    return
}


class INTRO {

    opennig(){
        return `
        <div class="intro">
        <span>S</span><span>P</span><span>A</span><span>R</span><span>K</span>
    </div>`;
    }
}

let USERCONECTS = JSON.parse(localStorage.getItem('SPARKCONCT')).acces.acces

if(USERCONECTS != 'acces'){
    endIntro();
}
