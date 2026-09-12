/**
 * Hero — gancho principal del estudio de tendencias:
 * #1 ahorro en la factura · #2 apagones. Ilustración SVG de techo solar
 * (fotos reales de instalaciones: el dueño las sube a /foto/proyectos/).
 */
import { buildWaLink } from '../lib/utils';
import { RevealOnScroll, Button } from '../components/ui';
import { CONFIG } from '../data/config';

// Ilustración plana: casa con techo solar, sol y red eléctrica.
function IlustracionSolar() {
  return (
    <svg viewBox="0 0 520 420" className="w-full h-auto" role="img" aria-label="Casa con paneles solares en la Costa Caribe">
      {/* cielo */}
      <defs>
        <linearGradient id="cielo-hero" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fffbeb" />
        </linearGradient>
        <linearGradient id="panel-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      <rect width="520" height="420" rx="24" fill="url(#cielo-hero)" />
      {/* sol con rayos */}
      <circle cx="420" cy="80" r="34" fill="#f59e0b" />
      <circle cx="420" cy="80" r="46" fill="#f59e0b" opacity="0.2" />
      <g stroke="#f59e0b" strokeWidth="5" strokeLinecap="round">
        <line x1="420" y1="24" x2="420" y2="10" />
        <line x1="466" y1="34" x2="476" y2="24" />
        <line x1="476" y1="80" x2="490" y2="80" />
        <line x1="374" y1="34" x2="364" y2="24" />
        <line x1="364" y1="80" x2="350" y2="80" />
      </g>
      {/* nube */}
      <g fill="#ffffff">
        <ellipse cx="120" cy="70" rx="42" ry="18" />
        <ellipse cx="150" cy="60" rx="30" ry="16" />
        <ellipse cx="95" cy="62" rx="26" ry="14" />
      </g>
      {/* casa */}
      <rect x="90" y="250" width="340" height="120" rx="8" fill="#ffffff" stroke="#e7e5e4" strokeWidth="2" />
      {/* techo con paneles */}
      <polygon points="70,250 260,150 450,250 415,250 260,172 105,250" fill="#b45309" />
      <g transform="skewX(-18)">
        <rect x="150" y="196" width="52" height="34" rx="3" fill="url(#panel-hero)" stroke="#22c55e" strokeWidth="2.5" />
        <rect x="206" y="196" width="52" height="34" rx="3" fill="url(#panel-hero)" stroke="#22c55e" strokeWidth="2.5" />
        <rect x="262" y="196" width="52" height="34" rx="3" fill="url(#panel-hero)" stroke="#22c55e" strokeWidth="2.5" />
        <line x1="176" y1="196" x2="176" y2="230" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="232" y1="196" x2="232" y2="230" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="288" y1="196" x2="288" y2="230" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="150" y1="213" x2="314" y2="213" stroke="#22c55e" strokeWidth="1.5" />
      </g>
      {/* puerta y ventanas */}
      <rect x="150" y="300" width="46" height="70" rx="4" fill="#b45309" />
      <rect x="228" y="290" width="52" height="40" rx="4" fill="#fef3c7" stroke="#fde68a" strokeWidth="2" />
      <rect x="330" y="290" width="52" height="40" rx="4" fill="#fef3c7" stroke="#fde68a" strokeWidth="2" />
      {/* palma caribeña */}
      <g>
        <path d="M485 370 C 483 330 480 310 472 285" stroke="#92400e" strokeWidth="7" fill="none" strokeLinecap="round" />
        <g fill="#22c55e">
          <ellipse cx="455" cy="280" rx="26" ry="9" transform="rotate(-25 455 280)" />
          <ellipse cx="490" cy="276" rx="26" ry="9" transform="rotate(15 490 276)" />
          <ellipse cx="470" cy="268" rx="24" ry="8" transform="rotate(-60 470 268)" />
        </g>
      </g>
      {/* suelo */}
      <rect x="60" y="368" width="400" height="8" rx="4" fill="#166534" opacity="0.15" />
      {/* rayo de ahorro */}
      <g transform="translate(452 316)">
        <circle r="34" fill="#25D366" />
        <path d="M2 -18 L-10 4 L-1 4 L-4 18 L10 -6 L1 -6 Z" fill="#ffffff" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 px-4 sm:px-8 min-h-[85vh] flex items-center bg-crema overflow-hidden"
    >
      {/* Acentos decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sol/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bosque/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center w-full">
        <div>
          <RevealOnScroll>
            <p className="inline-flex items-center gap-2 bg-sol-palido border border-sol-claro text-sol-oscuro px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              ☀️ Energía solar · Costa Caribe
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="font-marca text-neutral-900 text-4xl sm:text-5xl lg:text-[2.4rem] xl:text-[2.75rem] leading-[1.15] tracking-tight">
              ¿CANSADO DE
              <br />
              <span className="text-sol-oscuro">LOS APAGONES?</span>
              <br />
              <span className="text-bosque-profundo">AHORRA HASTA 80%</span>
              <br />
              <span className="text-bosque-profundo">EN TU </span>
              <span className="text-sol-oscuro">FACTURA</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-neutral-500 text-lg mt-6 max-w-md">
              {CONFIG.brand.description}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="#calculadora">
                🧮 Calcular mi ahorro
              </Button>
              <Button variant="whatsapp" href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}>
                💬 Cotizar gratis por WhatsApp
              </Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={400}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-neutral-500 font-semibold">
              <li>✅ Visita técnica gratis</li>
              <li>✅ Instalación certificada</li>
              <li>✅ Retorno en 4-6 años</li>
            </ul>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={200} className="hidden lg:block">
          <IlustracionSolar />
        </RevealOnScroll>
      </div>
    </section>
  );
}
