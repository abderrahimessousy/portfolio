document.addEventListener('DOMContentLoaded', function() {
    'use strict'; // Enable strict mode for cleaner, safer code

    // --- GSAP REGISTRATION ---
    gsap.registerPlugin(ScrollTrigger);

    // --- GLOBAL VARIABLES ---
    const root = document.documentElement;
    const body = document.body;
    let typedInstance = null;
    let mySwiper = null; // Swiper instance for project modals

    // --- DATA OBJECTS ---
    const translations = {
        'fr': {
            'page_title': 'Portfolio Abderrahim - Développeur Web Pro',
            'meta_description': "Portfolio professionnel d'Abderrahim, développeur web full stack spécialisé en UI/UX, programmation embarquée et IA. Découvrez mes projets innovants et mes compétences.",
            'meta_keywords': 'Abderrahim Es-Sousy, développeur web, full stack, UI/UX, programmation embarquée, IA, portfolio, projets, compétences, Maroc, Casablanca',
            'nav_home': 'Accueil', 'nav_about': 'À Propos', 'nav_skills': 'Compétences', 'nav_timeline': 'Parcours', 'nav_projects': 'Projets', 'nav_contact': 'Contact',
            'discover_projects_btn': 'Découvrez mes Projets',
            'about_title': 'À Propos de Moi',
            'about_description': 'Jeune lauréat motivé avec un diplôme Bac+3 en Systèmes Informatiques Embarqués, possédant une solide formation en développement web, réseaux, programmation embarquée et bases de données. Capable de concevoir et développer des applications et systèmes informatiques efficaces et adaptés aux besoins.',
            'skills_title': 'Mes Compétences',
            'skills_intro': "Mon expertise s'étend sur plusieurs domaines clés du développement web et embarqué, combinant maîtrise technique et compétences transversales essentielles pour la réussite de tout projet.",
            'detailed_skills_btn': 'Compétences Techniques Détaillées',
            'cv_title': 'Mon CV Détaillé', 'cv_description': 'Découvrez mon parcours, mes expériences et ma formation en détail.', 'download_cv_btn': 'Télécharger le CV',
            'timeline_title': 'Mon Parcours',
            'timeline_diploma_title': 'LICENCE PROFESSIONNELLE EN SYSTÈMES INFORMATIQUES EMBARQUÉS',
            'timeline_diploma_date': 'Année universitaire : 2024 – 2025',
            'timeline_diploma_school': 'École Supérieure de Technologie (EST) – Dakhla',
            'timeline_diploma_desc': 'Formation spécialisée dans la conception, le développement et l’optimisation de systèmes embarqués...',
            'timeline_bts_title': "BTS EN DÉVELOPPEMENT DES SYSTÈMES D'INFORMATION",
            'timeline_bts_date': 'Année universitaire : 2022 – 2024',
            'timeline_bts_school': 'Lycée Qualifiant Lala Khadija – Dakhla',
            'timeline_bts_desc': "Formation axée sur le développement d'applications informatiques web, mobiles et bureautiques...",
            'timeline_bac_title': 'BACCALAURÉAT SCIENTIFIQUE – SCIENCES DE LA VIE ET DE LA TERRE (SVT)',
            'timeline_bac_date': 'Année scolaire : 2021 – 2022',
            'timeline_bac_school': 'Lycée Al-Fath – Dakhla',
            'timeline_bac_desc': 'Formation scientifique générale avec un focus sur la biologie, la géologie, la physique et les mathématiques...',
            'projects_title': 'Mes Projets',
            'filter_all': 'Tous', 'filter_web': 'Web', 'filter_embedded': 'Embarqué',
            'project_stage_title': 'Plateforme de Réclamations – Dakhla',
            'project_stage_desc': "Ce projet a été réalisé dans le cadre de mon stage à la Délégation du Travail de Dakhla...",
            'project_gestion_title': 'Interface Web – Plateforme de Streaming de Films',
            'project_gestion_desc': "Ce projet est une maquette front-end d’une plateforme de films...",
            'project_login_title': 'Site E-commerce – Vente de Produits en Ligne',
            'project_login_desc': 'Ce projet est une boutique en ligne que j’ai développée pour vendre mes propres produits...',
            'project_heart_title': 'Moniteur de Fréquence Cardiaque',
            'project_heart_desc': "Ce projet consiste en la création d’un dispositif de santé connecté basé sur Arduino...",
            'project_gas_title': 'Système de Détection de Fuite de Gaz – Arduino',
            'project_gas_desc': "Ce projet consiste à développer un système de sécurité domestique intelligent capable de détecter les fuites de gaz...",
            'project_irrigation_title': 'Système d’Irrigation Solaire Intelligent',
            'project_irrigation_desc': "Ce projet est un système d’arrosage automatique intelligent qui utilise un capteur d’humidité...",
            'view_details_btn': 'Voir Détails', 'modal_tech_title': 'Technologies Utilisées :', 'modal_demo_btn': 'Voir la démo', 'modal_github_btn': 'Code Source',
            'cv_preview_title': 'Aperçu du CV', 'detailed_skills_modal_title': 'Compétences Techniques Avancées',
            'skill_cat_web_title': 'Développement Web et Logiciel', 'skill_cat_db_title': 'Bases de Données & Modélisation', 'skill_cat_embedded_title': 'Systèmes Embarqués & IoT', 'skill_cat_network_title': 'Systèmes, Réseaux & IA', 'skill_cat_tools_title': 'Outils & Design',
            'modal_close_btn': 'Fermer', 'contact_title': 'Me Contacter', 'contact_intro': "Je suis toujours ouvert aux nouvelles opportunités... N'hésitez pas à me contacter...",
            'contact_name_placeholder': 'Votre Nom Complet', 'contact_email_placeholder': 'Votre Adresse E-mail', 'contact_message_placeholder': 'Votre Message...', 'send_message_btn': 'Envoyer le Message',
            'social_intro': 'Retrouvez-me également sur :', 'footer_text': '&copy; 2025 Abderrahim Es-Sousy — Tous droits réservés.',
            'form_sending': 'Envoi en cours...', 'form_success': 'Message envoyé avec succès !', 'form_error': "Une erreur s'est produite.",
            'skill_html_desc': "Structure et sémantique web.", 'skill_css_desc': "Design responsive et animations.", 'skill_js_desc': "Interactivité client et logique métier.", 'skill_php_desc': "Développement Back-end robuste.", 'skill_mysql_desc': "Gestion de bases de données.", 'skill_bootstrap_desc': "Framework pour design rapide.", 'skill_c_cpp_desc': "Programmation embarquée et systèmes.", 'skill_python_desc': "Scripting, IA, data.", 'skill_git_desc': "Contrôle de version et collaboration.", 'skill_vbnet_desc': "Applications desktop et legacy.", 'skill_sqlserver_desc': "Gestion de bases de données avancée.", 'skill_linux_desc': "Environnements de développement."
        },
        'en': {
            'page_title': 'Abderrahim Portfolio - Pro Web Developer',
            'meta_description': 'Professional portfolio of Abderrahim, a full-stack web developer specializing in UI/UX, embedded programming, and AI. Discover my innovative projects and skills.',
            'meta_keywords': 'Abderrahim Es-Sousy, web developer, full stack, UI/UX, embedded programming, AI, portfolio, projects, skills, Morocco, Casablanca',
            'nav_home': 'Home', 'nav_about': 'About', 'nav_skills': 'Skills', 'nav_timeline': 'Timeline', 'nav_projects': 'Projects', 'nav_contact': 'Contact',
            'discover_projects_btn': 'Discover My Projects',
            'about_title': 'About Me',
            'about_description': 'Motivated young graduate with a Bac+3 degree in Embedded Computer Systems, possessing a strong background in web development, networks, embedded programming, and databases. Capable of designing and developing efficient and tailored computer applications and systems.',
            'skills_title': 'My Skills',
            'skills_intro': 'My expertise spans several key areas of web and embedded development, combining technical mastery with essential transversal skills for the success of any project.',
            'detailed_skills_btn': 'Detailed Technical Skills',
            'cv_title': 'My Detailed CV', 'cv_description': 'Discover my career path, experiences, and education in detail.', 'download_cv_btn': 'Download CV',
            'timeline_title': 'My Journey',
            'timeline_diploma_title': 'PROFESSIONAL LICENSE IN EMBEDDED COMPUTER SYSTEMS',
            'timeline_diploma_date': 'Academic Year: 2024 – 2025',
            'timeline_diploma_school': 'Higher School of Technology (EST) – Dakhla',
            'timeline_diploma_desc': 'Specialized training in the design, development, and optimization of embedded systems...',
            'timeline_bts_title': 'BTS IN INFORMATION SYSTEMS DEVELOPMENT',
            'timeline_bts_date': 'Academic Year: 2022 – 2024',
            'timeline_bts_school': 'Lycée Qualifiant Lala Khadija – Dakhla',
            'timeline_bts_desc': 'Training focused on the development of web, mobile, and desktop computer applications...',
            'timeline_bac_title': 'SCIENTIFIC BACCALAUREATE – LIFE AND EARTH SCIENCES (SVT)',
            'timeline_bac_date': 'Academic Year: 2021 – 2022',
            'timeline_bac_school': 'Lycée Al-Fath – Dakhla',
            'timeline_bac_desc': 'General scientific training with a focus on biology, geology, physics, and mathematics...',
            'projects_title': 'My Projects',
            'filter_all': 'All', 'filter_web': 'Web', 'filter_embedded': 'Embedded',
            'project_stage_title': 'Complaint Platform – Dakhla',
            'project_stage_desc': 'This project was carried out during my internship at the Dakhla Labor Delegation...',
            'project_gestion_title': 'Web Interface – Film Streaming Platform',
            'project_gestion_desc': 'This project is a front-end mockup of a movie platform...',
            'project_login_title': 'E-commerce Site – Online Product Sales',
            'project_login_desc': 'This project is an online store I developed to sell my own products...',
            'project_heart_title': 'Heart Rate Monitor',
            'project_heart_desc': 'This project involves creating an Arduino-based connected health device...',
            'project_gas_title': 'Gas Leak Detection System – Arduino',
            'project_gas_desc': 'This project involves developing a smart home security system capable of detecting gas leaks...',
            'project_irrigation_title': 'Smart Solar Irrigation System',
            'project_irrigation_desc': 'This project is a smart automatic watering system that uses a moisture sensor...',
            'view_details_btn': 'View Details', 'modal_tech_title': 'Technologies Used:', 'modal_demo_btn': 'View Demo', 'modal_github_btn': 'Source Code',
            'cv_preview_title': 'CV Preview', 'detailed_skills_modal_title': 'Advanced Technical Skills',
            'skill_cat_web_title': 'Web and Software Development', 'skill_cat_db_title': 'Databases & Modeling', 'skill_cat_embedded_title': 'Embedded Systems & IoT', 'skill_cat_network_title': 'Systems, Networks & AI', 'skill_cat_tools_title': 'Tools & Design',
            'modal_close_btn': 'Close', 'contact_title': 'Contact Me', 'contact_intro': 'I am always open to new opportunities... Feel free to contact me...',
            'contact_name_placeholder': 'Your Full Name', 'contact_email_placeholder': 'Your Email Address', 'contact_message_placeholder': 'Your Message...', 'send_message_btn': 'Send Message',
            'social_intro': 'Also find me on:', 'footer_text': '&copy; 2025 Abderrahim Es-Sousy — All rights reserved.',
            'form_sending': 'Sending...', 'form_success': 'Message sent successfully!', 'form_error': 'An error occurred.',
            'skill_html_desc': 'Web structure and semantics.', 'skill_css_desc': 'Responsive design and animations.', 'skill_js_desc': 'Client interactivity and business logic.', 'skill_php_desc': 'Robust Back-end development.', 'skill_mysql_desc': 'Database management.', 'skill_bootstrap_desc': 'Framework for rapid design.', 'skill_c_cpp_desc': 'Embedded and systems programming.', 'skill_python_desc': 'Scripting, AI, data.', 'skill_git_desc': 'Version control and collaboration.', 'skill_vbnet_desc': 'Desktop and legacy applications.', 'skill_sqlserver_desc': 'Advanced database management.', 'skill_linux_desc': 'Development environments.'
        },
        'ar': {
            'page_title': 'بورتفوليو عبد الرحيم - مطور ويب محترف',
            'meta_description': 'بورتفوليو احترافي لعبد الرحيم، مطور ويب متكامل متخصص في واجهة وتجربة المستخدم، البرمجة المضمنة، والذكاء الاصطناعي. اكتشف مشاريعي المبتكرة ومهاراتي.',
            'meta_keywords': 'عبد الرحيم السوسي, مطور ويب, فول ستاك, واجهة المستخدم وتجربة المستخدم, برمجة مضمنة, ذكاء اصطناعي, بورتفوليو, مشاريع, مهارات, المغرب, الداخلة',
            'nav_home': 'الرئيسية', 'nav_about': 'عني', 'nav_skills': 'المهارات', 'nav_timeline': 'المسار', 'nav_projects': 'المشاريع', 'nav_contact': 'اتصل بي',
            'discover_projects_btn': 'اكتشف مشاريعي',
            'about_title': 'نبذة عني',
            'about_description': 'خريج شاب ومتحمس حاصل على دبلوم باك+3 في أنظمة الحاسوب المدمجة، لدي تكوين متين في تطوير الويب، الشبكات، البرمجة المدمجة، وقواعد البيانات. قادر على تصميم وتطوير تطبيقات وأنظمة معلومات فعالة ومناسبة للاحتياجات.',
            'skills_title': 'مهاراتي',
            'skills_intro': 'تتوزع خبرتي على عدة مجالات رئيسية في تطوير الويب والأنظمة المدمجة، حيث أجمع بين الإتقان التقني والمهارات الأساسية الضرورية لنجاح أي مشروع.',
            'detailed_skills_btn': 'المهارات التقنية المفصلة',
            'cv_title': 'سيرتي الذاتية', 'cv_description': 'اكتشف مساري، خبراتي، وتكويني بالتفصيل.', 'download_cv_btn': 'تحميل السيرة الذاتية',
            'timeline_title': 'مساري الدراسي والمهني',
            'timeline_diploma_title': 'الإجازة المهنية في الأنظمة المعلوماتية المدمجة',
            'timeline_diploma_date': 'السنة الجامعية: 2024 – 2025',
            'timeline_diploma_school': 'المدرسة العليا للتكنولوجيا (EST) – الداخلة',
            'timeline_diploma_desc': 'تكوين متخصص في تصميم وتطوير وتحسين الأنظمة المدمجة...',
            'timeline_bts_title': 'شهادة التقني العالي في تطوير نظم المعلومات',
            'timeline_bts_date': 'السنة الجامعية: 2022 – 2024',
            'timeline_bts_school': 'ثانوية لالة خديجة التأهيلية – الداخلة',
            'timeline_bts_desc': 'تكوين يركز على تطوير تطبيقات الحاسوب للويب، الهاتف المحمول والمكاتب...',
            'timeline_bac_title': 'البكالوريا العلمية – علوم الحياة والأرض',
            'timeline_bac_date': 'السنة الدراسية: 2021 – 2022',
            'timeline_bac_school': 'ثانوية الفتح – الداخلة',
            'timeline_bac_desc': 'تكوين علمي عام مع التركيز على البيولوجيا، الجيولوجيا، والفيزياء...',
            'projects_title': 'مشاريعي',
            'filter_all': 'الكل', 'filter_web': 'الويب', 'filter_embedded': 'الأنظمة المدمجة',
            'project_stage_title': 'منصة الشكايات – الداخلة',
            'project_stage_desc': 'تم إنجاز هذا المشروع في إطار تدريبي بمندوبية الشغل بالداخلة...',
            'project_gestion_title': 'واجهة ويب – منصة بث أفلام',
            'project_gestion_desc': 'هذا المشروع هو نموذج واجهة أمامية لمنصة أفلام...',
            'project_login_title': 'متجر إلكتروني – لبيع المنتجات',
            'project_login_desc': 'هذا المشروع عبارة عن متجر إلكتروني قمت بتطويره لبيع منتجاتي الخاصة...',
            'project_heart_title': 'جهاز مراقبة معدل نبضات القلب',
            'project_heart_desc': 'يتكون هذا المشروع من إنشاء جهاز صحي متصل يعتمد على الأردوينو...',
            'project_gas_title': 'نظام كشف تسرب الغاز - أردوينو',
            'project_gas_desc': 'يهدف هذا المشروع إلى تطوير نظام أمان منزلي ذكي قادر على كشف تسربات الغاز...',
            'project_irrigation_title': 'نظام ري شمسي ذكي',
            'project_irrigation_desc': 'هذا المشروع هو نظام سقي أوتوماتيكي ذكي يستخدم مستشعر الرطوبة...',
            'view_details_btn': 'عرض التفاصيل', 'modal_tech_title': 'التقنيات المستخدمة:', 'modal_demo_btn': 'مشاهدة العرض', 'modal_github_btn': 'الكود المصدري',
            'cv_preview_title': 'معاينة السيرة الذاتية', 'detailed_skills_modal_title': 'المهارات التقنية المتقدمة',
            'skill_cat_web_title': 'تطوير الويب والبرمجيات', 'skill_cat_db_title': 'قواعد البيانات والنمذجة', 'skill_cat_embedded_title': 'الأنظمة المدمجة وإنترنت الأشياء', 'skill_cat_network_title': 'الأنظمة، الشبكات والذكاء الاصطناعي', 'skill_cat_tools_title': 'الأدوات والتصميم',
            'modal_close_btn': 'إغلاق', 'contact_title': 'اتصل بي', 'contact_intro': 'أنا دائماً منفتح على الفرص الجديدة... لا تتردد في الاتصال بي...',
            'contact_name_placeholder': 'اسمك الكامل', 'contact_email_placeholder': 'بريدك الإلكتروني', 'contact_message_placeholder': 'رسالتك...', 'send_message_btn': 'إرسال الرسالة',
            'social_intro': 'تجدني أيضًا على:', 'footer_text': '&copy; 2025 عبد الرحيم السوسي — جميع الحقوق محفوظة.',
            'form_sending': 'جاري الإرسال...', 'form_success': 'تم إرسال الرسالة بنجاح!', 'form_error': 'حدث خطأ أثناء الإرسال.',
            'skill_html_desc': 'هيكل الويب ودلالاته.', 'skill_css_desc': 'تصميم متجاوب ورسوم متحركة.', 'skill_js_desc': 'تفاعل العميل ومنطق الأعمال.', 'skill_php_desc': 'تطوير خلفي قوي.', 'skill_mysql_desc': 'إدارة قواعد البيانات.', 'skill_bootstrap_desc': 'إطار عمل للتصميم السريع.', 'skill_c_cpp_desc': 'البرمجة المدمجة والأنظمة.', 'skill_python_desc': 'البرمجة النصية، الذكاء الاصطناعي، البيانات.', 'skill_git_desc': 'التحكم في الإصدار والتعاون.', 'skill_vbnet_desc': 'تطبيقات سطح المكتب.', 'skill_sqlserver_desc': 'إدارة قواعد البيانات المتقدمة.', 'skill_linux_desc': 'بيئات التطوير.'
        }
    };

    const projectsData = {
        "projet-stage": {
            title_key: "project_stage_title",
            galleryImages: ["img/project de stage/1.png","img/project de stage/2.png","img/project de stage/3.png","img/project de stage/4.png","img/project de stage/5.png","img/project de stage/6.png","img/project de stage/7.png","img/project de stage/8.png"],
            description_key: "project_stage_desc",
            technologies: ["php", "mysql", "javascript", "html5", "css3", "bootstrap"],
            live_demo: "#", github_repo: "#"
        },
        "projet-gestion": {
            title_key: "project_gestion_title",
            galleryImages: ["img/GOT/1.png", "img/GOT/2.png","img/GOT/3.png","img/GOT/4.png","img/GOT/5.png"],
            description_key: "project_gestion_desc",
            technologies: ["html5", "css3", "javascript"],
            live_demo: "#", github_repo: "#"
        },
        "projet-login": {
            title_key: "project_login_title",
            galleryImages: ["img/ECO/1.png", "img/ECO/2.png", "img/ECO/3.png","img/ECO/4.png","img/ECO/5.png","img/ECO/6.png","img/ECO/7.png","img/ECO/8.png"],
            description_key: "project_login_desc",
            technologies: ["html5", "css3", "javascript", "php", "mysql"],
            live_demo: "#", github_repo: "#"
        },
        "projet-heart": {
            title_key: "project_heart_title",
            galleryImages: ["img/SIE/HEART.jpg"],
            description_key: "project_heart_desc",
            technologies: ["c_cpp", "arduino"],
            live_demo: "#", github_repo: "#"
        },
        "projet-gas": {
            title_key: "project_gas_title",
            galleryImages: ["img/SIE/GAZ.png"],
            description_key: "project_gas_desc",
            technologies: ["c_cpp", "arduino"],
            live_demo: "#", github_repo: "#"
        },
        "projet-irrigation": {
            title_key: "project_irrigation_title",
            galleryImages: ["img/SIE/SLEEP MODE.jpg"],
            description_key: "project_irrigation_desc",
            technologies: ["c_cpp", "arduino"],
            live_demo: "#", github_repo: "#"
        }
    };

    const technologyIcons = {
        "html5": '<i class="fab fa-html5 tech-icon" title="HTML5"></i>', "css3": '<i class="fab fa-css3-alt tech-icon" title="CSS3"></i>', "javascript": '<i class="fab fa-js tech-icon" title="JavaScript"></i>', "php": '<i class="fab fa-php tech-icon" title="PHP"></i>',
        "mysql": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" class="tech-icon svg-icon" alt="MySQL" title="MySQL">',
        "bootstrap": '<i class="fab fa-bootstrap tech-icon" title="Bootstrap"></i>',
        "c_cpp": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" class="tech-icon svg-icon" alt="C/C++" title="C/C++">',
        "vbnet": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-plain-wordmark.svg" class="tech-icon svg-icon" alt="VB.NET" title="VB.NET">',
        "sqlserver": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain-wordmark.svg" class="tech-icon svg-icon" alt="SQL Server" title="SQL Server">',
        "python": '<i class="fab fa-python tech-icon" title="Python"></i>', "linux": '<i class="fab fa-linux tech-icon" title="Linux"></i>', "git_github": '<i class="fab fa-github tech-icon" title="Git / GitHub"></i>',
        "arduino": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original-wordmark.svg" class="tech-icon svg-icon" alt="Arduino" title="Arduino">'
    };

    const technicalSkills = [
        { name: "HTML5", iconKey: "html5", description_key: "skill_html_desc" },
        { name: "CSS3", iconKey: "css3", description_key: "skill_css_desc" },
        { name: "JavaScript", iconKey: "javascript", description_key: "skill_js_desc" },
        { name: "PHP", iconKey: "php", description_key: "skill_php_desc" },
        { name: "MySQL", iconKey: "mysql", description_key: "skill_mysql_desc" },
        { name: "Bootstrap", iconKey: "bootstrap", description_key: "skill_bootstrap_desc" },
        { name: "C / C++", iconKey: "c_cpp", description_key: "skill_c_cpp_desc" },
        { name: "Python", iconKey: "python", description_key: "skill_python_desc" },
        { name: "Git / GitHub", iconKey: "git_github", description_key: "skill_git_desc" },
        { name: "VB.NET", iconKey: "vbnet", description_key: "skill_vbnet_desc" },
        { name: "SQL Server", iconKey: "sqlserver", description_key: "skill_sqlserver_desc" },
        { name: "Linux", iconKey: "linux", description_key: "skill_linux_desc" }
    ];

    // --- TRANSLATION FUNCTION ---
    function applyTranslations(lang) {
        if (!translations[lang]) {
            console.warn(`Translation for language '${lang}' not found.`);
            return;
        }

        // Update HTML lang and dir
        root.lang = lang;
        root.dir = lang === 'ar' ? 'rtl' : 'ltr';
        body.classList.toggle('rtl', lang === 'ar');

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[lang][key];
            if (translation) {
                if (element.tagName === 'META') {
                    element.setAttribute('content', translation);
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Re-initialize Typed.js with new strings (CURSOR REMOVED HERE)
        if (typedInstance) typedInstance.destroy();
        const typedStrings = {
            fr: ["Développeur Web Full Stack", "Spécialiste Systèmes Embarqués", "Passionné d'Intelligence Artificielle"],
            en: ["Full Stack Web Developer", "Embedded Systems Specialist", "AI Enthusiast"],
            ar: ["مطور ويب متكامل", "متخصص في الأنظمة المدمجة", "شغوف بالذكاء الاصطناعي"]
        };
        const typedTextElement = document.querySelector('.typed-text');
        if (typedTextElement) {
            typedInstance = new Typed('.typed-text', {
                strings: typedStrings[lang],
                typeSpeed: 60,
                backSpeed: 30,
                loop: true,
                showCursor: false, // MODIFIÉ : Désactive le curseur
                // cursorChar: '|' // Cette ligne est maintenant inutile, peut être commentée ou supprimée
            });
        }

        // Update skill card descriptions
        document.querySelectorAll('.skill-card').forEach(card => {
            const skillNameElement = card.querySelector('h4');
            const skillDescElement = card.querySelector('p');
            if (skillNameElement && skillDescElement) {
                const skillName = skillNameElement.textContent; // Get the skill name as displayed
                // Find the skill data using the name to get the description key
                const skillData = technicalSkills.find(s => s.name === skillName); 
                if (skillData && translations[lang][skillData.description_key]) {
                    skillDescElement.textContent = translations[lang][skillData.description_key];
                }
            }
        });
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Save language preference
        localStorage.setItem('selectedLanguage', lang);
    }

    // --- INITIALIZATIONS & EVENT LISTENERS ---

    // 1. Initialize AOS (Animate On Scroll) library first
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50 // Adjust this value if sections appear too late/early
    });

    // Dynamic generation of skill cards (only if skillsGrid exists and is empty to prevent duplicates)
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid && skillsGrid.children.length === 0) { // Ensure it's empty to avoid re-adding
        technicalSkills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.setAttribute('data-aos', 'zoom-in');
            skillCard.setAttribute('data-aos-delay', (index % 6) * 100);
            skillCard.innerHTML = `
                <div class="skill-icon">${technologyIcons[skill.iconKey] || ''}</div>
                <h4>${skill.name}</h4>
                <p></p>`; // p content will be set by translation function
            skillsGrid.appendChild(skillCard);
        });
    }

    // Scroll Progress Bar
    const scrollProgressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        if (scrollProgressBar) {
            const scrollTop = root.scrollTop;
            const scrollHeight = root.scrollHeight - root.clientHeight;
            const scrollPercentage = (scrollHeight > 0) ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgressBar.style.width = scrollPercentage + '%';
        }
    });
    
    // Side Navigation
    const sideNav = document.getElementById('sideNav');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');

    // Create and append overlay once
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);
    
    function toggleSideNav(open) {
        const navWidth = "280px";
        const isRTL = root.dir === 'rtl';
        if (sideNav) { // Ensure sideNav exists
            if (open) {
                sideNav.style.width = navWidth;
                isRTL ? sideNav.style.right = "0" : sideNav.style.left = "0";
                overlay.classList.add('active');
                body.style.overflow = 'hidden'; // Prevent main body scroll
            } else {
                sideNav.style.width = "0";
                isRTL ? sideNav.style.right = `-${navWidth}` : sideNav.style.left = `-${navWidth}`;
                overlay.classList.remove('active');
                body.style.overflow = ''; // Restore main body scroll
            }
        }
    }

    hamburgerBtn?.addEventListener('click', () => toggleSideNav(true));
    closeBtn?.addEventListener('click', () => toggleSideNav(false));
    overlay.addEventListener('click', () => toggleSideNav(false));

    // Dark Mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    function setDarkMode(isDark) {
        body.classList.toggle('dark-mode', isDark);
        body.classList.toggle('light-mode', !isDark); 
        if (darkModeIcon) { // Check if icon element exists
            darkModeIcon.className = `fas ${isDark ? 'fa-moon' : 'fa-sun'}`;
        }
        if (darkModeToggle) { // Check if toggle exists
            darkModeToggle.checked = isDark;
        }
        localStorage.setItem('themeMode', isDark ? 'dark' : 'light'); 
    }
    darkModeToggle?.addEventListener('change', () => setDarkMode(darkModeToggle.checked));
    
    // Theme Color Switcher
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');

    themeToggleBtn?.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from closing it immediately
        themeSwitcher?.classList.toggle('active');
    });

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.themeColor;
            root.style.setProperty('--red-primary', color);
            localStorage.setItem('themeColor', color);
            
            // Remove 'active' from previously active option and add to current
            document.querySelector('.theme-option.active')?.classList.remove('active');
            option.classList.add('active');
            
            // Update particles color if particles.js is initialized
            if (window.pJSDom && pJSDom[0] && pJSDom[0].pJS && pJSDom[0].pJS.particles) {
                pJSDom[0].pJS.particles.color.value = color;
                pJSDom[0].pJS.particles.line_linked.color = color;
                pJSDom[0].pJS.fn.particlesRefresh();
            }
        });
    });
    // Close theme switcher if clicking outside
    document.addEventListener('click', (e) => {
        if (themeSwitcher && !themeSwitcher.contains(e.target) && !themeToggleBtn?.contains(e.target)) {
            themeSwitcher.classList.remove('active');
        }
    });


    // Language Switcher
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => applyTranslations(button.dataset.lang));
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.side-nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                targetElement?.scrollIntoView({ behavior: 'smooth' });
            }
            toggleSideNav(false); // Close side nav after clicking a link
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.side-nav-links .nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            // Adjusted offset for active link detection to make it smoother
            // You might need to fine-tune this '150' value
            if (section.offsetTop <= pageYOffset + 150) { 
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href')?.includes(current));
        });
    });

    // Project Detail Modal Logic
    const projectDetailModalElement = document.getElementById('projectDetailModal');
    let projectDetailModal; // Declare here, initialize conditionally

    if (projectDetailModalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        projectDetailModal = new bootstrap.Modal(projectDetailModalElement);
    } else {
        console.warn("Bootstrap Modal or projectDetailModalElement not found. Project modal functionality might not work.");
    }

    // Modified event listener for project items to trigger the modal
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            const project = projectsData[projectId];

            if (!project || !projectDetailModalElement || !projectDetailModal) {
                console.warn(`Project with ID "${projectId}" not found, or modal elements are missing.`);
                return;
            }
            
            const currentLang = localStorage.getItem('selectedLanguage') || 'fr';

            // Populate Modal Content (with checks)
            const modalLabel = document.getElementById('projectDetailModalLabel');
            if (modalLabel) modalLabel.textContent = translations[currentLang][project.title_key];
            
            const modalDescription = document.getElementById('modalProjectDescription');
            if (modalDescription) modalDescription.textContent = translations[currentLang][project.description_key];
            
            const techContainer = document.getElementById('modalProjectTechnologies');
            if (techContainer) { 
                techContainer.innerHTML = project.technologies.map(tech => technologyIcons[tech] || '').join('');
            }

            const modalLiveBtn = document.getElementById('modalProjectLive');
            const modalGithubBtn = document.getElementById('modalProjectGithub');

            if (modalLiveBtn) {
                modalLiveBtn.style.display = (project.live_demo && project.live_demo !== '#') ? 'inline-flex' : 'none';
                modalLiveBtn.href = project.live_demo;
            }
            if (modalGithubBtn) {
                modalGithubBtn.style.display = (project.github_repo && project.github_repo !== '#') ? 'inline-flex' : 'none';
                modalGithubBtn.href = project.github_repo;
            }
            
            const swiperWrapper = document.querySelector('#projectDetailModal .swiper-wrapper');
            if (swiperWrapper) {
                swiperWrapper.innerHTML = project.galleryImages.map(imgSrc => `<div class="swiper-slide"><img src="${imgSrc}" alt="${translations[currentLang][project.title_key]}" class="img-fluid rounded"></div>`).join('');
            }
            
            projectDetailModal.show(); // Show the Bootstrap modal
        });
    });

    // Initialize Swiper ONLY when the modal is fully shown
    projectDetailModalElement?.addEventListener('shown.bs.modal', function () {
        // Only destroy if mySwiper was previously initialized
        if (mySwiper) {
            mySwiper.destroy(true, true); 
        }
        // Check for the carousel element before initializing Swiper
        const projectCarousel = document.querySelector('#projectDetailModal .project-carousel');
        if (projectCarousel) {
            mySwiper = new Swiper(projectCarousel, {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 10,
                autoplay: { delay: 4000, disableOnInteraction: false }, 
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            });
        }
    });

    // Contact Form
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    form?.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Basic client-side validation
        const nameInput = this.querySelector('[name="name"]');
        const emailInput = this.querySelector('[name="email"]');
        const messageInput = this.querySelector('[name="message"]');

        if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
            const currentLang = localStorage.getItem('selectedLanguage') || 'fr';
            if (result) {
                result.innerHTML = `<span class="text-danger">${translations[currentLang]['form_error']} (Tous les champs sont requis.)</span>`; 
                result.style.display = 'block';
                setTimeout(() => { result.style.display = 'none'; }, 5000);
            }
            return;
        }

        const formData = new FormData(form);
        // !!! IMPORTANT: REMPLACEZ 'YOUR_WEB3FORMS_ACCESS_KEY' PAR VOTRE VRAIE CLÉ API DE WEB3FORMS !!!
        formData.append('access_key', '73d88bfd-92c3-4f20-a314-7263cff0caa5'); 
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        
        const currentLang = localStorage.getItem('selectedLanguage') || 'fr';
        if (result) {
            result.innerHTML = `<span class="text-info">${translations[currentLang]['form_sending']}</span>`;
            result.style.display = 'block';
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            });
            const res = await response.json();
            if (result) { // Check result element again
                if (res.success) {
                    result.innerHTML = `<span class="text-success">${translations[currentLang]['form_success']}</span>`;
                    form.reset();
                } else {
                    result.innerHTML = `<span class="text-danger">${res.message || translations[currentLang]['form_error']}</span>`;
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            if (result) { // Check result element again
                result.innerHTML = `<span class="text-danger">${translations[currentLang]['form_error']}</span>`;
            }
        } finally {
            if (result) { // Ensure result element exists before timeout
                setTimeout(() => { result.style.display = 'none'; }, 5000);
            }
        }
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            projectItems.forEach(item => {
                // Use GSAP for fading animation during filtering
                if (filter === 'all' || item.dataset.category === filter) {
                    gsap.to(item, { duration: 0.3, opacity: 1, display: 'block', ease: 'power2.out' });
                } else {
                    gsap.to(item, { duration: 0.3, opacity: 0, display: 'none', ease: 'power2.out' });
                }
            });
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', () => {
        backToTopBtn?.classList.toggle('show', window.pageYOffset > 300);
    });
    backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- ON LOAD INITIALIZATIONS ---

    // 1. Initialize Theme Color
    const savedColor = localStorage.getItem('themeColor') || '#C2002E';
    root.style.setProperty('--red-primary', savedColor);
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.themeColor === savedColor);
    });

    // 2. Initialize Dark Mode
    const savedTheme = localStorage.getItem('themeMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    // 3. Initialize Particles.js
    const particlesJsDiv = document.getElementById('particles-js');
    if (window.particlesJS && particlesJsDiv) { // Ensure particlesJS is loaded and the div exists
        particlesJS('particles-js', {
            particles: { number: { value: 80, density: { enable: true, value_area: 800 } }, color: { value: savedColor }, shape: { type: "circle" }, opacity: { value: 0.5, random: false }, size: { value: 3, random: true }, line_linked: { enable: true, distance: 150, color: savedColor, opacity: 0.4, width: 1 }, move: { enable: true, speed: 4, direction: "none", random: false, straight: false, out_mode: "out", bounce: false } },
            interactivity: { detect_on: "canvas", events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true }, modes: { grab: { distance: 180, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } } },
            retina_detect: true
        });
    }
    
    // 4. Initialize Language (should be last to ensure all elements are in DOM for translation)
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    applyTranslations(savedLanguage);
});