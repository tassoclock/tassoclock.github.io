/**
 * Testimonios — casos de clientes (fondo verde profundo).
 * ⚠️ El contenido viene de data/contenido.js — reemplazar con casos reales.
 */
import { RevealOnScroll } from '../components/ui';
import { TESTIMONIOS } from '../data/contenido';

export default function Testimonios() {
  return (
    <section
      className="py-20 sm:py-24 px-4 sm:px-8 bg-bosque-profundo"
      aria-labelledby="testimonios-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sol font-black tracking-widest text-xs uppercase mb-2">
            Testimonios
          </p>
          <h2 id="testimonios-title" className="text-white text-3xl sm:text-4xl font-black">
            TECHOS QUE <span className="text-sol">YA AHORRAN</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIOS.map((t, i) => (
            <RevealOnScroll key={t.id} delay={i * 100}>
              <figure className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                <div className="text-sol mb-3" aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote className="text-white/80 text-sm leading-relaxed">
                  “{t.texto}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-sol text-bosque-profundo font-black flex items-center justify-center text-sm">
                    ☀
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm">{t.nombre}</p>
                    <p className="text-white/40 text-xs">{t.compra}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
