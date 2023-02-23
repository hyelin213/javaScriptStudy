(function(){

    'use strict';

    const $swiperWrapper = document.querySelector('.swiper-wrapper');

    function getData(){
        const url = 'https://picsum.photos/v2/list?limit=10';
        
        fetch(url)
        .then(res => res.json())
        .then(makeList);
    }

    function makeList(res){
        res.forEach(makeItem);

        const swiper = new Swiper('.swiper', {
            // direction: 'vertical', // default: horizontal
            // loop: true,
    
            pagination: { el: '.swiper-pagination', }, // 아래에 생기는 동그라미
    
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
    
            scrollbar: { el: '.swiper-scrollbar', },
        });
    }

    function makeItem(item){
        const div =document.createElement('div');
        $swiperWrapper.appendChild(div);

        div.className = 'swiper-slide';

        const width = parseInt(item.width * 0.1);
        const height = parseInt(item.height * 0.1);
        const imgSrc = `https://picsum.photos/id/${item.id}/${width}/${height}`;
        div.innerHTML = `
            <img src="${imgSrc}" alt="${item.author}">
        `;
    }

    getData();

})();