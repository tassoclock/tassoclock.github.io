/**
 * Procesos de fabricación (sección Uniformes) — videos de YouTube.
 *
 * Flujo semiautomático: el dueño sube el video a su canal y pega el ID en
 * Fayd-Content-System/drive_sync/11-Procesos/nuevos_procesos.json; luego
 * ejecutar_procesos.py publica /content/procesos.json y esta sección deja
 * de usar el respaldo (lee el dinámico primero, igual que Catálogo).
 *
 * El manifest de abajo es DEMO (videos públicos de fábricas textiles como
 * referencia visual) mientras el canal FAYD publica los suyos.
 */

// Taxonomía fija de etapas — misma que valida el publicador en Python.
export const PROCESO_ETAPAS = {
  diseno: { label: 'Diseño', emoji: '🎨' },
  sublimacion: { label: 'Sublimación', emoji: '🖨️' },
  corte: { label: 'Corte', emoji: '✂️' },
  confeccion: { label: 'Confección', emoji: '🧵' },
  nombres: { label: 'Nombres y números', emoji: '🔢' },
  calidad: { label: 'Control de calidad', emoji: '✅' },
  empaque: { label: 'Empaque', emoji: '📦' },
};

export const etapaInfo = (id) =>
  PROCESO_ETAPAS[id] || { label: 'Proceso', emoji: '🎬' };

/** Miniatura oficial de YouTube (no requiere API key). */
export const thumbYouTube = (youtubeId) =>
  `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

/** Reproductor embebido en modo privacidad, autoplay al abrir el modal. */
export const embedYouTube = (youtubeId) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

export const PROCESOS_FALLBACK = [
  {
    id: 'demo-sublimacion',
    youtubeId: 'u8sQz44Xu2c',
    titulo: 'Sublimación full print sobre tela dry-fit',
    descripcion:
      'El diseño se imprime en grande y se transfiere con calor y presión: el color queda dentro de la fibra, no encima. Por eso no se cuartea ni se destiñe.',
    etapa: 'sublimacion',
  },
  {
    id: 'demo-confeccion',
    youtubeId: 'Zb9tNiERzUg',
    titulo: 'Corte y confección de la prenda',
    descripcion:
      'Del rollo de tela a la camiseta armada: corte de paneles, costuras reforzadas en hombros y cuello, y dobladillos elásticos.',
    etapa: 'confeccion',
  },
  {
    id: 'demo-nombres',
    youtubeId: '7xOOEzN-TUs',
    titulo: 'Estampado de nombres y números',
    descripcion:
      'Cada jugador lleva su nombre y dorsal aplicados con transfer térmico, medidos y centrados uno a uno.',
    etapa: 'nombres',
  },
  {
    id: 'demo-calidad',
    youtubeId: 'itzs77qnHGw',
    titulo: 'Revisión pieza por pieza',
    descripcion:
      'Antes de empacar revisamos costuras, estampas y tallas. Lo que no pasa el control, no sale.',
    etapa: 'calidad',
  },
];
