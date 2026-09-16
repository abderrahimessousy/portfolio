document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    const root = document.documentElement;
    const body = document.body;
    let typedInstance = null;
    let mySwiper = null;

    const translations = {
        'fr': {
            'page_title': 'Portfolio Abderrahim - Développeur IA & Web',
            'meta_description': "Portfolio professionnel d'Abderrahim Es-Sousy, étudiant en Master Intelligence Artificielle, spécialisé en IA, Machine Learning, Deep Learning, NLP, développement web et systèmes embarqués.",
            'meta_keywords': 'Abderrahim Es-Sousy, Intelligence Artificielle, Machine Learning, Deep Learning, NLP, développeur web, systèmes embarqués, IoT, portfolio, Maroc, Dakhla',
            'nav_home': 'Accueil', 'nav_about': 'À Propos', 'nav_skills': 'Compétences', 'nav_timeline': 'Parcours', 'nav_projects': 'Projets', 'nav_contact': 'Contact',
            'discover_projects_btn': 'Découvrez mes Projets',
            'about_title': 'À Propos de Moi',
            'about_description': "Étudiant en 2ᵉ année de Master en Intelligence Artificielle, avec une formation solide dans le domaine des technologies de l'information et du développement de solutions informatiques. Doté d'une approche rigoureuse et orientée vers la résolution de problèmes, je suis capable d'analyser les besoins, de concevoir des solutions adaptées et de contribuer efficacement à la réalisation de projets technologiques.",
            'skills_title': 'Mes Compétences',
            'skills_intro': "Mon expertise s'étend sur plusieurs domaines clés : Intelligence Artificielle, développement web, systèmes embarqués et IoT, combinant maîtrise technique et compétences transversales essentielles pour la réussite de tout projet.",
            'detailed_skills_btn': 'Compétences Techniques Détaillées',
            'cv_title': 'Mon CV Détaillé', 'cv_description': 'Découvrez mon parcours, mes expériences et ma formation en détail.', 'download_cv_btn': 'Télécharger le CV',
            'timeline_title': 'Mon Parcours',
            'timeline_master_title': 'MASTER EN INTELLIGENCE ARTIFICIELLE (EN COURS)',
            'timeline_master_date': '2025 – 2027',
            'timeline_master_school': 'Faculté des Sciences Semlalia – Université Cadi Ayyad, Marrakech',
            'timeline_master_desc': "Formation approfondie en Intelligence Artificielle couvrant le Machine Learning, le Deep Learning, le Traitement du Langage Naturel (NLP), la Vision par Ordinateur, l'Analyse de Données et les Systèmes Intelligents. Développement de projets appliqués utilisant Python, TensorFlow, PyTorch et des techniques avancées d'apprentissage automatique.",
            'timeline_diploma_title': 'LICENCE PROFESSIONNELLE EN SYSTÈMES INFORMATIQUES EMBARQUÉS',
            'timeline_diploma_date': '2024 – 2025',
            'timeline_diploma_school': 'École Supérieure de Technologie (EST) – Dakhla',
            'timeline_diploma_desc': "Formation spécialisée dans la conception, le développement et l'optimisation de systèmes embarqués. Acquisition de compétences en programmation bas niveau (C, assembleur), utilisation de microcontrôleurs (PIC, ESP32, Arduino), systèmes temps réel, Linux embarqué, IoT, et développement de solutions intelligentes à base de capteurs, interfaces et protocoles de communication.",
            'timeline_bts_title': "BTS EN DÉVELOPPEMENT DES SYSTÈMES D'INFORMATION",
            'timeline_bts_date': '2022 – 2024',
            'timeline_bts_school': 'Lycée Qualifiant Lala Khadija – Dakhla',
            'timeline_bts_desc': "Formation axée sur le développement d'applications informatiques web, mobiles et bureautiques. Maîtrise des langages de programmation (Java, PHP, JavaScript, VB.NET), des bases de données (MySQL, SQL Server), ainsi que des outils de conception (UML, Merise). Développement de projets complets, de l'analyse des besoins jusqu'au déploiement.",
            'timeline_bac_title': 'BACCALAURÉAT SCIENTIFIQUE – SCIENCES DE LA VIE ET DE LA TERRE (SVT)',
            'timeline_bac_date': '2021 – 2022',
            'timeline_bac_school': 'Lycée Al-Fath – Dakhla',
            'timeline_bac_desc': "Formation scientifique générale avec un focus sur la biologie, la géologie, la physique et les mathématiques. Développement de l'esprit analytique, de la rigueur scientifique et des compétences transversales utiles pour des études supérieures dans les domaines scientifiques et technologiques.",
            'projects_title': 'Mes Projets',
            'filter_all': 'Tous', 'filter_web': 'Web', 'filter_embedded': 'Embarqué', 'filter_IA': 'IA',
            'project_stage_title': 'Plateforme de Réclamations – Dakhla',
            'project_stage_desc': "Ce projet a été réalisé dans le cadre de mon stage à la Délégation du Travail de Dakhla. Il s'agit d'une application web destinée à remplacer les procédures traditionnelles sur papier, permettant aux employés de soumettre des réclamations en ligne et de suivre leur état.",
            'project_gestion_title': 'Interface Web – Plateforme de Streaming de Films',
            'project_gestion_desc': "Ce projet est une maquette front-end d'une plateforme de films, conçue pour présenter des affiches de films de manière visuellement attrayante avec des animations et un design responsive.",
            'project_login_title': 'Site E-commerce – Vente de Produits en Ligne',
            'project_login_desc': "Ce projet est une boutique en ligne que j'ai développée pour vendre mes propres produits. Il s'agit d'une plateforme e-commerce complète avec gestion de panier, paiement et administration.",
            'project_heart_title': 'Moniteur de Fréquence Cardiaque',
            'project_heart_desc': "Ce projet consiste en la création d'un dispositif de santé connecté basé sur Arduino qui mesure la fréquence cardiaque et affiche les données sur un écran LCD.",
            'project_gas_title': 'Système de Détection de Fuite de Gaz – Arduino',
            'project_gas_desc': "Ce projet consiste à développer un système de sécurité domestique intelligent capable de détecter les fuites de gaz et d'envoyer des alertes via buzzer et notification.",
            'project_irrigation_title': "Système d'Irrigation Solaire Intelligent",
            'project_irrigation_desc': "Ce projet est un système d'arrosage automatique intelligent qui utilise un capteur d'humidité pour optimiser la consommation d'eau, alimenté par énergie solaire.",
            'project_recommendation_title': 'Système Intelligent de Recommandation de Films & Séries',
            'project_recommendation_desc': "Développement d'une application web intégrant un moteur d'inférence en Prolog pour générer des recommandations personnalisées de films et séries à partir des préférences utilisateur.",
            'project_prediction_title': "Système de Prédiction des Matchs de l'Équipe du Maroc",
            'project_prediction_desc': "Application web développée avec Flask intégrant un modèle de Machine Learning pour prédire les résultats des matchs de l'équipe nationale du Maroc à partir de données historiques.",
            'project_sign_lang_title': 'Système Intelligent de Reconnaissance du Langage des Signes',
            'project_sign_lang_desc': "Système embarqué basé sur ESP32-CAM utilisant un modèle CNN pour la reconnaissance des lettres du langage des signes, avec application web Flask permettant d'assembler les caractères en mots.",
            'project_nutrition_title': "Système Intelligent d'Assistant Nutritionnel",
            'project_nutrition_desc': "Développement d'une application basée sur l'IA qui identifie les aliments marocains écrits en français et en Darija, extrait les quantités alimentaires et estime l'apport calorique en utilisant des techniques de NLP. Le système intègre une entrée vocale et fournit un tableau de bord pour le suivi des données nutritionnelles par jour, semaine, mois et année.",
            'project_chatbot_title': "Chatbot de Simulation de Patientes & Évaluateur IA",
            'project_chatbot_desc': "Développement d'un chatbot permettant aux étudiants en médecine de simuler des consultations avec des patientes virtuelles selon différents scénarios cliniques. Intégration d'un évaluateur IA capable d'analyser les échanges, d'attribuer un score selon une grille d'évaluation et de générer un feedback personnalisé en français et en Darija. Développement d'une API pour la gestion des scénarios, des conversations et des résultats.",
            'view_details_btn': 'Voir Détails', 'modal_tech_title': 'Technologies Utilisées :', 'modal_demo_btn': 'Voir la démo', 'modal_github_btn': 'Code Source',
            'cv_preview_title': 'Aperçu du CV', 'detailed_skills_modal_title': 'Compétences Techniques Avancées',
            'skill_cat_web_title': 'Programmation & Développement',
            'skill_cat_db_title': 'Bases de Données & Modélisation',
            'skill_cat_embedded_title': 'Systèmes Embarqués & IoT',
            'skill_cat_network_title': 'Systèmes, Réseaux & IA',
            'skill_cat_tools_title': 'Outils & Design',
            'skill_cat_ai_title': 'Intelligence Artificielle & Data Science',
            'skill_cat_bigdata_title': 'Big Data',
            'modal_close_btn': 'Fermer',
            'contact_title': 'Me Contacter',
            'contact_intro': "Je suis toujours ouvert aux nouvelles opportunités, aux collaborations stimulantes et aux discussions passionnantes. N'hésitez pas à me contacter si vous avez un projet en tête, une question ou si vous souhaitez en savoir plus sur mon travail.",
            'contact_name_placeholder': 'Votre Nom Complet',
            'contact_email_placeholder': 'Votre Adresse E-mail',
            'contact_message_placeholder': 'Votre Message...',
            'send_message_btn': 'Envoyer le Message',
            'social_intro': 'Retrouvez-moi également sur :',
            'footer_text': '&copy; 2025 Abderrahim Es-Sousy — Tous droits réservés.',
            'form_sending': 'Envoi en cours...',
            'form_success': 'Message envoyé avec succès !',
            'form_error': "Une erreur s'est produite. Veuillez réessayer.",
            'form_required': 'Tous les champs sont requis.',
            'skill_html_desc': "Structure et sémantique web.",
            'skill_css_desc': "Design responsive et animations.",
            'skill_js_desc': "Interactivité client et logique métier.",
            'skill_php_desc': "Développement Back-end robuste.",
            'skill_mysql_desc': "Gestion de bases de données.",
            'skill_bootstrap_desc': "Framework pour design rapide.",
            'skill_c_cpp_desc': "Programmation embarquée et systèmes.",
            'skill_python_desc': "Scripting, IA, data.",
            'skill_git_desc': "Contrôle de version et collaboration.",
            'skill_vbnet_desc': "Applications desktop et legacy.",
            'skill_sqlserver_desc': "Gestion de bases de données avancée.",
            'skill_linux_desc': "Environnements de développement.",
            'skill_java_desc': "Programmation orientée objet.",
            'skill_tensorflow_desc': "Framework Deep Learning.",
            'skill_pytorch_desc': "Framework Deep Learning.",
            'skill_nlp_desc': "Traitement du Langage Naturel.",
            'skill_dl_desc': "Réseaux de neurones profonds.",
            'skill_ml_desc': "Algorithmes d'apprentissage automatique.",
            'skill_cv_desc': "Traitement et analyse d'images.",
            'skill_arduino_desc': "Prototypage électronique.",
            'skill_esp32_desc': "Microcontrôleur IoT.",
            'skill_raspberry_desc': "Ordinateur monocarte.",
            'skill_iot_desc': "Internet des Objets.",
            'skill_hadoop_desc': "Écosystème Big Data."
        },
        'en': {
            'page_title': 'Abderrahim Portfolio - AI & Web Developer',
            'meta_description': "Professional portfolio of Abderrahim Es-Sousy, Master's student in Artificial Intelligence, specialized in AI, Machine Learning, Deep Learning, NLP, web development and embedded systems.",
            'meta_keywords': 'Abderrahim Es-Sousy, Artificial Intelligence, Machine Learning, Deep Learning, NLP, web developer, embedded systems, IoT, portfolio, Morocco, Dakhla',
            'nav_home': 'Home', 'nav_about': 'About', 'nav_skills': 'Skills', 'nav_timeline': 'Timeline', 'nav_projects': 'Projects', 'nav_contact': 'Contact',
            'discover_projects_btn': 'Discover My Projects',
            'about_title': 'About Me',
            'about_description': "2nd year Master's student in Artificial Intelligence, with a solid background in information technology and software development. With a rigorous and problem-solving oriented approach, I am able to analyze needs, design adapted solutions and contribute effectively to the realization of technological projects.",
            'skills_title': 'My Skills',
            'skills_intro': 'My expertise spans several key areas: Artificial Intelligence, web development, embedded systems and IoT, combining technical mastery with essential transversal skills for the success of any project.',
            'detailed_skills_btn': 'Detailed Technical Skills',
            'cv_title': 'My Detailed CV', 'cv_description': 'Discover my career path, experiences, and education in detail.', 'download_cv_btn': 'Download CV',
            'timeline_title': 'My Journey',
            'timeline_master_title': "MASTER IN ARTIFICIAL INTELLIGENCE (IN PROGRESS)",
            'timeline_master_date': '2025 – 2027',
            'timeline_master_school': 'Faculty of Sciences Semlalia – Cadi Ayyad University, Marrakech',
            'timeline_master_desc': "Advanced training in Artificial Intelligence covering Machine Learning, Deep Learning, Natural Language Processing (NLP), Computer Vision, Data Analysis and Intelligent Systems. Development of applied projects using Python, TensorFlow, PyTorch.",
            'timeline_diploma_title': 'PROFESSIONAL LICENSE IN EMBEDDED COMPUTER SYSTEMS',
            'timeline_diploma_date': '2024 – 2025',
            'timeline_diploma_school': 'Higher School of Technology (EST) – Dakhla',
            'timeline_diploma_desc': "Specialized training in the design, development, and optimization of embedded systems. Acquisition of skills in low-level programming (C, assembly), microcontrollers (PIC, ESP32, Arduino), real-time systems, embedded Linux, IoT, and development of intelligent solutions based on sensors, interfaces and communication protocols.",
            'timeline_bts_title': 'BTS IN INFORMATION SYSTEMS DEVELOPMENT',
            'timeline_bts_date': '2022 – 2024',
            'timeline_bts_school': 'Lycée Qualifiant Lala Khadija – Dakhla',
            'timeline_bts_desc': 'Training focused on the development of web, mobile, and desktop computer applications. Mastery of programming languages (Java, PHP, JavaScript, VB.NET), databases (MySQL, SQL Server), and design tools (UML, Merise). Development of complete projects, from needs analysis to deployment.',
            'timeline_bac_title': 'SCIENTIFIC BACCALAUREATE – LIFE AND EARTH SCIENCES (SVT)',
            'timeline_bac_date': '2021 – 2022',
            'timeline_bac_school': 'Lycée Al-Fath – Dakhla',
            'timeline_bac_desc': 'General scientific training with a focus on biology, geology, physics, and mathematics. Development of analytical thinking, scientific rigor and transversal skills useful for higher education in scientific and technological fields.',
            'projects_title': 'My Projects',
            'filter_all': 'All', 'filter_web': 'Web', 'filter_embedded': 'Embedded', 'filter_IA': 'AI',
            'project_stage_title': 'Complaint Platform – Dakhla',
            'project_stage_desc': 'This project was carried out during my internship at the Dakhla Labor Delegation. It is a web application designed to replace traditional paper procedures, allowing employees to submit complaints online and track their status.',
            'project_gestion_title': 'Web Interface – Film Streaming Platform',
            'project_gestion_desc': 'This project is a front-end mockup of a movie platform, designed to present movie posters in a visually appealing way with animations and responsive design.',
            'project_login_title': 'E-commerce Site – Online Product Sales',
            'project_login_desc': 'This project is an online store I developed to sell my own products. It is a complete e-commerce platform with cart management, payment, and administration.',
            'project_heart_title': 'Heart Rate Monitor',
            'project_heart_desc': 'This project involves creating an Arduino-based connected health device that measures heart rate and displays data on an LCD screen.',
            'project_gas_title': 'Gas Leak Detection System – Arduino',
            'project_gas_desc': 'This project involves developing a smart home security system capable of detecting gas leaks and sending alerts via buzzer and notification.',
            'project_irrigation_title': 'Smart Solar Irrigation System',
            'project_irrigation_desc': 'This project is a smart automatic watering system that uses a moisture sensor to optimize water consumption, powered by solar energy.',
            'project_recommendation_title': 'Intelligent Movie & Series Recommendation System',
            'project_recommendation_desc': 'Development of a web application integrating a Prolog inference engine to generate personalized movie and series recommendations based on user preferences.',
            'project_prediction_title': 'Morocco National Team Match Prediction System',
            'project_prediction_desc': 'Web application developed with Flask integrating a Machine Learning model to predict the results of Morocco national team matches from historical data.',
            'project_sign_lang_title': 'Intelligent Sign Language Recognition System',
            'project_sign_lang_desc': 'ESP32-CAM based embedded system using a CNN model for sign language letter recognition, with a Flask web application allowing characters to be assembled into words.',
            'project_nutrition_title': 'Intelligent Nutritional Assistant System',
            'project_nutrition_desc': "Development of an AI-based application that identifies Moroccan foods written in French and Darija, extracts food quantities and estimates caloric intake using NLP techniques. The system integrates voice input and provides a dashboard for tracking nutritional data by day, week, month and year.",
            'project_chatbot_title': "Patient Simulation Chatbot & AI Evaluator",
            'project_chatbot_desc': "Development of a chatbot allowing medical students to simulate consultations with virtual patients according to different clinical scenarios. Integration of an AI evaluator capable of analyzing exchanges, assigning a score based on an evaluation grid and generating personalized feedback in French and Darija. Development of an API for managing scenarios, conversations and results.",
            'view_details_btn': 'View Details', 'modal_tech_title': 'Technologies Used:', 'modal_demo_btn': 'View Demo', 'modal_github_btn': 'Source Code',
            'cv_preview_title': 'CV Preview', 'detailed_skills_modal_title': 'Advanced Technical Skills',
            'skill_cat_web_title': 'Programming & Development',
            'skill_cat_db_title': 'Databases & Modeling',
            'skill_cat_embedded_title': 'Embedded Systems & IoT',
            'skill_cat_network_title': 'Systems, Networks & AI',
            'skill_cat_tools_title': 'Tools & Design',
            'skill_cat_ai_title': 'Artificial Intelligence & Data Science',
            'skill_cat_bigdata_title': 'Big Data',
            'modal_close_btn': 'Close',
            'contact_title': 'Contact Me',
            'contact_intro': 'I am always open to new opportunities, stimulating collaborations, and exciting discussions. Feel free to contact me if you have a project in mind, a question, or if you want to learn more about my work.',
            'contact_name_placeholder': 'Your Full Name',
            'contact_email_placeholder': 'Your Email Address',
            'contact_message_placeholder': 'Your Message...',
            'send_message_btn': 'Send Message',
            'social_intro': 'Also find me on:',
            'footer_text': '&copy; 2025 Abderrahim Es-Sousy — All rights reserved.',
            'form_sending': 'Sending...',
            'form_success': 'Message sent successfully!',
            'form_error': 'An error occurred. Please try again.',
            'form_required': 'All fields are required.',
            'skill_html_desc': 'Web structure and semantics.',
            'skill_css_desc': 'Responsive design and animations.',
            'skill_js_desc': 'Client interactivity and business logic.',
            'skill_php_desc': 'Robust Back-end development.',
            'skill_mysql_desc': 'Database management.',
            'skill_bootstrap_desc': 'Framework for rapid design.',
            'skill_c_cpp_desc': 'Embedded and systems programming.',
            'skill_python_desc': 'Scripting, AI, data.',
            'skill_git_desc': 'Version control and collaboration.',
            'skill_vbnet_desc': 'Desktop and legacy applications.',
            'skill_sqlserver_desc': 'Advanced database management.',
            'skill_linux_desc': 'Development environments.',
            'skill_java_desc': 'Object-oriented programming.',
            'skill_tensorflow_desc': 'Deep Learning framework.',
            'skill_pytorch_desc': 'Deep Learning framework.',
            'skill_nlp_desc': 'Natural Language Processing.',
            'skill_dl_desc': 'Deep neural networks.',
            'skill_ml_desc': 'Machine learning algorithms.',
            'skill_cv_desc': 'Image processing and analysis.',
            'skill_arduino_desc': 'Electronics prototyping.',
            'skill_esp32_desc': 'IoT microcontroller.',
            'skill_raspberry_desc': 'Single-board computer.',
            'skill_iot_desc': 'Internet of Things.',
            'skill_hadoop_desc': 'Big Data ecosystem.'
        },
        'ar': {
            'page_title': 'بورتفوليو عبد الرحيم - مطور ذكاء اصطناعي وويب',
            'meta_description': 'بورتفوليو احترافي لعبد الرحيم السوسي، طالب ماستر في الذكاء الاصطناعي، متخصص في الذكاء الاصطناعي، تعلم الآلة، التعلم العميق، معالجة اللغات الطبيعية، تطوير الويب والأنظمة المدمجة.',
            'meta_keywords': 'عبد الرحيم السوسي, ذكاء اصطناعي, تعلم الآلة, تعلم عميق, معالجة اللغات الطبيعية, مطور ويب, أنظمة مدمجة, إنترنت الأشياء, بورتفوليو, المغرب, الداخلة',
            'nav_home': 'الرئيسية', 'nav_about': 'عني', 'nav_skills': 'المهارات', 'nav_timeline': 'المسار', 'nav_projects': 'المشاريع', 'nav_contact': 'اتصل بي',
            'discover_projects_btn': 'اكتشف مشاريعي',
            'about_title': 'نبذة عني',
            'about_description': 'طالب في السنة الثانية من ماستر الذكاء الاصطناعي، مع تكوين متين في مجال تكنولوجيا المعلومات وتطوير الحلول المعلوماتية. بمنهجية صارمة وموجهة نحو حل المشكلات، أنا قادر على تحليل الاحتياجات، وتصميم الحلول المناسبة والمساهمة بفعالية في تحقيق المشاريع التكنولوجية.',
            'skills_title': 'مهاراتي',
            'skills_intro': 'تتوزع خبرتي على عدة مجالات رئيسية: الذكاء الاصطناعي، تطوير الويب، الأنظمة المدمجة وإنترنت الأشياء، حيث أجمع بين الإتقان التقني والمهارات الأساسية الضرورية لنجاح أي مشروع.',
            'detailed_skills_btn': 'المهارات التقنية المفصلة',
            'cv_title': 'سيرتي الذاتية', 'cv_description': 'اكتشف مساري، خبراتي، وتكويني بالتفصيل.', 'download_cv_btn': 'تحميل السيرة الذاتية',
            'timeline_title': 'مساري الدراسي والمهني',
            'timeline_master_title': 'ماستر في الذكاء الاصطناعي (قيد الإنجاز)',
            'timeline_master_date': '2025 – 2027',
            'timeline_master_school': 'كلية العلوم السملالية – جامعة القاضي عياض، مراكش',
            'timeline_master_desc': 'تكوين متقدم في الذكاء الاصطناعي يغطي تعلم الآلة، التعلم العميق، معالجة اللغات الطبيعية، رؤية الكمبيوتر، تحليل البيانات والأنظمة الذكية. تطوير مشاريع تطبيقية باستخدام Python, TensorFlow, PyTorch.',
            'timeline_diploma_title': 'الإجازة المهنية في الأنظمة المعلوماتية المدمجة',
            'timeline_diploma_date': '2024 – 2025',
            'timeline_diploma_school': 'المدرسة العليا للتكنولوجيا – الداخلة',
            'timeline_diploma_desc': 'تكوين متخصص في تصميم وتطوير وتحسين الأنظمة المدمجة. اكتساب مهارات في البرمجة منخفضة المستوى (C، لغة التجميع)، المتحكمات الدقيقة (PIC، ESP32، Arduino)، الأنظمة الزمنية الحقيقية، لينكس المدمج، إنترنت الأشياء، وتطوير حلول ذكية تعتمد على المستشعرات والواجهات وبروتوكولات الاتصال.',
            'timeline_bts_title': 'شهادة التقني العالي في تطوير نظم المعلومات',
            'timeline_bts_date': '2022 – 2024',
            'timeline_bts_school': 'ثانوية لالة خديجة التأهيلية – الداخلة',
            'timeline_bts_desc': 'تكوين يركز على تطوير تطبيقات الحاسوب للويب، الهاتف المحمول والمكاتب. إتقان لغات البرمجة (Java, PHP, JavaScript, VB.NET)، قواعد البيانات (MySQL, SQL Server)، وأدوات التصميم (UML, Merise). تطوير مشاريع كاملة، من تحليل الاحتياجات إلى النشر.',
            'timeline_bac_title': 'البكالوريا العلمية – علوم الحياة والأرض',
            'timeline_bac_date': '2021 – 2022',
            'timeline_bac_school': 'ثانوية الفتح – الداخلة',
            'timeline_bac_desc': 'تكوين علمي عام مع التركيز على البيولوجيا، الجيولوجيا، الفيزياء والرياضيات. تطوير التفكير التحليلي، الدقة العلمية والمهارات العرضية المفيدة للتعليم العالي في المجالات العلمية والتكنولوجية.',
            'projects_title': 'مشاريعي',
            'filter_all': 'الكل', 'filter_web': 'الويب', 'filter_embedded': 'الأنظمة المدمجة', 'filter_IA': 'الذكاء الاصطناعي',
            'project_stage_title': 'منصة الشكايات – الداخلة',
            'project_stage_desc': 'تم إنجاز هذا المشروع في إطار تدريبي بمندوبية الشغل بالداخلة. وهو تطبيق ويب يهدف إلى استبدال الإجراءات التقليدية الورقية، مما يسمح للموظفين بتقديم الشكايات عبر الإنترنت ومتابعة حالتها.',
            'project_gestion_title': 'واجهة ويب – منصة بث أفلام',
            'project_gestion_desc': 'هذا المشروع هو نموذج واجهة أمامية لمنصة أفلام، مصمم لعرض ملصقات الأفلام بطريقة جذابة بصرياً مع رسوم متحركة وتصميم متجاوب.',
            'project_login_title': 'متجر إلكتروني – لبيع المنتجات عبر الإنترنت',
            'project_login_desc': 'هذا المشروع عبارة عن متجر إلكتروني قمت بتطويره لبيع منتجاتي الخاصة. إنها منصة تجارة إلكترونية كاملة مع إدارة سلة التسوق والدفع والإدارة.',
            'project_heart_title': 'جهاز مراقبة معدل نبضات القلب',
            'project_heart_desc': 'يتكون هذا المشروع من إنشاء جهاز صحي متصل يعتمد على الأردوينو لقياس معدل نبضات القلب وعرض البيانات على شاشة LCD.',
            'project_gas_title': 'نظام كشف تسرب الغاز - أردوينو',
            'project_gas_desc': 'يهدف هذا المشروع إلى تطوير نظام أمان منزلي ذكي قادر على كشف تسربات الغاز وإرسال تنبيهات عبر جرس إنذار وإشعار.',
            'project_irrigation_title': 'نظام ري شمسي ذكي',
            'project_irrigation_desc': 'هذا المشروع هو نظام سقي أوتوماتيكي ذكي يستخدم مستشعر الرطوبة لتحسين استهلاك المياه، ويعمل بالطاقة الشمسية.',
            'project_recommendation_title': 'نظام ذكي لتوصية الأفلام والمسلسلات',
            'project_recommendation_desc': 'تطوير تطبيق ويب يدمج محرك استدلال بلغة برولوج لتوليد توصيات مخصصة للأفلام والمسلسلات بناءً على تفضيلات المستخدم.',
            'project_prediction_title': 'نظام توقع نتائج مباريات المنتخب المغربي',
            'project_prediction_desc': 'تطبيق ويب مطور بإطار Flask يدمج نموذج تعلم آلة للتنبؤ بنتائج مباريات المنتخب المغربي من البيانات التاريخية.',
            'project_sign_lang_title': 'نظام ذكي للتعرف على لغة الإشارة',
            'project_sign_lang_desc': 'نظام مضمن قائم على ESP32-CAM يستخدم نموذج CNN للتعرف على حروف لغة الإشارة، مع تطبيق ويب Flask لتجميع الحروف في كلمات.',
            'project_nutrition_title': 'نظام ذكي مساعد غذائي',
            'project_nutrition_desc': 'تطوير تطبيق قائم على الذكاء الاصطناعي يتعرف على الأطعمة المغربية المكتوبة بالفرنسية والدارجة، يستخرج الكميات الغذائية ويقدر السعرات الحرارية باستخدام تقنيات معالجة اللغات الطبيعية. يدمج النظام إدخالاً صوتياً ويوفر لوحة تحكم لتتبع البيانات الغذائية يومياً وأسبوعياً وشهرياً وسنوياً.',
            'project_chatbot_title': 'روبوت محادثة لمحاكاة المريضات ومقيّم ذكاء اصطناعي',
            'project_chatbot_desc': 'تطوير روبوت محادثة يسمح لطلاب الطب بمحاكاة الاستشارات مع مريضات افتراضيات وفق سيناريوهات سريرية مختلفة. دمج مقيّم ذكاء اصطناعي قادر على تحليل المحادثات، ومنح نقاط وفق شبكة تقييم، وتوليد تغذية راجعة مخصصة بالفرنسية والدارجة. تطوير واجهة برمجية لإدارة السيناريوهات والمحادثات والنتائج.',
            'view_details_btn': 'عرض التفاصيل', 'modal_tech_title': 'التقنيات المستخدمة:', 'modal_demo_btn': 'مشاهدة العرض', 'modal_github_btn': 'الكود المصدري',
            'cv_preview_title': 'معاينة السيرة الذاتية', 'detailed_skills_modal_title': 'المهارات التقنية المتقدمة',
            'skill_cat_web_title': 'البرمجة والتطوير',
            'skill_cat_db_title': 'قواعد البيانات والنمذجة',
            'skill_cat_embedded_title': 'الأنظمة المدمجة وإنترنت الأشياء',
            'skill_cat_network_title': 'الأنظمة، الشبكات والذكاء الاصطناعي',
            'skill_cat_tools_title': 'الأدوات والتصميم',
            'skill_cat_ai_title': 'الذكاء الاصطناعي وعلوم البيانات',
            'skill_cat_bigdata_title': 'البيانات الضخمة',
            'modal_close_btn': 'إغلاق',
            'contact_title': 'اتصل بي',
            'contact_intro': 'أنا دائماً منفتح على الفرص الجديدة، والتعاون المحفز، والنقاشات المثيرة. لا تتردد في الاتصال بي إذا كان لديك مشروع في ذهنك، أو سؤال، أو إذا كنت ترغب في معرفة المزيد عن عملي.',
            'contact_name_placeholder': 'اسمك الكامل',
            'contact_email_placeholder': 'بريدك الإلكتروني',
            'contact_message_placeholder': 'رسالتك...',
            'send_message_btn': 'إرسال الرسالة',
            'social_intro': 'تجدني أيضًا على:',
            'footer_text': '&copy; 2025 عبد الرحيم السوسي — جميع الحقوق محفوظة.',
            'form_sending': 'جاري الإرسال...',
            'form_success': 'تم إرسال الرسالة بنجاح!',
            'form_error': 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.',
            'form_required': 'جميع الحقول مطلوبة.',
            'skill_html_desc': 'هيكل الويب ودلالاته.',
            'skill_css_desc': 'تصميم متجاوب ورسوم متحركة.',
            'skill_js_desc': 'تفاعل العميل ومنطق الأعمال.',
            'skill_php_desc': 'تطوير خلفي قوي.',
            'skill_mysql_desc': 'إدارة قواعد البيانات.',
            'skill_bootstrap_desc': 'إطار عمل للتصميم السريع.',
            'skill_c_cpp_desc': 'البرمجة المدمجة والأنظمة.',
            'skill_python_desc': 'البرمجة النصية، الذكاء الاصطناعي، البيانات.',
            'skill_git_desc': 'التحكم في الإصدار والتعاون.',
            'skill_vbnet_desc': 'تطبيقات سطح المكتب.',
            'skill_sqlserver_desc': 'إدارة قواعد البيانات المتقدمة.',
            'skill_linux_desc': 'بيئات التطوير.',
            'skill_java_desc': 'البرمجة كائنية التوجه.',
            'skill_tensorflow_desc': 'إطار التعلم العميق.',
            'skill_pytorch_desc': 'إطار التعلم العميق.',
            'skill_nlp_desc': 'معالجة اللغات الطبيعية.',
            'skill_dl_desc': 'الشبكات العصبية العميقة.',
            'skill_ml_desc': 'خوارزميات تعلم الآلة.',
            'skill_cv_desc': 'معالجة وتحليل الصور.',
            'skill_arduino_desc': 'النماذج الإلكترونية.',
            'skill_esp32_desc': 'متحكم إنترنت الأشياء.',
            'skill_raspberry_desc': 'حاسوب أحادي اللوحة.',
            'skill_iot_desc': 'إنترنت الأشياء.',
            'skill_hadoop_desc': 'نظام البيانات الضخمة.'
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
        },
        "projet-recommandation": {
            title_key: "project_recommendation_title",
            galleryImages: ["img/prolog/1.png", "img/prolog/2.png","img/prolog/3.png","img/prolog/4.png","img/prolog/5.png","img/prolog/6.png","img/prolog/7.png"],
            description_key: "project_recommendation_desc",
            technologies: ["html5", "css3", "javascript", "python"],
            live_demo: "#", github_repo: "#"
        },
        "projet-prediction-maroc": {
            title_key: "project_prediction_title",
            galleryImages: ["img/maroc/1.png", "img/maroc/2.png"],
            description_key: "project_prediction_desc",
            technologies: ["html5", "css3", "javascript", "python"],
            live_demo: "#", github_repo: "#"
        },
        "projet-sign-language": {
            title_key: "project_sign_lang_title",
            galleryImages: ["img/sign/1.jpg"],
            description_key: "project_sign_lang_desc",
            technologies: ["html5", "css3", "javascript", "python", "c_cpp", "arduino"],
            live_demo: "#", github_repo: "#"
        },
        "projet-nutrition": {
            title_key: "project_nutrition_title",
            galleryImages: ["img/nutrition/1.png", "img/nutrition/2.png","img/nutrition/3.png","img/nutrition/4.png","img/nutrition/5.png","img/nutrition/6.png"],
            description_key: "project_nutrition_desc",
            technologies: ["html5", "css3", "javascript", "python"],
            live_demo: "#", github_repo: "#"
        },
        "projet-chatbot-medical": {
            title_key: "project_chatbot_title",
            galleryImages: ["img/chatbot/one.png", "img/chatbot/two.png", "img/chatbot/troi.png", "img/chatbot/4.png"],
            description_key: "project_chatbot_desc",
            technologies: ["python", "javascript", "html5", "css3", "tensorflow", "nlp"],
            live_demo: "#", github_repo: "#"
        },
    };

    const technologyIcons = {
        "html5": '<i class="fab fa-html5 tech-icon" title="HTML5"></i>',
        "css3": '<i class="fab fa-css3-alt tech-icon" title="CSS3"></i>',
        "javascript": '<i class="fab fa-js tech-icon" title="JavaScript"></i>',
        "php": '<i class="fab fa-php tech-icon" title="PHP"></i>',
        "mysql": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" class="tech-icon svg-icon" alt="MySQL" title="MySQL">',
        "bootstrap": '<i class="fab fa-bootstrap tech-icon" title="Bootstrap"></i>',
        "c_cpp": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" class="tech-icon svg-icon" alt="C/C++" title="C/C++">',
        "vbnet": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-plain-wordmark.svg" class="tech-icon svg-icon" alt="VB.NET" title="VB.NET">',
        "sqlserver": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain-wordmark.svg" class="tech-icon svg-icon" alt="SQL Server" title="SQL Server">',
        "python": '<i class="fab fa-python tech-icon" title="Python"></i>',
        "linux": '<i class="fab fa-linux tech-icon" title="Linux"></i>',
        "git_github": '<i class="fab fa-github tech-icon" title="Git / GitHub"></i>',
        "arduino": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original-wordmark.svg" class="tech-icon svg-icon" alt="Arduino" title="Arduino">',
        "java": '<i class="fab fa-java tech-icon" title="Java"></i>',
        "tensorflow": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" class="tech-icon svg-icon" alt="TensorFlow" title="TensorFlow">',
        "pytorch": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" class="tech-icon svg-icon" alt="PyTorch" title="PyTorch">',
        "numpy": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" class="tech-icon svg-icon" alt="NumPy" title="NumPy">',
        "pandas": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" class="tech-icon svg-icon" alt="Pandas" title="Pandas">',
        "opencv": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" class="tech-icon svg-icon" alt="OpenCV" title="OpenCV">',
        "raspberry": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" class="tech-icon svg-icon" alt="Raspberry Pi" title="Raspberry Pi">',
        "esp32": '<i class="fas fa-microchip tech-icon" title="ESP32"></i>',
        "hadoop": '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg" class="tech-icon svg-icon" alt="Hadoop" title="Hadoop">',
        "prolog": '<i class="fas fa-code tech-icon" title="Prolog"></i>',
        "uml": '<i class="fas fa-project-diagram tech-icon" title="UML"></i>',
        "linux_tools": '<i class="fab fa-linux tech-icon" title="Linux"></i>',
        "photoshop": '<i class="fas fa-paint-brush tech-icon" title="Photoshop"></i>',
        "premiere": '<i class="fas fa-video tech-icon" title="Adobe Premiere Pro"></i>',
        "proteus": '<i class="fas fa-microchip tech-icon" title="Proteus"></i>',
        "vscode": '<i class="fas fa-code tech-icon" title="VS Code"></i>',
        "nlp": '<i class="fas fa-language tech-icon" title="NLP"></i>'
    };

    const technicalSkills = [
        { name: "Python", iconKey: "python", description_key: "skill_python_desc" },
        { name: "Java", iconKey: "java", description_key: "skill_java_desc" },
        { name: "JavaScript", iconKey: "javascript", description_key: "skill_js_desc" },
        { name: "PHP", iconKey: "php", description_key: "skill_php_desc" },
        { name: "C / C++", iconKey: "c_cpp", description_key: "skill_c_cpp_desc" },
        { name: "HTML5", iconKey: "html5", description_key: "skill_html_desc" },
        { name: "CSS3", iconKey: "css3", description_key: "skill_css_desc" },
        { name: "VB.NET", iconKey: "vbnet", description_key: "skill_vbnet_desc" },
        { name: "TensorFlow", iconKey: "tensorflow", description_key: "skill_tensorflow_desc" },
        { name: "PyTorch", iconKey: "pytorch", description_key: "skill_pytorch_desc" },
        { name: "NLP", iconKey: "python", description_key: "skill_nlp_desc" },
        { name: "Deep Learning", iconKey: "tensorflow", description_key: "skill_dl_desc" },
        { name: "Machine Learning", iconKey: "python", description_key: "skill_ml_desc" },
        { name: "Computer Vision", iconKey: "opencv", description_key: "skill_cv_desc" },
        { name: "MySQL", iconKey: "mysql", description_key: "skill_mysql_desc" },
        { name: "SQL", iconKey: "sqlserver", description_key: "skill_sqlserver_desc" },
        { name: "Arduino", iconKey: "arduino", description_key: "skill_arduino_desc" },
        { name: "ESP32", iconKey: "esp32", description_key: "skill_esp32_desc" },
        { name: "Raspberry Pi", iconKey: "raspberry", description_key: "skill_raspberry_desc" },
        { name: "IoT", iconKey: "esp32", description_key: "skill_iot_desc" },
        { name: "Hadoop", iconKey: "hadoop", description_key: "skill_hadoop_desc" },
        { name: "Prolog", iconKey: "prolog", description_key: "skill_ml_desc" },
        { name: "UML", iconKey: "uml", description_key: "skill_ml_desc" },
        { name: "Linux", iconKey: "linux", description_key: "skill_linux_desc" }
    ];

    /* ============================================
       APPLY TRANSLATIONS
       ============================================ */
    function applyTranslations(lang) {
        if (!translations[lang]) {
            console.warn(`Translation for language '${lang}' not found.`);
            return;
        }

        root.lang = lang;
        root.dir = lang === 'ar' ? 'rtl' : 'ltr';
        body.classList.toggle('rtl', lang === 'ar');

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

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Typed.js — safe destroy
        const typedStrings = {
            fr: ["Étudiant en Master IA", "Développeur Web Full Stack", "Spécialiste Systèmes Embarqués", "Passionné de Deep Learning & NLP"],
            en: ["Master's Student in AI", "Full Stack Web Developer", "Embedded Systems Specialist", "Deep Learning & NLP Enthusiast"],
            ar: ["طالب ماستر في الذكاء الاصطناعي", "مطور ويب متكامل", "متخصص في الأنظمة المدمجة", "شغوف بالتعلم العميق ومعالجة اللغات"]
        };
        const typedTextElement = document.querySelector('.typed-text');
        if (typedTextElement) {
            if (typedInstance) {
                try { typedInstance.destroy(); } catch (e) { /* ignore */ }
                typedInstance = null;
            }
            if (typeof Typed !== 'undefined') {
                typedInstance = new Typed('.typed-text', {
                    strings: typedStrings[lang],
                    typeSpeed: 60,
                    backSpeed: 30,
                    loop: true,
                    showCursor: false,
                    cursorChar: '|'
                });
            }
        }

        // Skill card descriptions
        document.querySelectorAll('.skill-card').forEach(card => {
            const skillNameElement = card.querySelector('h4');
            const skillDescElement = card.querySelector('p');
            if (!skillNameElement || !skillDescElement) return;

            const skillName = skillNameElement.textContent.trim();
            const skillData = technicalSkills.find(s => s.name === skillName);
            if (skillData && translations[lang] && translations[lang][skillData.description_key]) {
                skillDescElement.textContent = translations[lang][skillData.description_key];
            }
        });

        // Language buttons active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        localStorage.setItem('selectedLanguage', lang);

        // Refresh ScrollTrigger on language change
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => ScrollTrigger.refresh(), 300);
        }
    }

    /* ============================================
       INIT AOS
       ============================================ */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        });
    }

    /* ============================================
       BUILD SKILLS GRID
       ============================================ */
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid && skillsGrid.children.length === 0) {
        technicalSkills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.setAttribute('data-aos', 'zoom-in');
            skillCard.setAttribute('data-aos-delay', (index % 6) * 100);
            skillCard.innerHTML = `
                <div class="skill-icon">${technologyIcons[skill.iconKey] || ''}</div>
                <h4>${skill.name}</h4>
                <p></p>`;
            skillsGrid.appendChild(skillCard);
        });
    }

    /* ============================================
       SCROLL PROGRESS BAR
       ============================================ */
    const scrollProgressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        if (scrollProgressBar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgressBar.style.width = scrollPercentage + '%';
        }
    }, { passive: true });

    /* ============================================
       SIDE NAV
       ============================================ */
    const sideNav = document.getElementById('sideNav');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);

    function toggleSideNav(open) {
        if (sideNav) {
            sideNav.classList.toggle('open', open);
            overlay.classList.toggle('active', open);
            body.style.overflow = open ? 'hidden' : '';
        }
    }

    hamburgerBtn?.addEventListener('click', () => toggleSideNav(true));
    closeBtn?.addEventListener('click', () => toggleSideNav(false));
    overlay.addEventListener('click', () => toggleSideNav(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleSideNav(false);
            themeSwitcher?.classList.remove('active');
        }
    });

    /* ============================================
       DARK MODE
       ============================================ */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    function setDarkMode(isDark) {
        body.classList.toggle('dark-mode', isDark);
        body.classList.toggle('light-mode', !isDark);
        if (darkModeIcon) {
            darkModeIcon.className = `fas ${isDark ? 'fa-moon' : 'fa-sun'}`;
        }
        if (darkModeToggle) {
            darkModeToggle.checked = isDark;
            darkModeToggle.setAttribute('aria-checked', String(isDark));
        }
        localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
    }
    darkModeToggle?.addEventListener('change', () => setDarkMode(darkModeToggle.checked));

    /* ============================================
       THEME COLOR SWITCHER
       ============================================ */
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');

    themeToggleBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        themeSwitcher?.classList.toggle('active');
    });

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.themeColor;
            root.style.setProperty('--red-primary', color);
            localStorage.setItem('themeColor', color);

            document.querySelector('.theme-option.active')?.classList.remove('active');
            option.classList.add('active');

            // Update particles safely
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const pJS = window.pJSDom[0].pJS;
                try {
                    if (pJS.particles && pJS.particles.color) pJS.particles.color.value = color;
                    if (pJS.particles && pJS.particles.line_linked) pJS.particles.line_linked.color = color;
                    if (pJS.fn && pJS.fn.particlesRefresh) pJS.fn.particlesRefresh();
                } catch (e) { /* ignore */ }
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (themeSwitcher && !themeSwitcher.contains(e.target) && !themeToggleBtn?.contains(e.target)) {
            themeSwitcher.classList.remove('active');
        }
    });

    /* ============================================
       LANGUAGE BUTTONS
       ============================================ */
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => applyTranslations(button.dataset.lang));
    });

    /* ============================================
       SMOOTH SCROLL
       ============================================ */
    document.querySelectorAll('.side-nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                targetElement?.scrollIntoView({ behavior: 'smooth' });
            }
            toggleSideNav(false);
        });
    });

    /* ============================================
       ACTIVE SECTION HIGHLIGHT
       ============================================ */
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.side-nav-links .nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (section.offsetTop <= window.pageYOffset + 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href')?.includes(current));
        });
    }, { passive: true });

    /* ============================================
       PROJECT DETAIL MODAL
       ============================================ */
    const projectDetailModalElement = document.getElementById('projectDetailModal');
    let projectDetailModal;

    if (projectDetailModalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        projectDetailModal = new bootstrap.Modal(projectDetailModalElement);
    }

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            const project = projectsData[projectId];

            if (!project || !projectDetailModalElement || !projectDetailModal) {
                console.warn(`Project with ID "${projectId}" not found, or modal elements are missing.`);
                return;
            }

            const currentLang = localStorage.getItem('selectedLanguage') || 'fr';

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
                swiperWrapper.innerHTML = project.galleryImages.map(imgSrc => {
                    const isVideo = imgSrc.endsWith('.mp4');
                    if (isVideo) {
                        return `<div class="swiper-slide"><video controls class="img-fluid rounded"><source src="${imgSrc}" type="video/mp4"></video></div>`;
                    } else {
                        return `<div class="swiper-slide"><img src="${imgSrc}" alt="${translations[currentLang][project.title_key]}" class="img-fluid rounded"></div>`;
                    }
                }).join('');
            }

            projectDetailModal.show();
        });
    });

    projectDetailModalElement?.addEventListener('shown.bs.modal', function () {
        if (mySwiper) {
            try { mySwiper.destroy(true, true); } catch (e) { /* ignore */ }
            mySwiper = null;
        }
        const projectCarousel = document.querySelector('#projectDetailModal .project-carousel');
        if (projectCarousel && typeof Swiper !== 'undefined') {
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

    projectDetailModalElement?.addEventListener('hidden.bs.modal', function () {
        if (mySwiper) {
            try { mySwiper.destroy(true, true); } catch (e) { /* ignore */ }
            mySwiper = null;
        }
    });

    /* ============================================
       CONTACT FORM
       ============================================ */
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    form?.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nameInput = this.querySelector('[name="name"]');
        const emailInput = this.querySelector('[name="email"]');
        const messageInput = this.querySelector('[name="message"]');
        const currentLang = localStorage.getItem('selectedLanguage') || 'fr';

        if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
            if (result) {
                result.innerHTML = `<span class="text-danger">${translations[currentLang]['form_required']}</span>`;
                result.style.display = 'block';
                setTimeout(() => { result.style.display = 'none'; }, 5000);
            }
            return;
        }

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

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
            if (result) {
                if (res.success) {
                    result.innerHTML = `<span class="text-success">${translations[currentLang]['form_success']}</span>`;
                    form.reset();
                } else {
                    result.innerHTML = `<span class="text-danger">${res.message || translations[currentLang]['form_error']}</span>`;
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            if (result) {
                result.innerHTML = `<span class="text-danger">${translations[currentLang]['form_error']}</span>`;
            }
        } finally {
            if (result) {
                setTimeout(() => { result.style.display = 'none'; }, 5000);
            }
        }
    });

    /* ============================================
       PROJECT FILTERS (Fixed GSAP animation)
       ============================================ */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            projectItems.forEach(item => {
                const matches = filter === 'all' || item.dataset.category === filter;

                if (matches) {
                    item.style.display = 'flex';
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(item,
                            { opacity: 0, y: 30, scale: 0.95 },
                            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'scale' }
                        );
                    }
                } else {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(item, {
                            opacity: 0, y: -20, scale: 0.95, duration: 0.3, ease: 'power2.in',
                            onComplete: () => { item.style.display = 'none'; }
                        });
                    } else {
                        item.style.display = 'none';
                    }
                }
            });

            if (typeof ScrollTrigger !== 'undefined') {
                setTimeout(() => ScrollTrigger.refresh(), 500);
            }
        });
    });

    /* ============================================
       BACK TO TOP
       ============================================ */
    const backToTopBtn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', () => {
        backToTopBtn?.classList.toggle('show', window.pageYOffset > 300);
    }, { passive: true });
    backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ============================================
       INITIALIZE THEME COLOR
       ============================================ */
    const savedColor = localStorage.getItem('themeColor') || '#C2002E';
    root.style.setProperty('--red-primary', savedColor);
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.themeColor === savedColor);
    });

    /* ============================================
       INITIALIZE DARK MODE
       ============================================ */
    const savedTheme = localStorage.getItem('themeMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    /* ============================================
       INITIALIZE PARTICLES
       ============================================ */
    const particlesJsDiv = document.getElementById('particles-js');
    if (window.particlesJS && particlesJsDiv) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: savedColor },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: savedColor, opacity: 0.4, width: 1 },
                move: { enable: true, speed: 4, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { grab: { distance: 180, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    /* ============================================
       INITIAL LANGUAGE
       ============================================ */
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    applyTranslations(savedLanguage);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === savedLanguage);
    });

    /* ============================================
       TIMELINE ANIMATIONS (RTL aware)
       ============================================ */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const isRTL = document.documentElement.dir === 'rtl';
        document.querySelectorAll('.timeline-item').forEach((item) => {
            const isLeft = item.classList.contains('left');
            let xOffset = isLeft ? -60 : 60;
            if (isRTL) xOffset = -xOffset;

            gsap.fromTo(item,
                { opacity: 0, y: 50, x: xOffset },
                {
                    opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Refresh ScrollTrigger after fonts/images load
        window.addEventListener('load', () => setTimeout(() => ScrollTrigger.refresh(), 200));
    }
});
