
let USERCONECT = JSON.parse(localStorage.getItem('SPARKCONCT')).acces.acces
let MAIL = JSON.parse(localStorage.getItem('SPARKCONCT')).Mail

USERCONECT == 'acces' && MAIL != ''? PageUser() : '';

