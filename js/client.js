const socket = io('http://localhost:8000');

const form = document.getElementById('send-cont');
const messageInput = document.getElementById('msgInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('text_msg.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    messageContainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // page will not be reloaded
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});


const name = prompt("Enter Your Name To Join: ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} Left the chat`, 'left');
});