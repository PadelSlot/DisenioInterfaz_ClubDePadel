# 

# 

# **Documentación del Sprint 2 de Diseño de Interfaces**

# Coevalución
Javier Oliveros Lepe - 70% (Todos estamos de acuerdo)

Pablo Márquez López - 100% (Todos puntúan el 100%)

Ismael Frías Fernández - 85% (Todos puntúan el 100%)

Alberto Rueda Romero - 100% (Todos puntúan el 100%)

## **1\. Arquitectura de Módulos y Estructura HTML5**

El sistema se ha estructurado dividiendo los flujos de trabajo en dos grandes áreas operativas: la interfaz pública/socio (orientada al usuario final e integración comercial) y la interfaz de administración B2B (orientada a la gestión operativa del centro deportivo).

Todas las vistas se han maquetado bajo el estándar HTML5 Semántico, eliminando la dependencia excesiva de divisiones genéricas (div) y sustituyéndolas por etiquetas descriptivas (header, nav, main, section, article, aside, footer, time, details, summary).

### **1.1. Portal Público y Área de Socios (B2C)**

#### **A. Inicio Público y Presentación Comercial (inicio.html / servicios.html)**

* **Propósito:** Punto de entrada principal a la plataforma SaaS para usuarios anónimos y clubes interesados.  
* **Estructura Técnica:**  
  * cabeceraPagina / cabeceraPrincipal: Contiene la marca PadelSlot, navegación contextual y accesos de conversión (Solicitar demo y Acceso de Socios).  
  * seccionVentajas / seccionInicio: Presenta mediante un article los beneficios clave de la membresía (reserva anticipada, monedero virtual, pasarela Stripe 3D) junto a un panel lateral (aside.pistasHoy / panelPistas) que lista disponibilidad en tiempo real mediante etiquetas time.  
  * seccionPilares: Describe los 4 pilares funcionales del software utilizando una lista ordenada ol.listaPilares.  
  * seccionInstalaciones / seccionPistas: Catálogo en cuadrícula (article.tarjetaInstalacion / tarjetaPista) con valoración, tipo de pista, etiquetas y botones de acción.  
  * seccionModulos: Desglose B2B de la arquitectura modular (Reserva de Pistas, Escuela Deportiva, Membresía y Servicios de Club).  
  * seccionPreguntas / seccionFaq: Implementación nativa de acordeones mediante details y summary para la resolución de dudas (FAQ).

#### **B. Autenticación y Captación (inicioSesionSocio.html / landingPage.html)**

* **Propósito:** Portal unificado de login para abonados y landing informativa para la captación de usuarios.  
* **Estructura Técnica:**  
  * Utiliza utilidades CSS de Tailwind CSS junto con reglas personalizadas de fondo y patrones (crosshair-pattern).  
  * selectorRoles: Menú de pestañas (menu.selectorRoles) para alternar contextualmente entre el login de *Socio del Club* y el de *Administrador / Staff (2FA)*.  
  * formularioAcceso: Formulario seguro con accesibilidad para lectores de pantalla, soporte para campos identificadores, botones de alternancia de contraseña y sección dedicada al acceso mediante carnet QR móvil.  
  * columnaInformacion: Panel lateral (aside.columnaInformacion) que proyecta métricas del club (monitor de ocupación en vivo al 76%, estado de tornos y focos LED) e instalaciones.

#### **C. Portal Privado del Socio (inicioSocio.html)**

* **Propósito:** Panel de control personal para el socio autenticado dentro de una instalación de marca blanca.  
* **Estructura Técnica:**  
  * barraInformativa: Identifica la instalación activa dentro del entorno multi-tenant SaaS (*Racket Club Sevilla*).  
  * bannerAcceso: Avisador diferenciador de políticas para jugadores no socios e invitados frente a abonados.  
  * tarjetaMembresia: Resumen de estado del socio que integra el valor de la cuota mensual, fecha de renovación y saldo actualizado del monedero virtual.  
  * seccionReservas: Módulo interactivo con filtro lateral de fechas y cuadrante con tarifas desglosadas por condición (Precio No Socio vs. Precio Socio).

#### **D. Flujo de Reserva para No Socios / Invitados (reservaNoSocio.html)**

