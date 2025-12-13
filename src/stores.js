import { writable, derived } from 'svelte/store';

/* ===== CUENTAS ===== */
export const cuentas = writable([
  { id: 'c-1', nombre: 'Efectivo' },
  { id: 'c-2', nombre: 'Banco' }
]);

/* ===== CATEGORÍAS ===== */
export const categorias = writable([
  { id: 'cat-1', nombre: 'Alimentación', tipo: 'gasto' },
  { id: 'cat-2', nombre: 'Transporte', tipo: 'gasto' },
  { id: 'cat-3', nombre: 'Salario', tipo: 'ingreso' }
]);

/* ===== MOVIMIENTOS ===== */
export const movimientos = writable([
  {
    id: 'm-1',
    fecha: '2025-11-28',
    descripcion: 'Mercado',
    monto: 50000,
    tipo: 'gasto',
    cuentaId: 'c-1',
    categoriaId: 'cat-1'
  },
  {
    id: 'm-2',
    fecha: '2025-11-28',
    descripcion: 'Sueldo',
    monto: 200000,
    tipo: 'ingreso',
    cuentaId: 'c-2',
    categoriaId: 'cat-3'
  }
]);

/* ===== METAS ===== */
export const metas = writable([
  { id: 't-1', nombre: 'Viaje', objetivo: 1000000, ahorrado: 200000 },
  { id: 't-2', nombre: 'Laptop', objetivo: 3000000, ahorrado: 1000000 }
]);

/* ===== DASHBOARD ===== */
export const totalIngresos = derived(movimientos, $m =>
  $m.filter(m => m.tipo === 'ingreso').reduce((a, b) => a + b.monto, 0)
);

export const totalGastos = derived(movimientos, $m =>
  $m.filter(m => m.tipo === 'gasto').reduce((a, b) => a + b.monto, 0)
);

export const balance = derived(
  [totalIngresos, totalGastos],
  ([$i, $g]) => $i - $g
);

/* ===== UTIL ===== */
export function createId(prefix = '') {
  if (crypto?.randomUUID) return `${prefix}${crypto.randomUUID()}`;
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}