# Hébergement de l’application

Ce guide décrit comment mettre en ligne le **frontend** (Vite/React) et l’**API** (Express/MongoDB). La base **MongoDB Atlas** est déjà dans le cloud.

---

## Déploiement fullstack sur Render (un seul service)

Pour tout héberger sur **Render** dans **un seul service** (API + frontend servis ensemble), voir le **mode d'emploi dédié** :

- **[Mode d'emploi – Déploiement fullstack Render](docs/MODE-EMPLOI-DEPLOIEMENT-RENDER-FULLSTACK.md)**

Le fichier `render.yaml` à la racine définit un unique Web Service ; le mode d'emploi décrit les étapes et le dépannage.

---

## Déploiement rapide : Netlify + Render

### Étape 1 – API sur Render

1. Va sur **[render.com](https://render.com)** et connecte-toi avec GitHub.
2. **New** → **Web Service** (ou **Blueprint** si tu veux utiliser le fichier `render.yaml`).
3. Choisis le dépôt **lorenzoeboa237/waste-track**.
4. Si tu crées un Web Service à la main :
   - **Root Directory** : `server`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance** : Free
5. **Environment** (variables d’environnement) :
   - `MONGODB_URI` = ton URI MongoDB Atlas (ex. `mongodb+srv://...` ; si le mot de passe contient `#`, utilise `%23`)
   - `MONGODB_DB_NAME` = `waste_db`
6. Crée le service. Render attribue une URL du type :  
   `https://waste-track-api.onrender.com`  
   **→ Copie cette URL** (sans slash à la fin) pour le frontend.

**Avec Blueprint :** si le dépôt contient `render.yaml`, tu peux **New** → **Blueprint** et connecter le repo ; Render créera le service. Il te demandera la valeur de `MONGODB_URI` (sync: false).

**MongoDB Atlas :** **Network Access** → **Allow Access from Anywhere** (`0.0.0.0/0`) pour que Render puisse se connecter.

---

### Étape 2 – Frontend sur Netlify

1. Va sur **[netlify.com](https://netlify.com)** et connecte-toi avec GitHub.
2. **Add new site** → **Import an existing project** → **GitHub** → choisis **lorenzoeboa237/waste-track**.
3. Netlify préremplit avec `npm run build` et `dist` (grâce à `netlify.toml`). Vérifie :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
4. **Add environment variables** (avant de déployer) :
   - **Key** : `VITE_API_URL`  
   - **Value** : l’URL Render de l’étape 1 (ex. `https://waste-track-api.onrender.com`) **sans slash final**.
5. **Deploy site**. Ton app sera en `https://xxx.netlify.app`.

---

### Vérification

- Ouvre l’URL Netlify : le tableau de bord et les listes doivent charger les données.
- Ouvre `https://ton-url-render/api/health` : tu dois voir `{"ok":true}`.

---

## En résumé

| Partie      | Où l’héberger | Coût   |
|------------|----------------|--------|
| Frontend   | Netlify | Gratuit |
| API (Node) | Render | Gratuit (Free tier) |
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
