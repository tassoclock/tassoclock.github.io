/**
 * Navbar fija con anclas a secciones y menú móvil.
 * Marca Eco Energy Tassoclock — panel solar + wordmark.
 */
import { useEffect, useRef, useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { useScrollY } from '../lib/hooks';
import { CONFIG, NAV_ESTRUCTURA } from '../data/config';

function MarcaSolar({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={cls(className, 'shrink-0')} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#14532d" />
      <circle cx="40" cy="20" r="9" fill="#f59e0b" />
      <g stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
        <line x1="40" y1="4" x2="40" y2="8" />
        <line x1="54" y1="12" x2="51" y2="15" />
        <line x1="56" y1="26" x2="52" y2="24" />
        <line x1="26" y1="12" x2="29" y2="15" />
      </g>
      <g transform="skewX(-12)">
        <rect x="16" y="34" width="30" height="20" rx="2.5" fill="#0f2e1c" stroke="#22c55e" strokeWidth="2" />
        <line x1="26" y1="34" x2="26" y2="54" stroke="#22c55e" strokeWidth="1.6" />
        <line x1="36" y1="34" x2="36" y2="54" stroke="#22c55e" strokeWidth="1.6" />
        <line x1="16" y1="44" x2="46" y2="44" stroke="#22c55e" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

export default function Navbar() {
  const scrolled = useScrollY(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Cerrar menú con click fuera o Escape.
  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={cls(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-crema/95 backdrop-blur-md border-neutral-200 shadow-sm'
          : 'bg-crema/80 backdrop-blur-md border-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <MarcaSolar />
          <div>
            <h1 className="font-marca text-xl leading-none text-bosque-profundo">
              ECO<span className="text-sol">ENERGY</span>
            </h1>
            <p className="text-neutral-400 text-[10px] tracking-[0.25em] leading-none mt-1 whitespace-nowrap">
              TASSOCLOCK S.A.S · CO
            </p>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {NAV_ESTRUCTURA.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-neutral-600 hover:text-sol-oscuro transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1FB957] text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all hover:scale-105"
          >
            💬 Cotizar gratis
          </a>
          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Móvil */}
      {menuOpen && (
        <div className="md:hidden bg-crema border-t border-neutral-100 py-3 px-4 flex flex-col max-h-[70vh] overflow-y-auto">
          {NAV_ESTRUCTURA.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm font-semibold text-neutral-700 hover:text-sol-oscuro border-b border-neutral-100/70 last:border-0"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
