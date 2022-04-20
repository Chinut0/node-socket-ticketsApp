
// Referencias del HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTicket     = document.querySelector('small')
const divAlerta     = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

console.log('Escritorio HTML');

const socket = io();
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}


window.onload = () => {
    socket.emit('ultimo-ticket', null, (ticket) => {
        // lblNuevoTicket.innerHTML = ticket
    });
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerHTML = escritorio;
divAlerta.style.display = "none";

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('tickets-pendientes', (ticketsPendientes) => {
    if (ticketsPendientes) {
        lblPendientes.innerHTML = ticketsPendientes;
    } else {
        lblPendientes.innerHTML = 0;
    }

});




btnAtender.addEventListener('click', () => {

    const payload = {
        escritorio
    };

    socket.emit('atender-ticket', payload, ({ok, ticket}) => {
        if(!ok){
            divAlerta.style.display = "";
            lblTicket.innerHTML = '...'

        } else {
            lblTicket.innerHTML = 'Ticket '+ticket.ticket
        }

    //     console.log(ticket);
    //     lblNuevoTicket.innerHTML = ticket
    });

});