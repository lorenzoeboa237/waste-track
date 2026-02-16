# Gestion des déchets – Cameroun (Projet L3)

Application type **HYSACAM** pour le suivi opérationnel de la collecte des déchets (Yaoundé, Douala).

**Fonctionnalités :**
- **Tableau de bord** : collecte du jour, indicateurs, alertes (sites à évacuer, tournées en retard).
- **Tournées** : planification par date/secteur, affectation **chauffeur** et **camion**, lien **unité opérationnelle**.
- **Chauffeurs** : liste + ajout/modification/suppression (nom, téléphone).
- **Camions** : parc de bennes (numéro, capacité).
- **Unités** : unités opérationnelles par secteur (ex. Unité Yaoundé-Centre).
- **Sites** : centres de transfert et suivi des capacités.

**Backend (optionnel) :** si `VITE_API_URL` est défini, l’app utilise l’API REST (**MongoDB**). Sinon, les données restent en **localStorage**.

📌 **Hébergement :** voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour mettre en ligne frontend (Vercel/Netlify) et API (Render/Railway).

---

## Démarrage

### Frontend seul (données en localStorage)

```bash
npm install
npm run dev
```

### Avec le backend MongoDB

1. **Configurer l’API** (dossier `server/`)
   ```bash
   cd server
   cp .env.example .env
   ```
   Dans `.env`, définir **MONGODB_URI** avec ton URI MongoDB Atlas (ex. `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&appName=Cluster0`).  
   **Important :** si le mot de passe contient `#`, le remplacer par `%23` dans l’URL.

2. **Lancer l’API**
   ```bash
   npm install
   npm run dev
   ```
   L’API écoute sur `http://localhost:3001` par défaut et se connecte à MongoDB au démarrage.

3. **Données initiales (optionnel)**
   ```bash
   npm run seed
   ```
   Insère chauffeurs, camions, unités, sites et tournées de démo (une seule fois).

4. **Configurer le frontend**
   - À la racine du projet : dans `.env`, définir `VITE_API_URL=http://localhost:3001`.
   - Lancer le front : `npm run dev`.

## Scripts

- `npm run dev` — Lance le serveur de développement (frontend)
- `npm run build` — Build de production
- `npm run preview` — Prévisualisation du build

**Backend (dans `server/`) :**
- `npm run dev` — Lance l’API (MongoDB)
- `npm start` — API en production
- `npm run seed` — Insère les données initiales (une fois)
