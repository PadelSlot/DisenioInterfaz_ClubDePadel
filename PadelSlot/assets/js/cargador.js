/*
 * cargador.js · PadelSlot (Equipo 04)
 * Muestra la pelota que bota mientras se "buscan" pistas (1,5 s)
 * y después envía el formulario a la página de reserva.
 */
document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('[data-cargador]');
    const estado = document.querySelector('[data-cargador-estado]');
    if (!boton) return;

    boton.form.addEventListener('submit', (evento) => {
        evento.preventDefault();                       // Primero enseñamos la animación
        boton.classList.add('boton--cargando');
        boton.querySelector('.boton__texto').textContent = 'Buscando…';
        estado.textContent = 'Buscando pistas disponibles';   // Lo anuncia el lector de pantalla

        setTimeout(() => {
            boton.form.submit();                       // Después vamos a reservaNoSocio.html
        }, 1500);
    });
});
