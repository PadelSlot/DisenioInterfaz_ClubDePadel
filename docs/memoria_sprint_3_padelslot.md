Coevaluación
Javier Oliveros Lepe:80%
Alberto Rueda Romero:90%
Pablo Márquez López: 100%
Ismael Frías Fernández:85%
# Memoria Técnica - Sprint 3: Multimedia, Interactividad y Verificación Visual (`PadelSlot`)

Con el fin de enriquecer la experiencia visual y dotar de dinamismo a la interfaz sin penalizar los tiempos de carga, se han generado secuencias animadas y microinteracciones partiendo de ilustraciones y gráficos vectoriales estáticos. Mediante el uso de fotogramas clave en CSS (`@keyframes`), sprites vectoriales y manipulación de propiedades gráficas ligeras, se logra una respuesta visual fluida y de bajo coste de renderizado que guía la interacción del usuario a través de la plataforma.

---

## 1. Tratamiento de Vídeo y Audio (T-3.4)

### Objetivo
Hasta este sprint, la web de **PadelSlot** no contaba con recursos de vídeo ni de audio. Se ha incorporado un vídeo aéreo de un partido de pádel y una pista de música de fondo. Ambos recursos han sido comprimidos y exportados en formatos abiertos compatibles con todos los navegadores (`MP4` y `WebM` para vídeo; `MP3` y `OGG` para audio) para garantizar una reproducción fluida y un bajo consumo de datos.

### Recursos seleccionados
| Recurso | Descripción | Fuente |
| :--- | :--- | :--- |
| **Vídeo** | Toma aérea con dron de un partido de pádel en una pista exterior | Pexels |
| **Música** | *«Stylish Sport Rock (Powerful)»*, rock deportivo instrumental | Pixabay Music |

### Tratamiento del vídeo
El archivo original presentaba un peso excesivo para entorno web: **82 MB**, 25 segundos de duración en resolución `2560 × 1440` a ~27 Mbps. Se aplicaron las siguientes optimizaciones:
1. **Recorte:** Selección de los primeros 12 segundos, donde transcurre el partido (a partir de ese punto el dron se aleja y solo muestra una vista general del club).
2. **Resolución:** Reducción a `1280 × 720` (720p), óptima para las dimensiones de visualización en la interfaz.
3. **Codificación y bitrate:**
   - **MP4 (H.264):** CRF 26 (~1,4 Mbps), con flag `faststart` para iniciar la reproducción antes de completar la descarga.
   - **WebM (VP9):** CRF 42 (~1,2 Mbps).
4. **Audio:** Eliminación de pista de audio (el original carecía de sonido), cumpliendo con los estándares para vídeos de fondo con reproducción automática.
5. **Póster:** Exportación del primer fotograma como imagen de portada en formatos `WebP` y `AVIF` para su visualización inmediata durante la carga del vídeo.

#### Resultados de optimización de vídeo
| Archivo | Formato | Resolución | Duración | Peso | Reducción |
| :--- | :--- | :--- | :--- | :--- | :--- |
| *Original* | MP4 (H.264) | 2560 × 1440 | 25,5 s | 83.662 KB | — |
| `video-partido.mp4` | MP4 (H.264) | 1280 × 720 | 12 s | 2.125 KB | **−97 %** |
| `video-partido.webm` | WebM (VP9) | 1280 × 720 | 12 s | 1.865 KB | **−98 %** |
| `video-partido-poster.webp` | WebP | 1280 × 720 | — | 204 KB | — |
| `video-partido-poster.avif` | AVIF | 1280 × 720 | — | 150 KB | — |

> *Nota: Tras comparar los fotogramas con zoom frente al archivo original, no se aprecia pérdida de calidad visual.*

### Tratamiento del audio
La pista original tenía una duración de `1:48` en formato MP3 a 256 kbps (**3,3 MB**).
1. **Recorte:** Fragmento de 12 segundos a partir del segundo 26 para sincronizar su duración con el vídeo.
2. **Fundidos:** Aplicación de *fade-in* de 1 segundo al inicio y *fade-out* de 1 segundo al final para evitar cortes abruptos.
3. **Normalización:** Ajuste de volumen a **−16 LUFS** (estándar de referencia para contenido web).
4. **Codificación y bitrate:**
   - **MP3:** 128 kbps.
   - **OGG (Vorbis):** Calidad 4 (~121 kbps).

#### Resultados de optimización de audio
| Archivo | Formato | Duración | Bitrate | Peso |
| :--- | :--- | :--- | :--- | :--- |
| *Original* | MP3 | 1:48 | 256 kbps | 3.376 KB |
| `musica-fondo.mp3` | MP3 | 0:12 | 128 kbps | 188 KB |
| `musica-fondo.ogg` | OGG (Vorbis) | 0:12 | ~121 kbps | 177 KB |

