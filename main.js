document.addEventListener('DOMContentLoaded', () => {
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
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- LANGUAGE SWITCHER ---
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
        
        proj_1_title: 'Short Film "Red Butterfly"',
        proj_1_desc: "Production, Edit, Sound Design, Color Grading",
        proj_2_title: "Interview",
        proj_2_desc: "Multicam edit, Seamless cuts, Audio processing",
        proj_3_title: 'TV Reportage',
        proj_3_desc: "Broadcast format, Lumetri Color, Sound mixing",
        proj_4_title: "Klip",
        proj_4_desc: "Match cuts, Sound adaptation, Creative Color",
        
        about_name: "MAXIM SHARAPOV",
        about_role: "Video Editor & Colorist",
        about_text: "I specialize in creating cinematic visuals and compelling narratives. With experience in short films, broadcast television, and music videos, I bring a unique perspective to every project. My toolkit includes advanced color grading, dynamic motion graphics, and precise sound design.",
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
            
        proj_1_title: 'К/ф "Красная Бабочка"',
        proj_1_desc: "Продакшн, Монтаж, Саунд-дизайн, Цветокоррекция",
        proj_2_title: "Интервью",
        proj_2_desc: "Мультикамера, Бесшовные склейки, Обработка звука",
        proj_3_title: 'К/ф "Красная Бабочка"',
        proj_3_desc: "Продакшн, Монтаж, Саунд-дизайн, Цветокоррекция",
        proj_4_title: "Интервью",
        proj_4_desc: "Мультикамера, Бесшовные склейки, Обработка звука",
        
        about_name: "МАКСИМ ШАРАПОВ",
        about_role: "Режиссер монтажа и Колорист",
        about_text: "Я специализируюсь на создании кинематографичных видео и захватывающих историй. Имея опыт работы в коротком метре, на телевидении и в музыкальных клипах, я привношу уникальный взгляд в каждый проект. В моем арсенале: продвинутая цветокоррекция, моушн-дизайн и детальный саунд-дизайн.",
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


let currentSlideIndex = 0;
const slides = document.querySelectorAll('.project-slide');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');
        if(video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    const activeSlide = slides[currentSlideIndex];
    activeSlide.classList.add('active');

    const activeVideo = activeSlide.querySelector('video');
    if(activeVideo) {
        activeVideo.play().catch(e => console.log("Autoplay blocked usually needed user interaction first"));
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
});

/* --- THEME SWITCHER --- */
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

    if (isLight) {
        localStorage.setItem('selected-theme', 'light');
    } else {
        localStorage.setItem('selected-theme', 'dark');
    }
});