# Sistema de Traducción del Portfolio

## Descripción General

Este portfolio implementa un sistema de traducción completo que soporta **Español**, **Inglés** y **Chino Mandarín**. El sistema es reactivo y permite cambiar idiomas dinámicamente sin recargar la página.

## Arquitectura Técnica

### Composables Implementados

#### `useTranslation.ts` - Composable Principal

```typescript
export function useTranslation() {
    const setLanguage = (lang: Language) => {
        /* Cambia idioma */
    };
    const t = (key: string, fallback?: string): string => {
        /* Traduce clave */
    };
    const loadTranslations = (data: TranslationData) => {
        /* Carga datos */
    };
    const initializeLanguage = () => {
        /* Inicializa desde localStorage */
    };
    // ...
}
```

#### `translationInstance.ts` - Instancia Global

```typescript
export const translationInstance = useTranslation();
```

### Archivo de Traducciones

- **Ubicación**: `resources/js/data/translations.ts`
- **Estructura**: Objeto con claves para cada idioma
- **Tipos**: `TranslationData` interface definida en `useTranslation.ts`

## Uso en Componentes

### Importación y Uso Básico

```vue
<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { translationInstance } from '@/composables/translationInstance';

const { t } = useTranslation();
// o
const { t } = translationInstance;
</script>

<template>
    <h1>{{ t('nav.home') }}</h1>
    <p>{{ t('about.description') }}</p>
</template>
```

### Con Fallback

```vue
<template>
    <span>{{ t('custom.key', 'Texto por defecto') }}</span>
</template>
```

## Componentes que Usan Traducciones

### Selectores de Interfaz

- **LanguageSelector.vue**: Selector visual de idiomas
- **InterfaceModeSelector.vue**: Selector de modos de interfaz

### Componentes Principales

- **Welcome.vue**: Página principal con datos del portfolio
- **ClassicPortfolio.vue**: Portfolio en modo clásico
- **HolographicPortfolio.vue**: Portfolio en modo holográfico
- **SpaceModulesStatic.vue**: Portfolio en modo espacial

## Gestión de Estado

### Persistencia

- El idioma seleccionado se guarda en `localStorage`
- Se recupera automáticamente al cargar la página
- Valor por defecto: `'en'` (Inglés)

### Reactividad

- Cambios de idioma actualizan todos los componentes automáticamente
- No requiere recarga de página
- Estado global compartido entre componentes

## Estructura de Claves de Traducción

### Navegación

```
nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact'
}
```

### Interfaz

```
interface: {
    mode: 'Interface Mode',
    holo: 'Holographic',
    space: 'Space',
    classic: 'Classic'
}
```

## Agregar Nuevos Idiomas

### 1. Actualizar Tipos

```typescript
// En useTranslation.ts
export type Language = 'en' | 'es' | 'zh' | 'fr'; // Agregar 'fr'
```

### 2. Agregar Traducciones

```typescript
// En translations.ts
export const portfolioTranslations: TranslationData = {
    en: {
        /* inglés */
    },
    es: {
        /* español */
    },
    zh: {
        /* chino */
    },
    fr: {
        /* francés - NUEVO */
    },
};
```

### 3. Actualizar Selector

Modificar `LanguageSelector.vue` para incluir el nuevo idioma.

## Optimizaciones Implementadas

### Performance

- **Lazy Loading**: Traducciones cargadas solo cuando se necesitan
- **Caching**: Instancia singleton para evitar recreación
- **Minimal Bundle**: Solo incluye traducciones de idiomas activos

### Accesibilidad

- **Persistente**: Preferencia de idioma guardada entre sesiones
- **Fallback**: Texto por defecto si traducción no existe
- **Validation**: Validación de códigos de idioma válidos

## Mantenimiento

### Actualización de Traducciones

1. Editar `resources/js/data/translations.ts`
2. Verificar consistencia entre idiomas
3. Probar en todos los modos de interfaz
4. Validar en diferentes dispositivos

### Debugging

- Usar fallback para identificar claves faltantes
- Console logs para cambios de idioma
- Validación de estructura de datos de traducción

---

**Estado**: ✅ Implementado y funcional
**Idiomas**: Español, Inglés, Chino Mandarín
**Componentes**: 15+ componentes usando el sistema
