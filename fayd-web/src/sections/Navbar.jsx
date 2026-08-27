/**
 * Navbar fija con navegación agrupada y menú móvil.
 * - Desktop: grupos "Tienda"/"Descubre" como dropdowns por click
 *   (se cierran con click fuera o Escape).
 * - Móvil: mismos grupos como acordeones dentro del menú hamburguesa.
 */
import { useEffect, useRef, useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { useScrollY } from '../lib/hooks';
import { CONFIG, NAV_ESTRUCTURA } from '../data/config';

export default function Navbar() {
  const scrolled = useScrollY(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const [grupoAbierto, setGrupoAbierto] = useState(null); // label del grupo abierto
  const navRef = useRef(null);

  // Cerrar dropdown/menú con click fuera o Escape.
  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setGrupoAbierto(null);
        setMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setGrupoAbierto(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleGrupo = (label) =>
    setGrupoAbierto((actual) => (actual === label ? null : label));

  const irASeccion = () => setGrupoAbierto(null);

  return (
    <nav
      ref={navRef}
      className={cls(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-neutral-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/foto/logo/logo_circulo.png"
            alt="Logo FAYD"
            className="w-11 h-11 object-contain"
          />
          <div>
            <h1 className="font-exan text-2xl leading-none text-black">
              FA<span className="text-red-600">Y</span>D
            </h1>
            <p className="text-neutral-400 text-[10px] tracking-[0.3em] leading-none mt-0.5">
              SPORT · <span className="text-neutral-300">🇨🇴 CO</span>
            </p>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {NAV_ESTRUCTURA.map((entrada) =>
            entrada.items ? (
              <div key={entrada.label} className="relative">
                <button
                  type="button"
                  onClick={() => toggleGrupo(entrada.label)}
                  aria-expanded={grupoAbierto === entrada.label}
                  aria-haspopup="true"
                  className={cls(
                    'flex items-center gap-1 text-sm font-semibold transition-colors',
                    grupoAbierto === entrada.label
                      ? 'text-red-600'
                      : 'text-neutral-600 hover:text-red-600'
                  )}
                >
                  {entrada.label}
                  <span
                    className={cls(
                      'text-[9px] transition-transform duration-200 inline-block',
                      grupoAbierto === entrada.label && 'rotate-180'
                    )}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {grupoAbierto === entrada.label && (
                  <div className="absolute left-0 top-full mt-3 w-44 bg-white border border-neutral-100 rounded-xl shadow-lg py-2 flex flex-col z-10">
                    {entrada.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={irASeccion}
                        className="px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-red-600 hover:bg-red-50/50 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={entrada.href}
                href={entrada.href}
                className="text-sm font-semibold text-neutral-600 hover:text-red-600 transition-colors"
              >
                {entrada.label}
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all hover:scale-105"
          >
            🛍️ Comprar
          </a>
          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Móvil: acordeones */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 py-3 px-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
          {NAV_ESTRUCTURA.map((entrada) =>
            entrada.items ? (
              <div key={entrada.label}>
                <button
                  type="button"
                  onClick={() => toggleGrupo(entrada.label)}
                  aria-expanded={grupoAbierto === entrada.label}
                  className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-black"
                >
                  {entrada.label}
                  <span
                    className={cls(
                      'text-[10px] text-neutral-400 transition-transform duration-200',
                      grupoAbierto === entrada.label && 'rotate-180'
                    )}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {grupoAbierto === entrada.label && (
                  <div className="pl-4 pb-2 flex flex-col border-l-2 border-neutral-100">
                    {entrada.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setGrupoAbierto(null);
                          setMenuOpen(false);
                        }}
                        className="py-2 text-sm font-semibold text-neutral-600 hover:text-red-600"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={entrada.href}
                href={entrada.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-semibold text-neutral-700 hover:text-red-600"
              >
                {entrada.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}
