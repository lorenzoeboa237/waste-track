require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const { connect, getDb, docToId } = require('./db');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ——— Chauffeurs ———
app.get('/api/chauffeurs', async (req, res) => {
  try {
    const db = getDb();
    const rows = await db.collection('chauffeurs').find({}).sort({ nom: 1 }).toArray();
    res.json(rows.map((r) => docToId(r)));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/chauffeurs', async (req, res) => {
  try {
    const { nom, telephone } = req.body || {};
    const db = getDb();
    const { insertedId } = await db.collection('chauffeurs').insertOne({
      nom: nom || '',
      telephone: telephone || '',
    });
    const doc = await db.collection('chauffeurs').findOne({ _id: insertedId });
    res.status(201).json(docToId(doc));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/chauffeurs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, telephone } = req.body || {};
    const db = getDb();
    const result = await db.collection('chauffeurs').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { nom: nom ?? '', telephone: telephone ?? '' } },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Non trouvé' });
    res.json(docToId(result));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/chauffeurs/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('chauffeurs').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Non trouvé' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Camions ———
app.get('/api/camions', async (req, res) => {
  try {
    const db = getDb();
    const rows = await db.collection('camions').find({}).sort({ numero: 1 }).toArray();
    res.json(rows.map((r) => docToId(r)));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/camions', async (req, res) => {
  try {
    const { numero, capacite } = req.body || {};
    const db = getDb();
    const { insertedId } = await db.collection('camions').insertOne({
      numero: numero || '',
      capacite: capacite || '',
    });
    const doc = await db.collection('camions').findOne({ _id: insertedId });
    res.status(201).json(docToId(doc));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/camions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { numero, capacite } = req.body || {};
    const db = getDb();
    const result = await db.collection('camions').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { numero: numero ?? '', capacite: capacite ?? '' } },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Non trouvé' });
    res.json(docToId(result));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/camions/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('camions').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Non trouvé' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Unités ———
app.get('/api/unites', async (req, res) => {
  try {
    const db = getDb();
    const rows = await db.collection('unites').find({}).sort({ nom: 1 }).toArray();
    res.json(rows.map((r) => docToId(r)));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/unites', async (req, res) => {
  try {
    const { nom, secteur } = req.body || {};
    const db = getDb();
    const { insertedId } = await db.collection('unites').insertOne({
      nom: nom || '',
      secteur: secteur || '',
    });
    const doc = await db.collection('unites').findOne({ _id: insertedId });
    res.status(201).json(docToId(doc));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/unites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, secteur } = req.body || {};
    const db = getDb();
    const result = await db.collection('unites').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { nom: nom ?? '', secteur: secteur ?? '' } },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Non trouvé' });
    res.json(docToId(result));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/unites/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('unites').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Non trouvé' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Sites ———
app.get('/api/sites', async (req, res) => {
  try {
    const db = getDb();
    const rows = await db.collection('sites').find({}).sort({ name: 1 }).toArray();
    res.json(rows.map((r) => ({ ...docToId(r), capacity: Number(r.capacity || 0), status: r.status || 'Opérationnel' })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/sites', async (req, res) => {
  try {
    const { name, capacity, status } = req.body || {};
    const cap = Math.min(100, Math.max(0, Number(capacity) || 0));
    const db = getDb();
    const { insertedId } = await db.collection('sites').insertOne({
      name: name || '',
      capacity: cap,
      status: status || 'Opérationnel',
    });
    const doc = await db.collection('sites').findOne({ _id: insertedId });
    res.status(201).json(docToId(doc));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/sites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity, status } = req.body || {};
    const db = getDb();
    const update = {};
    if (name !== undefined) update.name = name;
    if (capacity !== undefined) update.capacity = Math.min(100, Math.max(0, Number(capacity) || 0));
    if (status !== undefined) update.status = status;
    const result = await db.collection('sites').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Non trouvé' });
    res.json(docToId(result));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/sites/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('sites').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Non trouvé' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ——— Tournées ———
function docToTournee(doc) {
  if (!doc) return null;
  const d = docToId(doc);
  return {
    id: d.id,
    name: d.name,
    chauffeurId: d.chauffeurId ?? null,
    camionId: d.camionId ?? null,
    uniteId: d.uniteId ?? null,
    status: d.status || "À l'heure",
    completion: Number(d.completion) || 0,
    secteur: d.secteur || '',
    datePrevue: d.datePrevue ? String(d.datePrevue).slice(0, 10) : null,
  };
}

app.get('/api/tournees', async (req, res) => {
  try {
    const db = getDb();
    const rows = await db
      .collection('tournees')
      .find({})
      .sort({ datePrevue: -1, name: 1 })
      .toArray();
    res.json(rows.map(docToTournee));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/tournees', async (req, res) => {
  try {
    const { name, chauffeurId, camionId, uniteId, status, completion, secteur, datePrevue } = req.body || {};
    const comp = Math.min(100, Math.max(0, Number(completion) || 0));
    const date = datePrevue || new Date().toISOString().slice(0, 10);
    const db = getDb();
    const { insertedId } = await db.collection('tournees').insertOne({
      name: name || '',
      chauffeurId: chauffeurId || null,
      camionId: camionId || null,
      uniteId: uniteId || null,
      status: status || "À l'heure",
      completion: comp,
      secteur: secteur || '',
      datePrevue: date,
    });
    const doc = await db.collection('tournees').findOne({ _id: insertedId });
    res.status(201).json(docToTournee(doc));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/tournees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, chauffeurId, camionId, uniteId, status, completion, secteur, datePrevue } = req.body || {};
    const db = getDb();
    const update = {};
    if (name !== undefined) update.name = name;
    if (chauffeurId !== undefined) update.chauffeurId = chauffeurId || null;
    if (camionId !== undefined) update.camionId = camionId || null;
    if (uniteId !== undefined) update.uniteId = uniteId || null;
    if (status !== undefined) update.status = status;
    if (completion !== undefined) update.completion = Math.min(100, Math.max(0, Number(completion) || 0));
    if (secteur !== undefined) update.secteur = secteur;
    if (datePrevue !== undefined) update.datePrevue = datePrevue;
    const result = await db.collection('tournees').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Non trouvé' });
    res.json(docToTournee(result));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/tournees/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('tournees').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Non trouvé' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Santé (répond tout de suite pour que le healthcheck Render passe)
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Swagger / OpenAPI — documentation interactive à /api-docs
const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./openapi');
app.get('/api-docs.json', (req, res) => res.json(openapiSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Gestion des déchets',
}));

// Servir le frontend (build Vite) depuis le même service
const { existsSync } = require('fs');
const possibleDist = [
  path.resolve(__dirname, '..', 'dist'),   // chemin absolu par rapport à server/index.js (fiable sur Render)
  path.join(process.cwd(), 'dist'),
];
const distPath = possibleDist.find((p) => existsSync(p));
if (distPath) {
  console.log('Frontend statique servi depuis:', distPath);
  app.use(express.static(distPath, { index: 'index.html' }));
  app.get('*', (req, res, next) => {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) next(err);
    });
  });
} else {
  console.warn('Aucun dossier dist/ trouvé. CWD:', process.cwd(), '; __dirname:', __dirname);
  app.get('/', (req, res) => {
    res.status(500).send('Dossier dist/ introuvable. Vérifiez que le build a bien produit dist/ à la racine.');
  });
}

// Démarrer le serveur tout de suite, puis connecter MongoDB en arrière-plan
app.listen(PORT, () => {
  console.log(`Serveur API sur le port ${PORT}`);
});

connect()
  .then(() => {
    console.log('MongoDB connecté');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à MongoDB:', err.message);
    // Ne pas quitter : le healthcheck reste vert, les routes API renverront 500 tant que MongoDB est down
  });
