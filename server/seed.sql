-- Données initiales (optionnel, si tables vides)
-- Exécuter après schema.sql

INSERT INTO chauffeurs (id, nom, telephone) VALUES
  ('a0000001-0000-4000-8000-000000000001', 'Jean-Marie Mbarga', '237 6XX XXX XXX'),
  ('a0000001-0000-4000-8000-000000000002', 'Marie-Louise Ngo Bikoko', ''),
  ('a0000001-0000-4000-8000-000000000003', 'Paul Essono', ''),
  ('a0000001-0000-4000-8000-000000000004', 'Clémentine Abena', ''),
  ('a0000001-0000-4000-8000-000000000005', 'Françoise Mballa', '')
ON CONFLICT (id) DO NOTHING;

INSERT INTO camions (id, numero, capacite) VALUES
  ('b0000001-0000-4000-8000-000000000001', 'BENNE-101', '5 t'),
  ('b0000001-0000-4000-8000-000000000002', 'BENNE-102', '5 t'),
  ('b0000001-0000-4000-8000-000000000003', 'BENNE-201', '10 t'),
  ('b0000001-0000-4000-8000-000000000004', 'BENNE-202', '10 t')
ON CONFLICT (id) DO NOTHING;

INSERT INTO unites (id, nom, secteur) VALUES
  ('c0000001-0000-4000-8000-000000000001', 'Unité Yaoundé-Centre', 'Yaoundé Centre'),
  ('c0000001-0000-4000-8000-000000000002', 'Unité Yaoundé-Nord', 'Yaoundé Nord'),
  ('c0000001-0000-4000-8000-000000000003', 'Unité Douala', 'Douala')
ON CONFLICT (id) DO NOTHING;

INSERT INTO sites (id, name, capacity, status) VALUES
  ('d0000001-0000-4000-8000-000000000001', 'Centre de transfert Yaoundé-Nord', 87, 'Opérationnel'),
  ('d0000001-0000-4000-8000-000000000002', 'Site de regroupement Douala-Bépanda', 65, 'Opérationnel'),
  ('d0000001-0000-4000-8000-000000000003', 'Centre de tri Yaoundé-Est', 45, 'Opérationnel'),
  ('d0000001-0000-4000-8000-000000000004', 'Station de transfert Douala-Bonabéri', 93, 'Attention')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tournees (id, name, chauffeur_id, camion_id, unite_id, status, completion, secteur, date_prevue) VALUES
  (gen_random_uuid(), 'Quartier Bastos', 'a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'À l''heure', 78, 'Yaoundé Centre', CURRENT_DATE),
  (gen_random_uuid(), 'Yaoundé-Nord', 'a0000001-0000-4000-8000-000000000002', 'b0000001-0000-4000-8000-000000000002', 'c0000001-0000-4000-8000-000000000002', 'En retard', 45, 'Yaoundé Nord', CURRENT_DATE),
  (gen_random_uuid(), 'Douala Bépanda', 'a0000001-0000-4000-8000-000000000003', 'b0000001-0000-4000-8000-000000000003', 'c0000001-0000-4000-8000-000000000003', 'À l''heure', 92, 'Douala', CURRENT_DATE),
  (gen_random_uuid(), 'Odza', 'a0000001-0000-4000-8000-000000000004', 'b0000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'À l''heure', 34, 'Yaoundé Est', CURRENT_DATE),
  (gen_random_uuid(), 'Bonabéri', 'a0000001-0000-4000-8000-000000000005', 'b0000001-0000-4000-8000-000000000004', 'c0000001-0000-4000-8000-000000000003', 'Critique', 23, 'Douala', CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;
