/**
 * Contacto — WhatsApp directo, zona de cobertura y horario.
 * Aviso de privacidad Ley 1581: el sitio no almacena datos personales.
 */
import { buildWaLink } from '../lib/utils';
import { Button, SectionHeader } from '../components/ui';
import { CONFIG } from '../data/config';

export default function Contacto() {
  return (
    <section id="contacto" className="py-20 sm:py-24 px-4 sm:px-8 bg-crema">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader
          eyebrow="Contacto"
          title="PIDE TU COTIZACIÓN"
          highlight="GRATIS"
          description="Escríbenos por WhatsApp y te respondemos el mismo día. Visita técnica gratuita en toda la zona."
        />
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="border-2 border-neutral-100 bg-white rounded-2xl p-6">
            <p className="text-3xl mb-3">💬</p>
            <h3 className="font-black text-neutral-900">WhatsApp</h3>
            <a
              href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#128C4A] font-bold text-sm hover:underline"
            >
              Escríbenos ahora
            </a>
          </div>
          <div className="border-2 border-neutral-100 bg-white rounded-2xl p-6">
            <p className="text-3xl mb-3">📍</p>
            <h3 className="font-black text-neutral-900">Cobertura</h3>
            <p className="text-neutral-500 text-sm mt-1">
              {CONFIG.zona.titulo}
              <br />
              {CONFIG.zona.ciudades.slice(0, 4).join(' · ')} y más
            </p>
          </div>
          <div className="border-2 border-neutral-100 bg-white rounded-2xl p-6">
            <p className="text-3xl mb-3">🕗</p>
            <h3 className="font-black text-neutral-900">Horario</h3>
            <p className="text-neutral-500 text-sm mt-1">{CONFIG.horario}</p>
          </div>
        </div>
        <Button
          variant="whatsapp"
          href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
          className="px-10 py-4 text-base"
        >
          💬 Quiero mi cotización gratis
        </Button>
        <p className="text-neutral-400 text-xs mt-8 max-w-lg mx-auto leading-relaxed">
          Aviso de privacidad (Ley 1581 de 2012): este sitio no recoge ni almacena datos
          personales. WhatsApp abre una conversación directa con un asesor de Eco Energy Tassoclock S.A.S.
        </p>
      </div>
    </section>
  );
}
