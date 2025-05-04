let scrollToTopBtn = document.querySelector('.scrollToTopBtn');
let docElement = document.documentElement;

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

document.addEventListener('scroll', function () {
    let scrollHeight = docElement.scrollHeight - docElement.clientHeight;
    let scrolled = docElement.scrollTop;

    if (scrolled / scrollHeight > 0.45) {
        scrollToTopBtn.classList.add('showBtn');
    } else {
        scrollToTopBtn.classList.remove('showBtn');
    }
});
