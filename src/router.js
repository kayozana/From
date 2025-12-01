// src/router.js
import Dashboard from './pages/Dashboard.svelte';
import RegistroMovimiento from './pages/RegistroMovimiento.svelte';

export const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/nuevo-movimiento': RegistroMovimiento
};

export function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
}