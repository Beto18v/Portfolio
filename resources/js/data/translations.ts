import type { TranslationData } from '@/composables/useTranslation';

/**
 * Portfolio translations for multiple languages
 * Contains all text content for the portfolio website
 */
export const portfolioTranslations: TranslationData = {
    en: {
        'about.sectionTitle': 'About Me',
        'about.sectionDescription': 'Learn more about my background, experience, and what drives my passion for development.',
        'about.subtitle': "Hello, I'm a Developer",
        'about.experience':
            'With over 1 year of experience in web development, I specialize in creating modern, responsive, and user-friendly applications. I enjoy working with both frontend and backend technologies to deliver complete solutions.',
        'about.approach':
            'My approach combines technical expertise with creative problem-solving to build applications that not only function well but also provide excellent user experiences.',
        'about.stats.years': '1+',
        'about.stats.yearsLabel': 'Years Experience',
        'about.stats.projectsLabel': 'Projects Completed',
        'contact.responseBox.title': 'Response Time',
        'contact.responseBox.description': 'I typically respond to messages within 24 hours. For urgent matters, please mention it in your message.',
        // ClassicPortfolio extras
        'nav.logo': 'Portfolio',
        'projects.viewMyWork': 'View My Work',
        'contact.form.namePlaceholder': 'Your name',
        'contact.form.emailPlaceholder': 'your.email@example.com',
        'contact.form.messagePlaceholder': 'Tell me about your project...',
        'contact.availableWorldwide': 'Available worldwide',
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',

        // Hero section
        'hero.greeting': "Hello, I'm",
        'hero.title': 'Full Stack Developer',
        // About section
        'about.title': 'About Me',
        'skills.sectionTitle': 'Skills & Expertise',
        'skills.sectionDescription': 'Technologies and tools I use to bring ideas to life.',
        'projects.sectionTitle': 'Featured Projects',
        'projects.sectionDescription': 'A selection of projects that showcase my skills and experience.',
        'contact.sectionTitle': 'Get In Touch',
        'contact.sectionDescription': "Ready to start a project or just want to chat? I'd love to hear from you.",
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send Message',
        'about.description':
            'I am a passionate full-stack developer with experience in modern web technologies. I love creating efficient, scalable, and user-friendly applications.',
        'about.projects': 'Projects Completed',
        'about.technologies': 'Technologies Mastered',

        // Skills section
        'skills.title': 'Technical Skills',
        'skills.subtitle': 'Technologies and tools I work with',
        'skills.frontend': 'Frontend Development',
        'skills.backend': 'Backend Development',
        'skills.database': 'Database Management',
        'skills.tools': 'Development Tools',

        // Contact section
        'contact.title': 'Get In Touch',
        'contact.subtitle': "Let's discuss your next project",
        'contact.name': 'Your Name',
        'contact.email': 'Your Email',
        'contact.subject': 'Subject',

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

        // Projects
        'projects.adoptafacil.title': 'AdoptaFácil',
        'projects.adoptafacil.description':
            'AdoptaFácil is a complete digital ecosystem designed to revolutionize the pet adoption process in Colombia. The platform combines modern technologies with a focus on animal welfare, creating a comprehensive experience that connects adopters, pet owners, shelters, and business partners in one place.',
        'projects.vision4k.title': 'Vision4K',
        'projects.vision4k.description':
            'Vision4K is a modern platform for sharing and downloading wallpapers in ultra high definition (4K). It offers a seamless user experience with a focus on high-quality visuals and easy navigation.',
        'projects.portfolio.title': 'Portfolio',
        'projects.portfolio.description':
            'This is a modern, elegant, and professional portfolio built with cutting-edge technologies. The site is fully modularized into reusable components and features support for multiple languages (Spanish, English, and Mandarin).',

        // Revolutionary Interface
        'interface.mode': 'Interface Mode',
        'interface.holo': 'HOLO',
        'interface.space': 'SPACE',
        'interface.classic': 'CLASSIC',
        'interface.quickAccess': 'Quick Access',
        'interface.terminal': 'Terminal',
        'interface.profile': 'Profile',
        'interface.skills': 'Skills Matrix',
        'interface.projects': 'Projects',
        'interface.contact': 'Contact',

        // Holo Terminal
        'holo.welcome': 'Welcome to Holographic Terminal',
        'holo.initializing': 'Initializing neural interface...',
        'holo.ready': 'System ready. Enter command:',
        'holo.help': 'Available commands: profile, skills, projects, contact, clear',
        'holo.command.profile': 'Loading personal profile...',
        'holo.command.skills': 'Displaying skills matrix...',
        'holo.command.projects': 'Accessing project database...',
        'holo.command.contact': 'Opening communication channel...',

        // Personality traits
        'personality.traits': 'Problem Solving',

        // Skills Matrix
        'skills.matrix': 'Skills Matrix',
        'skills.level': 'Level',
        'skills.experience': 'Experience',
        'skills.category.frontend': 'Frontend',
        'skills.category.backend': 'Backend',
        'skills.category.database': 'Database',
        'skills.category.tools': 'Tools',
        'skills.proficiency': 'Proficiency Level',
        'skills.controls': 'Controls',
        'skills.drag': 'Drag to rotate',
        'skills.click': 'Click skills for details',
        'skills.hover': 'Hover for quick info',

        // Personal Information
        'personal.name': 'Full Stack Developer',
        'personal.title': 'Innovative Digital Solutions Creator',
        'personal.bio': 'Passionate developer with expertise in modern web technologies, creating efficient and scalable applications.',
        'personal.location': 'Location',
        'personal.email': 'Email',
        'personal.phone': 'Phone',
        'personal.website': 'Website',
        'personal.github': 'GitHub',
        'personal.linkedin': 'LinkedIn',

        // Projects
        'projects.featured': 'Featured Projects',
        'projects.all': 'All Projects',
        'projects.technology': 'Technology',
        'projects.technologies': 'Technologies',
        'projects.repository': 'Repository',
        'projects.demo': 'Live Demo',
        'projects.liveDemo': 'Live Demo',
        'projects.source': 'Source',
        'projects.details': 'Project Details',
        'projects.description': 'Description',
        'projects.features': 'Key Features',
        'projects.challenge': 'Challenge',
        'projects.solution': 'Solution',

        // Revolutionary Interface Specific
        'revolutionary.welcome': 'Welcome to the Future',
        'revolutionary.subtitle': 'Experience Next-Generation Portfolio',
        'revolutionary.chooseMode': 'Choose Your Experience Mode',
        'revolutionary.holoDescription': 'Immersive holographic interface with 3D interactions',
        'revolutionary.spaceDescription': 'Explore in a cosmic environment with floating modules',
        'revolutionary.classicDescription': 'Elegant and professional traditional layout',

        // Navigation
        'nav.quantum': 'Quantum Access',
        'nav.matrix': 'Neural Matrix',
        'nav.terminal': 'Holo Terminal',
        'nav.modules': 'Space Modules',
        'nav.profile': 'Digital Profile',

        // Experience & Education
        'experience.title': 'Professional Experience',
        'experience.education': 'Education',
        'experience.certifications': 'Certifications',
        'experience.years': 'years',
        'experience.current': 'Current',
        'experience.present': 'Present',

        // Achievements
        'achievements.title': 'Achievements',
        'achievements.projects': 'Projects Completed',
        'achievements.clients': 'Happy Clients',
        'achievements.technologies': 'Technologies Mastered',
        'achievements.years': 'Years Experience',

        // Project Specific Translations
        'projects.ecommerce.title': 'E-Commerce Platform',
        'projects.ecommerce.description': 'Modern e-commerce platform with real-time inventory management',
        'projects.taskmanager.title': 'Task Management App',
        'projects.taskmanager.description': 'Collaborative task management application with real-time updates',
        'projects.weather.title': 'Mobile Weather App',
        'projects.weather.description': 'Cross-platform weather application with location-based forecasts',

        // Experience Specific
        'experience.senior.title': 'Senior Full Stack Developer',
        'experience.senior.description': 'Lead development of enterprise web applications using modern technologies',
        'experience.fullstack.title': 'Full Stack Developer',
        'experience.fullstack.description': 'Developed custom web solutions for clients across various industries',

        // Education
        'education.computer.degree': 'Computer Science Degree',
        'education.computer.description': 'Specialized in software engineering and web technologies',
        'footer.copyright': '© 2025 Portfolio. Built with Vue.js and Tailwind CSS.',
    },

    es: {
        'about.sectionTitle': 'Acerca de Mí',
        'about.sectionDescription': 'Conoce más sobre mi experiencia, formación y lo que impulsa mi pasión por el desarrollo.',
        'about.subtitle': 'Hola, soy Desarrollador',
        'about.experience':
            'Con más de 1 año de experiencia en desarrollo web, me especializo en crear aplicaciones modernas, responsivas y fáciles de usar. Disfruto trabajar tanto en frontend como en backend para entregar soluciones completas.',
        'about.approach':
            'Mi enfoque combina experiencia técnica con creatividad para construir aplicaciones que no solo funcionan bien, sino que también ofrecen excelentes experiencias de usuario.',
        'about.stats.years': '1+',
        'about.stats.yearsLabel': 'Años de Experiencia',
        'about.stats.projectsLabel': 'Proyectos Completados',
        'contact.responseBox.title': 'Tiempo de Respuesta',
        'contact.responseBox.description': 'Normalmente respondo los mensajes en menos de 24 horas. Si es urgente, por favor indícalo en tu mensaje.',
        // ClassicPortfolio extras
        'nav.logo': 'Portafolio',
        'projects.viewMyWork': 'Ver Mi Trabajo',
        'contact.form.namePlaceholder': 'Tu nombre',
        'contact.form.emailPlaceholder': 'tu.email@ejemplo.com',
        'contact.form.messagePlaceholder': 'Cuéntame sobre tu proyecto...',
        'contact.availableWorldwide': 'Disponible en todo el mundo',
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Acerca de',
        'nav.skills': 'Habilidades',
        'nav.projects': 'Proyectos',
        'nav.contact': 'Contacto',

        'skills.sectionTitle': 'Habilidades y Experiencia',
        'skills.sectionDescription': 'Tecnologías y herramientas que uso para dar vida a las ideas.',
        'projects.sectionTitle': 'Proyectos Destacados',
        'projects.sectionDescription': 'Una selección de proyectos que muestran mis habilidades y experiencia.',
        'contact.sectionTitle': 'Contacto',
        'contact.sectionDescription': '¿Listo para comenzar un proyecto o simplemente quieres conversar? Me encantaría saber de ti.',
        'contact.form.name': 'Nombre',
        'contact.form.email': 'Email',
        'contact.form.message': 'Mensaje',
        'contact.form.send': 'Enviar Mensaje',

        // Hero section
        'hero.greeting': 'Hola, soy',
        'hero.title': 'Desarrollador Full Stack',
        'hero.subtitle': 'Apasionado por crear soluciones digitales innovadoras',
        'hero.cta': 'Ver Mi Trabajo',
        'hero.contact': 'Contactar',
        'hero.description':
            'Apasionado por crear aplicaciones web hermosas, funcionales y fáciles de usar con tecnologías modernas y las mejores prácticas.',

        // About section
        'about.title': 'Acerca de Mí',
        'about.description':
            'Soy un desarrollador full-stack apasionado con experiencia en tecnologías web modernas. Me encanta crear aplicaciones eficientes, escalables y fáciles de usar.',
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
        'footer.copyright': '© 2025 Portfolio. Construido con Vue.js y Tailwind CSS.',

        // Proyectos
        'projects.adoptafacil.title': 'AdoptaFácil',
        'projects.adoptafacil.description':
            'AdoptaFácil es un ecosistema digital completo diseñado para revolucionar el proceso de adopción de mascotas en Colombia. La plataforma combina tecnologías modernas con un enfoque en el bienestar animal, creando una experiencia integral que conecta a adoptantes, dueños de mascotas, refugios y socios comerciales en un solo lugar.',
        'projects.vision4k.title': 'Vision4K',
        'projects.vision4k.description':
            'Vision4K es una plataforma moderna para compartir y descargar fondos de pantalla en ultra alta definición (4K). Ofrece una experiencia de usuario fluida con un enfoque en visuales de alta calidad y fácil navegación.',
        'projects.portfolio.title': 'Portafolio',
        'projects.portfolio.description':
            'Este es un portfolio moderno, elegante y profesional construido con tecnologías de vanguardia. El sitio está completamente modularizado en componentes reutilizables y cuenta con soporte para múltiples idiomas (español, inglés y mandarín).',

        // Revolutionary Interface
        'interface.mode': 'Modo de Interfaz',
        'interface.holo': 'HOLO',
        'interface.space': 'ESPACIO',
        'interface.classic': 'CLÁSICO',
        'interface.quickAccess': 'Acceso Rápido',
        'interface.terminal': 'Terminal',
        'interface.profile': 'Perfil',
        'interface.skills': 'Matriz de Habilidades',
        'interface.projects': 'Proyectos',
        'interface.contact': 'Contacto',

        // Holo Terminal
        'holo.welcome': 'Bienvenido al Terminal Holográfico',
        'holo.initializing': 'Inicializando interfaz neural...',
        'holo.ready': 'Sistema listo. Ingresa comando:',
        'holo.help': 'Comandos disponibles: profile, skills, projects, contact, clear',
        'holo.command.profile': 'Cargando perfil personal...',
        'holo.command.skills': 'Mostrando matriz de habilidades...',
        'holo.command.projects': 'Accediendo a base de datos de proyectos...',
        'holo.command.contact': 'Abriendo canal de comunicación...',

        // Personality traits
        'personality.traits': 'Resolución de Problemas',

        // Skills Matrix
        'skills.matrix': 'Matriz de Habilidades',
        'skills.level': 'Nivel',
        'skills.experience': 'Experiencia',
        'skills.category.frontend': 'Frontend',
        'skills.category.backend': 'Backend',
        'skills.category.database': 'Base de Datos',
        'skills.category.tools': 'Herramientas',
        'skills.proficiency': 'Nivel de Competencia',
        'skills.controls': 'Controles',
        'skills.drag': 'Arrastra para rotar',
        'skills.click': 'Haz clic en habilidades para detalles',
        'skills.hover': 'Pasa el cursor para información rápida',

        // Personal Information
        'personal.name': 'Desarrollador Full Stack',
        'personal.title': 'Creador de Soluciones Digitales Innovadoras',
        'personal.bio': 'Desarrollador apasionado con experiencia en tecnologías web modernas, creando aplicaciones eficientes y escalables.',
        'personal.location': 'Ubicación',
        'personal.email': 'Email',
        'personal.phone': 'Teléfono',
        'personal.website': 'Sitio Web',
        'personal.github': 'GitHub',
        'personal.linkedin': 'LinkedIn',

        // Projects
        'projects.featured': 'Proyectos Destacados',
        'projects.all': 'Todos los Proyectos',
        'projects.technology': 'Tecnología',
        'projects.technologies': 'Tecnologías',
        'projects.repository': 'Repositorio',
        'projects.demo': 'Demo en Vivo',
        'projects.liveDemo': 'Demo en Vivo',
        'projects.source': 'Código fuente',
        'projects.details': 'Detalles del Proyecto',
        'projects.description': 'Descripción',
        'projects.features': 'Características Principales',
        'projects.challenge': 'Desafío',
        'projects.solution': 'Solución',

        // Revolutionary Interface Specific
        'revolutionary.welcome': 'Bienvenido al Futuro',
        'revolutionary.subtitle': 'Experimenta el Portfolio de Nueva Generación',
        'revolutionary.chooseMode': 'Elige tu Modo de Experiencia',
        'revolutionary.holoDescription': 'Interfaz holográfica inmersiva con interacciones 3D',
        'revolutionary.spaceDescription': 'Explora en un entorno cósmico con módulos flotantes',
        'revolutionary.classicDescription': 'Diseño tradicional elegante y profesional',

        // Navigation
        'nav.quantum': 'Acceso Cuántico',
        'nav.matrix': 'Matriz Neural',
        'nav.terminal': 'Terminal Holo',
        'nav.modules': 'Módulos Espaciales',
        'nav.profile': 'Perfil Digital',

        // Experience & Education
        'experience.title': 'Experiencia Profesional',
        'experience.education': 'Educación',
        'experience.certifications': 'Certificaciones',
        'experience.years': 'años',
        'experience.current': 'Actual',
        'experience.present': 'Presente',

        // Achievements
        'achievements.title': 'Logros',
        'achievements.projects': 'Proyectos Completados',
        'achievements.clients': 'Clientes Satisfechos',
        'achievements.technologies': 'Tecnologías Dominadas',
        'achievements.years': 'Años de Experiencia',

        // Project Specific Translations
        'projects.ecommerce.title': 'Plataforma E-Commerce',
        'projects.ecommerce.description': 'Plataforma de comercio electrónico moderna con gestión de inventario en tiempo real',
        'projects.taskmanager.title': 'App de Gestión de Tareas',
        'projects.taskmanager.description': 'Aplicación colaborativa de gestión de tareas con actualizaciones en tiempo real',
        'projects.weather.title': 'App Móvil del Clima',
        'projects.weather.description': 'Aplicación meteorológica multiplataforma con pronósticos basados en ubicación',

        // Experience Specific
        'experience.senior.title': 'Desarrollador Full Stack Senior',
        'experience.senior.description': 'Lidero el desarrollo de aplicaciones web empresariales usando tecnologías modernas',
        'experience.fullstack.title': 'Desarrollador Full Stack',
        'experience.fullstack.description': 'Desarrollé soluciones web personalizadas para clientes de diversas industrias',

        // Education
        'education.computer.degree': 'Licenciatura en Ciencias de la Computación',
        'education.computer.description': 'Especializado en ingeniería de software y tecnologías web',
    },

    zh: {
        'about.sectionTitle': '关于我',
        'about.sectionDescription': '了解我的背景、经验以及驱动我热情的原因。',
        'about.subtitle': '你好，我是开发者',
        'about.experience': '拥有超过1年的网页开发经验，专注于创建现代、响应式且用户友好的应用程序。喜欢前后端技术，提供完整解决方案。',
        'about.approach': '我的方法结合了技术专长与创造性解决问题，打造不仅功能完善且用户体验优异的应用。',
        'about.stats.years': '1+',
        'about.stats.yearsLabel': '年经验',
        'about.stats.projectsLabel': '完成项目',
        'contact.responseBox.title': '响应时间',
        'contact.responseBox.description': '我通常会在24小时内回复消息。如有紧急事项，请在消息中注明。',
        // ClassicPortfolio extras
        'nav.logo': '作品集',
        'projects.viewMyWork': '查看我的作品',
        'contact.form.namePlaceholder': '您的姓名',
        'contact.form.emailPlaceholder': '您的邮箱@example.com',
        'contact.form.messagePlaceholder': '请描述您的项目...',
        'contact.availableWorldwide': '全球可用',
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
        'hero.description': '热衷于创造美观、实用且用户友好的网络应用程序，使用现代技术和最佳实践。',

        // About section
        'about.title': '关于我',
        'about.description': '我是一名充满激情的全栈开发者，在现代网络技术方面有丰富经验。我喜欢创建高效、可扩展且用户友好的应用程序。',
        'about.projects': '完成项目',
        'about.technologies': '掌握技术',

        // Skills section
        'skills.title': '技术技能',
        'skills.subtitle': '我使用的技术和工具',
        'skills.frontend': '前端开发',
        'skills.backend': '后端开发',
        'skills.database': '数据库管理',
        'skills.tools': '开发工具',
        'skills.sectionTitle': '技能与专长',
        'skills.sectionDescription': '我用来实现创意的技术和工具。',
        'projects.sectionTitle': '精选项目',
        'projects.sectionDescription': '展示我技能和经验的部分项目。',
        'contact.sectionTitle': '联系我',
        'contact.sectionDescription': '准备开始项目或想聊聊？欢迎联系我。',
        'contact.form.name': '姓名',
        'contact.form.email': '邮箱',
        'contact.form.message': '信息',
        'contact.form.send': '发送信息',

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

        // Revolutionary Interface
        'interface.mode': '界面模式',
        'interface.holo': '全息',
        'interface.space': '空间',
        'interface.classic': '经典',
        'interface.quickAccess': '快速访问',
        'interface.terminal': '终端',
        'interface.profile': '个人资料',
        'interface.skills': '技能矩阵',
        'interface.projects': '项目',
        'interface.contact': '联系',

        // Holo Terminal
        'holo.welcome': '欢迎使用全息终端',
        'holo.initializing': '正在初始化神经接口...',
        'holo.ready': '系统就绪。请输入命令：',
        'holo.help': '可用命令：profile、skills、projects、contact、clear',
        'holo.command.profile': '正在加载个人资料...',
        'holo.command.skills': '正在显示技能矩阵...',
        'holo.command.projects': '正在访问项目数据库...',
        'holo.command.contact': '正在打开通信频道...',

        // Skills Matrix
        'skills.matrix': '技能矩阵',
        'skills.level': '级别',
        'skills.experience': '经验',
        'skills.category.frontend': '前端',
        'skills.category.backend': '后端',
        'skills.category.database': '数据库',
        'skills.category.tools': '工具',
        'skills.proficiency': '熟练程度',
        'skills.controls': '控制',
        'skills.drag': '拖拽旋转',
        'skills.click': '点击技能查看详情',
        'skills.hover': '悬停查看快速信息',

        // Personal Information
        'personal.name': '全栈开发者',
        'personal.title': '创新数字解决方案创造者',
        'personal.bio': '热衷于现代网络技术的开发者，创建高效可扩展的应用程序。',
        'personal.location': '位置',
        'personal.email': '邮箱',
        'personal.phone': '电话',
        'personal.website': '网站',
        'personal.github': 'GitHub',
        'personal.linkedin': 'LinkedIn',

        // Projects
        'projects.featured': '精选项目',
        'projects.all': '所有项目',
        'projects.technology': '技术',
        'projects.technologies': '技术栈',
        'projects.repository': '代码仓库',
        'projects.demo': '在线演示',
        'projects.liveDemo': '实时演示',
        'projects.source': '源代码',
        'projects.details': '项目详情',
        'projects.description': '描述',
        'projects.features': '主要特性',
        'projects.challenge': '挑战',
        'projects.solution': '解决方案',
        'projects.adoptafacil.title': 'AdoptaFácil',
        'projects.adoptafacil.description':
            'AdoptaFácil 是一個完整的數位生態系統，旨在徹底改變哥倫比亞的寵物領養流程。該平台將現代科技與動物福利概念結合，打造集領養者、寵物主人、收容所和商業夥伴於一身的全方位體驗。',
        'projects.vision4k.title': 'Vision4K',
        'projects.vision4k.description':
            'Vision4K 是一個現代化的平台，旨在分享和下載超高畫質（4K）的桌面背景。它提供流暢的用戶體驗，專注於高品質的視覺效果和易於導航。',
        'projects.portfolio.title': '作品集',
        'projects.portfolio.description':
            '這是一個現代、優雅和專業的組合，採用先鋒技術構建。該網站是一個完整的模組化元件，可重複使用，並支援多種慣用語（西班牙語、英語和普通話）。',

        // Revolutionary Interface Specific
        'revolutionary.welcome': '欢迎来到未来',
        'revolutionary.subtitle': '体验下一代作品集',
        'revolutionary.chooseMode': '选择您的体验模式',
        'revolutionary.holoDescription': '具有3D交互的沉浸式全息界面',
        'revolutionary.spaceDescription': '在宇宙环境中探索浮动模块',
        'revolutionary.classicDescription': '优雅专业的传统布局',

        // Navigation
        'nav.quantum': '量子访问',
        'nav.matrix': '神经矩阵',
        'nav.terminal': '全息终端',
        'nav.modules': '太空模块',
        'nav.profile': '数字档案',

        // Experience & Education
        'experience.title': '专业经验',
        'experience.education': '教育背景',
        'experience.certifications': '认证证书',
        'experience.years': '年',
        'experience.current': '当前',
        'experience.present': '至今',

        // Achievements
        'achievements.title': '成就',
        'achievements.projects': '完成项目',
        'achievements.clients': '满意客户',
        'achievements.technologies': '掌握技术',
        'achievements.years': '年经验',

        // Project Specific Translations
        'projects.ecommerce.title': '电商平台',
        'projects.ecommerce.description': '现代电商平台，具有实时库存管理功能',
        'projects.taskmanager.title': '任务管理应用',
        'projects.taskmanager.description': '协作任务管理应用，具有实时更新功能',
        'projects.weather.title': '移动天气应用',
        'projects.weather.description': '基于位置的跨平台天气预报应用',

        // Experience Specific
        'experience.senior.title': '高级全栈开发工程师',
        'experience.senior.description': '领导使用现代技术开发企业级Web应用程序',
        'experience.fullstack.title': '全栈开发工程师',
        'experience.fullstack.description': '为各行业客户开发定制Web解决方案',

        // Education
        'education.computer.degree': '计算机科学学位',
        'education.computer.description': '专注于软件工程和Web技术',

        // Footer
        'footer.copyright': '© 2025 Portfolio。使用 Vue.js 和 Tailwind CSS 建置。',
    },
};
