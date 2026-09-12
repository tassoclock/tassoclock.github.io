/**
 * Stats — cifras del sector solar Caribe (fondo verde profundo).
 * Datos: docs/INVESTIGACION-MERCADO.md · Solar-Content-System.
 */
import { RevealOnScroll } from '../components/ui';
import { CONFIG } from '../data/config';

export default function Stats() {
  const items = [
    { valor: CONFIG.stats.ahorro, sufijo: '%', etiqueta: 'menos en tu factura', icono: '💸' },
    { valor: CONFIG.stats.radiacion, sufijo: '', etiqueta: 'kWh/m² de radiación al día', icono: '☀️' },
    { valor: CONFIG.stats.retorno, sufijo: ' años', etiqueta: 'para recuperar la inversión', icono: '📈' },
    { valor: CONFIG.stats.vidaUtil, sufijo: '+ años', etiqueta: 'de vida útil del sistema', icono: '🔋' },
  ];
  const fmt = (v) => new Intl.NumberFormat('es-CO').format(v);
  return (
    <section className="py-14 px-4 sm:px-8 bg-bosque-profundo" aria-label="Cifras del sector solar">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <RevealOnScroll key={item.etiqueta} delay={i * 100}>
            <div className="text-center">
              <p className="text-3xl mb-2" aria-hidden="true">{item.icono}</p>
              <p className="text-white text-4xl font-black">
                {fmt(item.valor)}
                <span className="text-sol">{item.sufijo}</span>
              </p>
              <p className="text-white/50 text-sm mt-1">{item.etiqueta}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
