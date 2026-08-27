/**
 * Diseños de uniformes (sección Uniformes → "VESTIMOS TU EQUIPO").
 *
 * Flujo semiautomático igual que Procesos: el dueño suelta las fotos de
 * diseños en Fayd-Content-System/drive_sync/13-Disenos-uniformes/ junto al
 * JSON de metadatos y corre ejecutar_disenos.py; eso publica
 * /content/uniformes-disenos.json y esta galería deja de usar el respaldo.
 *
 * DISENOS_FALLBACK usa fotos demo (public/foto/disenos-demo/) mientras
 * tanto: cámbialas o publícalas por el pipeline.
 */

// ⚡ Urgencia configurable — si la fecha pasa, el banner se oculta solo.
export const PROMO_DISENO = {
  activo: true,
  fechaLimite: '2026-09-30', // "solo hasta" esta fecha (inclusive)
  minimo: 20,
};

export const LINEA_INFO = {
  futbol: { label: 'Fútbol', emoji: '⚽' },
  colegio: { label: 'Colegio', emoji: '🏫' },
  empresa: { label: 'Empresa', emoji: '🏢' },
  gimnasio: { label: 'Gimnasio', emoji: '💪' },
};

export const lineaInfo = (id) =>
  LINEA_INFO[id] || { label: 'Uniforme', emoji: '👕' };

/**
 * Normaliza las vistas de un diseño al formato que consume VisorAngulos:
 * [{src, label}]. Acepta vistas dinámicas del pipeline (etiqueta) o el
 * respalto estático; si no hay ninguna, arma una sola con la foto principal.
 * Un uniforme deportivo serio muestra: Frente · Dorsal · Pantaloneta ·
 * Escudo · Modelo puesto.
 */
export const vistasDeDiseno = (d) => {
  if (!d) return [];
  const vistas = (Array.isArray(d.vistas) ? d.vistas : [])
    .map((v) => ({
      src: v?.src || v?.imagen_url || '',
      label: v?.etiqueta || v?.label || 'Vista',
    }))
    .filter((v) => v.src);
  if (!vistas.length && d.src) vistas.push({ src: d.src, label: 'Frente' });
  if (d.fotoModelo && !vistas.some((v) => /modelo/i.test(v.label))) {
    vistas.push({ src: d.fotoModelo, label: 'Modelo' });
  }
  return vistas;
};

export const DISENOS_FALLBACK = [
  {
    id: 'demo-1',
    nombre: 'Kit Demo · Diseño 1',
    linea: 'futbol',
    src: '/foto/disenos-demo/d1.jpg',
    fotoModelo: '/foto/disenos-demo/m1.webp',
    masPedido: true,
    vistas: [
      { src: '/foto/disenos-demo/d1.jpg', etiqueta: 'Frente' },
      { src: '/foto/disenos-demo/m1.webp', etiqueta: 'Dorsal' },
      { src: '/foto/disenos-demo/d2.jpg', etiqueta: 'Pantaloneta' },
      { src: '/foto/disenos-demo/d3.jpg', etiqueta: 'Escudo' },
      { src: '/foto/disenos-demo/m2.webp', etiqueta: 'Modelo' },
    ],
  },
  {
    id: 'demo-2',
    nombre: 'Kit Demo · Diseño 2',
    linea: 'futbol',
    src: '/foto/disenos-demo/d2.jpg',
    fotoModelo: '/foto/disenos-demo/m1.webp',
    vistas: [
      { src: '/foto/disenos-demo/d2.jpg', etiqueta: 'Frente' },
      { src: '/foto/disenos-demo/m3.webp', etiqueta: 'Dorsal' },
      { src: '/foto/disenos-demo/d3.jpg', etiqueta: 'Pantaloneta' },
      { src: '/foto/disenos-demo/m1.webp', etiqueta: 'Escudo' },
      { src: '/foto/disenos-demo/m2.webp', etiqueta: 'Modelo' },
    ],
  },
  {
    id: 'demo-3',
    nombre: 'Kit Demo · Diseño 3',
    linea: 'futbol',
    src: '/foto/disenos-demo/d3.jpg',
    fotoModelo: '/foto/disenos-demo/m3.webp',
    vistas: [
      { src: '/foto/disenos-demo/d3.jpg', etiqueta: 'Frente' },
      { src: '/foto/disenos-demo/d1.jpg', etiqueta: 'Dorsal' },
      { src: '/foto/disenos-demo/m2.webp', etiqueta: 'Pantaloneta' },
      { src: '/foto/disenos-demo/m1.webp', etiqueta: 'Escudo' },
      { src: '/foto/disenos-demo/m3.webp', etiqueta: 'Modelo' },
    ],
  },
  {
    id: 'demo-4',
    nombre: 'Kit Demo · Modelo 1',
    linea: 'colegio',
    src: '/foto/disenos-demo/m2.webp',
    fotoModelo: '/foto/disenos-demo/m2.webp',
    vistas: [
      { src: '/foto/disenos-demo/m2.webp', etiqueta: 'Frente' },
      { src: '/foto/disenos-demo/d2.jpg', etiqueta: 'Dorsal' },
      { src: '/foto/disenos-demo/m1.webp', etiqueta: 'Pantaloneta' },
      { src: '/foto/disenos-demo/m3.webp', etiqueta: 'Modelo' },
    ],
  },
  {
    id: 'demo-5',
    nombre: 'Kit Demo · Modelo 2',
    linea: 'empresa',
    src: '/foto/disenos-demo/m3.webp',
    fotoModelo: '/foto/disenos-demo/m3.webp',
    vistas: [
      { src: '/foto/disenos-demo/m3.webp', etiqueta: 'Frente' },
      { src: '/foto/disenos-demo/m1.webp', etiqueta: 'Dorsal' },
      { src: '/foto/disenos-demo/d1.jpg', etiqueta: 'Escudo' },
      { src: '/foto/disenos-demo/m2.webp', etiqueta: 'Modelo' },
    ],
  },
  {
    id: 'demo-6',
    nombre: 'Kit Demo · Modelo 3',
    linea: 'gimnasio',
    src: '/foto/disenos-demo/m1.webp',
    fotoModelo: '/foto/disenos-demo/m1.webp',
    vistas: [
      { src: '/foto/disenos-demo/m1.webp', etiqueta: 'Frente' },
      { src: '/foto/disenos-demo/d3.jpg', etiqueta: 'Dorsal' },
      { src: '/foto/disenos-demo/m2.webp', etiqueta: 'Pantaloneta' },
      { src: '/foto/disenos-demo/d2.jpg', etiqueta: 'Modelo' },
    ],
  },
];
