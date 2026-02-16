import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  isApiConfigured,
  chauffeursApi,
  camionsApi,
  unitesApi,
  sitesApi,
  tourneesApi,
} from '../api/client';

const STORAGE_KEYS = {
  tournees: 'waste-app-tournees',
  sites: 'waste-app-sites',
  chauffeurs: 'waste-app-chauffeurs',
  camions: 'waste-app-camions',
  unites: 'waste-app-unites',
};

function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

const chauffeursInitial = [
  { id: 'ch1', nom: 'Jean-Marie Mbarga', telephone: '237 6XX XXX XXX' },
  { id: 'ch2', nom: 'Marie-Louise Ngo Bikoko', telephone: '' },
  { id: 'ch3', nom: 'Paul Essono', telephone: '' },
  { id: 'ch4', nom: 'Clémentine Abena', telephone: '' },
  { id: 'ch5', nom: 'Françoise Mballa', telephone: '' },
];

const camionsInitial = [
  { id: 'c1', numero: 'BENNE-101', capacite: '5 t' },
  { id: 'c2', numero: 'BENNE-102', capacite: '5 t' },
  { id: 'c3', numero: 'BENNE-201', capacite: '10 t' },
  { id: 'c4', numero: 'BENNE-202', capacite: '10 t' },
];

const unitesInitial = [
  { id: 'u1', nom: 'Unité Yaoundé-Centre', secteur: 'Yaoundé Centre' },
  { id: 'u2', nom: 'Unité Yaoundé-Nord', secteur: 'Yaoundé Nord' },
  { id: 'u3', nom: 'Unité Douala', secteur: 'Douala' },
];

const sitesInitial = [
  { id: '1', name: 'Centre de transfert Yaoundé-Nord', capacity: 87, status: 'Opérationnel' },
  { id: '2', name: 'Site de regroupement Douala-Bépanda', capacity: 65, status: 'Opérationnel' },
  { id: '3', name: 'Centre de tri Yaoundé-Est', capacity: 45, status: 'Opérationnel' },
  { id: '4', name: 'Station de transfert Douala-Bonabéri', capacity: 93, status: 'Attention' },
];

const tourneesInitial = [
  { id: 'R-247', name: 'Quartier Bastos', chauffeurId: 'ch1', camionId: 'c1', uniteId: 'u1', status: "À l'heure", completion: 78, secteur: 'Yaoundé Centre', datePrevue: todayStr() },
  { id: 'R-156', name: 'Yaoundé-Nord', chauffeurId: 'ch2', camionId: 'c2', uniteId: 'u2', status: 'En retard', completion: 45, secteur: 'Yaoundé Nord', datePrevue: todayStr() },
  { id: 'R-389', name: 'Douala Bépanda', chauffeurId: 'ch3', camionId: 'c3', uniteId: 'u3', status: "À l'heure", completion: 92, secteur: 'Douala', datePrevue: todayStr() },
  { id: 'R-512', name: 'Odza', chauffeurId: 'ch4', camionId: 'c1', uniteId: 'u1', status: "À l'heure", completion: 34, secteur: 'Yaoundé Est', datePrevue: todayStr() },
  { id: 'R-823', name: 'Bonabéri', chauffeurId: 'ch5', camionId: 'c4', uniteId: 'u3', status: 'Critique', completion: 23, secteur: 'Douala', datePrevue: todayStr() },
];

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (_) {}
  return fallback;
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (_) {}
}

