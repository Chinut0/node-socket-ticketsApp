const TicketControl = require("../models/ticket-control.model");

const ticketController = new TicketControl()


const socketController = (socket) => {


    console.log('Cliente conectado', socket.id);

    socket.emit('estado-actual', ticketController.ultimos4)
    socket.emit('tickets-pendientes', ticketController.tickets.length)
    
    //Disconnect event
    socket.on('disconnect', () => {
        console.log('disconected', socket.id)
    });

    socket.on('ultimo-ticket', (payload, callback)=>{
        const ultimoTicket = ticketController.ultimo
        callback('Ticket: '+ ultimoTicket);
    })

    //Recive msg y ejecuta el callback (3er argumento del la funcion del cliente)
    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketController.siguiente();
        callback(siguiente)
        socket.broadcast.emit('tickets-pendientes', ticketController.tickets.length)
    });

    //
    socket.on('atender-ticket', ({escritorio}, callback) => {
        // const siguiente = ticketController.siguiente();
        // callback(siguiente)
        if (!escritorio) {
            return callback({
                ok:false,
                msg: 'El escritorio es obligatorio'
            })
            
        }
        const ticket = ticketController.atenderEscritorio(escritorio)

        socket.broadcast.emit('estado-actual', ticketController.ultimos4)
        socket.emit('tickets-pendientes', ticketController.tickets.length)
        socket.broadcast.emit('tickets-pendientes', ticketController.tickets.length)


        console.log(ticket);
        if(!ticket){
            return callback({
                ok:false,
                msg: 'Ya no hay tickets pendientes.'
            })
        }
        return callback({
            ok:true,
            ticket
        })
    });


}

module.exports = {
    socketController
}