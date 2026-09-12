/**
 * Newsletter — captura de leads vía WhatsApp (sin backend, sin datos
 * almacenados: el mensaje abre la conversación directamente).
 */
import { useState } from 'react';
import { buildWaLink } from '../lib/utils';
import { CONFIG } from '../data/config';

export default function Newsletter() {
  const [whatsapp, setWhatsapp] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!whatsapp) return;
    const mensaje = `Hola Eco Energy 👋 Quiero recibir novedades del sector solar y promociones. Mi WhatsApp es: ${whatsapp}`;
    window.open(buildWaLink(CONFIG.whatsapp.number, mensaje), '_blank', 'noopener');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-neutral-900 text-2xl font-black">
          Recibe <span className="text-sol-oscuro">novedades solares</span> y promociones
        </h3>
        <p className="text-neutral-400 text-sm mt-2">
          Déjanos tu número por WhatsApp y te avisamos de promociones, incentivos vigentes y cambios de tarifa.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-md mx-auto">
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Tu número de WhatsApp"
            required
            aria-label="Tu número de WhatsApp"
            className="flex-1 px-4 py-3 rounded-full border-2 border-neutral-200 text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-bosque transition-colors"
          />
          <button
            type="submit"
            className="bg-bosque-profundo text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-bosque transition-colors whitespace-nowrap"
          >
            {sent ? '✅ Abriendo WhatsApp…' : 'Avisarme'}
          </button>
        </form>
      </div>
    </section>
  );
}
