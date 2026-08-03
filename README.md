# Black Crown Barber Club — landing de demostración

Landing page de una sola página para una barbería. HTML + CSS + JS vanilla, sin frameworks ni dependencias que instalar.

**Es una demo: el negocio es ficticio.** Nombre, dirección, teléfono, precios, promoción y reseñas son inventados para enseñar el diseño. Está avisado en el pie de la página.

Para verla, abre `index.html` en el navegador. No necesita servidor.

## Estructura

```
index.html         Toda la página (8 secciones)
css/style.css      Sistema de diseño: color, tipografía y componentes
js/main.js         Menú móvil, cabecera al hacer scroll, animaciones, visor de galería
images/favicon.svg Icono de marca
```

## Secciones, en orden

1. **Hero** — chips de promoción y ubicación, titular grande con la segunda línea en color, prueba social (avatares + 4,9 + reseñas) justo debajo, y barra inferior con el teléfono y el botón de reserva.
2. **Franja de diferenciales** — 12 años de oficio, atención personalizada, producto profesional, ambiente cuidado.
3. **Servicios** — 4 tarjetas con foto, precio, duración y su propio botón de reserva.
4. **Galería** — 6 trabajos, con visor a pantalla completa al pulsar.
5. **Sobre nosotros** — texto corto de confianza + fila de cifras (12+ años, 1.000+ clientes, 4,9, 0 esperas).
6. **Opiniones** — 3 reseñas con avatar y valoración media.
7. **Ubicación y contacto** — dirección, horario, teléfono, Instagram y mapa.
8. **CTA final** — cierre con el botón de reserva.

Más el botón flotante de WhatsApp, que aparece al bajar del hero.

## Estilo visual

Mezcla de dos referencias: la elegancia oscura y ornamental de una barbería premium, con el lenguaje de interfaz moderno (tipografía bold, botones en forma de píldora, tono arena, prueba social bajo el titular).

- **Color:** negro profundo (`#08080a`) y acento arena cálido (`#e3b77e`). Sin colores llamativos.
- **Tipografía:** Plus Jakarta Sans (titulares, 800) + Inter (texto). Titulares en caja baja, muy apretados, con parte de la frase en el color de acento.
- **Formas:** botones y chips en píldora, tarjetas de esquina redondeada (22px).
- **Ornamento:** el aro dorado concéntrico del hero y del CTA final es un SVG en línea de unas pocas líneas — da el toque premium sin pesar nada.

## Conversión: todo apunta a WhatsApp

Hay **9 puntos de reserva** en la página (cabecera, hero, los 4 servicios, contacto, CTA final y botón flotante), más el teléfono en el hero y en contacto. Cada botón abre WhatsApp con un mensaje ya escrito; los de servicios llevan además el servicio concreto, así el barbero sabe de qué se trata sin preguntar.

## Datos por sustituir antes de usarla de verdad

Todos son de ejemplo. Lo más rápido es "buscar y reemplazar" en `index.html`:

| Marcador | Qué es |
|---|---|
| `34600000000` | Número de WhatsApp en todos los enlaces `wa.me/...` (formato internacional, sin `+` ni espacios) |
| `+34 600 00 00 00` | Teléfono visible en el hero y en contacto |
| `Calle Mayor 42` / `30201 Cartagena, Murcia` | Dirección (hero, contacto, pie, mapa y datos estructurados) |
| `−10% en tu primera visita` | Promoción del hero. Si no vais a hacerla, borrad el chip entero |
| `blackcrownbarberclub` | Usuario de Instagram |
| Horarios `10:00 – 20:30`, `09:30 – 14:30` | Tabla de horario y datos estructurados (JSON-LD) |
| Precios `15 €`, `22 €`, `17 €`, `10 €` | Tarjetas de servicios |
| `4,9`, `214 reseñas` y las 3 opiniones | Sustituir por las reales de la ficha de Google |
| Cifras `12+`, `1.000+`, `0` | Sección de nosotros |
| `https://www.blackcrownbarberclub.es/` | Dominio en `canonical`, Open Graph y JSON-LD |
| Aviso de "web de demostración" en el pie | Borrar cuando deje de ser una demo |

## Fotos

Las fotos se cargan desde Unsplash (uso libre) y sirven para enseñar el diseño. **Hay que sustituirlas por fotos reales del local**: una barbería se vende por su imagen y las fotos genéricas se notan.

Dónde hay fotos: hero (1), tarjetas de servicio (4), galería (6), sobre nosotros (1), CTA final (1), y los avatares del hero y de las opiniones (3, recortados a la cara con `fit=facearea`).

Para cambiarlas, edita el `src` de cada `<img>` (por ejemplo `images/galeria/fade-01.jpg`), mantén `loading="lazy"` y escribe un `alt` que describa la foto. Recomendado: `.jpg` o `.webp` de ~1600px de ancho como mucho y comprimidas (por ejemplo en squoosh.app).

La foto del hero es la que más pesa: es la primera que se ve, conviene que sea buena y esté bien comprimida.

## Notas técnicas

- **Móvil primero.** Probado a 375px, tablet, 1024px, 1320px y 1440px. En escritorio la foto del hero ocupa la mitad derecha; en móvil pasa a ser el fondo de toda la sección.
- **Sin librerías.** Solo dos tipografías de Google Fonts con `display=swap`.
- **Animaciones al hacer scroll** con `IntersectionObserver` (clase `.reveal`), y todo el movimiento se desactiva si el sistema tiene activado "reducir movimiento".
- **Accesible:** navegación por teclado en la galería y el visor (Esc y flechas), enlace para saltar al contenido, textos alternativos y foco visible.
- **SEO:** `title`, `meta description`, Open Graph y datos estructurados `HairSalon` con horario y valoración, para la ficha de Google.
- Si el JavaScript falla, la página sigue leyéndose y se puede reservar: los botones son enlaces normales.
- El mapa de Google se oscurece con un filtro CSS para que encaje con el diseño. Si se prefiere el mapa en color, basta con borrar la línea `filter:` de `.contact__map iframe` en `css/style.css`.