* **Propósito:** Proceso de alquiler puntual sin registro previo obligatorio para jugadores externos.  
* **Estructura Técnica:**  
  * pasoFecha: Indicador semántico de progreso de 3 pasos (ol.pasoFecha).  
  * cuadrante: Disposición en cuadrícula de pistas por tipología (Cubierta Central, Panorámica Premium, Exterior Pro) con botones de estado dinámicos (Disponible, Tu selección, Ocupada).  
  * seccionParticipantes: Asignación de los 4 jugadores de la partida, aplicando el cálculo de suplemento por no socio (+3,00 €/persona).  
  * summary-sidebar: Lateral sticky que procesa los datos para la generación del código QR de acceso a tornos, suplementos (parking, bote de bolas) y pasarela de pago exprés (Tarjeta, Bizum, Apple Pay, Google Pay).

### **1.2. Panel de Administración B2B (Back-Office)**

#### **A. Dashboard Principal de Control (inicioAdmin.html)**

* **Propósito:** Centro de mando para la gerencia y recepción del club.  
* Estructura Técnica:  
  * Layout fijo dividido en barra lateral de navegación (aside.barraLateral) y zona de aplicación (section.contenidoApp).  
  * rejillaKpi: 4 tarjetas métricas principales: Reservas de hoy, Ocupación general (76%), Ingresos diarios (1.284 €) y Socios activos (486).  
  * tablaHorarios: Matriz de ocupación que mapea horizontalmente las franjas horarias frente a las pistas, codificando mediante colores el estado de cada hueco (Disponible, Reservado, Clase dirigida, Mantenimiento).  
  * **columnaSecundaria:** Paneles laterales para la agenda diaria, sistema de alertas urgentes (devueltos SEPA, fallos en focos) y renovaciones de cuotas entrantes.

#### **B. Programación Semanal de la Escuela (progSemanalAdmin.html)**

* **Propósito:** Gestión integral de grupos, monitores, niveles y plazas de la escuela deportiva.  
* **Estructura Técnica:**  
  * resumenSemana: Indicadores sintéticos sobre grupos activos (18), alumnos inscritos (126) y porcentaje de ocupación (84%).  
  * panelFiltros: Selectores interactivos para filtrar el cuadrante por Nivel (Iniciación, Intermedio, Avanzado), Monitor, Pista y Estado.  
  * calendario: Estructura en columnas por días de la semana donde cada article.tarjetaClase desglosa horario, monitor asignado, pista y ratio de plazas ocupadas (ej. 6/6 alumnos).  
  * panelOcupacion y panelRecomendaciones: Módulos de inteligencia de negocio que sugieren la apertura de nuevos grupos basándose en la demanda.

#### **C. Gestión Operativa de Servicios (serviciosAdmin.html / sociosAdmin.html)**

* **Propósito:** Control de servicios complementarios, instalaciones y explotación comercial.  
* **Estructura Técnica:**  
  * seccionParking: Monitor LPR en tiempo real que registra lecturas de matrícula vía cámara, asociándolas a la ficha del socio o la reserva activa y controlando el estado de la barrera de entrada/salida.  
  * seccionServicios: Gestión dividida entre la Cafetería "Tercer Tiempo" (control de comandas de terraza y cobro directo al monedero del socio) y la Tienda Pro-Shop (venta rápida de consumibles y préstamo de palas de test con hora de devolución).  
  * seccionTaquillas: Mapa visual interactivo de 24 módulos con codificación por colores según disponibilidad (Libre, Asignada por NFC/PIN, Abono Fijo Mensual).

## **2\. Estilos y Sistema Visual (SCSS/CSS)**

El sistema visual de PadelSlot SaaS se ha estructurado utilizando SASS (Syntactically Awesome Style Sheets) mediante la sintaxis SCSS y la regla moderna @use, garantizando una arquitectura modular, escalable y mantenible.

### **2.1. Configuración de Variables y Fundamentos Visuales**

**La dirección visual y los tokens del sistema se definen en tres archivos clave dentro del directorio de estilos:**

* **Paleta de Colores (\_colores.scss):** Define la identidad cromática del ecosistema.  
  * \$color-primario: \#255945; (Verde corporativo de acento/fondo identitario).  
  * \$color-secundario: \#ffffff; (Blanco neutro para tarjetas y fondos limpios).  
  * \$color-terciario: \#DEF127; (Verde lima de alto impacto, asociado visualmente a la pelota de pádel y usado en elementos interactivos).  
  * \$color-titulo: \#000000; (Contraste máximo para jerarquía tipográfica).  
  * \$color-texto: \#9f9898; (Gris para textos secundarios y detalles de apoyo).  
  *   
