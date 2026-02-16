import React from 'react';
import { useData } from '../context/DataContext';

/**
 * Affiche un bandeau de chargement ou d'erreur lorsque l'app utilise l'API backend.
 */
export default function ApiStatusBanner() {
  const { useApi, apiLoading, apiError } = useData();

  if (!useApi) return null;
  if (apiLoading) {
    return (
      <div className="bg-primary/15 text-primary border-b border-primary/30 px-4 py-2 text-center text-sm font-medium">
        Chargement des données…
      </div>
    );
  }
  if (apiError) {
    return (
      <div className="bg-error/15 text-error border-b border-error/30 px-4 py-2 text-center text-sm font-medium">
        Erreur : {apiError}
      </div>
    );
  }
  return null;
}
