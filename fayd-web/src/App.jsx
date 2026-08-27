/**
 * FAYD — Tienda de Ropa Deportiva
 * ─────────────────────────────────────────────
 * Página oficial de la marca FAYD.
 * Paleta: blanco (fondo) · negro (texto) · rojo (acentos).
 *
 * Estructura (refactor lote 2 — antes todo vivía en este archivo):
 *   src/lib/         utilidades y hooks
 *   src/data/        constantes y contenido editorial
 *   src/components/  primitivas UI (Button, SectionHeader, VisorAngulos…)
 *   src/sections/    una sección de la página por archivo
 *
 * Integraciones con fayd-content-system:
 *   /content/catalogo.json  → catálogo dinámico (sección Catálogo)
 *   /content/galeria.json   → muro "En tendencia" (sección Galería)
 *   /content/noticias.json  → carrusel de fútbol local (Noticias)
 */

import { useEffect, useState } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Catalogo from './sections/Catalogo';
import SeccionCalzado from './sections/SeccionCalzado';
import SeccionUniformes from './sections/SeccionUniformes';
import LooksFayd from './sections/LooksFayd';
import NoticiasDeportistas from './sections/NoticiasDeportistas';
import Galeria from './sections/Galeria';
import InfoSection from './sections/InfoSection';
import Testimonios from './sections/Testimonios';
import Newsletter from './sections/Newsletter';
import Contacto from './sections/Contacto';
import Footer from './sections/Footer';
import WhatsAppFloat from './sections/WhatsAppFloat';

// ════════════════════════════════════════════
// BARRA DE ANUNCIO SUPERIOR (mensajes rotativos)
// ════════════════════════════════════════════
const MENSAJES_ANUNCIO = [
  '🚚 Envíos a todo Colombia · 💳 Nequi · Daviplata · BRE-B',
  '🇨🇴 Hecho en Colombia · Diseños exclusivos FAYD',
  '🔥 Nueva colección en el catálogo · Pide por WhatsApp',
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
    <div className="bg-black text-white text-center text-xs sm:text-sm py-2 px-4 font-semibold tracking-wide">
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
    document.title = 'FAYD — Ropa Deportiva';
  }, []);

  return (
    <div className="bg-white text-black min-h-screen font-sans overflow-x-hidden antialiased">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <SeccionUniformes />
        <Catalogo />
        <SeccionCalzado />
        <LooksFayd />
        <NoticiasDeportistas />
        <Galeria />
        <InfoSection />
        <Testimonios />
        <Newsletter />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
