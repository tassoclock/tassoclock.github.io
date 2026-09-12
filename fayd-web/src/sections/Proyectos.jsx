/**
 * Proyectos — galería de instalaciones en la Costa Caribe.
 *
 * ⚠️ PENDIENTE DEL DUEÑO: las fotos reales de instalaciones se suben a
 * public/foto/proyectos/ (residencial-1.jpg, comercial-1.jpg, …) y en cada
 * objeto de PROYECTOS se llena el campo `foto` con la ruta. Mientras tanto,
 * cada tarjeta muestra una ilustración del tipo de proyecto.
 */
import { RevealOnScroll, SectionHeader } from '../components/ui';

const PROYECTOS = [
  { id: 'p1', tipo: 'Residencial', ciudad: 'Arjona', kwp: 3, detalle: 'Casa familiar · respaldo de Nevera y TV', variante: 'casa' },
  { id: 'p2', tipo: 'Comercial', ciudad: 'Cartagena', kwp: 10, detalle: 'Zona comercial · sin más cortes en horario pico', variante: 'local' },
  { id: 'p3', tipo: 'Residencial', ciudad: 'Barranquilla', kwp: 5, detalle: 'Casa de dos pisos · aire acondicionado eficiente', variante: 'casa' },
  { id: 'p4', tipo: 'Rural', ciudad: 'Turbaco', kwp: 8, detalle: 'Finca · bombeo y cercado eléctrico solar', variante: 'finca' },
];

function MiniIlustracion({ variante }) {
  // Tres variantes sencillas de techo solar para diferenciar los proyectos.
  const techos = {
    casa: (
      <>
        <polygon points="14,52 50,32 86,52 76,52 50,40 24,52" fill="#b45309" />
        <g transform="skewX(-14)">
          <rect x="30" y="41" width="16" height="10" rx="1.5" fill="#14532d" stroke="#22c55e" strokeWidth="1.6" />
          <rect x="48" y="41" width="16" height="10" rx="1.5" fill="#14532d" stroke="#22c55e" strokeWidth="1.6" />
        </g>
        <rect x="30" y="56" width="40" height="22" fill="#ffffff" stroke="#e7e5e4" strokeWidth="1.5" />
        <rect x="42" y="62" width="10" height="16" fill="#f59e0b" opacity="0.85" />
      </>
    ),
    local: (
      <>
        <rect x="12" y="34" width="76" height="12" fill="#b45309" />
        <g>
          <rect x="18" y="18" width="18" height="11" rx="1.5" fill="#14532d" stroke="#22c55e" strokeWidth="1.6" />
          <rect x="40" y="18" width="18" height="11" rx="1.5" fill="#14532d" stroke="#22c55e" strokeWidth="1.6" />
          <rect x="62" y="18" width="18" height="11" rx="1.5" fill="#14532d" stroke="#22c55e" strokeWidth="1.6" />
        </g>
        <rect x="16" y="46" width="68" height="32" fill="#ffffff" stroke="#e7e5e4" strokeWidth="1.5" />
        <rect x="24" y="54" width="14" height="14" fill="#fef3c7" stroke="#fde68a" />
        <rect x="46" y="54" width="30" height="24" fill="#b45309" opacity="0.85" />
      </>
    ),
    finca: (
      <>
        <rect x="8" y="46" width="84" height="6" rx="3" fill="#166534" opacity="0.25" />
        <g>
          <rect x="16" y="24" width="30" height="20" rx="2" fill="#14532d" stroke="#22c55e" strokeWidth="1.8" transform="skewX(-10)" />
          <line x1="24" y1="24" x2="24" y2="44" stroke="#22c55e" strokeWidth="1.2" transform="skewX(-10)" />
          <line x1="32" y1="24" x2="32" y2="44" stroke="#22c55e" strokeWidth="1.2" transform="skewX(-10)" />
        </g>
        <line x1="28" y1="44" x2="28" y2="56" stroke="#78716c" strokeWidth="3" />
        <circle cx="70" cy="40" r="12" fill="#f59e0b" />
        <path d="M66 40 a4 4 0 0 0 8 0" stroke="#fffbeb" strokeWidth="2" fill="none" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 100 80" className="w-full h-40 object-cover" aria-hidden="true">
      <rect width="100" height="80" fill="#fef3c7" />
      <circle cx="84" cy="14" r="8" fill="#f59e0b" opacity="0.9" />
      {techos[variante] || techos.casa}
    </svg>
  );
}

export default function Proyectos() {
  return (
    <section id="proyectos" className="py-20 sm:py-24 px-4 sm:px-8 bg-crema">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Proyectos"
          title="TECHOS QUE YA"
          highlight="PRODUCEN EN EL CARIBE"
          description="Instalaciones certificadas de Eco Energy en la región."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROYECTOS.map((p, i) => (
            <RevealOnScroll key={p.id} delay={i * 100}>
              <article className="h-full bg-white border-2 border-neutral-100 hover:border-sol/60 rounded-2xl overflow-hidden transition-colors shadow-sm hover:shadow-xl">
                <MiniIlustracion variante={p.variante} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-bosque text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {p.tipo}
                    </span>
                    <span className="bg-sol-palido text-sol-oscuro text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {p.kwp} kWp
                    </span>
                  </div>
                  <h3 className="text-neutral-900 font-black">📍 {p.ciudad}</h3>
                  <p className="text-neutral-500 text-sm mt-1">{p.detalle}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
        <p className="text-center text-neutral-400 text-xs mt-8">
          📷 Galería en actualización: pronto sumaremos las fotos de las instalaciones más recientes.
        </p>
      </div>
    </section>
  );
}
