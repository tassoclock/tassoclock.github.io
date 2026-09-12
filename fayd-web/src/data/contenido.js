/**
 * Contenido editorial solar: beneficios, proceso 1-2-3, noticias del sector
 * y testimonios. Los datos duros vienen de Solar-Content-System:
 *   docs/INVESTIGACION-MERCADO.md  (Fase 0)
 *   docs/TENDENCIAS-2026-09.md     (agente de tendencias, 240 titulares)
 *   docs/ESTUDIO-DISENO-WEB-2026-09.md
 */

// Ganchos ordenados por el estudio de tendencias:
// #1 factura/ahorro (73 menciones) · #2 apagones (58) · #3 subsidios (56)
export const BENEFICIOS = [
  {
    icono: '💸',
    titulo: 'Hasta 80% menos en la factura',
    texto:
      'El gancho #1 del Caribe: tu sistema solar paga la inversión en 4-6 años y sigue produciendo por más de 25.',
  },
  {
    icono: '🔌',
    titulo: 'Adiós a los apagones',
    texto:
      'Con respaldo de baterías, los cortes de luz dejan de detener tu hogar o tu negocio.',
  },
  {
    icono: '🏛️',
    titulo: 'Incentivos por ley',
    texto:
      'Ley 1715 y Ley 2099: exención de impuestos para sistemas residenciales y deducciones para empresas.',
  },
  {
    icono: '🌴',
    titulo: 'La mejor radiación del país',
    texto:
      'El Caribe tiene 5.0-5.8 kWh/m² diarios: de las zonas con mayor potencial solar de Colombia.',
  },
];

// Proceso 1-2-3 (patrón de los mejores sitios del sector — estudio, sección 3)
export const PROCESO = [
  {
    numero: '1',
    icono: '💬',
    titulo: 'Escríbenos por WhatsApp',
    texto:
      'Cuéntanos cuánto pagas de factura (o usa la calculadora). Te respondemos el mismo día, sin compromiso.',
  },
  {
    numero: '2',
    icono: '🔎',
    titulo: 'Visita técnica gratuita',
    texto:
      'Evaluamos tu techo, tu consumo y tu margen de ahorro real. Recibes una propuesta clara y a medida.',
  },
  {
    numero: '3',
    icono: '☀️',
    titulo: 'Instalas y ahorras',
    texto:
      'Instalación certificada en días, no semanas. Empiezas a pagar menos factura desde el primer mes.',
  },
];

// ⚠️ EJEMPLOS — reemplazar con testimonios reales de clientes de la zona
// (con nombre, ciudad y foto del proyecto cuando el dueño los consiga).
export const TESTIMONIOS = [
  {
    id: 1,
    nombre: 'Cliente residencial',
    texto:
      'Pasé de pagar $380.000 a menos de $90.000 de factura. Con los apagones de la zona, lo mejor fue el respaldo.',
    compra: 'Sistema 3 kWp · Arjona',
  },
  {
    id: 2,
    nombre: 'Negocio de barrio',
    texto:
      'La nevería no podía parar con cada corte. Con el sistema comercial trabajamos todos los días sin sustos.',
    compra: 'Sistema 8 kWp · Cartagena',
  },
  {
    id: 3,
    nombre: 'Finca familiar',
    texto:
      'La visita técnica fue gratis y la propuesta quedó clara: inversión recuperada en 5 años. Ya vamos al año 2.',
    compra: 'Sistema 5 kWp · Turbaco',
  },
];

