# Minnestunder - Moderne Minneportal

En elegant og emosjonell digital minneportal bygget med Vue 3, Tailwind CSS og glassmorphism-design.

## 🎨 Funksjoner

- **Hero Banner** med parallax-effekt
- **Premium glassmorphism design** med soft shadows
- **Hurtigknapper** for å tenne lys, skrive minneord, og se bilder/videoer
- **Moderne feed** med kommentarer, likes og deling
- **Autentisering** uten e-postverifisering
- **Administrator panel** for å redigere innhold
- **Fullstendig responsiv** for mobil, tablet og PC
- **Mørk modus** som standard
- **Silkemyke animasjoner** (200-400ms)
- **Mediegaleri** med fullskjermvisning

## 🚀 Quick Start

### Installasjon

```bash
npm install
```

### Utvikling

```bash
npm run dev
```

Åpne [http://localhost:5173](http://localhost:5173) i nettleseren.

### Produksjon

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide Vue Next
- **Datoer**: date-fns
- **Backend Integration**: Axios (Firebase/Supabase ready)

## 📁 Struktur

```
src/
├── components/
│   ├── Hero/
│   ├── ActionButtons/
│   ├── Feed/
│   ├── Filters/
│   ├── Modal/
│   ├── Profile/
│   └── Admin/
├── stores/
│   ├── auth.js
│   ├── feed.js
│   ├── profile.js
│   └── ui.js
├── views/
│   ├── Home.vue
│   ├── Gallery.vue
│   └── Admin.vue
├── styles/
│   ├── main.css
│   ├── glassmorphism.css
│   └── animations.css
├── utils/
│   ├── helpers.js
│   └── api.js
└── router/
    └── index.js
```

## 🎯 Designfilosofi

- **Apple-inspirert minimalisme**: Ren, luftig design
- **Glassmorphism**: Subtile uskarpe bakgrunner
- **Soft Shadows**: Elegante skygger (soft-sm, soft-md, soft-lg, soft-xl)
- **Premium typografi**: Inter-fonten med god avstand
- **Diskrete animasjoner**: 200-400ms overganger

## 🔐 Sikkerhet

For produksjon, implementer:
- Firebase Authentication eller Supabase
- Backend-validering av alle innlegg
- Rate limiting
- CORS-policy
- XSS-beskyttelse

## 📱 Responsivitet

- **Mobil**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Fargepalett

- **Primary**: Slate (950-100)
- **Accents**: Blue, Purple, Orange, Pink
- **Text**: Slate-100 (light), Slate-950 (dark)

## 📝 Lisens

MIT License - Fritt å bruke og modifisere
