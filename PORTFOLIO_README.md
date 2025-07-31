# Portfolio Profesional - Documentación

## 🎯 Descripción General

Este es un sitio web portfolio moderno, elegante y profesional construido con tecnologías de vanguardia. El sitio está completamente modularizado en componentes reutilizables y cuenta con soporte para múltiples idiomas (Español, Inglés y Mandarín).

## 🌟 Características Principales

### ✨ Funcionalidades Implementadas

- **🌐 Multiidioma**: Soporte completo para Español, Inglés y Mandarín
- **🎨 Diseño Responsivo**: Optimizado para todos los dispositivos
- **🌙 Modo Oscuro**: Tema oscuro/claro automático
- **📧 Formulario de Contacto**: Sistema completo de envío de emails
- **⚡ Rendimiento**: Optimizado con Vite y lazy loading
- **🎯 SEO Optimizado**: Meta tags y estructura semántica
- **♿ Accesibilidad**: Cumple con estándares WCAG

### 🧩 Componentes Creados

1. **Navigation.vue** - Navegación principal con scroll spy
2. **LanguageSelector.vue** - Selector de idiomas interactivo
3. **HeroSection.vue** - Sección principal con animaciones
4. **AboutSection.vue** - Información personal y estadísticas
5. **SkillsSection.vue** - Habilidades técnicas con filtros
6. **ProjectsSection.vue** - Portafolio de proyectos con modal
7. **ContactSection.vue** - Formulario de contacto funcional
8. **PortfolioLayout.vue** - Layout principal que integra todo

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Vue.js 3** - Framework reactivo con Composition API
- **TypeScript** - Tipado estático para mejor desarrollo
- **Tailwind CSS** - Framework CSS utilitario
- **Inertia.js** - SPA sin API tradicional
- **Lucide Vue** - Iconos modernos y ligeros

### Backend

- **Laravel 11** - Framework PHP robusto
- **PHP 8+** - Lenguaje de programación moderno
- **MySQL/SQLite** - Base de datos relacional
- **Mail System** - Sistema de envío de emails

### Herramientas de Desarrollo

- **Vite** - Build tool rápido
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS

## 📁 Estructura del Proyecto

```
resources/js/
├── components/           # Componentes Vue reutilizables
│   ├── Navigation.vue
│   ├── LanguageSelector.vue
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── SkillsSection.vue
│   ├── ProjectsSection.vue
│   ├── ContactSection.vue
│   └── PortfolioLayout.vue
├── composables/          # Lógica reutilizable
│   └── useTranslation.ts
├── data/                 # Datos estáticos
│   └── translations.ts
├── types/               # Definiciones de tipos
│   └── portfolio.ts
└── pages/               # Páginas principales
    └── Dashboard.vue

app/
├── Http/Controllers/
│   └── ContactController.php
├── Mail/
│   └── ContactFormMail.php
└── Models/

resources/views/emails/  # Templates de email
├── contact-form.blade.php
└── contact-form-text.blade.php

config/
├── contact.php          # Configuración de contacto
└── mail.php            # Configuración de email
```

## 🚀 Guía de Personalización

### 1. Información Personal

Edita el archivo `resources/js/components/PortfolioLayout.vue`:

```typescript
const portfolioData: PortfolioData = {
    name: 'Tu Nombre Aquí', // ✏️ Cambia por tu nombre
    profileImage: '/path/to/your/image', // 🖼️ Agrega tu foto

    about: {
        experience: 5, // 📈 Años de experiencia
        projectsCompleted: 50, // 🏆 Proyectos completados
        technologiesMastered: 20, // 💻 Tecnologías dominadas
    },

    // ✏️ Personaliza tus habilidades
    skills: [
        {
            name: 'Vue.js',
            level: 5,
            category: 'frontend',
            description: 'Tu descripción aquí',
        },
        // ... más habilidades
    ],

    // 🎯 Agrega tus proyectos reales
    projects: [
        {
            title: 'Tu Proyecto',
            description: 'Descripción del proyecto',
            technologies: ['Vue.js', 'Laravel'],
            liveUrl: 'https://tu-proyecto.com',
            githubUrl: 'https://github.com/tu-usuario/proyecto',
        },
        // ... más proyectos
    ],
};
```

