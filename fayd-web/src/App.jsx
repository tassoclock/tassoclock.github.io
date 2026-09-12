/**
 * Eco Energy Tassoclock S.A.S — Paneles Solares · Costa Caribe
 * ─────────────────────────────────────────────────────────────
 * Página oficial del negocio. Rebranding 2026-09 a partir de la web FAYD,
 * con la paleta y los ganchos del estudio:
 *   docs/ESTUDIO-DISENO-WEB-2026-09.md  (Solar-Content-System)
 *   docs/TENDENCIAS-2026-09.md          (agente de tendencias, 240 titulares)
 *
 * Paleta: crema (fondo) · verde bosque (confianza) · amarillo solar (acentos)
 *         · verde WhatsApp (CTA) · azul (acento técnico).
 *
 * Estructura:
 *   src/lib/         utilidades y hooks
 *   src/data/        configuración de marca y contenido editorial
 *   src/components/  primitivas UI (Button, SectionHeader, RevealOnScroll)
 *   src/sections/    una sección de la página por archivo
 */

import { useEffect, useState } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Servicios from './sections/Servicios';
import Calculadora from './sections/Calculadora';
import Proceso from './sections/Proceso';
import Proyectos from './sections/Proyectos';
import Noticias from './sections/Noticias';
import InfoSection from './sections/InfoSection';
import Testimonios from './sections/Testimonios';
import Newsletter from './sections/Newsletter';
import Contacto from './sections/Contacto';
import Footer from './sections/Footer';
import WhatsAppFloat from './sections/WhatsAppFloat';

// ════════════════════════════════════════════
// BARRA DE ANUNCIO SUPERIOR (ganchos rotativos,
// ordenados por el estudio de tendencias)
// ════════════════════════════════════════════
const MENSAJES_ANUNCIO = [
  '💸 Reduce tu factura hasta 80% · Cotiza gratis por WhatsApp',
  '🔌 ¿Cansado de los apagones? Tu techo es la solución',
  '🏛️ Incentivos por ley (1715 y 2099) · Instala y aprovecha',
];

function AnnouncementBar() {
  const [indice, setIndice] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Sin animación si el usuario prefiere movimiento reducido.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setVisible(false); // fade out
      setTimeout(() => {
        setIndice((i) => (i + 1) % MENSAJES_ANUNCIO.length);
        setVisible(true); // fade in
      }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-bosque-profundo text-white text-center text-xs sm:text-sm py-2 px-4 font-semibold tracking-wide">
      <span
        className="inline-block transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {MENSAJES_ANUNCIO[indice]}
      </span>
    </div>
  );
}

// ════════════════════════════════════════════
// APP
// ════════════════════════════════════════════
export default function App() {
  useEffect(() => {
    document.title = 'Eco Energy Tassoclock — Paneles Solares · Costa Caribe';
  }, []);

  return (
    <div className="bg-crema text-neutral-900 min-h-screen font-sans overflow-x-hidden antialiased">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Calculadora />
        <Servicios />
        <Proceso />
        <Proyectos />
        <InfoSection />
        <Noticias />
        <Testimonios />
        <Newsletter />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
