const hamburgerMenu = document.querySelector('.hamburger-menu');
const navOverlay = document.querySelector('.nav-overlay');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
});

// オーバーレイをクリックしたときにメニューを閉じる
navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
        hamburgerMenu.classList.remove('active');
        navOverlay.classList.remove('active');
    }
});