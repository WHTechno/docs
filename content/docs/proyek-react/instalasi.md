# Instalasi Proyek React

Panduan lengkap untuk menginstal dan menjalankan proyek React.

## Prasyarat

Pastikan Anda telah menginstal:

- **Node.js** (versi 16 atau lebih baru)
- **npm** atau **yarn**
- **Git**

## Langkah Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/proyek-react.git
cd proyek-react
```

### 2. Install Dependencies

```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root directory:

```bash
# .env.local
REACT_APP_API_URL=http://localhost:3001
REACT_APP_APP_NAME=Proyek React
REACT_APP_VERSION=1.0.0
```

### 4. Jalankan Development Server

```bash
# Menggunakan npm
npm run dev

# Atau menggunakan yarn
yarn dev
```

### 5. Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview build
npm run preview
```

## Troubleshooting

### Error: Port sudah digunakan

```bash
# Cari proses yang menggunakan port
lsof -i :3000

# Kill proses
kill -9 <PID>
```

### Error: Module tidak ditemukan

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
rm package-lock.json
npm install
```

## Konfigurasi IDE

### VS Code Extensions

Instal extension berikut untuk pengalaman development yang lebih baik:

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### Settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
