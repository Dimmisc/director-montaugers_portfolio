document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. HEADER SCROLL LOGIC (Hide/Show)
       ========================================= */
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        

        if (currentScroll <= 0) {
            header.classList.remove('header-hidden');
            return;
        }


        if (currentScroll > lastScroll && !header.classList.contains('header-hidden')) {
            header.classList.add('header-hidden');
        } else if (currentScroll < lastScroll && header.classList.contains('header-hidden')) {
            header.classList.remove('header-hidden');
        }
        lastScroll = currentScroll;
    });

    /* =========================================
       2. SMOOTH SCROLL & NAVIGATION
       ========================================= */
    const navButtons = document.querySelectorAll('.nav-btn, .scroll-trigger');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
    
            if (!targetId) return;

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const contactBtns = document.querySelectorAll('.contact-trigger');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://t.me/Maks_sharp', '_blank');
        });
    });

    /* =========================================
       3. PROJECT SLIDER (VIDEO LOGIC)
       ========================================= */
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    function loadVideo(slide) {
        const video = slide.querySelector('video');
        if (!video) return;


        const sources = video.querySelectorAll('source');
        let sourceChanged = false;

        sources.forEach(source => {
            const dataSrc = source.getAttribute('data-src');
            if (dataSrc && !source.getAttribute('src')) {
                source.setAttribute('src', dataSrc);
                sourceChanged = true;
            }
        });


        if (sourceChanged) {
            video.load();
        }


        video.currentTime = 0;
        video.muted = true
        

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Auto-play prevented by browser. User must interact first.");
            });
        }
    }

    function stopVideo(slide) {
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
    
        }
    }

    function showSlide(index) {

        if (slides[currentSlideIndex]) {
            stopVideo(slides[currentSlideIndex]);
            slides[currentSlideIndex].classList.remove('active');
        }


        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }


        const activeSlide = slides[currentSlideIndex];
        activeSlide.classList.add('active');
        

        loadVideo(activeSlide);
    }

    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
    }
    
    if(slides.length > 0) {
        slides[0].classList.add('active');

        loadVideo(slides[0]);
    }

    /* =========================================
       4. THEME SWITCHER (Light/Dark)
       ========================================= */
    const themeBtn = document.getElementById('themeBtn');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        toggleIcons(true);
    }

    function toggleIcons(isLight) {
        if (isLight) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        toggleIcons(isLight);
        localStorage.setItem('selected-theme', isLight ? 'light' : 'dark');
    });

    /* =========================================
       5. LANGUAGE SWITCHER (EN/RU)
       ========================================= */
    const translations = {
        en: {
            nav_main: "Main",
            nav_projects: "Projects",
            nav_about: "About",
            
            hero_title: "VIDEO EDITING <br>& COLOR GRADING",
            serv_edit_title: "VIDEO EDIT",
            serv_edit_desc: "Includes: edit, sound-design, graphics, motion",
            serv_color_title: "COLOR GRADING",
            serv_color_desc: "Includes: grading, LUTs, DCTL, Relight, TOPAZ",
            
            btn_projects: "VIEW PROJECTS",
            btn_contact: "CONTACT",
            
            sec_works: "SELECTED WORKS",
            
            proj_1_title: "One-shot / Color Grading",
            proj_1_desc: "High-end cinematic grading using DCTL and Dehancer profiles in complex lighting environments.",
            
            proj_2_title: 'Multicam Interview',
            proj_2_desc: "conversational format editing. Using L/J-cuts and multicam techniques to build natural dialogue dynamics.",
            
            proj_3_title: 'TV Reportage for OTR',
            proj_3_desc: "Broadcast editing under tight deadlines. Clear structure, professional rhythm, and precise sound mixing.",
            
            proj_4_title: "Narrative Short (Contest Winner)",
            proj_4_desc: "Creating a compelling story with clear dramaturgy. Focus on rhythm, pacing, and emotional impact.",
            
            btn_watch: "Watch in 4K Quality &rarr;",

            about_name: "MAXIM SHARAPOV",
            about_role: "Video Editor & Colorist",
            about_text: "I specialize in creating cinematic visuals and compelling narratives. With experience in short films and broadcast television, I bring a unique perspective to every project.",
            btn_touch: "GET IN TOUCH"
        },
        ru: {
            nav_main: "Главная",
            nav_projects: "Проекты",
            nav_about: "Обо мне",
            
            hero_title: "ВИДЕОМОНТАЖ <br>И ЦВЕТОКОРРЕКЦИЯ",
            serv_edit_title: "МОНТАЖ",
            serv_edit_desc: "Включает: монтаж, саунд-дизайн, графику, анимацию",
            serv_color_title: "ЦВЕТОКОРРЕКЦИЯ",
            serv_color_desc: "Включает: грейдинг, LUTs, DCTL, Relight, TOPAZ",
            
            btn_projects: "СМОТРЕТЬ РАБОТЫ",
            btn_contact: "СВЯЗАТЬСЯ",
            
            sec_works: "ИЗБРАННЫЕ РАБОТЫ",
                
            proj_1_title: "One-shot / Цветокоррекция",
            proj_1_desc: "Кинематографичный грейдинг с использованием DCTL и Dehancer в сложной световой среде.",

            proj_2_title:'Мультикамерное интервью',
            proj_2_desc: "Сборка разговорного формата. Использование L/J-cuts и выстраивание живой динамики.",

            proj_3_title: 'Репортаж для телеканала ОТР',
            proj_3_desc: "Эфирный монтаж под жесткий дедлайн. Четкая структура, ритм и работа со звуком.",
            
            proj_4_title: "Сюжетный ролик (Победитель конкурса)",
            proj_4_desc: "Создание цельной истории с ясной драматургией. Акцент на ритме и эмоциях.",

            btn_watch: "Смотреть в 4K качестве &rarr;",

            about_name: "МАКСИМ ШАРАПОВ",
            about_role: "Режиссер монтажа и Колорист",
            about_text: "Я специализируюсь на создании кинематографичных видео и захватывающих историй. Имея опыт работы в коротком метре и на телевидении, я привношу уникальный взгляд в каждый проект.",
            btn_touch: "НАПИСАТЬ МНЕ"
        }
    };

    const langBtn = document.getElementById('langBtn');
    let currentLang = 'en';

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ru' : 'en';
        langBtn.textContent = currentLang.toUpperCase();
        
        const elements = document.querySelectorAll('[data-lang]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
    });

});