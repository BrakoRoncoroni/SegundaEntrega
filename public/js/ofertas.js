// public/js/ofertas.js

function actualizarContador() {
    const tiempoElement = document.getElementById('tiempo-restante');
    if (!tiempoElement) return;
    
    const fechaFin = new Date(tiempoElement.dataset.fin);
    const ahora = new Date();
    const diferencia = fechaFin - ahora;
    
    if (diferencia <= 0) {
        // La oferta terminó
        location.reload();
        return;
    }
    
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    
    document.getElementById('minutos').textContent = 
        minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = 
        segundos.toString().padStart(2, '0');
}

// Actualizar contador cada segundo
if (document.getElementById('tiempo-restante')) {
    actualizarContador();
    setInterval(actualizarContador, 1000);
}

// Manejar click en botón comprar
document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', function() {
        const productoId = this.dataset.productoId;
        window.location.href = `/productos/${productoId}`;
    });
});

// Socket.io para actualizaciones en tiempo real 
const socket = io();

socket.on('oferta-nueva', (data) => {
    location.reload();
});

socket.on('oferta-finalizada', (data) => {
    location.reload();
});