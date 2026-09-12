/**
 * Configuración global y constantes de marca — Eco Energy Tassoclock S.A.S.
 * Datos del negocio alineados con Solar-Content-System/config.py.
 * Paleta y ganchos según docs/ESTUDIO-DISENO-WEB-2026-09.md (Solar-Content-System).
 */

export const CONFIG = {
  brand: {
    name: 'ECO ENERGY',
    legal: 'Eco Energy Tassoclock S.A.S',
    sub: 'TASSOCLOCK S.A.S',
    slogan: 'Tu techo es tu mejor inversión',
    description:
      'Instalación, mantenimiento y venta de paneles solares en la Costa Caribe colombiana. Ahorra hasta 80% en tu factura y resuelve los apagones.',
  },
  whatsapp: {
    // ⚠️ CAMBIAR por el número real del negocio (mismo placeholder que
    // Solar-Content-System hasta la confirmación del dueño, Paso 12).
    number: '573001234567',
    defaultMessage:
      'Hola Eco Energy 👋 Quiero información sobre paneles solares para mi casa o negocio',
  },
  social: {
    // ⚠️ COMPLETAR con los perfiles reales cuando se creen
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
  },
  zona: {
    titulo: 'Costa Caribe colombiana',
    ciudades: [
      'Arjona',
      'Cartagena',
      'Barranquilla',
      'Santa Marta',
      'Sincelejo',
      'Montería',
      'Valledupar',
    ],
  },
  horario: 'Lunes a sábado, 8:00 am - 6:00 pm',

  // Sector (docs/INVESTIGACION-MERCADO.md · Solar-Content-System)
  stats: {
    ahorro: 80, // % de reducción de factura
    radiacion: 5.8, // kWh/m² por día en el Caribe
    retorno: 6, // años para recuperar la inversión (4-6)
    vidaUtil: 25, // años de vida útil del sistema
  },

  // Servicios con precio de referencia (COP) — igual que /api/config del sistema
  servicios: [
    {
      id: 'residencial',
      icono: '🏠',
      nombre: 'Sistema solar residencial',
      descripcion:
        'Sistema de 2 a 10 kWp conectado a la red. Reduce tu factura hasta 80% desde el primer mes.',
      precio: 9_000_000,
      badge: 'Más pedido',
    },
    {
      id: 'comercial',
      icono: '🏪',
      nombre: 'Sistema solar comercial',
      descripcion:
        'Para negocios y zona comercial de la Costa Caribe. Diseñado según tu consumo real.',
      precio: 15_000_000,
      badge: 'Negocios',
    },
    {
      id: 'mantenimiento',
      icono: '🛠️',
      nombre: 'Mantenimiento de paneles',
      descripcion:
        'Limpieza, revisión eléctrica y monitoreo de tu instalación para que siempre produzca al máximo.',
      precio: 150_000,
      badge: 'Por año',
    },
    {
      id: 'venta_paneles',
      icono: '🔆',
      nombre: 'Venta de paneles e inversores',
      descripcion:
        'Equipos nuevos con garantía, instalados por técnicos certificados de la región.',
      precio: 0,
      badge: 'Cotiza',
    },
  ],

  // Parámetros de la calculadora de ahorro (radiación Caribe).
  calculadora: {
    tarifaCOPPorKwh: 850, // tarifa promedio Caribe (Afinia/Air-e)
    kwhMesPorKwp: 140, // 1 kWp ≈ 140 kWh/mes con 5.0-5.8 kWh/m²/día
    offsetMaximo: 0.8, // el sistema cubre hasta ~80% del consumo
    costoPorVatio: 2_800, // COP por vatio instalado (rango 2.000-3.500)
  },

  colombia: true, // badge "Costa Caribe · Colombia"

  // Solar-Content-System (agentes de contenido). URL base de la API en
  // producción (Railway). Vacío = la web solo usa el feed local
  // /content/noticias.json (copia del feed del agente). Ej:
  // base: 'https://eco-energy-tassoclock.up.railway.app'
  api: {
    base: '',
  },
};

// Navegación: secciones de la página.
export const NAV_ESTRUCTURA = [
  { href: '#top', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#noticias', label: 'Noticias' },
  { href: '#contacto', label: 'Contacto' },
];