* **Tipografía (\_fuentes.scss): Garantiza la jerarquía clara del contenido.**  
  * Títulos: 'Space Grotesk', sans-serif para dotar de personalidad técnica e innovadora a encabezados y llamadas de atención.  
  * **Cuerpo y UI:** 'Inter', sans-serif para garantizar legibilidad en tablas, paneles y textos largos.  
  * Escala de Tamaños: Desde \$tamano-pequeno (0.875rem) para metadatos y etiquetas, pasando por \$tamano-base (1rem), hasta \$tamano-h1 (2.75rem) para titulares principales.  
  *   
* **Espaciados y Dimensiones (\_espaciados.scss): Aplica una escala armónica de márgenes, paddings y bordes.**  
  * Valores de espacio entre \$espacio-xs (0.5rem) y \$espacio-xxl (4rem).  
  * Radios de borde configurados (\$radio-s: 0.5rem, \$radio-m: 0.75rem, \$radio-l: 1.25rem y \$radio-pastilla: 999px) para tarjetas y botones redondeados.  
  * Contenedor máximo de lectura fijado en \$ancho-maximo: 75rem (1200px).

### **2.2. Funciones, Mixins y Normalización**

* **Lógica Modular (\_mixins.scss):** Incluye la función de conversión estandarizada de píxeles a rem (rem(\$px)), mixins para la disposición centrada de elementos (@mixin flex-centrado), límites de ancho global (@mixin contenedor) y consultas de medios estandarizadas (@mixin desde(\$punto)) orientadas a dispositivos tablet (48rem / 768px) y escritorio (64rem / 1024px).

* **Reseteo Base (\_reseteo.scss):** Aplica box-sizing: border-box de forma universal, elimina márgenes/paddings por defecto, fuerza el comportamiento suave del desplazamiento (scroll-behavior: smooth) y establece la tipografía base e imponen reglas de fluidez visual en imágenes y vectores (max-width: 100%).

## **3\. Tecnologías, Frameworks y Herramientas**

**El desarrollo de la plataforma se ha apoyado en una pila tecnológica orientada a estándares web actuales, garantizando rendimiento, mantenibilidad y rapidez de renderizado.**

### **3.1. Lenguajes y Preprocesadores**

* **HTML5 Semántico:** Utilizado como estructura base en todas las vistas, garantizando la correcta categorización de los contenidos y un arbol DOM optimizado.  
* **SASS / SCSS (Dart Sass):** Utilizado para estructurar la capa de estilos mediante el uso de módulos con @use, evitando la contaminación global del espacio de nombres y permitiendo la reutilización de código mediante mixins y funciones.  
* **CSS3 Nativo & CSS Grid / Flexbox:** Empleados para la maquetación de los sistemas de cuadrícula de alta densidad en paneles de control y listas fluidas de tarjetas.

### **3.2. Frameworks, Librerías y CDNs**

* **Tailwind CSS (Engine CDN):** Utilizado de forma puntual en flujos específicos como las pantallas de acceso (inicioSesionSocio.html y landingPage.html), aprovechando su motor JIT para clases de utilidad en formularios y layouts de dos columnas.

* **Phosphor Icons & Google Material Symbols:** Conjuntos de iconografía vectorial cargados mediante CDN (@phosphor-icons/web y Material Symbols Outlined), proporcionando coherencia gráfica en componentes como indicadores de estado, botones de acción y menús.

* **Google Fonts API:** Integración de las fuentes tipográficas corporativas Inter (cuerpo de texto e interfaz) y Space Grotesk (encabezados e identidad gráfica).

### **3.3. Entorno de Desarrollo y Automatización**

* **VS Code & Live Server:** Entorno de desarrollo integrado con recarga en tiempo real para la verificación instantánea de cambios visuales y estructurales.  
* **Sass Compiler (Extension / CLI):** Encargado de transformar los parciales .scss (\_colores, \_espaciados, \_fuentes, \_mixins, \_reseteo) en la hoja compilada main.css y su correspondiente mapa de origen main.css.map para depuración.

## **4\. Accesibilidad, Responsive y Usabilidad (UX/UI)**

El diseño de PadelSlot SaaS se ha construido priorizando la facilidad de uso tanto en movilidad como en pantallas de alta resolución, cumpliendo las directrices de accesibilidad WCAG 2.1 Level AA.

### **4.1. Adaptabilidad Responsive**

El sistema se ha planteado bajo el enfoque Mobile-First en las vistas públicas y de socios, y de alta densidad de información (Dashboard B2B) en los paneles de administración.

