/**
 * Footer — marca + redes sociales.
 */
import { CONFIG } from '../data/config';

export default function Footer() {
  return (
    <footer className="bg-bosque-profundo text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 64 64" className="w-10 h-10 shrink-0" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#0f3d21" />
            <circle cx="40" cy="20" r="9" fill="#f59e0b" />
            <g transform="skewX(-12)">
              <rect x="16" y="34" width="30" height="20" rx="2.5" fill="#0f2e1c" stroke="#22c55e" strokeWidth="2" />
              <line x1="26" y1="34" x2="26" y2="54" stroke="#22c55e" strokeWidth="1.6" />
              <line x1="36" y1="34" x2="36" y2="54" stroke="#22c55e" strokeWidth="1.6" />
              <line x1="16" y1="44" x2="46" y2="44" stroke="#22c55e" strokeWidth="1.6" />
            </g>
          </svg>
          <div>
            <p className="font-marca text-lg leading-none">
              ECO<span className="text-sol">ENERGY</span>
            </p>
            <p className="text-white/40 text-[10px] tracking-[0.25em] mt-1">TASSOCLOCK S.A.S</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a href={CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sol transition-colors text-sm font-semibold">
            Instagram
          </a>
          <a href={CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sol transition-colors text-sm font-semibold">
            Facebook
          </a>
          <a href={CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sol transition-colors text-sm font-semibold">
            TikTok
          </a>
        </div>
        <p className="text-white/30 text-xs text-center">
          © {new Date().getFullYear()} {CONFIG.brand.legal}
          <br />
          Paneles solares · {CONFIG.zona.titulo}
        </p>
      </div>
    </footer>
  );
}
