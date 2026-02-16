/**
 * Contexte camerounais – données et libellés pour la gestion des déchets au Cameroun.
 * Référence : HYSACAM, communes, régions, types de déchets courants.
 */

export const APP_NAME = 'Gestion des déchets';
export const APP_NAME_SHORT = 'WasteTracker CM';

/** Régions du Cameroun (10 régions) */
export const REGIONS = [
  { value: 'all', label: 'Toutes les régions' },
  { value: 'centre', label: 'Centre (Yaoundé)' },
  { value: 'littoral', label: 'Littoral (Douala)' },
  { value: 'ouest', label: 'Ouest' },
  { value: 'nord', label: 'Nord' },
  { value: 'nord-ouest', label: 'Nord-Ouest' },
  { value: 'sud', label: 'Sud' },
  { value: 'est', label: 'Est' },
  { value: 'adamaoua', label: 'Adamaoua' },
  { value: 'sud-ouest', label: 'Sud-Ouest' },
  { value: 'extreme-nord', label: 'Extrême-Nord' }
];

/** Types de déchets (contexte camerounais / filières courantes) */
export const WASTE_TYPES = [
  { value: 'all', label: 'Tous les types' },
  { value: 'menager', label: 'Ordures ménagères' },
  { value: 'plastique', label: 'Plastiques' },
  { value: 'organique', label: 'Biodéchets' },
  { value: 'deee', label: 'DEEE' },
  { value: 'dasri', label: 'DASRI' },
  { value: 'dangereux', label: 'Déchets dangereux' }
];

/** Priorités */
export const PRIORITIES = [
  { value: 'all', label: 'Toutes priorités' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'Haute' },
  { value: 'normal', label: 'Normale' }
];

/** Périodes */
export const DATE_RANGES = [
  { value: 'today', label: "Aujourd'hui" },
  { value: 'tomorrow', label: 'Demain' },
  { value: 'yesterday', label: 'Hier' },
  { value: 'week', label: 'Cette semaine' },
  { value: 'month', label: 'Ce mois' },
  { value: 'custom', label: 'Période personnalisée' }
];
