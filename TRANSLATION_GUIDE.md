# Sistema de Traducción del Portfolio

## Descripción General

Este portfolio implementa un sistema de traducción completo que soporta **Español**, **Inglés** y **Chino Mandarín**. El sistema es reactivo y permite cambiar idiomas dinámicamente sin recargar la página.

## Estructura del Sistema

### 1. Composable Principal (`useTranslation.ts`)

```typescript
const { t, language, setLanguage } = useTranslation();
```

### 2. Archivo de Traducciones (`translations.ts`)

Contiene todas las traducciones organizadas por idioma:

```typescript
export const portfolioTranslations: TranslationData = {
    en: {
        /* traducciones en inglés */
    },
    es: {
        /* traducciones en español */
    },
    zh: {
        /* traducciones en chino */
    },
};
```

### 3. Selector de Idiomas (`LanguageSelector.vue`)

Componente visible en la esquina superior derecha que permite cambiar idiomas.

## Cómo Usar las Traducciones

### Uso Básico en Componentes

```vue
<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';

const { t } = useTranslation();
</script>

<template>
    <h1>{{ t('nav.home') }}</h1>
    <p>{{ t('about.description') }}</p>
</template>
```

### Con Fallback

```vue
<template>
    <span>{{ t('custom.key', 'Texto por defecto si no existe la traducción') }}</span>
</template>
```

### Traducciones con Variables

```typescript
// En translations.ts
'welcome.message': 'Bienvenido {name}, tienes {count} mensajes'

// En el componente
const message = tv('welcome.message', { name: 'Juan', count: 5 });
```

### Pluralización

```typescript
// En translations.ts
'projects.item': 'proyecto',
'projects.item_plural': 'proyectos'

// En el componente
const text = tp('projects.item', projectCount);
```

## Agregar Nuevas Traducciones

### 1. Agregar la clave en `translations.ts`

```typescript
export const portfolioTranslations: TranslationData = {
    en: {
        'nueva.clave': 'New text in English',
    },
    es: {
        'nueva.clave': 'Nuevo texto en español',
    },
    zh: {
        'nueva.clave': '中文新文本',
    },
};
```

### 2. Usar en el componente

```vue
<template>
    <div>{{ t('nueva.clave') }}</div>
</template>
```

## Organización de Claves

Las claves están organizadas por sección:

- `nav.*` - Navegación
- `hero.*` - Sección principal
- `about.*` - Acerca de
- `skills.*` - Habilidades
- `projects.*` - Proyectos
- `contact.*` - Contacto
- `interface.*` - Interfaz revolucionaria
- `holo.*` - Terminal holográfico
- `personal.*` - Información personal
- `experience.*` - Experiencia
- `achievements.*` - Logros

## Funciones de Utilidad

### Formateo de Números

```typescript
import { formatNumber } from '@/utils/translationHelpers';

const formattedNumber = formatNumber(1234); // "1,234" en inglés, "1.234" en español
```

### Formateo de Fechas

```typescript
import { formatDate } from '@/utils/translationHelpers';

const formattedDate = formatDate(new Date(), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});
```

## Componentes que Usan Traducciones

- ✅ `LanguageSelector.vue` - Selector de idiomas
- ✅ `RevolutionaryPortfolio.vue` - Interfaz principal
- ✅ `HolographicSkills.vue` - Matriz de habilidades
- ✅ `ClassicPortfolio.vue` - Modo clásico
- ✅ `SpaceModulesStatic.vue` - Modo espacial
- ✅ `HoloTerminal.vue` - Terminal holográfico
- ✅ `ContactSection.vue` - Formulario de contacto

## Persistencia

El idioma seleccionado se guarda en `localStorage` y se restaura automáticamente cuando el usuario vuelve a la página.

## Idiomas Soportados

| Código | Idioma  | Bandera | Estado      |
| ------ | ------- | ------- | ----------- |
| `en`   | English | 🇺🇸      | ✅ Completo |
| `es`   | Español | 🇪🇸      | ✅ Completo |
| `zh`   | 中文    | 🇨🇳      | ✅ Completo |

## Para Agregar un Nuevo Idioma

1. Agregar el código de idioma al tipo `Language` en `useTranslation.ts`
2. Agregar las traducciones en `translations.ts`
3. Agregar el idioma al array `languages` en `LanguageSelector.vue`
4. Actualizar las funciones de formateo si es necesario

## Mejores Prácticas

1. **Usar claves descriptivas**: `skills.category.frontend` mejor que `s1`
2. **Agrupar por sección**: Organizar las claves por funcionalidad
3. **Proporcionar fallbacks**: Siempre incluir texto por defecto
4. **Ser consistente**: Usar el mismo formato para claves similares
5. **Traducir contenido, no código**: Mantener nombres técnicos en inglés

## Ejemplo de Implementación Completa

```vue
<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';
import { portfolioTranslations } from '@/data/translations';
import { onMounted } from 'vue';

const { t, loadTranslations, initializeLanguage } = useTranslation();

onMounted(() => {
    loadTranslations(portfolioTranslations);
    initializeLanguage();
});
</script>

<template>
    <div class="mi-componente">
        <h1>{{ t('mi.titulo', 'Título por defecto') }}</h1>
        <p>{{ t('mi.descripcion', 'Descripción por defecto') }}</p>
        <button>{{ t('mi.boton', 'Botón') }}</button>
    </div>
</template>
```

Con este sistema, **todo el contenido del portfolio es completamente traducible** y se adapta automáticamente al idioma seleccionado por el usuario.
