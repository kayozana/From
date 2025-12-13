// URL del backend - CAMBIAR SEGÚN EL AMBIENTE
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Función base para hacer peticiones
 */
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ==================== ENDPOINTS ====================

export const api = {
  // CUENTAS
  cuentas: {
    getAll: () => apiCall('/cuentas/'),
  },

  // MOVIMIENTOS
  movimientos: {
    getAll: () => apiCall('/movimientos/'),
    create: (data) => apiCall('/movimientos/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },

  // CATEGORÍAS
  categorias: {
    getAll: () => apiCall('/categorias/'),
  },

  // METAS
  metas: {
    getAll: () => apiCall('/metas/'),
  },

  // DASHBOARD
  dashboard: {
    get: () => apiCall('/reportes/dashboard'),
  },
};

// Exportar URL por si se necesita
export { API_URL };