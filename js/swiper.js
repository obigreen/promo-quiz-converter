const swiper = new Swiper('.thumbnails-slider', {
  loop: true, // Циклічний слайдер
  slidesPerView: 3, // Три слайди на екрані
  spaceBetween: 20, // Відстань між слайдами 20px
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  initialSlide: 0,
});

// Міняємо велике фото при зміні слайду
swiper.on('slideChange', function () {
  const activeIndex = swiper.realIndex;
  const newSrc = document.querySelectorAll(
    '.thumbnails-slider .swiper-slide img'
  )[activeIndex].src;
  document.getElementById('main-photo').src = newSrc;
});