### 2. Configuración de Email

Crea/edita el archivo `.env`:

```env
# Email Configuration
MAIL_MAILER=smtp
MAIL_HOST=tu-servidor-smtp.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@dominio.com
MAIL_PASSWORD=tu-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=tu-email@dominio.com
MAIL_FROM_NAME="Tu Nombre"

# Contact Configuration
CONTACT_EMAIL=tu-email@dominio.com
CONTACT_DISPLAY_EMAIL=contacto@tu-dominio.com
```

### 3. Redes Sociales

Configura tus enlaces en `.env`:

```env
CONTACT_GITHUB=https://github.com/tu-usuario
CONTACT_LINKEDIN=https://linkedin.com/in/tu-perfil
CONTACT_TWITTER=https://twitter.com/tu-usuario
```

## 🌍 Sistema de Traducción

### Agregar Nuevos Idiomas

1. Edita `resources/js/composables/useTranslation.ts`:

```typescript
export type Language = 'en' | 'es' | 'zh' | 'fr'; // Agrega 'fr' para francés
```

2. Agrega traducciones en `resources/js/data/translations.ts`:

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
    fr: {
        /* traducciones en francés */
    }, // Nueva
};
```

3. Actualiza el selector de idiomas en `LanguageSelector.vue`.

### Usar Traducciones en Componentes

```vue
<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation';

const { t } = useTranslation();
</script>

<template>
    <p>{{ t('hero.greeting') }}</p>
    <p>{{ t('clave.inexistente', 'Texto por defecto') }}</p>
</template>
```

## 📧 Sistema de Contacto

### Funcionamiento

1. **Frontend**: Formulario con validación en tiempo real
2. **Backend**: Validación del servidor y envío de email
3. **Email**: Templates HTML y texto plano
4. **Respuesta**: JSON con estado de éxito/error

### Personalizar Templates de Email

Edita estos archivos:

- `resources/views/emails/contact-form.blade.php` (versión HTML)
- `resources/views/emails/contact-form-text.blade.php` (versión texto)

## 🎨 Personalización de Estilos

### Colores del Tema

El diseño usa un sistema de colores basado en Tailwind CSS:

```css
/* Colores principales */
.primary-blue: #3B82F6
.primary-purple: #8B5CF6
.primary-pink: #EC4899

/* Modo oscuro automático */
.dark:bg-gray-900
.dark:text-white
```

### Animaciones Personalizadas

```css
/* Definidas en cada componente */
@keyframes fade-in-up {
    /* ... */
}
@keyframes blob {
    /* ... */
}
@keyframes gradient-x {
    /* ... */
}
```

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install
composer install

# Desarrollo
npm run dev
php artisan serve

# Producción
npm run build
php artisan optimize

# Base de datos (si usas autenticación)
php artisan migrate

# Limpiar caché
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## 📝 Lista de Verificación para Deploy

- [ ] ✏️ Personalizar información personal en `PortfolioLayout.vue`
- [ ] 🖼️ Agregar imágenes de proyectos reales
- [ ] 📧 Configurar servidor SMTP en `.env`
- [ ] 🔗 Actualizar URLs de proyectos y GitHub
- [ ] 🌐 Verificar traducciones en todos los idiomas
- [ ] 🎨 Personalizar colores y estilos si es necesario
- [ ] 📱 Probar responsividad en todos los dispositivos
- [ ] ⚡ Optimizar imágenes para web
- [ ] 🔍 Configurar meta tags SEO
- [ ] 🚀 Configurar dominio y hosting

## 🤝 Contribuciones

Este portfolio está diseñado para ser fácilmente personalizable. Puedes:

1. **Fork** el proyecto
2. **Personalizar** con tu información
3. **Agregar** nuevas características
4. **Compartir** mejoras con la comunidad

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu portfolio personal.

---

**¡Tu portfolio profesional está listo! 🎉**

Recuerda personalizar toda la información con tus datos reales y agregar tus proyectos auténticos para crear una presencia web impactante.
