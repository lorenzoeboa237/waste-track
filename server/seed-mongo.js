/**
 * Données initiales MongoDB (optionnel).
 * Exécuter : npm run seed (depuis server/) ou node seed-mongo.js
 */
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'waste_db';

async function seed() {
  if (!uri) {
    console.error('MONGODB_URI manquant dans .env');
    process.exit(1);
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const existing = await db.collection('chauffeurs').countDocuments();
    if (existing > 0) {
      console.log('Données déjà présentes, skip seed.');
      return;
    }

    const chauffeurs = [
      { nom: 'Jean-Marie Mbarga', telephone: '237 6XX XXX XXX' },
      { nom: 'Marie-Louise Ngo Bikoko', telephone: '' },
      { nom: 'Paul Essono', telephone: '' },
      { nom: 'Clémentine Abena', telephone: '' },
      { nom: 'Françoise Mballa', telephone: '' },
    ];
    const chauffeurIds = [];
    for (const c of chauffeurs) {
      const r = await db.collection('chauffeurs').insertOne(c);
      chauffeurIds.push(r.insertedId.toString());
    }
    console.log('Chauffeurs:', chauffeurIds.length);

    const camions = [
      { numero: 'BENNE-101', capacite: '5 t' },
      { numero: 'BENNE-102', capacite: '5 t' },
      { numero: 'BENNE-201', capacite: '10 t' },
      { numero: 'BENNE-202', capacite: '10 t' },
    ];
    const camionIds = [];
    for (const c of camions) {
      const r = await db.collection('camions').insertOne(c);
      camionIds.push(r.insertedId.toString());
    }
    console.log('Camions:', camionIds.length);

    const unites = [
      { nom: 'Unité Yaoundé-Centre', secteur: 'Yaoundé Centre' },
      { nom: 'Unité Yaoundé-Nord', secteur: 'Yaoundé Nord' },
      { nom: 'Unité Douala', secteur: 'Douala' },
    ];
    const uniteIds = [];
    for (const u of unites) {
      const r = await db.collection('unites').insertOne(u);
      uniteIds.push(r.insertedId.toString());
    }
    console.log('Unités:', uniteIds.length);

    await db.collection('sites').insertMany([
      { name: 'Centre de transfert Yaoundé-Nord', capacity: 87, status: 'Opérationnel' },
      { name: 'Site de regroupement Douala-Bépanda', capacity: 65, status: 'Opérationnel' },
      { name: 'Centre de tri Yaoundé-Est', capacity: 45, status: 'Opérationnel' },
      { name: 'Station de transfert Douala-Bonabéri', capacity: 93, status: 'Attention' },
    ]);
    console.log('Sites: 4');

    const today = new Date().toISOString().slice(0, 10);
    await db.collection('tournees').insertMany([
      { name: 'Quartier Bastos', chauffeurId: chauffeurIds[0], camionId: camionIds[0], uniteId: uniteIds[0], status: "À l'heure", completion: 78, secteur: 'Yaoundé Centre', datePrevue: today },
      { name: 'Yaoundé-Nord', chauffeurId: chauffeurIds[1], camionId: camionIds[1], uniteId: uniteIds[1], status: 'En retard', completion: 45, secteur: 'Yaoundé Nord', datePrevue: today },
      { name: 'Douala Bépanda', chauffeurId: chauffeurIds[2], camionId: camionIds[2], uniteId: uniteIds[2], status: "À l'heure", completion: 92, secteur: 'Douala', datePrevue: today },
      { name: 'Odza', chauffeurId: chauffeurIds[3], camionId: camionIds[0], uniteId: uniteIds[0], status: "À l'heure", completion: 34, secteur: 'Yaoundé Est', datePrevue: today },
      { name: 'Bonabéri', chauffeurId: chauffeurIds[4], camionId: camionIds[3], uniteId: uniteIds[2], status: 'Critique', completion: 23, secteur: 'Douala', datePrevue: today },
    ]);
    console.log('Tournées: 5');

    console.log('Seed terminé.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