function nextId(prefix) {
  return prefix + '-' + Date.now();
}

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const useApi = isApiConfigured();

  const [tournees, setTournees] = useState(useApi ? [] : () => loadFromStorage(STORAGE_KEYS.tournees, tourneesInitial));
  const [sites, setSites] = useState(useApi ? [] : () => loadFromStorage(STORAGE_KEYS.sites, sitesInitial));
  const [chauffeurs, setChauffeurs] = useState(useApi ? [] : () => loadFromStorage(STORAGE_KEYS.chauffeurs, chauffeursInitial));
  const [camions, setCamions] = useState(useApi ? [] : () => loadFromStorage(STORAGE_KEYS.camions, camionsInitial));
  const [unites, setUnites] = useState(useApi ? [] : () => loadFromStorage(STORAGE_KEYS.unites, unitesInitial));

  const [apiLoading, setApiLoading] = useState(useApi);
  const [apiError, setApiError] = useState(null);

  // Chargement initial depuis l'API
  useEffect(() => {
    if (!useApi) return;
    let cancelled = false;
    setApiError(null);
    (async () => {
      try {
        const [t, s, c, cam, u] = await Promise.all([
          tourneesApi.getAll(),
          sitesApi.getAll(),
          chauffeursApi.getAll(),
          camionsApi.getAll(),
          unitesApi.getAll(),
        ]);
        if (!cancelled) {
          setTournees(Array.isArray(t) ? t : []);
          setSites(Array.isArray(s) ? s : []);
          setChauffeurs(Array.isArray(c) ? c : []);
          setCamions(Array.isArray(cam) ? cam : []);
          setUnites(Array.isArray(u) ? u : []);
        }
      } catch (err) {
        if (!cancelled) {
          setApiError(err.message || 'Erreur chargement API');
        }
      } finally {
        if (!cancelled) setApiLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [useApi]);

  // Persistance localStorage (quand pas d'API)
  useEffect(() => {
    if (useApi) return;
    saveToStorage(STORAGE_KEYS.tournees, tournees);
  }, [useApi, tournees]);
  useEffect(() => {
    if (useApi) return;
    saveToStorage(STORAGE_KEYS.sites, sites);
  }, [useApi, sites]);
  useEffect(() => {
    if (useApi) return;
    saveToStorage(STORAGE_KEYS.chauffeurs, chauffeurs);
  }, [useApi, chauffeurs]);
  useEffect(() => {
    if (useApi) return;
    saveToStorage(STORAGE_KEYS.camions, camions);
  }, [useApi, camions]);
  useEffect(() => {
    if (useApi) return;
    saveToStorage(STORAGE_KEYS.unites, unites);
  }, [useApi, unites]);

  const getToday = useCallback(() => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }, []);

  const addTournee = useCallback(async (tournee) => {
    const payload = {
      name: tournee.name,
      chauffeurId: tournee.chauffeurId || null,
      camionId: tournee.camionId || null,
      uniteId: tournee.uniteId || null,
      status: tournee.status || "À l'heure",
      completion: Math.min(100, Math.max(0, Number(tournee.completion) || 0)),
      secteur: tournee.secteur || 'Non affecté',
      datePrevue: tournee.datePrevue || todayStr(),
    };
    if (useApi) {
      try {
        setApiError(null);
        const created = await tourneesApi.create(payload);
        setTournees((prev) => [...prev, created]);
        return created.id;
      } catch (err) {
        setApiError(err.message || 'Erreur lors de l\'ajout de la tournée');
        throw err;
      }
    }
    const id = nextId('R');
    setTournees((prev) => [...prev, { ...payload, id }]);
    return id;
  }, [useApi]);

  const updateTournee = useCallback(async (id, updates) => {
    if (useApi) {
      try {
        setApiError(null);
        const updated = await tourneesApi.update(id, updates);
        setTournees((prev) => prev.map((t) => (t.id === id ? updated : t)));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la mise à jour');
        throw err;
      }
      return;
    }
    setTournees((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, [useApi]);

  const deleteTournee = useCallback(async (id) => {
    if (useApi) {
      try {
        setApiError(null);
        await tourneesApi.delete(id);
        setTournees((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la suppression');
        throw err;
      }
      return;
    }
    setTournees((prev) => prev.filter((t) => t.id !== id));
  }, [useApi]);

  const addSite = useCallback(async (site) => {
    if (useApi) {
      try {
        setApiError(null);
        const created = await sitesApi.create(site);
        setSites((prev) => [...prev, created]);
        return created.id;
      } catch (err) {
        setApiError(err.message || 'Erreur lors de l\'ajout du site');
        throw err;
      }
    }
    const id = String(Date.now());
    setSites((prev) => [...prev, { ...site, id }]);
    return id;
  }, [useApi]);

  const updateSite = useCallback(async (id, updates) => {
    if (useApi) {
      try {
        setApiError(null);
        const updated = await sitesApi.update(id, updates);
        setSites((prev) => prev.map((s) => (s.id === id ? updated : s)));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la mise à jour');
        throw err;
      }
      return;
    }
    setSites((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }, [useApi]);

  const deleteSite = useCallback(async (id) => {
    if (useApi) {
      try {
        setApiError(null);
        await sitesApi.delete(id);
        setSites((prev) => prev.filter((s) => s.id !== id));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la suppression');
        throw err;
      }
      return;
    }
    setSites((prev) => prev.filter((s) => s.id !== id));
  }, [useApi]);

  const addChauffeur = useCallback(async (chauffeur) => {
    if (useApi) {
      try {
        setApiError(null);
        const created = await chauffeursApi.create(chauffeur);
        setChauffeurs((prev) => [...prev, created]);
        return created.id;
      } catch (err) {
        setApiError(err.message || 'Erreur lors de l\'ajout du chauffeur');
        throw err;
      }
    }
    const id = nextId('ch');
    setChauffeurs((prev) => [...prev, { ...chauffeur, id }]);
    return id;
  }, [useApi]);

  const updateChauffeur = useCallback(async (id, updates) => {
    if (useApi) {
      try {
        setApiError(null);
        const updated = await chauffeursApi.update(id, updates);
        setChauffeurs((prev) => prev.map((c) => (c.id === id ? updated : c)));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la mise à jour');
        throw err;
      }
      return;
    }
    setChauffeurs((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }, [useApi]);

  const deleteChauffeur = useCallback(async (id) => {
    if (useApi) {
      try {
        setApiError(null);
        await chauffeursApi.delete(id);
        setChauffeurs((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la suppression');
        throw err;
      }
      return;
    }
    setChauffeurs((prev) => prev.filter((c) => c.id !== id));
  }, [useApi]);

  const addCamion = useCallback(async (camion) => {
    if (useApi) {
      try {
        setApiError(null);
        const created = await camionsApi.create(camion);
        setCamions((prev) => [...prev, created]);
        return created.id;
      } catch (err) {
        setApiError(err.message || 'Erreur lors de l\'ajout du camion');
        throw err;
      }
    }
    const id = nextId('c');
    setCamions((prev) => [...prev, { ...camion, id }]);
    return id;
  }, [useApi]);

  const updateCamion = useCallback(async (id, updates) => {
    if (useApi) {
      try {
        setApiError(null);
        const updated = await camionsApi.update(id, updates);
        setCamions((prev) => prev.map((c) => (c.id === id ? updated : c)));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la mise à jour');
        throw err;
      }
      return;
    }
    setCamions((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }, [useApi]);

  const deleteCamion = useCallback(async (id) => {
    if (useApi) {
      try {
        setApiError(null);
        await camionsApi.delete(id);
        setCamions((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la suppression');
        throw err;
      }
      return;
    }
    setCamions((prev) => prev.filter((c) => c.id !== id));
  }, [useApi]);

  const addUnite = useCallback(async (unite) => {
    if (useApi) {
      try {
        setApiError(null);
        const created = await unitesApi.create(unite);
        setUnites((prev) => [...prev, created]);
        return created.id;
      } catch (err) {
        setApiError(err.message || 'Erreur lors de l\'ajout de l\'unité');
        throw err;
      }
    }
    const id = nextId('u');
    setUnites((prev) => [...prev, { ...unite, id }]);
    return id;
  }, [useApi]);

  const updateUnite = useCallback(async (id, updates) => {
    if (useApi) {
      try {
        setApiError(null);
        const updated = await unitesApi.update(id, updates);
        setUnites((prev) => prev.map((u) => (u.id === id ? updated : u)));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la mise à jour');
        throw err;
      }
      return;
    }
    setUnites((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  }, [useApi]);

  const deleteUnite = useCallback(async (id) => {
    if (useApi) {
      try {
        setApiError(null);
        await unitesApi.delete(id);
        setUnites((prev) => prev.filter((u) => u.id !== id));
      } catch (err) {
        setApiError(err.message || 'Erreur lors de la suppression');
        throw err;
      }
      return;
    }
    setUnites((prev) => prev.filter((u) => u.id !== id));
  }, [useApi]);

  const value = {
    tournees,
    sites,
    chauffeurs,
    camions,
    unites,
    getToday,
    addTournee,
    updateTournee,
    deleteTournee,
    addSite,
    updateSite,
    deleteSite,
    addChauffeur,
    updateChauffeur,
    deleteChauffeur,
    addCamion,
    updateCamion,
    deleteCamion,
    addUnite,
    updateUnite,
    deleteUnite,
    apiLoading: useApi ? apiLoading : false,
    apiError: useApi ? apiError : null,
    useApi,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
}
