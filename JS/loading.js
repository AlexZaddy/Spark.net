let response = null;
const body = document.querySelector('body');

const req = new XMLHttpRequest()
req.onreadystatechange = () => {

    if(req.readyState === 4 && req.status === 200)
    response = JSON.parse(req.response);
    setTimeout(()=>{
        showBackground()
    })
    
}
req.open('POST', './BackEnd/PHP/index.php?redirAll=loading', true);
req.send(JSON.stringify({GAME : game}))


const showBackground = () => {
    body.style.background = `url(${response[0].imgGame})`;
}


