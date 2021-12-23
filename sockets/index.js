const TicketController = require('../models/TicketController');
const ticket = new TicketController();

const socketController = socket => {
    socket.emit('last-ticket', ticket.ultimo);
    
    socket.emit('current-state', ticket.ultimosCuatro);
    
    socket.emit('pending-tickets', ticket.tickets.length);
    
    socket.on("next-ticket", (payload, callback) => {
        let next = ticket.next();
        callback(next);
        socket.broadcast.emit('pending-tickets', ticket.tickets.length);
    });
    
    socket.on("handle-ticket", ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                message: "El escritorio es necesario"
            });
        }
        
        
        let next = ticket.handleTicket(desktop);
        
        socket.broadcast.emit('current-state', ticket.ultimosCuatro);
        socket.emit('pending-tickets', ticket.tickets.length);
        socket.broadcast.emit('pending-tickets', ticket.tickets.length);
        
        if (!next || next === 'No tickets available') {
            callback({
                ok: false,
                message: "No hay tickets disponibles"
            });
        } else {
            callback({
                ok: true,
                ticket: next
            });
        }
            
    });
};

module.exports = {
    socketController
};