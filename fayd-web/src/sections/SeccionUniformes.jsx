/**
 * Uniformes B2B — "VESTIMOS TU EQUIPO": lookbook interactivo.
 * Izquierda: galería de diseños (click = activo) + ajustes del pedido.
 * Derecha: foto grande del diseño en un modelo + beneficios expandibles.
 * Debajo: pasos compactos y videos "NUESTRO PROCESO" (YouTube).
 * Los diseños los publica fayd-content-system en
 * /content/uniformes-disenos.json; mientras tanto se usa el manifest demo.
 */
import { useEffect, useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { Button, SectionHeader, VisorAngulos } from '../components/ui';
import { CONFIG } from '../data/config';
import {
  UNIFORME_TIPOS,
  UNIFORME_COLORES,
  UNIFORME_PASOS,
  BENEFICIOS_UNIFORME,
} from '../data/uniformes';
import { PROMO_DISENO, DISENOS_FALLBACK, lineaInfo, vistasDeDiseno } from '../data/disenos';
import {
  PROCESOS_FALLBACK,
  etapaInfo,
  thumbYouTube,
  embedYouTube,
} from '../data/procesos';

export default function SeccionUniformes() {
  // --- Galería de diseños ---
  const [disenos, setDisenos] = useState(DISENOS_FALLBACK);
  const [activoId, setActivoId] = useState(DISENOS_FALLBACK[0]?.id);
  // Modal visor de ángulos (igual que Nuestra Colección).
  const [disenoModal, setDisenoModal] = useState(null);

  // --- Ajustes del pedido ---
  const [tipo, setTipo] = useState('futbol');
  const [colores, setColores] = useState([]);
  const [verColores, setVerColores] = useState(false);
  const [cantidad, setCantidad] = useState(12);

  // --- Acordeón de beneficios ---
  const [beneficioAbierto, setBeneficioAbierto] = useState(null);

  // --- Videos "Nuestro proceso" ---
  const [procesos, setProcesos] = useState(PROCESOS_FALLBACK);
  const [videoActivo, setVideoActivo] = useState(null);

  // Diseños dinámicos (pipeline semiautomático).
  useEffect(() => {
    fetch('/content/uniformes-disenos.json')
      .then((res) => (res.ok ? res.json() : Promise.reject('sin disenos')))
      .then((json) => {
        if (!Array.isArray(json) || json.length === 0) return;
        const vistos = new Set();
        const limpios = json
          .map((d) => ({
            ...d,
            id: String(d.id || d.src),
            fotoModelo: d.fotoModelo || d.foto_modelo,
          }))
          .filter((d) => {
            if (!d.src || vistos.has(d.id)) return false;
            vistos.add(d.id);
            return true;
          });
        if (limpios.length > 0) {
          setDisenos(limpios);
          setActivoId(limpios[0].id);
        }
      })
      .catch(() => {/* usa fallback */});
  }, []);

  // Videos dinámicos.
  useEffect(() => {
    fetch('/content/procesos.json')
      .then((res) => (res.ok ? res.json() : Promise.reject('sin procesos')))
      .then((json) => {
        if (!Array.isArray(json) || json.length === 0) return;
        // Normaliza youtube_id→youtubeId y dedup defensivo por video.
        const vistos = new Set();
        const limpios = json.filter((v) => {
          v.youtubeId = v.youtubeId || v.youtube_id;
          if (!v.youtubeId) return false;
          if (vistos.has(v.youtubeId)) return false;
          vistos.add(v.youtubeId);
          return true;
        });
        if (limpios.length > 0) setProcesos(limpios);
      })
      .catch(() => {/* usa fallback */});
  }, []);

  // Modal de video: cierra con Escape y bloquea el scroll de fondo.
  useEffect(() => {
    if (!videoActivo) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setVideoActivo(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [videoActivo]);

  // Modal de diseño: mismo comportamiento.
  useEffect(() => {
    if (!disenoModal) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setDisenoModal(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [disenoModal]);

  const toggleColor = (id) => {
    setColores((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const disenoActivo = disenos.find((d) => d.id === activoId) || disenos[0];
  const lineaActiva = lineaInfo(disenoActivo?.linea);
  const tipoObj = UNIFORME_TIPOS.find((t) => t.id === tipo) || UNIFORME_TIPOS[0];

  // ⚡ Urgencia: el banner vive solo mientras la fecha no pase.
  const promoVigente =
    PROMO_DISENO.activo &&
    new Date() <= new Date(`${PROMO_DISENO.fechaLimite}T23:59:59`);
  const promoFecha = promoVigente
    ? new Date(`${PROMO_DISENO.fechaLimite}T12:00:00`).toLocaleDateString(
        'es-CO',
        { day: 'numeric', month: 'long' }
      )
    : '';

  const nombresColores = colores.length
    ? ` Colores: ${colores
        .map((c) => UNIFORME_COLORES.find((x) => x.id === c)?.label)
        .join(' y ')}.`
    : '';
  const promoMsg =
    promoVigente && cantidad >= PROMO_DISENO.minimo
      ? ' Vi la promo de diseño gratis.'
      : '';
  const msgPara = (d) =>
    `Hola FAYD, me interesa el diseño "${d?.nombre}" (${lineaInfo(d?.linea).label}). Unidades aprox: ${cantidad}.${nombresColores} Incluir escudo, nombres y números.${promoMsg} ¿Me envían propuesta y mockup?`;
  const waLink = buildWaLink(CONFIG.whatsapp.number, msgPara(disenoActivo));
  const waLinkDe = (d) => buildWaLink(CONFIG.whatsapp.number, msgPara(d));
  // Click en miniatura: activa la foto grande Y abre el visor de ángulos.
  const abrirDiseno = (d) => {
    setActivoId(d.id);
    setDisenoModal(d);
  };

  return (
    <section id="uniformes" className="py-20 sm:py-24 px-4 sm:px-8 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Uniformes personalizados · +150 equipos vestidos"
          title="VESTIMOS TU"
          highlight="EQUIPO"
          description="Escoge un diseño de referencia o trae el tuyo: sublimación full print con tu escudo, nombres y números. Desde 6 unidades."
        />

        {/* ⚡ Urgencia — se oculta solo cuando pasa la fecha */}
        {promoVigente && (
          <div className="mb-10 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3.5 text-white shadow-lg shadow-red-600/20">
            <span className="text-xl">⚡</span>
            <p className="text-xs sm:text-sm font-black uppercase tracking-wide">
              Diseño GRATIS en compras de {PROMO_DISENO.minimo}+ uniformes
              <span className="ml-2 font-bold normal-case tracking-normal text-white/80">
                solo hasta el {promoFecha}
              </span>
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* 1. Galería de diseños + ajustes */}
          <div className="bg-white border-2 border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h3 className="text-black font-black text-lg">Escoge tu diseño favorito</h3>
              <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-red-600">Paso 1</span>
            </div>
            <p className="text-neutral-400 text-xs mb-4">
              Toca una miniatura para verlo puesto al lado — después lo personalizamos con tus colores y escudo.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {disenos.slice(0, 6).map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => abrirDiseno(d)}
                  aria-label={`Ampliar diseño ${d.nombre}`}
                  aria-pressed={d.id === disenoActivo?.id}
                  className={cls(
                    'group relative aspect-square overflow-hidden rounded-xl border-2 transition-all',
                    d.id === disenoActivo?.id
                      ? 'border-red-600 ring-2 ring-red-600 ring-offset-2'
                      : 'border-neutral-100 hover:border-neutral-300 hover:scale-[1.02]'
                  )}
                >
                  <img src={d.src} alt={d.nombre} loading="lazy" className="h-full w-full object-cover" />
                  {d.masPedido && (
                    <span className="absolute right-1 top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[8px] font-black uppercase text-white shadow">
                      🔥 Top
                    </span>
                  )}
                  {vistasDeDiseno(d).length > 1 && (
                    <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white text-[9px] font-bold text-center py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      🔍 Ver ángulos
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-500 mb-5">
              <span className="font-bold text-black">{lineaActiva.emoji} {disenoActivo?.nombre}</span> · línea {lineaActiva.label}
            </p>

            <div className="flex items-center gap-3 mb-5">
              <span className="h-px flex-1 bg-neutral-100" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Ajusta tu pedido</span>
              <span className="h-px flex-1 bg-neutral-100" />
            </div>

            {/* Tipo de cliente */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {UNIFORME_TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipo(t.id)}
                  className={cls(
                    'text-xs font-bold rounded-xl border-2 px-3 py-2.5 transition-all text-left',
                    tipo === t.id
                      ? 'border-red-600 bg-red-50 text-black'
                      : 'border-neutral-100 text-neutral-500 hover:border-neutral-300'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Cantidad */}
            <div className="flex justify-between items-baseline mb-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Unidades aprox.</p>
              <p className="text-black font-black text-lg tabular-nums">{cantidad}</p>
            </div>
            <input
              type="range"
              min={6}
              max={60}
              step={1}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full accent-red-600 mb-2"
              aria-label="Cantidad de unidades"
            />
            <p className="text-[10px] text-neutral-400 mb-5">
              Mínimo 6 unidades ·{' '}
              {promoVigente && cantidad >= PROMO_DISENO.minimo
                ? '✅ ya aplica la promo de diseño gratis'
                : cantidad >= PROMO_DISENO.minimo
                ? '🔥 descuento por volumen aplica'
                : `${PROMO_DISENO.minimo}+ unidades = diseño gratis ⚡`}
            </p>

            {/* Colores: opcional y colapsado — nadie empieza por aquí */}
            <button
              type="button"
              onClick={() => setVerColores((v) => !v)}
              aria-expanded={verColores}
              className="flex w-full items-center justify-between rounded-xl border-2 border-neutral-100 px-3 py-2.5 mb-4 transition-colors hover:border-neutral-300"
            >
              <span className="text-xs font-bold text-neutral-500">
                🎨 Ajustar colores{colores.length ? ` (${colores.length} elegidos)` : ' — opcional'}
              </span>
              <span className={cls('text-xs text-neutral-400 transition-transform duration-200', verColores && 'rotate-180')}>▼</span>
            </button>
            {verColores && (
              <div className="flex flex-wrap gap-2 mb-5 pl-1">
                {UNIFORME_COLORES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleColor(c.id)}
                    title={c.label}
                    aria-label={`Color ${c.label}`}
                    className={cls(
                      'w-9 h-9 rounded-full border-2 transition-all',
                      colores.includes(c.id)
                        ? 'border-black scale-110 ring-2 ring-red-600 ring-offset-2'
                        : 'border-neutral-200 hover:scale-105'
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            )}

            <Button variant="whatsapp" href={waLink} className="w-full">
              💬 Cotizar "{disenoActivo?.nombre}" por WhatsApp
            </Button>
            <p className="mt-2.5 text-center text-[10px] text-neutral-400">
              Gratis y sin compromiso · respuesta en menos de 24 horas
            </p>
          </div>

          {/* 2. Foto grande + 3. beneficios expandibles */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-3xl border-2 border-neutral-100 bg-neutral-100 shadow-sm">
              <div className="aspect-[4/5] max-h-[520px] w-full">
                {disenoActivo && (
                  <img
                    key={disenoActivo.id}
                    src={disenoActivo.fotoModelo || disenoActivo.src}
                    alt={`Modelo con el diseño ${disenoActivo.nombre}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 pt-14">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1">Paso 2 · véelo puesto</p>
                <p className="font-black text-lg text-white leading-tight">{disenoActivo?.nombre}</p>
                <p className="text-xs text-white/70">{lineaActiva.emoji} Línea {lineaActiva.label} · personalizable con tu escudo</p>
              </div>
            </div>

            <div className="bg-black rounded-3xl p-4 sm:p-6 text-white">
              <div className="flex items-baseline justify-between gap-2 mb-1 px-1">
                <h3 className="font-black text-lg">
                  Todo <span className="text-red-500">personalizado</span>, nada genérico
                </h3>
              </div>
              <p className="text-white/40 text-[11px] mb-2 px-1">Toca cada punto para ver cómo lo hacemos 👇</p>
              <ul className="space-y-1">
                {BENEFICIOS_UNIFORME.map((b, i) => {
                  const abierto = beneficioAbierto === i;
                  return (
                    <li key={b.titulo}>
                      <button
                        type="button"
                        onClick={() => setBeneficioAbierto(abierto ? null : i)}
                        aria-expanded={abierto}
                        className={cls(
                          'flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors',
                          abierto ? 'bg-white/10' : 'hover:bg-white/5'
                        )}
                      >
                        <span className="shrink-0">{b.icono}</span>
                        <span className="flex-1 text-sm font-bold">{b.titulo}</span>
                        <span
                          className={cls(
                            'shrink-0 text-red-500 transition-transform duration-200',
                            abierto && 'rotate-90'
                          )}
                        >
                          ▸
                        </span>
                      </button>
                      {abierto && (
                        <p className="px-11 pb-3 -mt-0.5 text-xs leading-relaxed text-white/60">
                          {b.detalle}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 px-1 text-xs font-black uppercase tracking-wide text-red-400 hover:text-red-300 transition-colors"
              >
                ¿Dudas? Pregunta por WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* Cómo funciona — tira compacta */}
        <ol className="mt-6 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {UNIFORME_PASOS.map((p) => (
            <li
              key={p.n}
              className="min-w-[190px] flex-none rounded-2xl border-2 border-neutral-100 bg-white p-4 shadow-sm lg:min-w-0"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="shrink-0 w-6 h-6 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center">
                  {p.n}
                </span>
                <p className="text-black font-bold text-xs">{p.titulo}</p>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">{p.texto}</p>
            </li>
          ))}
        </ol>

        {/* NUESTRO PROCESO — videos de fabricación (YouTube) */}
        <div className="mt-14 bg-black rounded-3xl p-6 sm:p-10 text-white">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">
                Hecho a mano · paso a paso
              </p>
              <h3 className="font-black text-2xl sm:text-3xl leading-none">
                MIRA CÓMO SE <span className="text-red-500">HACE</span>
              </h3>
              <p className="text-white/60 text-sm mt-2 max-w-md">
                Así nace cada uniforme FAYD: del diseño al paquete. Sin
                intermediarios, con control en cada etapa.
              </p>
            </div>
            {CONFIG.social.youtube && (
              <a
                href={CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-full border-2 border-white/15 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white/80 hover:border-red-500 hover:text-white transition-colors"
              >
                📺 Suscríbete al canal
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {procesos.slice(0, 4).map((v) => {
              const etapa = etapaInfo(v.etapa);
              return (
                <button
                  key={v.youtubeId}
                  type="button"
                  onClick={() => setVideoActivo(v)}
                  className="group text-left focus:outline-none"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 group-hover:ring-red-600 transition-all duration-300">
                    <img
                      src={thumbYouTube(v.youtubeId)}
                      alt={v.titulo || 'Video del proceso'}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-85 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full bg-red-600 text-white text-sm flex items-center justify-center shadow-lg shadow-red-600/40 transition-transform duration-300 group-hover:scale-110">
                        ▶
                      </span>
                    </span>
                    <span className="absolute left-2 top-2 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                      {etapa.emoji} {etapa.label}
                    </span>
                  </div>
                  <p className="mt-2.5 font-bold text-sm leading-snug text-white group-hover:text-red-400 transition-colors">
                    {v.titulo}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reproductor de video */}
        {videoActivo && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setVideoActivo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={videoActivo.titulo || 'Video del proceso'}
          >
            <button
              type="button"
              onClick={() => setVideoActivo(null)}
              aria-label="Cerrar video"
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-red-600"
            >
              ✕
            </button>
            <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
                <iframe
                  src={embedYouTube(videoActivo.youtubeId)}
                  title={videoActivo.titulo || 'Video FAYD'}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {videoActivo.titulo && (
                <p className="mt-3 text-sm font-bold text-white">{videoActivo.titulo}</p>
              )}
              {videoActivo.descripcion && (
                <p className="mt-1 text-xs text-white/60 leading-relaxed">
                  {videoActivo.descripcion}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal diseño — visor de ángulos igual que Nuestra Colección */}
        {disenoModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={disenoModal.nombre}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setDisenoModal(null)}
          >
            <button
              type="button"
              onClick={() => setDisenoModal(null)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10"
            >
              ✕
            </button>
            <div
              className="bg-white rounded-3xl max-w-3xl w-full grid sm:grid-cols-2 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-neutral-100 relative">
                <VisorAngulos
                  key={disenoModal.id || disenoModal.src}
                  vistas={vistasDeDiseno(disenoModal)}
                  alt={disenoModal.nombre}
                  rounded="rounded-none"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <p className="text-red-600 font-black text-xs tracking-widest uppercase mb-2">
                  {`${lineaInfo(disenoModal.linea).emoji} Línea ${lineaInfo(disenoModal.linea).label}`}
                </p>
                <h3 className="text-black text-2xl font-black leading-tight">
                  {disenoModal.nombre}
                </h3>
                <p className="text-neutral-500 text-sm mt-3">
                  Sublimación full print con tu escudo, nombres y números. Este
                  kit se ajusta a tus colores institucionales sin costo extra.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-neutral-500">
                  <li>🛡️ Escudo vectorizado gratis</li>
                  <li>🔢 Nombres y dorsales por jugador</li>
                  <li>👕 Tela dry-fit · tallas mixtas</li>
                </ul>
                <div className="mt-6">
                  <Button variant="whatsapp" href={waLinkDe(disenoModal)} className="w-full">
                    💬 Cotizar este diseño
                  </Button>
                  <p className="mt-2 text-center text-[10px] text-neutral-400">
                    Mínimo 6 unidades · mockup digital en menos de 24 horas
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
