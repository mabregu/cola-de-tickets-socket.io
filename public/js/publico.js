const lblTicket1 = document.getElementById('lblTicket1');
const lblDesktop1 = document.getElementById('lblDesktop1');

const lblTicket2 = document.getElementById('lblTicket2');
const lblDesktop2 = document.getElementById('lblDesktop2');

const lblTicket3 = document.getElementById('lblTicket3');
const lblDesktop3 = document.getElementById('lblDesktop3');

const lblTicket4 = document.getElementById('lblTicket4');
const lblDesktop4 = document.getElementById('lblDesktop4');

const socket = io();

socket.on('current-state', (payload) => {
    const audio = new Audio('../audio/new-ticket.mp3');
    
    audio.play();
    
    for (let index = 0; index < 4; index++) {
        lblTicket = eval('lblTicket' + (index + 1));
        lblDesktop = eval('lblDesktop' + (index + 1));
        if (lblTicket) {
            lblTicket.innerHTML = 'Ticket ' + payload[index].number;
            lblDesktop.innerHTML = payload[index].desktop;
        }
    }
});