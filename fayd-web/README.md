# Eco Energy Tassoclock — Web oficial

Página del negocio **Eco Energy Tassoclock S.A.S** (paneles solares · Costa Caribe, Colombia).
Rebranding 2026-09 de la plantilla FAYD a la marca solar, con la paleta y los
ganchos del estudio de diseño:

- `Solar-Content-System/docs/ESTUDIO-DISENO-WEB-2026-09.md`
- `Solar-Content-System/docs/TENDENCIAS-2026-09.md`

## Stack

React 18 + Vite 5 + Tailwind CSS 3.

```bash
npm install     # una sola vez
npm run dev     # desarrollo (http://localhost:5173)
npm run build   # producción → dist/
npm run preview # servir dist/ localmente
```

## Paleta de marca (estudio, sección 4)

| Token | Color | Uso |
|---|---|---|
| `bosque-profundo` #14532d | Verde profundo | Footer, secciones oscuras, confianza |
| `bosque` #166534 | Verde bosque | Apoyos, texto de marca |
| `sol` #f59e0b / `sol-oscuro` #b45309 | Amarillo solar | Acentos, eyebrows, subrayados |
| `cielo` #2563eb | Azul | Acento técnico secundario |
| `crema` #fffbeb | Crema | Fondo general |
| `#25D366` | Verde WhatsApp | CTA principal de conversión |

## Estructura

- `src/data/config.js` — marca, WhatsApp, servicios, zona, parámetros de la calculadora
- `src/data/contenido.js` — beneficios, proceso, noticias, testimonios
- `src/sections/` — una sección por archivo (Hero, Calculadora, Servicios, Proceso, Proyectos, Noticias…)

## ⚠️ Pendientes del dueño

1. **WhatsApp real** en `src/data/config.js` (placeholder `573001234567`, mismo del Solar-Content-System).
2. **Fotos reales de instalaciones** → `public/foto/proyectos/` + campo `foto` en `src/sections/Proyectos.jsx`.
3. **Testimonios reales** → `src/data/contenido.js` (los actuales son ejemplos).
4. **Redes sociales** → `src/data/config.js`.

## 🔄 Sincronización con Solar-Content-System (agentes)

El sistema de agentes (`Solar-Content-System`) publica el feed de noticias
diario a las 7:00 am. La sección Noticias de esta web lo consume en cascada:

1. **API en producción**: `CONFIG.api.base` (en `src/data/config.js`) → `GET {base}/api/noticias`
   (la API tiene CORS de solo lectura para GET; se activa al deployar en Railway).
2. **Feed local**: `public/content/noticias.json` — copia del feed del agente
   (se actualiza copiando el archivo tras cada corrida, o con el workflow).
3. **Respaldo curado**: `src/data/contenido.js → NOTICIAS_SOLARES` (siempre presente).

Los resúmenes del feed se sanitizan antes de renderizar (Google News trae HTML).
Las noticias del feed abren la fuente original en pestaña nueva; las curadas
abren un modal con la nota completa. Los datos de marca de esta web (WhatsApp,
ciudades, precios, horario) están verificados iguales a `Solar-Content-System/config.py`.
