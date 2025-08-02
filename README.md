# Cocstart

Sebuah aplikasi web pendaftaran modern yang dibangun menggunakan teknologi web terkini untuk memberikan pengalaman pendaftaran yang lancar dan responsif.

## 🚀 Teknologi yang Digunakan

- **React 18** - Library JavaScript untuk membangun user interface
- **TypeScript** - Superset JavaScript dengan type safety
- **Vite** - Build tool yang cepat dan modern
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Routing untuk aplikasi React
- **Framer Motion** - Library animasi untuk React
- **Heroicons** - Icon set yang elegan
- **React Parallax** - Efek parallax scrolling

## ✨ Fitur

- 🎨 Design modern dan responsif dengan Tailwind CSS
- ⚡ Animasi yang halus menggunakan Framer Motion
- 🧭 Navigasi yang lancar dengan React Router
- 📱 Mobile-friendly design
- 🎯 Type-safe development dengan TypeScript
- ⚡ Hot Module Replacement (HMR) untuk development yang cepat
- 🌊 Efek parallax untuk pengalaman visual yang menarik
- 🎭 Icon yang konsisten dengan Heroicons

## 🛠️ Instalasi

1. Clone repository ini:
```bash
git clone <repository-url>
cd cocstart


2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Menjalankan development server dengan hot reload
- `npm run build` - Build aplikasi untuk production (TypeScript + Vite build)
- `npm run lint` - Menjalankan ESLint untuk code linting
- `npm run preview` - Preview build production secara lokal



## ⚙️ Konfigurasi

### Vite Configuration
Template ini menggunakan plugin resmi Vite untuk React:
- `@vitejs/plugin-react` - Menggunakan Babel untuk Fast Refresh
- Alternatif: `@vitejs/plugin-react-swc` - Menggunakan SWC untuk Fast Refresh (lebih cepat)

### ESLint Configuration
Untuk aplikasi production, disarankan untuk menggunakan konfigurasi type-aware:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // Untuk aturan yang lebih ketat:
      ...tseslint.configs.strictTypeChecked,
      // Untuk aturan stylistic:
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### Tailwind CSS
Pastikan Tailwind CSS dikonfigurasi dengan benar untuk project React:

```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🚀 Deployment

### Build untuk Production
```bash
npm run build
```

### Deployment ke Various Platforms

#### Netlify
1. Connect repository ke Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

#### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/cocstart",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```
3. Run: `npm run build && npm run deploy`

## 🔧 Development Tips

### Hot Module Replacement (HMR)
Vite menyediakan HMR yang sangat cepat. Perubahan akan terlihat langsung tanpa refresh halaman.

### TypeScript
- Gunakan type definitions yang ketat
- Manfaatkan interface untuk props components
- Gunakan generic types untuk reusable components

### Performance Optimization
- Lazy loading untuk pages: `const Home = lazy(() => import('./pages/Home'))`
- Optimize bundle size dengan code splitting
- Gunakan React.memo untuk components yang tidak sering berubah

## 🧪 Testing (Opsional)

Untuk menambah testing, install:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom
```

## 🤝 Contributing

1. Fork repository ini
2. Buat branch untuk fitur baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

### Code Style
- Gunakan TypeScript untuk type safety
- Follow ESLint rules yang sudah dikonfigurasi
- Gunakan Prettier untuk code formatting (opsional)
- Naming convention: camelCase untuk variables/functions, PascalCase untuk components

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact & Support

- **Project Link**: [https://github.com/IndalAwalaikal/cocstart](https://github.com/yourusername/cocstart)


## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Heroicons](https://heroicons.com/) - Icon Library

---

**Dibuat dengan menggunakan React + Vite + TypeScript + Tailwind CSS**

*Cocstart - Modern Registration Web Application*
```
