const url = "wss://ws.postman-echo.com/raw";
const btn_send = document.querySelector('.btn_message');
const btn_geo = document.querySelector('.btn_location');
const talk = document.querySelector('.talk');
const chat = document.querySelector('.chat')

const websocket = new WebSocket(url);

websocket.onopen = () => {
    console.log('connect')
};
websocket.onerror = function() {
    talk.insertAdjacentHTML("beforeend", '<div class="income_text">Ошибка соединения, пожалуйста перезагрузите страницу</div>');
};
websocket.onmessage = (evt) => {
    talk.insertAdjacentHTML("beforeend", `<div class="income_text">${evt.data}</div>`)
};

btn_send.addEventListener('click', (e) => {
    let input = document.querySelector('.message').value;
    talk.insertAdjacentHTML("beforeend", `<div class="send_text">${input}</div>`);
    websocket.send(input);
});

const error = () => {
    talk.insertAdjacentHTML("beforeend",'<div class="income_text">Невозможно получить ваше местоположение</div>');
}
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    talk.insertAdjacentHTML("beforeend", `<div class="send_text"><a href=https://www.openstreetmap.org/#map=18/${latitude}/${longitude} target="_blank">Geolocation</a></div>`)

}

btn_geo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        talk.insertAdjacentHTML("beforeend",'<div class="income_text">Geolocation не поддерживается вашим браузером</div>');
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }
});

chat.ondragstart = () => false;
chat.addEventListener('mousedown', (e) => {
    let coord = chat.getBoundingClientRect();
    console.log('coord', coord)
    let coords = {
        top: coord.top + pageYOffset,
        left: coord.left +pageXOffset
    }
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;
    let moveAt = (e) => {
        chat.style.left = e.pageX - shiftX + 'px';
        chat.style.top = e.pageY - shiftY + 'px';
    }

    let theEnd = () => {
        document.removeEventListener('mousemove', moveAt);
        document.removeEventListener('mouseup', theEnd);
    }
    moveAt(e);
    chat.style.zIndex = 1000;

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', theEnd);
});

