# Hébergement de l’application

Ce guide décrit comment mettre en ligne le **frontend** (Vite/React) et l’**API** (Express/MongoDB). La base **MongoDB Atlas** est déjà dans le cloud.

---

## En résumé

| Partie      | Où l’héberger | Coût   |
|------------|----------------|--------|
| Frontend   | Vercel ou Netlify | Gratuit |
| API (Node) | Render ou Railway | Gratuit (limites) |
| Base de données | MongoDB Atlas (déjà en place) | Gratuit (M0) |

---

## 1. Prérequis

- Un compte **GitHub** et le projet poussé sur un dépôt.
- Un compte **MongoDB Atlas** (déjà utilisé).
- Un compte **Vercel** ou **Netlify** (frontend).
- Un compte **Render** ou **Railway** (API).

---

## 2. Héberger l’API (backend)

### Option A : Render

1. Va sur [render.com](https://render.com) et connecte GitHub.
2. **New** → **Web Service**.
3. Choisis le dépôt du projet.
4. Configuration :
   - **Root Directory** : `server`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance** : Free
5. **Environment** (variables d’environnement) :
   - `MONGODB_URI` = ton URI Atlas (ex. `mongodb+srv://...`)
   - `MONGODB_DB_NAME` = `waste_db`
   - (Pas besoin de `PORT`, Render le définit.)
6. Crée le service. Render te donne une URL du type :  
   `https://waste-management-api.onrender.com`  
   **→ note cette URL** pour le frontend.

### Option B : Railway

1. Va sur [railway.app](https://railway.app) et connecte GitHub.
2. **New Project** → **Deploy from GitHub repo** → choisis le dépôt.
3. Dans les paramètres du service :
   - **Root Directory** : `server`
   - **Build** : détecté automatiquement (ou `npm install`).
   - **Start** : `npm start`
4. **Variables** :
   - `MONGODB_URI` = ton URI Atlas
   - `MONGODB_DB_NAME` = `waste_db`
5. **Settings** → **Generate Domain** pour obtenir une URL publique.  
   **→ note cette URL** pour le frontend.

### MongoDB Atlas (accès depuis l’hébergeur)

- Dans Atlas : **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`).  
  Nécessaire pour que Render/Railway puissent se connecter.

---

## 3. Héberger le frontend

### Option A : Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte GitHub.
2. **Add New** → **Project** → choisis le dépôt.
3. Configuration :
   - **Framework Preset** : Vite
   - **Root Directory** : `./` (racine du projet)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
4. **Environment Variables** :
   - `VITE_API_URL` = **URL de ton API** (ex. `https://waste-management-api.onrender.com`)  
     **Sans slash final.**
5. **Deploy**. Ton app sera en `https://ton-projet.vercel.app`.

### Option B : Netlify

1. Va sur [netlify.com](https://netlify.com) et connecte GitHub.
2. **Add new site** → **Import an existing project** → choisis le dépôt.
3. Configuration :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
4. **Environment variables** (Site settings → Environment variables) :
   - `VITE_API_URL` = **URL de ton API**
5. **Deploy**. Ton app sera en `https://quelquechose.netlify.app`.

---

## 4. Vérifications

- **Frontend** : ouvre l’URL Vercel/Netlify ; le tableau de bord et les listes doivent charger les données depuis l’API.
- **API** : ouvre `https://ton-api-url/api/health` dans le navigateur ; tu dois voir `{"ok":true}`.
- Si les données ne s’affichent pas : vérifie que `VITE_API_URL` est bien l’URL publique de l’API (sans slash final) et que CORS est autorisé (déjà le cas avec `cors({ origin: true })` dans le backend).

---

## 5. Résumé des variables d’environnement

**Backend (Render / Railway)**  
- `MONGODB_URI`  
- `MONGODB_DB_NAME` (optionnel, défaut `waste_db`)

**Frontend (Vercel / Netlify)**  
- `VITE_API_URL` = URL publique de l’API (ex. `https://waste-management-api.onrender.com`)

---

## 6. Déploiement automatique

Une fois connecté à GitHub, Vercel/Netlify et Render/Railway redéploient à chaque push sur la branche configurée (souvent `main`). Tu n’as rien d’autre à faire après le premier déploiement.