### Integración en la web
Ambos elementos se han integrado en la sección *«Así se juega en el Aljarafe»* de `inicio.html`, justo debajo del buscador, con sus estilos definidos en `assets/css/multimedia.css`:

```html
<video autoplay muted loop playsinline preload="metadata"
       poster="assets/media/video-partido-poster.webp" width="1280" height="720"
       aria-label="Vista aérea con dron de un partido de pádel en una pista exterior">
  <source src="assets/media/video-partido.webm" type="video/webm">
  <source src="assets/media/video-partido.mp4" type="video/mp4">
  Tu navegador no admite vídeo HTML5.
</video>

<audio controls preload="none">
  <source src="assets/media/musica-fondo.ogg" type="audio/ogg">
  <source src="assets/media/musica-fondo.mp3" type="audio/mpeg">
  Tu navegador no admite audio HTML5.
</audio>
```

* **Doble `<source>`:** El navegador selecciona automáticamente el primer formato compatible (`WebM` u `OGG` prioritariamente, con respaldo en `MP4` o `MP3`).
* **`autoplay muted`:** Cumple con las políticas de reproducción automática de los navegadores modernos; el audio se mantiene independiente para que el usuario lo active voluntariamente.
* **`playsinline`:** Evita la apertura forzada a pantalla completa en dispositivos iOS.
* **`preload`:** El vídeo precarga únicamente metadatos (`metadata`) y el audio no inicia su descarga hasta que el usuario pulsa *play* (`none`).
* **`width`, `height` y `poster`:** Reservan el espacio en el DOM antes de la carga completa, evitando desplazamientos de diseño (*Cumulative Layout Shift - CLS*).

### Licencias multimedia
| Archivo | Autor | Fuente | Licencia |
| :--- | :--- | :--- | :--- |
| `video-partido.*` | Gianluca Guidi | Pexels · vídeo 13737627 | Licencia Pexels |
| `musica-fondo.*` | MarkJuly | Pixabay · *Stylish Sport Rock (Powerful)* | Licencia de contenido de Pixabay |

* **Licencia Pexels:** Permite el uso gratuito en proyectos personales y comerciales, incluyendo modificaciones (recorte, cambio de resolución, recodificación). No exige atribución (aunque se incluye en la documentación). No permite la venta directa ni el registro como obra propia.
* **Licencia de contenido de Pixabay:** Permite uso gratuito comercial y modificaciones (recortes, fundidos) sin atribución obligatoria. Prohíbe la distribución independiente del archivo de audio o su registro como obra propia.

---

## 2. Interactividad, Animaciones y Carga Diferida (T-3.5)
**Responsable:** Javier Oliveros Lepe

### Sprites vectoriales propios
* Se ha creado el sprite vectorial `PadelSlot/assets/svg/sprite-padel.svg` con tres iconos de diseño propio: **pelota**, **pala** y **pista**.
* Implementados mediante `<symbol>` y `<use>` en 10 páginas de la plataforma, sustituyendo al icono genérico de pelota de Phosphor.
* El código SVG ha sido depurado para eliminar metadatos y etiquetas residuales de herramientas de edición.

### Animaciones a partir de gráficos estáticos
1. **Spritesheet de pelota botando (`inicio.html`):**
   * Secuencia de 12 fotogramas generada a partir del vector estático `pelota.svg` mediante el script `scripts/generar_spritesheet_pelota.py`.
   * Exportado en formato **WebP (13,4 kB)** con respaldo en **PNG (31,7 kB)**, logrando un ahorro de peso del **57,7 %**.
2. **SVG animado con `@keyframes` (`servicios.html`):**
   * Ilustración vectorial `pala-golpe.svg` integrada en la tarjeta del *Pro-Shop*, donde una pala golpea una pelota mediante animaciones CSS ligeras.

### Optimización de carga (`Lazy Loading`) y CLS
* **Imágenes de clubes (`inicio.html`) y convenios (`cuotas.html`):** Implementadas mediante etiquetas `<picture>` con formatos `AVIF` y `WebP` en tres resoluciones distintas y atributo `loading="lazy"`. *(Nota: Las fotografías definitivas se visualizarán una vez se suban los archivos con la nomenclatura especificada en `LICENSES.md`).*
* **Mapa interactivo (`inicioSocio.html`):** Carga diferida aplicada al iframe de OpenStreetMap.
* **Exclusión en portada (*Above the fold*):** Se ha omitido `loading="lazy"` en los elementos iniciales de la portada para no penalizar el *Largest Contentful Paint (LCP)*.
* **Prevención de saltos (CLS):** Todas las imágenes cuentan con dimensiones explícitas para reservar su espacio en pantalla durante la carga.

### Accesibilidad (WCAG 2.3.3 - Animación a partir de interacciones)
* Se ha implementado la media query `@media (prefers-reduced-motion: reduce)` para respetar la configuración del sistema operativo del usuario:
  * Las animaciones y transiciones CSS se reducen al mínimo o se detienen por completo.
  * El vídeo de portada desactiva su reproducción automática, requiriendo interacción manual (*play*) por parte del usuario.

