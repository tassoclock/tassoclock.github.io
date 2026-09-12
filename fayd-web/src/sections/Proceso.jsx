/**
 * Proceso 1-2-3 — patrón de los sitios solares que mejor convierten
 * (docs/ESTUDIO-DISENO-WEB-2026-09.md, sección 3: SunBadger y similares).
 */
import { RevealOnScroll, SectionHeader } from '../components/ui';
import { PROCESO } from '../data/contenido';

export default function Proceso() {
  return (
    <section id="proceso" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Cómo funciona"
          title="DE LA FACTURA AL"
          highlight="AHORRO EN 3 PASOS"
          description="Sin formularios eternos ni letras pequeñas: así de simple es empezar."
        />
        <div className="grid sm:grid-cols-3 gap-6">
          {PROCESO.map((paso, i) => (
            <RevealOnScroll key={paso.numero} delay={i * 120}>
              <div className="relative h-full bg-crema border-2 border-neutral-100 hover:border-sol/60 rounded-2xl p-7 transition-colors">
                <span
                  className="absolute -top-5 left-6 w-11 h-11 rounded-full bg-bosque-profundo text-sol font-black text-lg flex items-center justify-center border-4 border-white"
                  aria-hidden="true"
                >
                  {paso.numero}
                </span>
                <p className="text-4xl mb-4 mt-2" aria-hidden="true">{paso.icono}</p>
                <h3 className="text-neutral-900 font-black text-lg mb-2">{paso.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{paso.texto}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
