const header = document.querySelector('.main-header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        header.classList.remove('header-hidden');
        lastScroll = 0;
        return;
    }
    if (currentScroll > lastScroll && !header.classList.contains('header-hidden')) {
        header.classList.add('header-hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('header-hidden')) {
        header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
});