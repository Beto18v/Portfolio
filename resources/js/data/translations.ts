import type { TranslationData } from '@/composables/useTranslation';

/**
 * Portfolio translations for multiple languages
 * Contains all text content for the portfolio website
 */
export const portfolioTranslations: TranslationData = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',

        // Hero section
        'hero.greeting': "Hello, I'm",
        'hero.title': 'Full Stack Developer',
        'hero.subtitle': 'Passionate about creating innovative digital solutions',
        'hero.cta': 'View My Work',
        'hero.contact': 'Get In Touch',

        // About section
        'about.title': 'About Me',
        'about.description':
            'I am a passionate full-stack developer with experience in modern web technologies. I love creating efficient, scalable, and user-friendly applications.',
        'about.experience': 'Years of Experience',
        'about.projects': 'Projects Completed',
        'about.technologies': 'Technologies Mastered',

        // Skills section
        'skills.title': 'Technical Skills',
        'skills.subtitle': 'Technologies and tools I work with',
        'skills.frontend': 'Frontend Development',
        'skills.backend': 'Backend Development',
        'skills.database': 'Database Management',
        'skills.tools': 'Development Tools',

        // Projects section
        'projects.title': 'Featured Projects',
        'projects.subtitle': 'Some of my recent work',
        'projects.viewLive': 'View Live',
        'projects.viewCode': 'View Code',
        'projects.allProjects': 'View All Projects',

        // Contact section
        'contact.title': 'Get In Touch',
        'contact.subtitle': "Let's discuss your next project",
        'contact.name': 'Your Name',
        'contact.email': 'Your Email',
        'contact.subject': 'Subject',
        'contact.message': 'Your Message',
        'contact.send': 'Send Message',
        'contact.sending': 'Sending...',
        'contact.success': 'Message sent successfully!',
        'contact.error': 'Error sending message. Please try again.',

        // Language selector
        'language.select': 'Select Language',
        'language.english': 'English',
        'language.spanish': 'Español',
        'language.chinese': '中文',

        // Common
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.retry': 'Try Again',

        // Footer
        'footer.rights': 'All rights reserved.',
        'footer.built': 'Built with Vue.js, Laravel, and Tailwind CSS',
    },

    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Acerca de',
        'nav.skills': 'Habilidades',
        'nav.projects': 'Proyectos',
        'nav.contact': 'Contacto',

        // Hero section
        'hero.greeting': 'Hola, soy',
        'hero.title': 'Desarrollador Full Stack',
        'hero.subtitle': 'Apasionado por crear soluciones digitales innovadoras',
        'hero.cta': 'Ver Mi Trabajo',
        'hero.contact': 'Contactar',

        // About section
        'about.title': 'Acerca de Mí',
        'about.description':
            'Soy un desarrollador full-stack apasionado con experiencia en tecnologías web modernas. Me encanta crear aplicaciones eficientes, escalables y fáciles de usar.',
        'about.experience': 'Años de Experiencia',
        'about.projects': 'Proyectos Completados',
        'about.technologies': 'Tecnologías Dominadas',

        // Skills section
        'skills.title': 'Habilidades Técnicas',
        'skills.subtitle': 'Tecnologías y herramientas con las que trabajo',
        'skills.frontend': 'Desarrollo Frontend',
        'skills.backend': 'Desarrollo Backend',
        'skills.database': 'Gestión de Bases de Datos',
        'skills.tools': 'Herramientas de Desarrollo',

        // Projects section
        'projects.title': 'Proyectos Destacados',
        'projects.subtitle': 'Algunos de mis trabajos recientes',
        'projects.viewLive': 'Ver En Vivo',
        'projects.viewCode': 'Ver Código',
        'projects.allProjects': 'Ver Todos los Proyectos',

        // Contact section
        'contact.title': 'Contacto',
        'contact.subtitle': 'Hablemos sobre tu próximo proyecto',
        'contact.name': 'Tu Nombre',
        'contact.email': 'Tu Email',
        'contact.subject': 'Asunto',
        'contact.message': 'Tu Mensaje',
        'contact.send': 'Enviar Mensaje',
        'contact.sending': 'Enviando...',
        'contact.success': '¡Mensaje enviado exitosamente!',
        'contact.error': 'Error al enviar el mensaje. Por favor intenta de nuevo.',

        // Language selector
        'language.select': 'Seleccionar Idioma',
        'language.english': 'English',
        'language.spanish': 'Español',
        'language.chinese': '中文',

        // Common
        'common.loading': 'Cargando...',
        'common.error': 'Algo salió mal',
        'common.retry': 'Intentar de Nuevo',

        // Footer
        'footer.rights': 'Todos los derechos reservados.',
        'footer.built': 'Construido con Vue.js, Laravel y Tailwind CSS',
    },

    zh: {
        // Navigation
        'nav.home': '首页',
        'nav.about': '关于我',
        'nav.skills': '技能',
        'nav.projects': '项目',
        'nav.contact': '联系',

        // Hero section
        'hero.greeting': '你好，我是',
        'hero.title': '全栈开发者',
        'hero.subtitle': '热衷于创造创新的数字解决方案',
        'hero.cta': '查看我的作品',
        'hero.contact': '联系我',

        // About section
        'about.title': '关于我',
        'about.description': '我是一名充满激情的全栈开发者，在现代网络技术方面有丰富经验。我喜欢创建高效、可扩展且用户友好的应用程序。',
        'about.experience': '年工作经验',
        'about.projects': '完成项目',
        'about.technologies': '掌握技术',

        // Skills section
        'skills.title': '技术技能',
        'skills.subtitle': '我使用的技术和工具',
        'skills.frontend': '前端开发',
        'skills.backend': '后端开发',
        'skills.database': '数据库管理',
        'skills.tools': '开发工具',

        // Projects section
        'projects.title': '精选项目',
        'projects.subtitle': '我最近的一些作品',
        'projects.viewLive': '查看演示',
        'projects.viewCode': '查看代码',
        'projects.allProjects': '查看所有项目',

        // Contact section
        'contact.title': '联系我',
        'contact.subtitle': '让我们讨论您的下一个项目',
        'contact.name': '您的姓名',
        'contact.email': '您的邮箱',
        'contact.subject': '主题',
        'contact.message': '您的消息',
        'contact.send': '发送消息',
        'contact.sending': '发送中...',
        'contact.success': '消息发送成功！',
        'contact.error': '发送消息时出错。请重试。',

        // Language selector
        'language.select': '选择语言',
        'language.english': 'English',
        'language.spanish': 'Español',
        'language.chinese': '中文',

        // Common
        'common.loading': '加载中...',
        'common.error': '出了点问题',
        'common.retry': '重试',

        // Footer
        'footer.rights': '版权所有。',
        'footer.built': '使用 Vue.js、Laravel 和 Tailwind CSS 构建',
    },
};
