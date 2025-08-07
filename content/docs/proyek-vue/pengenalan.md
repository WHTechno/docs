# Pengenalan Vue.js Project

Dokumentasi untuk proyek Vue.js yang modern dan scalable.

## Overview

Proyek ini menggunakan Vue 3 dengan Composition API dan TypeScript untuk membangun aplikasi web yang interaktif dan performant.

## Fitur Utama

- **Vue 3 Composition API**: API yang lebih fleksibel dan powerful
- **TypeScript**: Type safety untuk development yang lebih aman
- **Pinia**: State management yang modern untuk Vue
- **Vue Router**: Routing untuk Single Page Application
- **Vite**: Build tool yang cepat dan modern

## Teknologi Stack

```json
{
  "vue": "^3.3.0",
  "typescript": "^5.0.0",
  "pinia": "^2.1.0",
  "vue-router": "^4.2.0",
  "vite": "^4.4.0"
}
```

## Struktur Proyek

```
src/
├── components/
│   ├── common/
│   │   ├── BaseButton.vue
│   │   └── BaseModal.vue
│   └── features/
│       ├── UserProfile.vue
│       └── ProductList.vue
├── views/
│   ├── Home.vue
│   ├── About.vue
│   └── Dashboard.vue
├── stores/
│   ├── user.ts
│   └── products.ts
├── router/
│   └── index.ts
└── utils/
    ├── api.ts
    └── helpers.ts
```

## Contoh Komponen Vue

```vue
<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <BaseButton @click="updateProfile" :loading="isLoading">
      Update Profile
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import BaseButton from '@/components/common/BaseButton.vue'

interface User {
  id: number
  name: string
  email: string
}

const userStore = useUserStore()
const isLoading = ref(false)

const user = computed(() => userStore.currentUser)

const updateProfile = async () => {
  isLoading.value = true
  try {
    await userStore.updateUser(user.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.user-profile {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}
</style>
```

## Getting Started

1. Clone repository
2. Install dependencies: `npm install`
3. Jalankan development server: `npm run dev`
4. Build untuk production: `npm run build`
