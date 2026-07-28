const faqButton = document.getElementById('faqBtn');
const faqPanel = document.getElementById('faq');
const faqCloseButton = document.getElementById('faqClose');
const faqHeaders = document.querySelectorAll('.js-faq-header');

function closeFaqPanel() {
    faqPanel.classList.remove('active');
    faqButton.style.display = 'block';
}

faqButton.addEventListener('click', function () {
    faqPanel.classList.add('active');
    faqButton.style.display = 'none';
});

faqCloseButton.addEventListener('click', closeFaqPanel);

document.addEventListener('mouseup', function (event) {
    if (
        faqPanel.classList.contains('active') &&
        !faqPanel.contains(event.target) &&
        !faqButton.contains(event.target)
    ) {
        closeFaqPanel();
    }
});

faqHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
        const body = header.nextElementSibling;
        const isOpen = header.classList.contains('active');

        faqHeaders.forEach(function (otherHeader) {
            const otherBody = otherHeader.nextElementSibling;

            otherHeader.classList.remove('active');
            otherBody.classList.remove('active');
            otherBody.style.maxHeight = null;
        });

        if (!isOpen) {
            header.classList.add('active');
            body.classList.add('active');
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
});
