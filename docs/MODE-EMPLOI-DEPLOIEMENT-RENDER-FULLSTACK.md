# Mode d'emploi – Déploiement fullstack sur Render (un seul service)

Ce document décrit comment déployer **toute l’application** (frontend React + API Node.js) sur **Render** dans **un seul service** : l’API Express sert à la fois les routes `/api/*` et les fichiers statiques du frontend (build Vite).

---

## Vue d’ensemble

| Élément | Rôle |
|--------|------|
| **Un Web Service** | Build : frontend (Vite) puis dépendances server. Démarrage : Express sert l’API + le dossier `dist/` (SPA). |
| **MongoDB Atlas** | Base de données externe (déjà en place). |

**Avantages :** une seule URL, pas de CORS à gérer, pas de variable `VITE_API_URL` à configurer.

**Prérequis :**
- Compte [Render](https://render.com) (lié à GitHub)
- Compte [MongoDB Atlas](https://cloud.mongodb.com) avec une base et une URI de connexion
- Projet poussé sur un dépôt GitHub

---

## Méthode 1 : Blueprint (recommandé)

Le fichier `render.yaml` à la racine du dépôt définit un unique service fullstack.

### Étape 1 – Lancer le déploiement

1. Va sur **[dashboard.render.com](https://dashboard.render.com)** et connecte-toi avec GitHub.
2. **New** → **Blueprint**.
3. Choisis le dépôt du projet (ex. `waste-track`).
4. Render détecte le `render.yaml`. Clique sur **Apply**.

### Étape 2 – Variables d’environnement

Render te demande les variables pour le service **waste-track** :

- **MONGODB_URI** : ton URI MongoDB Atlas (ex. `mongodb+srv://user:password@cluster.xxxxx.mongodb.net/`).  
  Si le mot de passe contient `#`, remplace-le par `%23`.
- **MONGODB_DB_NAME** : en général déjà rempli avec `waste_db`. Tu peux laisser.

Aucune variable pour le frontend : il est servi par le même domaine que l’API, les appels sont en relatif.

### Étape 3 – Vérification

- Ouvre **l’URL du service fullstack** (ex. `https://waste-track.onrender.com`) : tu dois voir l’application (tableau de bord).  
  ⚠️ Utilise bien cette URL, pas une ancienne URL d’un service « API seule » (ex. `waste-track-api.onrender.com`) qui n’afficherait pas le frontend.
- Ouvre `https://waste-track.onrender.com/api/health` : tu dois voir `{"ok":true}`.
- Les sous-routes (ex. `/tournees`, `/chauffeurs`) doivent fonctionner (SPA gérée par le serveur).

---

## Méthode 2 : Création manuelle du service

1. **New** → **Web Service**.
2. Connecte le dépôt GitHub et choisis le repo du projet.
3. Configuration :
   - **Name** : par ex. `waste-track`
   - **Region** : au choix (ex. Oregon)
   - **Branch** : `main` (ou ta branche)
   - **Root Directory** : laisser **vide** (racine du repo)
   - **Runtime** : `Node`
   - **Build Command** : `npm install && npm run build && cd server && npm install`
   - **Start Command** : `node server/index.js`
   - **Instance Type** : Free
4. **Environment Variables** :
   - `MONGODB_URI` = ton URI MongoDB Atlas
   - `MONGODB_DB_NAME` = `waste_db`
5. **Create Web Service**.

---

## MongoDB Atlas (accès réseau)

Pour que le service sur Render puisse se connecter à MongoDB Atlas :

1. Dans [MongoDB Atlas](https://cloud.mongodb.com), ouvre ton projet.
2. **Network Access** → **Add IP Address**.
3. Choisis **Allow Access from Anywhere** (`0.0.0.0/0`).
4. Enregistre.

---

## Résumé des variables d’environnement

| Variable | Rôle |
|---------|------|
| `MONGODB_URI` | URI de connexion MongoDB Atlas |
| `MONGODB_DB_NAME` | Nom de la base (ex. `waste_db`) |

Aucune variable côté frontend : l’API et l’app sont sur le même domaine.

---

## Déploiements automatiques

À chaque push sur la branche configurée (souvent `main`), Render redéploie le service : build frontend + server, puis démarrage. Un seul service à maintenir.

---

## Dépannage rapide

| Problème | À vérifier |
|----------|------------|
| Le lien n’affiche pas le frontend (API seule ou "Cannot GET /") | 1) Ouvre l’URL du **service fullstack** (ex. `https://waste-track.onrender.com`), pas une ancienne URL type `waste-track-api`. 2) Dans le dashboard Render → ton service → **Settings** : **Root Directory** doit être **vide**. 3) Dans **Logs**, vérifier la ligne « Frontend statique servi depuis: … » au démarrage. |
| "Cannot GET /" sur la racine | Le build a bien produit un dossier `dist/` à la racine. Vérifier que **Build Command** est `npm install && npm run build && cd server && npm install` et **Root Directory** est vide. |
| Les données ne se chargent pas | Tester `https://ton-service.onrender.com/api/health` et `/api/chauffeurs`. Vérifier `MONGODB_URI` et Network Access Atlas (`0.0.0.0/0`). |
| 404 sur une sous-route (ex. `/tournees`) | Le serveur sert déjà `index.html` pour les chemins non-API ; si 404 persiste, vérifier que le déploiement utilise bien la dernière version du code (static + fallback SPA dans `server/index.js`). |
| Erreur MongoDB | `MONGODB_URI` correct ; dans l’URI, remplacer `#` par `%23` dans le mot de passe. |

---

*Document rédigé pour le projet Waste Management System – déploiement fullstack Render (un seul service).*
