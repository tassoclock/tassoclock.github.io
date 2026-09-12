/**
 * InfoSection — por qué elegir energía solar con Eco Energy.
 * Beneficios ordenados por el estudio de tendencias (ahorro #1, apagones #2).
 */
import { RevealOnScroll, SectionHeader } from '../components/ui';
import { BENEFICIOS } from '../data/contenido';

export default function InfoSection() {
  return (
    <section id="info" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Por qué instalar"
          title="EL SOL DEL CARIBE"
          highlight="TRABAJA PARA TI"
          description="Los cuatro motivos por los que instalar paneles solares hoy es la mejor decisión para tu hogar o negocio."
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {BENEFICIOS.map((b, i) => (
            <RevealOnScroll key={b.titulo} delay={i * 100}>
              <div className="h-full bg-crema border-2 border-neutral-100 hover:border-sol/60 rounded-2xl p-6 sm:p-7 transition-colors shadow-sm hover:shadow-lg flex gap-5">
                <p className="text-4xl shrink-0" aria-hidden="true">{b.icono}</p>
                <div>
                  <h3 className="text-neutral-900 font-black text-lg mb-2">{b.titulo}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{b.texto}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
