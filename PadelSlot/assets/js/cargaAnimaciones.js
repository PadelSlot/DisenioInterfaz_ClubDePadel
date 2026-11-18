/*
 * cargador.js · PadelSlot (Equipo 04)
 * Muestra la pelota que bota mientras se "buscan" pistas (maqueta: 1,5 s).
 */
document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('[data-cargador]');
    const estado = document.querySelector('[data-cargador-estado]');
    if (!boton) return;

    boton.form.addEventListener('submit', (evento) => {
        evento.preventDefault();                       // Maqueta: no hay servidor
        boton.classList.add('boton--cargando');
        boton.querySelector('.boton__texto').textContent = 'Buscando…';
        estado.textContent = 'Buscando pistas disponibles';   // Lo anuncia el lector de pantalla

        setTimeout(() => {
            boton.classList.remove('boton--cargando');
            boton.querySelector('.boton__texto').textContent = 'Buscar pistas';
            estado.textContent = 'Búsqueda completada';
        }, 1500);
    });
});