* **Grid e Inclinación en Escritorio:** Las vistas complejas como el cuadrante de reservas (inicioAdmin.html y progSemanalAdmin.html) emplean cuadrículas en CSS Grid de múltiples columnas (grid-template-columns: 240px 1fr o distribución en 2 columnas principales), que colapsan linealmente en dispositivos móviles para mantener la lectura sin scroll horizontal incómodo.  
* **Puntos de Ruptura (Breakpoints):** Definidos mediante el mixin @mixin desde() en 48rem (tablets) y 64rem (escritorio), complementados con Media Queries fluidas en la vista de reservas (@media (max-width: 1024px) y @media (max-width: 768px)).


### **4.2. Accesibilidad e Interacción Visual**

* **Navegación por Teclado y Contraste:** Uso estricto de elementos semánticos a, button, input y select. El contraste entre el texto secundario/titulares e impresiones de fondo supera la relación 4.5:1 exigida por la normativa.  
    
* **Etiquetado ARIA:** Incorporación de atributos sintácticos como aria-label="Navegación principal", aria-label="Atención y Soporte" y regiones delimitadas con aria-labelledby para facilitar la lectura mediante lectores de pantalla.  
    
* **Retroalimentación Visual (Feedback):** Estados :hover y transiciones suaves (0.2s ease-in-out) en botones e ítems del menú, badges de estado con codificación de color semántica (Verde: Disponible/Completado, Rojo: Alerta/Ocupado, Amarillo/Lima: Selección activa).

## **5\. Pruebas, Verificación y Control de Calidad**

**Para asegurar la calidad técnica del código generado y la fidelidad del diseño, se han realizado diversas pruebas organizadas en tres niveles:**

### **5.1. Validación Semántica y Estilo**

* **Validación W3C HTML:** Se han analizado todas las plantillas HTML a través del servicio de validación de marcas W3C (Nu HTML Checker) para corregir anidamientos no válidos, etiquetas no cerradas o atributos duplicados, garantizando un parsing limpio.  
* **Validación y Dintel CSS (Stylelint):** Verificación de las hojas de estilo SCSS para evitar propiedades duplicadas, asegurar la sintaxis modular de Dart Sass y verificar que las reglas compiladas en main.css mantengan una coherencia estructural sin desbordamientos.

### **5.2. Pruebas de Adaptabilidad y Compatibilidad (Cross-Browser)**

* **Verificación Mutidispositivo:** Inspección de vistas en resoluciones móviles (375px / 414px), tablets (768px / 834px) y pantallas de escritorio Full HD (1920px), comprobando que los elementos del cuadrante y barras laterales adapten su posicionamiento sin generar desbordamientos indeseados.  
* **Pruebas en Motores de Renderizado:** Evaluación de rendimiento visual en Chromium (Google Chrome, Microsoft Edge), Gecko (Mozilla Firefox) y WebKit (Apple Safari), comprobando la renderización precisa de tipografías, sombras y bordes redondeados.

### **5.3. Pruebas de Accesibilidad y Usabilidad**

* **Auditoría con Wave y Lighthouse:** Ejecución de análisis automatizados en las vistas públicas y privadas. Se verificaron los radios de contraste cromático sobre el verde corporativo (\#255945) y el verde lima (\#DEF127), asegurando la legibilidad adecuada sobre fondos oscuros y claros.  
* **Simulación de Lectores de Pantalla:** Comprobación del orden lógico de lectura por tabulación mediante teclado y validación de descripciones alternativas en imágenes y botones interactivos.

## **6\. Conclusiones y Estado del Proyecto**

La implementación realizada durante este Sprint de PadelSlot SaaS consolida una base tecnológica robusta y limpia para la gestión integral de clubes de pádel.

### **6.1. Logros Alcanzados**

1. **Semántica HTML5 Estricta:** Reestructuración de la maquetación eliminando la dependencia excesiva de contenedores genéricos y utilizando elementos descriptivos (main, header, nav, article, section, aside, footer).  
2. **Sistemas Modulares SCSS:** Arquitectura CSS basada en variables de diseño unificadas y separación de responsabilidades en archivos parciales (\_colores, \_fuentes, \_espaciados, \_mixins, \_reseteo) importados limpiamente en main.scss.  
3. **Experiencia de Usuario Adaptada:** Coexistencia fluida entre el portal público enfocado a la conversión/reserva rápida y la plataforma B2B enfocada a la eficiencia operativa.

