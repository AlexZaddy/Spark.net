topGameimage = {
    'overwatch': 'Images/overwatch-2.jpeg',
    'battlefield5': 'Images/battlefield.jpg',
    'apexlegends': 'Images/index.jpg',
    'streetfighter': 'Images/street-fighter.jpg'
}

const chipset = document.querySelector('.cover-home');


setInterval(() => {
    gameCoverHome(topGameimage['overwatch'], topGameimage['battlefield5'], topGameimage['apexlegends'], topGameimage['streetfighter'])
}, 4000)

const gameCoverHome = (img, img1, img2, img3) => {

    switch (chipset.attributes.src.value) {
        case img:
            chipset.attributes.src.value = img1
            break;
        case img1:
            chipset.attributes.src.value = img2
            break;
        case img2:
            chipset.attributes.src.value = img3
            break;
        default:
            chipset.attributes.src.value = img
            break;
    }
}