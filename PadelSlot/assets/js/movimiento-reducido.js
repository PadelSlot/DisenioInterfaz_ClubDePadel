/*
 * movimiento-reducido.js · PadelSlot (Equipo 04)
 * Si el usuario ha pedido menos movimiento en su sistema,
 * el vídeo de inicio no se reproduce automáticamente (WCAG 2.3.3).
 */
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.inicio-publico__video-reproductor');
    const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (video && prefiereMenosMovimiento) {
        video.removeAttribute('autoplay');
        video.pause();
    }
});