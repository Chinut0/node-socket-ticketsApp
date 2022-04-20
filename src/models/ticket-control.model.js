const fs = require('fs');
const path = require('path')

class Ticket {
    constructor(numero, escritorio){
        this.ticket = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    guardarDB (){
        const dbPath = path.join(__dirname, '../data/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    init(){
        const {hoy, ultimo, tickets, ultimos4} = require('../data/data.json')
        if(hoy == this.hoy){
            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimos4 = ultimos4
        } else {
            //otro dia
            this.guardarDB()
        }
    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket)

        this.guardarDB()
        return 'Ticket: ' +ticket.ticket; 
    }

    atenderEscritorio(escritorio){

        //No tenemos tickets
        if(this.tickets.length == 0){
            return null;
        }

        //Trae primer elemento y lo saca del array
        const ticket = this.tickets.shift(); 
        ticket.escritorio = escritorio;
        
        //Lo agrega al comienzo del array
        this.ultimos4.unshift(ticket)

        //Si son mas de cuatro elimina el ultimo
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1, 1)
        }
        this.guardarDB();
        return ticket ;
    }
}

module.exports = TicketControl