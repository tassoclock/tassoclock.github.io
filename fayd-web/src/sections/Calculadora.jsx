/**
 * Calculadora de ahorro — la mayor palanca de conversión del sector
 * (docs/ESTUDIO-DISENO-WEB-2026-09.md, sección 5). Interactiva, sin datos
 * personales: un slider y resultados al instante + CTA a WhatsApp con el
 * resultado prellenado.
 *
 * Modelo orientativo (radiación Costa Caribe):
 *   consumo_kwh   = factura / tarifa (≈850 COP/kWh)
 *   kwp_necesario = consumo / 140 kWh·mes⁻¹·kWp⁻¹ (redondeo a 0,5)
 *   ahorro        = 80% de la factura (offset máximo del sistema)
 *   inversión     = kWp × 1000 W × $2.800 COP/W (rango 2.000-3.500)
 */
import { useMemo, useState } from 'react';
import { buildWaLink } from '../lib/utils';
import { RevealOnScroll, SectionHeader } from '../components/ui';
import { CONFIG } from '../data/config';

const fmtCOP = (v) => '$' + new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(v);
const fmtNum = (v, dec = 0) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: dec, minimumFractionDigits: 0 }).format(v);

export default function Calculadora() {
  const [factura, setFactura] = useState(350_000);
  const c = CONFIG.calculadora;

  const r = useMemo(() => {
    const consumo = factura / c.tarifaCOPPorKwh;
    const kwpBruto = consumo / c.kwhMesPorKwp;
    const kwp = Math.min(15, Math.max(1, Math.round(kwpBruto * 2) / 2));
    const ahorroMensual = factura * c.offsetMaximo;
    const inversion = kwp * 1000 * c.costoPorVatio;
    const retorno = inversion / (ahorroMensual * 12);
    return { consumo, kwp, ahorroMensual, ahorroAnual: ahorroMensual * 12, inversion, retorno };
  }, [factura, c]);

  const mensajeWA =
    `Hola Eco Energy 👋 Usé la calculadora de su página:\n` +
    `- Mi factura mensual: ${fmtCOP(factura)}\n` +
    `- Sistema estimado: ${fmtNum(r.kwp, 1)} kWp\n` +
    `- Ahorro estimado: ${fmtCOP(r.ahorroMensual)}/mes\n` +
    `Quiero mi cotización gratis.`;

  return (
    <section id="calculadora" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Calculadora"
          title="¿CUÁNTO AHORRAS"
          highlight="EN TU TECHO?"
          description="Mueve el slider al valor de tu factura mensual. Estimación con la radiación de la Costa Caribe — la visita técnica gratuita define el diseño final."
        />
        <RevealOnScroll>
          <div className="grid lg:grid-cols-2 gap-8 bg-crema border-2 border-sol-claro rounded-3xl p-6 sm:p-10">
            {/* Entrada */}
            <div>
              <label htmlFor="slider-factura" className="block font-black text-neutral-900 text-lg">
                Tu factura mensual
              </label>
              <p className="text-4xl font-black text-bosque-profundo mt-3 mb-6">
                {fmtCOP(factura)}
              </p>
              <input
                id="slider-factura"
                type="range"
                min={50_000}
                max={2_000_000}
                step={10_000}
                value={factura}
                onChange={(e) => setFactura(Number(e.target.value))}
                className="w-full accent-[#166534] cursor-pointer"
                aria-valuetext={fmtCOP(factura)}
              />
              <div className="flex justify-between text-xs text-neutral-400 font-semibold mt-2">
                <span>$50.000</span>
                <span>$2.000.000</span>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-sm border-b border-sol-claro/60 pb-2">
                  <span className="text-neutral-500">Consumo estimado</span>
                  <span className="font-bold text-neutral-900">{fmtNum(r.consumo)} kWh/mes</span>
                </div>
                <div className="flex justify-between text-sm border-b border-sol-claro/60 pb-2">
                  <span className="text-neutral-500">Sistema recomendado</span>
                  <span className="font-bold text-neutral-900">{fmtNum(r.kwp, 1)} kWp</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Inversión aproximada</span>
                  <span className="font-bold text-neutral-900">Desde {fmtCOP(r.inversion)}</span>
                </div>
              </div>
            </div>

            {/* Resultado */}
            <div className="flex flex-col">
              <div className="bg-bosque-profundo rounded-2xl p-6 sm:p-8 text-center flex-1 flex flex-col justify-center">
                <p className="text-sol font-black tracking-widest text-xs uppercase">
                  Ahorrarías hasta
                </p>
                <p className="text-white text-4xl sm:text-5xl font-black mt-3">
                  {fmtCOP(r.ahorroMensual)}
                  <span className="text-white/50 text-lg font-bold"> /mes</span>
                </p>
                <p className="text-white/70 text-sm mt-2">
                  {fmtCOP(r.ahorroAnual)} al año
                </p>
                <div className="mt-5 inline-flex justify-center">
                  <span className="bg-white/10 text-white text-sm font-bold rounded-full px-4 py-2">
                    ⏱️ Recuperas tu inversión en ~{fmtNum(r.retorno, 1)} años
                  </span>
                </div>
              </div>
              <a
                href={buildWaLink(CONFIG.whatsapp.number, mensajeWA)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1FB957] text-white font-bold py-4 rounded-full transition-all hover:scale-[1.02] shadow-lg shadow-[#25D366]/25"
              >
                💬 Quiero mi cotización gratis — toma 30 segundos
              </a>
              <p className="text-neutral-400 text-[11px] mt-3 leading-relaxed">
                * Estimación orientativa (tarifa ≈ {fmtCOP(c.tarifaCOPPorKwh)}/kWh, {c.kwhMesPorKwh} kWh/mes por
                kWp instalado). Sin datos personales: el resultado viaja solo si decides enviarlo por WhatsApp.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
