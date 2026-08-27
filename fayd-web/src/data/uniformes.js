/**
 * Uniformes B2B — constantes del cotizador.
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */

export const UNIFORME_TIPOS = [
  { id: 'futbol', label: '⚽ Equipo de fútbol', whatsapp: 'uniformes para equipo de fútbol' },
  { id: 'colegio', label: '🏫 Colegio', whatsapp: 'uniformes deportivos para colegio' },
  { id: 'empresa', label: '🏢 Empresa / dotación', whatsapp: 'dotación deportiva para empresa' },
  { id: 'gimnasio', label: '💪 Gimnasio / academia', whatsapp: 'uniformes para gimnasio o academia' },
];

export const UNIFORME_COLORES = [
  { id: 'negro', label: 'Negro', hex: '#111111' },
  { id: 'blanco', label: 'Blanco', hex: '#ffffff' },
  { id: 'rojo', label: 'Rojo', hex: '#dc2626' },
  { id: 'azul', label: 'Azul', hex: '#2563eb' },
  { id: 'verde', label: 'Verde', hex: '#16a34a' },
  { id: 'amarillo', label: 'Amarillo', hex: '#eab308' },
  { id: 'morado', label: 'Morado', hex: '#7c3aed' },
  { id: 'gris', label: 'Gris', hex: '#6b7280' },
];

export const UNIFORME_PASOS = [
  { n: '1', titulo: 'Cuéntanos tu idea', texto: 'Deportes, tallas, colores y tu escudo. Por WhatsApp, sin costo.' },
  { n: '2', titulo: 'Propuesta de diseño', texto: 'Te enviamos mockup digital con tus colores en menos de 24 horas.' },
  { n: '3', titulo: 'Aprobación', texto: 'Ajustamos hasta que el diseño te encante. Tú das el visto bueno.' },
  { n: '4', titulo: 'Producción', texto: 'Sublimación full print en tela dry-fit, control de calidad por prenda.' },
  { n: '5', titulo: 'Entrega', texto: 'Envío a todo Colombia con guía de rastreo. 10-15 días hábiles.' },
];

/**
 * Beneficios "TODO PERSONALIZADO, NADA GENÉRICO" con su detalle expandible
 * (acordeón): cada ítem se despliega al click con las instrucciones reales.
 */
export const BENEFICIOS_UNIFORME = [
  {
    icono: '🛡️',
    titulo: 'Tu escudo o logo en sublimación full print',
    detalle: 'Mándanos tu escudo por WhatsApp en imagen clara (PNG, PDF o foto nítida). Lo vectorizamos y ajustamos sin costo antes de imprimir.',
  },
  {
    icono: '✏️',
    titulo: 'Nombres y números de cada jugador',
    detalle: 'Envíanos la lista: nombre, número y talla de cada jugador (mensaje o Excel). Cada prenda sale personalizada y verificada una a una.',
  },
  {
    icono: '🎨',
    titulo: 'Colores institucionales exactos',
    detalle: 'Trae el código exacto (Pantone o HEX) o una foto de referencia: igualamos el tono sobre la tela. Si no lo tienes, te proponemos combinaciones.',
  },
  {
    icono: '👕',
    titulo: 'Tela dry-fit de alto rendimiento',
    detalle: 'Poliéster técnico transpirable con secado rápido: no pesa, no se queda húmedo y soporta lavadas frecuentes sin despintar (la tinta vive dentro de la fibra).',
  },
  {
    icono: '👥',
    titulo: 'Tallas mixtas hombre, mujer y niño',
    detalle: 'Cada pedido puede mezclar tallas y cortes: adulto, dama y infantil, todos con tu mismo diseño. Te ayudamos con la tabla de tallas.',
  },
  {
    icono: '📈',
    titulo: 'Descuentos por volumen desde 20 unidades',
    detalle: 'Desde 20 prendas aplicamos precio especial por unidad (y con la promo vigente, el diseño digital va gratis). Pídenos la cotización por WhatsApp.',
  },
];
