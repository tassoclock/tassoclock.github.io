/**
 * Componentes UI base compartidos por las secciones.
 * Paleta Eco Energy: sol (acentos) · bosque (confianza) · verde WhatsApp (CTA).
 */
import { cls } from '../lib/utils';
import { useReveal } from '../lib/hooks';

export function Button({ children, variant = 'primary', href, onClick, className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bosque focus-visible:ring-offset-2';
  const styles = {
    primary: 'bg-sol text-bosque-profundo hover:bg-sol-claro shadow-lg shadow-sol/30',
    dark: 'bg-bosque-profundo text-white hover:bg-bosque shadow-lg shadow-bosque-profundo/25',
    outline: 'border-2 border-bosque-profundo text-bosque-profundo hover:bg-bosque-profundo hover:text-white',
    white: 'bg-white text-bosque-profundo hover:bg-neutral-100 shadow-lg',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1FB957] shadow-lg shadow-[#25D366]/25',
  };
  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls(base, styles[variant], className)} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls(base, styles[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}

export function SectionHeader({ eyebrow, title, highlight, description }) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <p className="text-sol-oscuro font-black tracking-widest text-xs uppercase mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-neutral-900 text-3xl sm:text-4xl font-black">
        {title} {highlight && <span className="text-sol-oscuro">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-neutral-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export function RevealOnScroll({ children, delay = 0, className = '' }) {
  const r = useReveal(0.1, delay);
  return (
    <div ref={r.ref} className={cls('transition-all', r.className, className)} style={r.style}>
      {children}
    </div>
  );
}
