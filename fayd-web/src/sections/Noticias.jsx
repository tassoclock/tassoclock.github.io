/**
 * Noticias del sector solar — sincronizada con el sistema de agentes
 * (Solar-Content-System). Orden de fuentes:
 *   1. API del sistema:  {CONFIG.api.base}/api/noticias   (feed del agente en vivo)
 *   2. Archivo local:    /content/noticias.json           (copia del feed del agente)
 *   3. Respaldo curado:  NOTICIAS_SOLARES (data/contenido.js)
 *
 * El agente escribe public/content/noticias.json diario a las 7:00 am
 * (workflow de GitHub Actions). El campo "resumen" del feed puede traer
 * HTML de Google News: se sanitiza con DOMParser antes de renderizar.
 */
import { useEffect, useState } from 'react';
import { cls, formatDate } from '../lib/utils';
import { SectionHeader } from '../components/ui';
import { CONFIG } from '../data/config';
import { NOTICIAS_SOLARES } from '../data/contenido';

const badgeColors = {
  sol: 'bg-sol text-bosque-profundo',
  cielo: 'bg-cielo text-white',
  bosque: 'bg-bosque text-white',
};

// Quita etiquetas HTML del resumen del feed sin ejecutar nada
// (DOMParser no descarga recursos ni corre scripts).
const limpiarHtml = (texto) => {
  if (!texto || !texto.includes('<')) return texto || '';
  try {
    return new DOMParser().parseFromString(texto, 'text/html').body.textContent.trim();
  } catch {
    return texto.replace(/<[^>]*>/g, '');
  }
};

const normalizarFecha = (fecha) => {
  const d = new Date(fecha);
  return isNaN(d) ? new Date().toISOString() : d.toISOString();
};

export default function Noticias() {
  const [noticia, setNoticia] = useState(null);
  const [feed, setFeed] = useState({ items: [], actualizado: null, fuente: null });

  useEffect(() => {
    const base = CONFIG.api?.base || '';
    const urls = [];
    if (base) urls.push(`${base.replace(/\/$/, '')}/api/noticias`);
    urls.push('/content/noticias.json'); // copia local del feed del agente

    (async () => {
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const json = await res.json();
          if (Array.isArray(json.noticias) && json.noticias.length > 0) {
            setFeed({
              items: json.noticias.map((n, i) => ({
                id: `feed-${i}`,
                titulo: n.titulo,
                descripcion: limpiarHtml(n.resumen),
                fecha: normalizarFecha(n.fecha),
                enlace: n.enlace,
                badge: '📰 FEED SOLAR',
                badgeColor: 'bosque',
                icono: '🗞️',
              })),
              actualizado: json.actualizado || null,
              fuente: url.startsWith('http') ? 'API Solar-Content-System' : 'Feed local del agente',
            });
            return;
          }
        } catch {
          // siguiente fuente
        }
      }
    })();
  }, []);

  // Feed del agente primero (noticias frescas), luego las curadas.
  const items = [...feed.items, ...NOTICIAS_SOLARES];

  // Escape + bloqueo de scroll con el modal abierto
  useEffect(() => {
    if (!noticia) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setNoticia(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [noticia]);

  const abrir = (n) => {
    if (n.enlace) window.open(n.enlace, '_blank', 'noopener,noreferrer');
    else setNoticia(n);
  };

  return (
    <section id="noticias" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Sector solar"
          title="LO QUE PASA EN LA"
          highlight="ENERGÍA COLOMBIANA"
          description="Noticias reales publicadas cada mañana por el agente de contenido de Eco Energy, más análisis propio del equipo."
        />
        {feed.actualizado && (
          <p className="text-center text-neutral-400 text-xs mb-6 -mt-6">
            ⚡ Feed automático activo ({feed.fuente}) · actualizado: {formatDate(feed.actualizado)}
          </p>
        )}
        <div
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4"
        >
          {items.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => abrir(n)}
              className="snap-center shrink-0 w-[290px] sm:w-[330px] text-left bg-crema border-2 border-neutral-100 hover:border-sol/70 rounded-2xl p-6 transition-colors shadow-sm hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={cls('text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full', badgeColors[n.badgeColor] || badgeColors.sol)}>
                  {n.badge}
                </span>
                <span className="text-3xl" aria-hidden="true">{n.icono}</span>
              </div>
              <h3 className="text-neutral-900 font-black leading-snug line-clamp-3">{n.titulo}</h3>
              <p className="text-neutral-500 text-sm mt-2 leading-relaxed line-clamp-3">{n.descripcion}</p>
              <p className="text-neutral-400 text-xs mt-4 font-semibold">
                {formatDate(n.fecha)} · {n.enlace ? 'Leer en la fuente ↗' : 'Leer más →'}
              </p>
            </button>
          ))}
        </div>
        <p className="text-center text-neutral-400 text-xs mt-4">
          Desliza para ver más →
        </p>
      </div>

      {/* Modal de nota curada (las del feed abren la fuente en pestaña nueva) */}
      {noticia && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setNoticia(null)}
          role="dialog"
          aria-modal="true"
          aria-label={noticia.titulo}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setNoticia(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center"
              aria-label="Cerrar nota"
            >
              ✕
            </button>
            <span className={cls('inline-block text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4', badgeColors[noticia.badgeColor] || badgeColors.sol)}>
              {noticia.badge}
            </span>
            <h3 className="text-neutral-900 font-black text-xl leading-snug pr-8">{noticia.titulo}</h3>
            <p className="text-neutral-400 text-xs mt-1 mb-4">{formatDate(noticia.fecha)}</p>
            <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
              {noticia.fullContent}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
