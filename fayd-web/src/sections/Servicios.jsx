/**
 * Servicios — los 4 servicios del negocio (igual que /api/config del
 * Solar-Content-System). CTA de WhatsApp con mensaje por servicio.
 */
import { buildWaLink, formatNumber } from '../lib/utils';
import { RevealOnScroll, SectionHeader, Button } from '../components/ui';
import { CONFIG } from '../data/config';

const precioTexto = (p) =>
  p > 0 ? `Desde $${formatNumber(p)} COP` : 'Cotiza sin compromiso';

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 sm:py-24 px-4 sm:px-8 bg-crema">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Servicios"
          title="TODO LO QUE TU TECHO"
          highlight="PUEDE HACER"
          description="Instalación certificada para hogares y negocios de la Costa Caribe, con equipos nuevos y garantía."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONFIG.servicios.map((s, i) => (
            <RevealOnScroll key={s.id} delay={i * 100}>
              <div className="relative h-full flex flex-col bg-white border-2 border-neutral-100 hover:border-sol rounded-2xl p-6 transition-colors shadow-sm hover:shadow-xl">
                <span className="absolute -top-3 left-5 bg-sol text-bosque-profundo text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {s.badge}
                </span>
                <p className="text-4xl mb-4" aria-hidden="true">{s.icono}</p>
                <h3 className="text-neutral-900 font-black text-lg mb-2">{s.nombre}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed flex-1">{s.descripcion}</p>
                <p className="text-bosque font-black text-sm mt-4">{precioTexto(s.precio)}</p>
                <a
                  href={buildWaLink(
                    CONFIG.whatsapp.number,
                    `Hola Eco Energy 👋 Me interesa: ${s.nombre}. ¿Me dan más información?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-center text-sm font-bold text-[#128C4A] hover:text-[#1FB957] transition-colors"
                >
                  💬 Pedir información →
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={200} className="text-center mt-10">
          <Button variant="outline" href="#calculadora">
            🧮 No sé qué necesito — calcular mi ahorro
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
