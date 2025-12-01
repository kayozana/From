import Dashboard from './pages/Dashboard.svelte';
import RegistroMovimiento from './pages/RegistroMovimiento.svelte';

// Normaliza rutas eliminando barras finales y asegurando '/'
const normalize = (p) => {
  if (!p) return '/';
  try {
    // Sólo la parte pathname
    const pathname = typeof p === 'string' ? p : String(p);
    const cleaned = pathname.replace(/\/+$/, '');
    return cleaned === '' ? '/' : cleaned;
  } catch (e) {
    return '/';
  }
};

const rawRoutes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/nuevo-movimiento': RegistroMovimiento
};

// Exportar `routes` con claves normalizadas para evitar mismatches por '/'
export const routes = Object.fromEntries(
  Object.entries(rawRoutes).map(([k, v]) => [normalize(k), v])
);

/**
 * Navega a la ruta indicada (normaliza el path antes de empujar al history).
 * @param {string} path - Ruta a la que navegar.
 */
export function navigate(path) {
  const p = normalize(path);
  window.history.pushState({}, '', p);
  window.dispatchEvent(new Event('popstate'));
}