(function () {

    'use strict';

    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const $contents = document.querySelector('#contents');
    
    var map = null //지도 생성 및 객체 리턴

    const savedJson = localStorage.getItem('item'); // get하면 값의 유무를 console로 체크하기
    const itemObj = JSON.parse(savedJson);

    var geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표간 변환 서비스 객체 생성

    geocoder.addressSearch(itemObj.GNG_CS, (result, status) => { // 결과, 상태
        // (itemObj.GNG_CS(변경하고 싶은 주소값), (result, status)(콜백함수)

        if(status === kakao.maps.services.Status.OK){
            console.log(result);

            const { x, y } = result[0];
            const position = new kakao.maps.LatLng(y, x);

            var options = { //지도를 생성할 때 필요한 기본 옵션
                center: position, //지도의 중심좌표.
                level: 2 //지도의 레벨(확대, 축소 정도)
            };
            map = new kakao.maps.Map(container, options);

            var marker = new kakao.maps.Marker({
                'position': position
            });

            marker.setMap(map);

        }
    });

    const div = document.createElement('div');
    div.innerHTML = `
        <h3>${itemObj.BZ_NM}</h3>
        <div>${itemObj.GNG_CS}</div>
    `;
    $contents.appendChild(div);

})();