# =============================================================================
# Dockerfile multi-étapes pour le front React (Vite) — déploiement Koyeb
# Étape 1 : build du bundle statique avec Node
# Étape 2 : service des fichiers statiques avec nginx (léger)
# =============================================================================

# -----------------------------------------------------------------------------
# ÉTAPE 1 — BUILD
# -----------------------------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# IMPORTANT (Vite) : les variables VITE_* sont injectées au moment du BUILD,
# pas au runtime. On les reçoit donc ici via un ARG, qu'on expose en ENV
# pour que `vite build` la lise. Valeur par défaut = URL du back sur Koyeb.
# Surchargeable depuis Koyeb (Build arguments) ou `docker build --build-arg`.
ARG VITE_API_URL=https://living-stevana-tenalic-07c42fee.koyeb.app
ENV VITE_API_URL=$VITE_API_URL

# Installation des dépendances en premier (meilleur cache Docker)
# `npm ci` = install reproductible basé sur package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# Copie du reste du code puis build (génère /app/dist)
COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# ÉTAPE 2 — SERVEUR STATIQUE NGINX
# -----------------------------------------------------------------------------
FROM nginx:alpine AS runtime

# Config nginx adaptée au SPA (try_files) — voir nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Récupération du build Vite depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Koyeb route le trafic vers ce port (cohérent avec nginx.conf et le port Koyeb)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
