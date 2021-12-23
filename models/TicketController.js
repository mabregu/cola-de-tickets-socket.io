const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketController {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];
        this.init();
    }
    
    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }
    }
    
    init() {
        // let jsonData = fs.readFileSync('../db/data.json');
        // let data = JSON.parse(jsonData);
        let { ultimo, hoy, tickets, ultimosCuatro } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.ultimo = ultimo;
            this.tickets = tickets;
            this.ultimosCuatro = ultimosCuatro;
        } else {
            this.saveDB();
        }
    }
    
    saveDB() {
        let jsonPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(jsonPath, JSON.stringify(this.toJson));
    }
    
    next() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.saveDB();
        return `Ticket ${this.ultimo}`;
    }
    
    handleTicket(desktop) {
        if (this.tickets.length === 0) return 'No tickets available';
        
        let ticket = this.tickets.shift();

        //let ticket = new Ticket(numeroTicket, desktop);
        ticket.desktop = desktop;
        this.ultimosCuatro.unshift(ticket);
        
        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1);
        }
        
        this.saveDB();
        
        return ticket;
    }
}
// 5 - 7.52
module.exports = TicketController;