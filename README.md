# FitTrack – Application de suivi d'entraînement sportif

Application frontend complète développée avec **React + TypeScript + Tailwind CSS**.

## 🚀 Démarrage rapide

### Prérequis
- Node.js >= 18
- npm ou yarn

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir http://localhost:5173
```

### Build pour la production

```bash
npm run build
npm run preview
```

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── auth/          # AuthLayout (wrapper partagé auth)
│   ├── dashboard/     # DashboardHome, Program, Progress, Settings, StatCard
│   ├── layout/        # Navbar, DashboardLayout (sidebar)
│   └── ui/            # Button, Input, Badge, Logo (composants réutilisables)
├── context/
│   └── AuthContext.tsx  # Authentification globale (React Context)
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ResetPasswordPage.tsx
│   └── DashboardPage.tsx
├── types/
│   └── index.ts        # Types TypeScript
└── utils/
    └── mockData.ts     # Données de démonstration
```

---

## 🎯 Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Landing Page (programmes, coachs, témoignages, tarifs) |
| `/login` | Connexion |
| `/register` | Inscription (2 étapes) |
| `/reset-password` | Réinitialisation de mot de passe |
| `/dashboard` | Tableau de bord principal |
| `/dashboard/programme` | Programme personnalisé + séance interactive |
| `/dashboard/progression` | Graphiques de progression |
| `/dashboard/parametres` | Paramètres du compte |

---

## ✅ Exigences techniques couvertes

- ✅ Composants réutilisables (`Button`, `Input`, `Badge`, `Logo`, `StatCard`, `AuthLayout`)
- ✅ Props et states React
- ✅ Routing React Router v6 avec routes protégées
- ✅ Interface responsive (mobile-first)
- ✅ Code organisé par domaine
- ✅ TypeScript strict
- ✅ Context API pour l'authentification

---

## 🚢 Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Uploader le dossier dist/ sur Netlify
```

### GitHub Pages
```bash
# Ajouter dans vite.config.ts : base: '/nom-du-repo/'
npm run build
# Déployer via GitHub Actions ou gh-pages
```

---

## 🔐 Authentification de test

L'authentification est simulée (pas de backend réel).  
**N'importe quel email valide + mot de passe ≥ 6 caractères** fonctionne.

---

## 🎨 Design System

- **Couleurs** : Orange primary (`#f97316`) sur fond sombre
- **Typographie** : Bebas Neue (titres) + DM Sans (corps)
- **Composants** : Cards glassmorphism, boutons avec animations
- **Graphiques** : Recharts (AreaChart, BarChart)
