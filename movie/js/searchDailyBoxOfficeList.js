(function() {

    'use strict';

    // 검색버튼 클릭시 targetDt value값 가져와서 콘솔에 프린트하기

    /*
    const Dt = document.querySelector('#date');
    const targetButton = document.querySelector('#dtButton');

    targetButton.addEventListener('click', () => {
        // if(!Dt.value){
        //     alert('날짜를 선택해 주세요.');
        //     return;
        // } 
        // console.log(Dt.value);
    });
    */

    // =============================Tzone

    const KEY = '542dc4af808bd09b8808b8e5dfb42a69';

    const frmElem = document.querySelector('#searchFrm');
    const dateElem = frmElem.targetDt; // name값으로 가져오기
    const searchBtnElem = frmElem.search;
    const contentsElem = document.querySelector('.main__body ul.listing-card__list');
    const loadingElem = document.querySelector('#loading');

    let isProc = false;

    /*
    window.addEventListener('load', e => {
        const now = new Date(); // 빈 괄호를 넣으면 enter쳤을 때 당시의 일자가 넘어감
        const nowDate = now.toISOString().substring(0, 10);

        dateElem.value = nowDate;
    }); // 현재 날짜로 세팅, 바깥에 두어도 상관없음(js파일이 문서 마지막에 import 중이기 때문)
    // window.~ 보장형으로 작성함

    // window.onload = function(){} => 예전 방식
    */

    //moment.js 라이브러리
    const now = moment();
    dateElem.value = now.add(-1, 'd').format('YYYY-MM-DD');

    /*
    const now = new Date(); 
    now.setDate(now.getDate()-1);
    const nowDate = now.toISOString().substring(0, 10);
    dateElem.value = nowDate;
    */

    searchBtnElem.addEventListener('click', e => {
        if(isProc){ return; }

        const nowDate = new Date().toISOString().substring(0, 10);
        if(nowDate === dateElem.value){
            return alert('오늘은 검색할 수 없습니다.');
        } else if(dateElem.value > nowDate){
            return alert('미래 정보는 검색할 수 없습니다.');
        }

        isProc = true;
        loadingElem.classList.remove('display_none');

        contentsElem.innerHTML = null; // 버튼 누를 때마다 안의 내용을 삭제한다.(쌓이는 것을 방지함)
        const val = dateElem.value.replaceAll('-', ''); // 전수조사, 문자열이기 때문에 사용 가능
        // replace는 원본을 고치는 것이 아니어서 무조건 return을 보낸 결과값을 가져온다.
        console.log(val);

        
        
        const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KEY}&targetDt=${val}`
        // ?: Query string 시작점, 속성=값&속성=값&속성=값 ...
        console.log(url);

        fetch(url) // 통신하고자하는 주소값 넣기(get방식은 이렇게 함)
        .then(res => res.json()) // 무조건 적기 ~.then까지 
        .then(data => {
            isProc = false;
            loadingElem.classList.add('display_none');
            makeList(data);
        })
        /*
        .then(makeList) // 괄호에 바로 함수 걸어도 되고 콜백함수 걸어도 됨
        // 통신의 결과값은 객체로 넘어온다.
        */

        
    });

    function makeList(data){

        // console.log(data);
        // console.log(data.boxOfficeResult.dailyBoxOfficeList);
        data.boxOfficeResult.dailyBoxOfficeList.forEach(makeItem); // 유사 배열이 아닌 찐 배열이어서 forEach 가능

        // if(!data.boxOfficeResult.dailyBoxOfficeList.length){
        //     return alert('박스오피스 정보가 없습니다.');
        // }
       
    }
    /*
    function makeRow(item){
        // console.log(item);
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${item.rank}. ${item.movieNm}</h3>
        `;
        contentsElem.append(div);
    }
    */
    function makeItem(item){
        // console.log(item);
        
        const audiCnt = parseInt(item.audiCnt).toLocaleString('ko-KR');
        const li = document.createElement('li');
        li.className = 'listing-card__item';
        li.innerHTML = `
            <div class="listing-card__info">
                <h1>${item.rank}위</h1>
                <strong class="listing-card__name">${item.movieNm}</strong>
                <p class="listing-card__date">${item.openDt}</p>
                <div class="listing-card__audiCnt">${audiCnt}명</div>
            </div>
        `;
        
        contentsElem.appendChild(li);
    }

})();