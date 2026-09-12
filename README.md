# Eco Energy Tassoclock — Web oficial

Landing pública de **Eco Energy Tassoclock S.A.S**: paneles solares, seguridad
electrónica y redes eléctricas — costa Caribe, Colombia.

- **Sitio**: https://tassoclock.github.io
- **Stack**: React 18 + Vite + Tailwind
- **Deploy**: automático a GitHub Pages en cada push a `main`
  (`.github/workflows/deploy.yml`)
- **Noticias**: la sección lee `public/content/noticias.json` (respaldo curado);
  cuando la API del sistema de contenido esté desplegada en Railway, consume
  `GET /api/noticias` en vivo.
- **Contacto**: botón flotante de WhatsApp — número en `fayd-web/src/data/config.js`.

## Desarrollo

```bash
cd fayd-web
npm install
npm run dev      # servidor local
npm run build    # producción (dist/)
```

---

Proyecto independiente del negocio. Cualquier cambio se publica solo con
push a `main`.
