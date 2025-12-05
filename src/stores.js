import { writable } from 'svelte/store';

export const movimientos = writable([
  { id: 'm-1', descripcion: 'Mercado', monto: 50000, tipo: 'gasto', fecha: '2025-11-28' },
  { id: 'm-2', descripcion: 'Sueldo', monto: 200000, tipo: 'ingreso', fecha: '2025-11-28' }
]);

export const metas = writable([
  { id: 't-1', nombre: 'Viaje', objetivo: 1000000, ahorrado: 200000 },
  { id: 't-2', nombre: 'Laptop', objetivo: 3000000, ahorrado: 1000000 }
]);

// utilidad para generar id (fallback si no existe crypto.randomUUID)
export function createId(prefix = '') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `${prefix}${crypto.randomUUID()}`;
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}