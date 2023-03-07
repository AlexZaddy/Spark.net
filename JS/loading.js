import { game } from "./PageGame";

const body = document.querySelector('body');

const req = new XMLHttpRequest()
req.onreadystatechange = () => {

    if(req.readyState === 4 && req.status === 200)
    setTimeout(()=>{
        const responseIMG = JSON.parse(req.response);
        showBackground(responseIMG);
    })
    
}
req.open('POST', './BackEnd/PHP/index.php?redirAll=loading', true);
req.send(JSON.stringify({GAME : game}))


const showBackground = (response) => {
    body.style.background = `url(${response[0].imgGame})`;
}


