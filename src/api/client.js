/**
 * Client API pour le backend PostgreSQL.
 * Base URL : VITE_API_URL (ex. http://localhost:3001) ou fallback localStorage côté DataContext.
 */

const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (url && typeof url === 'string' && url.trim()) return url.trim().replace(/\/$/, '');
  return '';
};

const api = async (path, options = {}) => {
  const base = getBaseUrl();
  // Si pas de base (déploiement single-service), utiliser des URLs relatives (même origine)
  const url = base ? `${base}${path}` : path;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || 'Erreur API');
  return data;
};

export const apiGet = (path) => api(path, { method: 'GET' });
export const apiPost = (path, body) => api(path, { method: 'POST', body: JSON.stringify(body) });
export const apiPut = (path, body) => api(path, { method: 'PUT', body: JSON.stringify(body) });
export const apiDelete = (path) => api(path, { method: 'DELETE' });

// true si une URL d'API est définie OU si on est en même origine (single-service)
export const isApiConfigured = () => true;

// Ressources
export const chauffeursApi = {
  getAll: () => apiGet('/api/chauffeurs'),
  create: (body) => apiPost('/api/chauffeurs', body),
  update: (id, body) => apiPut(`/api/chauffeurs/${id}`, body),
  delete: (id) => apiDelete(`/api/chauffeurs/${id}`),
};

export const camionsApi = {
  getAll: () => apiGet('/api/camions'),
  create: (body) => apiPost('/api/camions', body),
  update: (id, body) => apiPut(`/api/camions/${id}`, body),
  delete: (id) => apiDelete(`/api/camions/${id}`),
};

export const unitesApi = {
  getAll: () => apiGet('/api/unites'),
  create: (body) => apiPost('/api/unites', body),
  update: (id, body) => apiPut(`/api/unites/${id}`, body),
  delete: (id) => apiDelete(`/api/unites/${id}`),
};

export const sitesApi = {
  getAll: () => apiGet('/api/sites'),
  create: (body) => apiPost('/api/sites', body),
  update: (id, body) => apiPut(`/api/sites/${id}`, body),
  delete: (id) => apiDelete(`/api/sites/${id}`),
};

export const tourneesApi = {
  getAll: () => apiGet('/api/tournees'),
  create: (body) => apiPost('/api/tournees', body),
  update: (id, body) => apiPut(`/api/tournees/${id}`, body),
  delete: (id) => apiDelete(`/api/tournees/${id}`),
};
