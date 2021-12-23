const lblNewTicket = document.getElementById('lblNuevoTicket');
const btnCreate = document.querySelector('button');
const socket = io();

socket.on('connect', () => {
    btnCreate.disabled = false;
});

socket.on('disconnect', () => {
    btnCreate.disabled = true;
});

socket.on('last-ticket', last => {
    lblNewTicket.textContent = `Último ticket: ${last}`;
});

btnCreate.addEventListener( 'click', () => {
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.textContent = ticket;
    });
});