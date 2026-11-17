/*
 * generadorQR.js · PadelSlot
 * Genera el código QR del carnet digital del socio con la librería QRCode.js (MIT).
 * Se carga en cuotas.html después de assets/js/vendor/qrcodejs/qrcode.js
 */

// Esperamos a que el HTML esté cargado para que exista el contenedor del QR.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Buscamos el contenedor donde se dibujará el QR.
    const contenedor = document.getElementById('qr-carnet');

    // 2. Si no estamos en la página del carnet o la librería no ha cargado, no hacemos nada.
    if (!contenedor || typeof QRCode === 'undefined') {
        return;
    }

    // 3. Leemos el texto que irá dentro del QR desde el atributo data-qr del HTML.
    //    Usamos un identificador del socio, nunca datos personales (nombre, DNI…).
    const textoQr = contenedor.dataset.qr;

    // 4. Creamos el QR con las opciones de la librería, adaptadas a nuestra marca.
    new QRCode(contenedor, {
        text: textoQr,                         // Lo que se codifica
        width: 160,                            // Tamaño en píxeles (mínimo recomendado)
        height: 160,
        colorDark: '#255945',                  // Módulos: verde primario de PadelSlot
        colorLight: '#ffffff',                 // Fondo: blanco (máximo contraste)
        correctLevel: QRCode.CorrectLevel.M,   // Corrección de errores media (~15 %)
        useSVG: true                           // Dibujarlo como SVG (vectorial y nítido)
    });
});