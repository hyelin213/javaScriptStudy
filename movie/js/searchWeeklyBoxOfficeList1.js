(function () {

    'use strict';

    const KEY = '542dc4af808bd09b8808b8e5dfb42a69';

    const frmElem = document.querySelector('#searchFrm');
    const dateElem = frmElem.targetDt;
    const searchBtnElem = frmElem.search;
    const mainBodyElem = document.querySelector('.main__body .listing-card__list');
    const loadingElem = document.querySelector('#loading');

    let isProc = false;

    //moment.js 라이브러리
    /*
    const now = moment();
    dateElem.value = now.add(-1, 'd').format('YYYY-MM-DD');
    */

    const maxDate = moment().day(0).format('YYYY-MM-DD');
    dateElem.value = maxDate;
    dateElem.setAttribute('max', maxDate);

    /*
    const date = new Date();
    const day = date.getDay(); // index 값 추출

    date.setDate(date.getDate() - day);
    const nowDate = date.toISOString().substring(0, 10);
    // console.log(nowDate); 

    dateElem.value = nowDate;
    frmElem.targetDt.setAttribute('max', nowDate); // 날짜 비활성화
    */

    searchBtnElem.addEventListener('click', e => { // 검색 버튼

        if (isProc) { return; }
        /*
        정보가 없는 부분 주간격으로 경고문 띄우기

        const nowDate = new Date(new Date().toDateString()); // 시간 빼기
        const nowDay = nowDate.getDay() === 0 ? 7 : nowDate.getDay();
        nowDate.setDate(nowDate.getDate() - nowDay + 1);

        const targetDate = new Date(dateElem.value + ' 00:00:00');
        const targetDay = targetDate.getDay() === 0 ? 7 : targetDate.getDay();
        targetDate.setDate(targetDate.getDate() - targetDay + 1);

        if(nowDate.getTime() === targetDate.getTime()){
            return alert('이번 주 정보는 조회할 수 없습니다.');
        } else if(targetDate.getTime() > nowDate.getTime()){
            return alert('이후 정보는 조회할 수 없습니다.');
        }
        */
        
        isProc = true;

        loadingElem.classList.remove('display_none');

        mainBodyElem.innerHTML = null;
        const val = dateElem.value.replaceAll('-', '');
        const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${KEY}&targetDt=${val}&weekGb=2`;
        console.log(url);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                isProc = false;
                loadingElem.classList.add('display_none');
                makeList(data);
            })

    })

    function makeList(data) {
        data.boxOfficeResult.weeklyBoxOfficeList.forEach(makeItem);
    }

    function makeItem(item) {

        const audiCnt = parseInt(item.audiCnt).toLocaleString('ko-KR');
        const li = document.createElement('li');

        li.className = 'listing-card__item';
        li.innerHTML = `
            <div class="listing-card__info">
                <h1>${item.rank}위</h1>
                <strong class="iisting-card__name">${item.movieNm}</strong>
                <p class="listing-card__date">${item.openDt}</p>
                <div class="listing-card__audiCnt">${audiCnt}명</div>
            </div>
        `;

        mainBodyElem.appendChild(li); // ul > li

    }
})();