// Noticias curadas del sector solar colombiano (fuentes: INVESTIGACION-MERCADO.md).
// ⚠️ COMPLETAR: conectar al feed noticias.json de Solar-Content-System cuando
// el workflow diario esté en producción (Fase 1, Paso 10).
export const NOTICIAS_SOLARES = [
  {
    id: 'ns1',
    titulo: 'Turbaco ya tiene la primera planta solar del país',
    descripcion:
      'El proyecto de Promigas en Bolívar marca un antes y un después para la energía del Caribe colombiano.',
    fecha: '2026-08-20',
    badge: '⚡ BOLÍVAR',
    badgeColor: 'sol',
    icono: '🏭',
    fullContent: `Bolívar se convirtió en referente energético del país: la primera planta solar de Colombia opera en Turbaco, a pocos kilómetros de Cartagena.

Para los habitantes de Arjona, Turbaco y Cartagena esto significa dos cosas: la región está validada para la generación solar y la cadena local de instaladores y técnicos sigue creciendo.

Eco Energy instala sistemas residenciales y comerciales en toda esa zona.`,
  },
  {
    id: 'ns2',
    titulo: 'El Gobierno se planteó 1 millón de familias con paneles solares',
    descripcion:
      'El anuncio nacional (Presidencia / MinMinas) impulsa los techos solares residenciales en todo el país.',
    fecha: '2026-08-12',
    badge: '🏛️ PAÍS',
    badgeColor: 'cielo',
    icono: '🏠',
    fullContent: `El anuncio de llevar paneles solares a un millón de familias posiciona a los techos residenciales como el motor de la transición energética.

Qué significa para el Caribe: más incentivos, más oferta de equipos y mejores precios de instalación. Quien instala ahora aprovecha los beneficios de la Ley 1715 y la Ley 2099 mientras la demanda regional sigue creciendo.`,
  },
  {
    id: 'ns3',
    titulo: 'Tu factura, el tema que más preocupa en la región',
    descripcion:
      'El análisis de 240 titulares del mes lo confirma: ahorro en la factura es el tema solar #1 en Colombia.',
    fecha: '2026-09-01',
    badge: '📊 TENDENCIA',
    badgeColor: 'sol',
    icono: '💸',
    fullContent: `El agente de tendencias de Eco Energy analizó 240 titulares de Google News Colombia del último mes:

- Factura/ahorro: 73 menciones (tema #1)
- Apagones/confiabilidad: 58 menciones
- Regulación/gobierno: 56 menciones

Traducción práctica: la pregunta que todos se hacen es cuánto se ahorra. La respuesta en el Caribe: hasta 80% de la factura, con retorno en 4-6 años.`,
  },
  {
    id: 'ns4',
    titulo: 'La solar ya le ganó al carbón en generación eléctrica',
    descripcion:
      'Con 4.473 GWh generados en 2025, la energía solar superó al carbón en la matriz colombiana.',
    fecha: '2026-07-28',
    badge: '📈 DATO',
    badgeColor: 'cielo',
    icono: '🔋',
    fullContent: `Colombia generó 4.473 GWh de energía solar en 2025: por primera vez, más que el carbón. El mercado pasó de 2,25 GW y proyecta llegar a 10,39 GW en 2031.

El momento de instalar es ahora: los equipos mejoran de precio y la radiación del Caribe produce más que en cualquier otra región del país.`,
  },
  {
    id: 'ns5',
    titulo: '¿Cuánto se ahorra de verdad con Afinia y Air-e?',
    descripcion:
      'Hasta 55% de ahorro en la factura con Afinia y cerca de 80% con un sistema de 4 kWp bien diseñado.',
    fecha: '2026-07-15',
    badge: '🧮 GUÍA',
    badgeColor: 'sol',
    icono: '🧾',
    fullContent: `Las eléctricas de la región (Afinia en Cartagena, Air-e en Barranquilla) ajustaron tarifas y el ahorro solar se nota más que nunca:

- Con Afinia: hasta 55% de reducción en la factura.
- Con un sistema residencial de 4 kWp: cerca de 80%.

La clave está en el diseño: el sistema debe dimensionarse con tu consumo real. Por eso la visita técnica de Eco Energy es gratuita.`,
  },
  {
    id: 'ns6',
    titulo: 'Los incentivos que pocos conocen (Ley 1715 y Ley 2099)',
    descripcion:
      'Exención de impuestos para sistemas residenciales y deducciones de renta para proyectos renovables.',
    fecha: '2026-07-05',
    badge: '🏛️ LEYES',
    badgeColor: 'bosque',
    icono: '📋',
    fullContent: `El marco legal colombiano favorece a quien instala hoy:

- Ley 1715: deducción de 50% de la inversión en renovables, exclusión de IVA para equipos y exención de aranceles.
- Ley 2099 (transición energética): extendió y afinó los incentivos para generación distribuida.

En un sistema residencial típico, estos beneficios reducen la inversión total de forma significativa. Pregunta por ellos al cotizar.`,
  },
];
