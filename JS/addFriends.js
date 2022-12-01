
let dataAdd = {
    MAILUSER1: null,
    NAMEUSER2: null,
}

const addUserFriends = () => {

    const addFriends = document.querySelectorAll('.addFriends');

    addFriends.forEach(btn => {
        btn.addEventListener('click', () => {

            const cnn = new XMLHttpRequest();
            cnn.onreadystatechange = () => { }
            cnn.open('POST', './BackEnd/PHP/index.php?redirAll=addFriends');
            cnn.send(JSON.stringify({
                MAILUSER1: JSON.parse(localStorage.getItem('SPARKCONCT')).Mail,
                NAMEUSER2: btn.value
            }));

        })
    })
}

