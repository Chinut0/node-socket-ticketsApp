

console.log('Nuevo Ticket HTML');


// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});
window.onload = () => {
    socket.emit('ultimo-ticket', null, (ticket) => {
        lblNuevoTicket.innerHTML = ticket
    });
}


btnCrear.addEventListener('click', () => {

    const payload = null;

    socket.emit('siguiente-ticket', payload, (ticket) => {
        console.log(ticket);
        lblNuevoTicket.innerHTML = ticket
    });

});