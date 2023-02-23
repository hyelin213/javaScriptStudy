(function () {
    'use strict';

    const swiper = new Swiper('.swiper', {
        // direction: 'vertical', // default: horizontal
        loop: true,

        pagination: { el: '.swiper-pagination', }, // 아래에 생기는 동그라미

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: { el: '.swiper-scrollbar', },
    });

    

})();