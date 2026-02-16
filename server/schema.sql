-- Schéma PostgreSQL pour Gestion des déchets (type HYSACAM)
-- Exécuter avec: psql -U postgres -d waste_db -f schema.sql

-- Chauffeurs
CREATE TABLE IF NOT EXISTS chauffeurs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  telephone TEXT DEFAULT ''
);

-- Camions / Bennes
CREATE TABLE IF NOT EXISTS camions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero TEXT NOT NULL,
  capacite TEXT DEFAULT ''
);

-- Unités opérationnelles
CREATE TABLE IF NOT EXISTS unites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  secteur TEXT DEFAULT ''
);

-- Sites / Centres de transfert
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Opérationnel'
);

-- Tournées (références optionnelles pour permettre suppression des refs)
CREATE TABLE IF NOT EXISTS tournees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  chauffeur_id UUID REFERENCES chauffeurs(id) ON DELETE SET NULL,
  camion_id UUID REFERENCES camions(id) ON DELETE SET NULL,
  unite_id UUID REFERENCES unites(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'À l''heure',
  completion INT NOT NULL DEFAULT 0,
  secteur TEXT NOT NULL DEFAULT '',
  date_prevue DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX IF NOT EXISTS idx_tournees_date ON tournees(date_prevue);
CREATE INDEX IF NOT EXISTS idx_tournees_chauffeur ON tournees(chauffeur_id);
