/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['system-ui', 'sans-serif'] },
      // Paleta de marca — estudio docs/ESTUDIO-DISENO-WEB-2026-09.md:
      // verde profundo (confianza/eco) + azul (profesionalismo) +
      // amarillo solar (acentos/energía) + verde brillante (CTA) + crema (fondo).
      colors: {
        sol: {
          DEFAULT: '#f59e0b', // acentos, eyebrows, subrayados
          oscuro: '#b45309',
          claro: '#fde68a',
          palido: '#fef3c7',
        },
        bosque: {
          DEFAULT: '#166534', // confianza, secciones de apoyo
          profundo: '#14532d', // footer / secciones oscuras
          vivo: '#22c55e',
        },
        cielo: {
          DEFAULT: '#2563eb', // acento secundario (técnico/profesional)
          profundo: '#1e40af',
        },
        crema: '#fffbeb',
      },
    },
  },
  plugins: [],
};