### Documentación y estilos asociados
* Creación del parcial SCSS `_multimedia.scss` y compilación en `main.css`.
* Registro de los recursos propios en `LICENSES.md` y documentación detallada en `docs/Sprint3_Interactividad.md`.

---

## 3. Verificación Visual, Consistencia de Marca y Optimización SVG (T-3.6)

### Auditoría de tokens SCSS y Figma
Se ha realizado una verificación cruzada entre el código fuente SCSS, los mockups de Figma y los requisitos de diseño:
* **Informe de verificación:** Evaluación de 14 criterios frente a la guía de estilo (`RE-01` a `RE-05`), mockups y tokens SCSS, estableciendo comparativas visuales y reglas de marca.
* **Correcciones aplicadas:**
  * Estandarización de escala tipográfica, radios y sombras en tokens (`$tamano-mini`, `$tamano-destacado`, `$radio-xs`, `$sombra-s`, `$sombra-m`, `$sombra-destacada`).
  * Unificación del nombre comercial de la marca como **PadelSlot**.
  * Resolución de advertencias de depreciación de la función `darken()` en Sass.
* **Revisión de activos:** Validación del registro de licencias y recursos aportados por Ismael, Alberto y Javier.

### Generación dinámica de Códigos QR (`QRCode.js`)
Para el carné digital del socio se ha sustituido la imagen estática por una generación dinámica en cliente mediante la librería **QRCode.js** (`davidshimjs`):
* **Formato vectorial:** Renderizado en `SVG` (`useSVG: true`), garantizando nitidez a cualquier escala y un peso mínimo.
* **Accesibilidad:** Uso de `role="img"`, atributo `aria-label` descriptivo y representación textual del número de socio como alternativa accesible.
* **Licencia y ubicación:** Licencia MIT (Kazuhiko Arase y davidshimjs), conservando los avisos de copyright, el archivo `LICENSE` original y su registro en `LICENSES.md`. Implementación alojada en `assets/js/generadorQR.js`.

### Migración y optimización del sistema de iconos
* **Implementación:** Creación del sprite `assets/svg/iconos.svg` con 109 iconos de **Phosphor Icons** (Licencia MIT) optimizados con coordenadas redondeadas a 1 decimal. Sustituye a la carga externa vía CDN, migrando **503 instancias** a lo largo de las 19 páginas mediante `<use>` y `currentColor`.
* **Carga local (`iconos.js`):** Script encargado de inyectar el sprite en el DOM para garantizar la correcta visualización de los iconos incluso al abrir los archivos HTML directamente desde el sistema de archivos local (`file://`).
* **Reorganización:** Centralización del logotipo y vectores en `assets/svg/` con actualización de rutas en el HTML.

#### Análisis de optimización de los 6 iconos más utilizados
Se depuraron metadatos, atributos redundantes y decimales innecesarios en los 6 iconos con mayor presencia en la aplicación (149 usos totales) sin alterar su trazado visual:

| Icono | Usos | Peso Original | Peso Optimizado | Ahorro |
| :--- | :---: | :---: | :---: | :---: |
| `caret-right` | 38 | 219 B | 208 B | 5,0 % |
| `plus` | 31 | 212 B | 212 B | 0,0 % |
| `map-pin` | 24 | 459 B | 441 B | 3,9 % |
| `user` | 21 | 340 B | 317 B | 6,8 % |
| `magnifying-glass` | 18 | 243 B | 229 B | 5,8 % |
| `users` | 17 | 506 B | 471 B | 6,9 % |
| **Total** | **149** | **1.979 B** | **1.878 B** | **5,1 %** |

> *Conclusión:* El margen de reducción en bytes es moderado debido a que la librería **Phosphor Icons** distribuye sus vectores previamente optimizados (sin metadatos de Inkscape/Illustrator y con trazados simplificados). En el caso de `plus`, su estructura XML ya se encontraba en su expresión mínima.

---

## 4. Registro de Bloqueos e Impedimentos del Sprint

| Fecha | Bloqueo o Impedimento Detectado | Impacto en el Sprint | Solución Técnica Acordada | Estado |
| :--- | :--- | :--- | :--- | :---: |
| **03/11** | Organización de las tareas a realizar y puesta en común en el equipo | Organización inicial del sprint | Definición y reparto de horas de trabajo | **Resuelto** |
| **05/11** | Falta de un club de pádel real para orientar el proyecto | Bloqueo en el avance de las tareas | Contactar telefónicamente con clubes de pádel locales para solicitar autorización | **Resuelto** |
| **12/11** | Falta de confirmación de un club de pádel real para orientar el proyecto | Bloqueo en el avance de las tareas | Adoptar un club de pádel ficticio/imaginario para desbloquear y continuar el desarrollo | **Resuelto** |
