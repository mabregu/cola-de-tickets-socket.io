const lblDesktop = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const btnHanlde = document.querySelector('button');
const divAlert = document.querySelector('.alert');
const lblPendings = document.getElementById('lblPendientes');
const params = new URLSearchParams(window.location.search);

if (!params.has('escritorio') || params.get('escritorio') === '') {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const desktop = params.get('escritorio');
lblDesktop.innerHTML = desktop;
const socket = io();

socket.on('connect', () => {
    btnHanlde.disabled = false;
});

socket.on('disconnect', () => {
    btnHanlde.disabled = true;
});

socket.on('pending-tickets', (pendings) => {
    if (pendings === 0) {
        lblPendings.style.display = 'none';
    } else {
        lblPendings.style.display = '';
        lblPendings.innerHTML = pendings;
    }
});

btnHanlde.addEventListener('click', () => {
    socket.emit('handle-ticket', { desktop }, (resp) => {
        console.log("dddd", resp);
        if (!resp.ok) {
            lblTicket.textContent = resp.message;
            divAlert.style.display = '';
        } else {
            lblTicket.textContent = `Ticket ${resp.ticket.number}`;
        }
        
    });
});