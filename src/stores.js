import { writable } from 'svelte/store';

// Movimientos de prueba
export const movimientos = writable([
  { id: 1, descripcion: 'Mercado', monto: 50000, tipo: 'gasto', fecha: '2025-11-28' },
  { id: 2, descripcion: 'Sueldo', monto: 200000, tipo: 'ingreso', fecha: '2025-11-28' }
]);

// Metas de prueba
export const metas = writable([
  { id: 1, nombre: 'Viaje', objetivo: 1000000, ahorrado: 200000 },
  { id: 2, nombre: 'Laptop', objetivo: 3000000, ahorrado: 1000000 }
]);

// Also provide a default export (object) to be robust across module resolution / HMR
export default {
  movimientos,
  metas
};