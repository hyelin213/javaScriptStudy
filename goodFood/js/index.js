(function () {
    'use strict';

    const $select = document.querySelector('#gu');
    const $search = document.querySelector('#search');
    const $contentsContainer = document.querySelector('ul.contents_container');
    const paging = document.querySelector('.paging');

    let data = null;
    let page = 1;
    const rowCnt = 20; // 페이지당 아이템 수

    $search.addEventListener('click', e => {

        paging.innerHTML = null;
        
        const val = $select.value;
        const url = `https://www.daegufood.go.kr/kor/api/tasty.html?mode=json&addr=${val}`;
        console.log(url);

        fetch(url)
            .then(res => res.json())
            .then(makeDisplay);

    }); // 검색 이벤트

    function makeDisplay(res) {

        data = res.data; // res: 객체, data: 배열

        const itemLen = data.length;
        console.log(itemLen);

        const maxPage = Math.ceil(itemLen / rowCnt);
        makePaging(maxPage); // maxPage의 결과를 makePaging에 보내줌
        makeList();

        /*
        // res.data.forEach(makeItem);
        res.data.forEach(function(item){
            makeItem(item);
        }); // 위와 같지만 좀 더 유연함
        */
        
    }

    function makeList(){
        $contentsContainer.innerHTML = null;
        
        const sIdx = (page - 1) * rowCnt; // 0
        const eResult = page * rowCnt; // 20

        const eIdx = eResult > data.length ? data.length : eResult;

        for (let i = sIdx; i < eIdx; i++) {
            const item = data[i];
            makeItem(item);
        }
        changeSelected();
    }

    function changeSelected(){ // 선택된 page 클래스 처리
        const pageSpanList = document.querySelectorAll('.page');
        // 전부 선택 후 유사배열을 만든다.(NodeList)

        pageSpanList.forEach(item => {
            // item에는 span 태그가 하나씩 들어온다.
            const innerNum = parseInt(item.textContent);
            // = item.innerHTML /item.innerText 문자열을 정수로 바꾸어 담는다.
            item.classList.toggle('selected', page === innerNum);

            /*
                < toggle 기능 >

                인자가 1개인 경우
                    : true or false

                인자가 2개일 경우
                    : 식의 결과에 따라 true, false가 나온다.
            */
        });
    }

    function makePaging(maxPage) { // 페이징

        for (let i = 1; i <= maxPage; i++) {

            const span = document.createElement('span');
            span.className = 'page pointer';

            span.textContent = i.toString();
            paging.appendChild(span);

            span.addEventListener('click', e => {
                page = i;
                makeList();
                window.scrollTo(0, 0);
            })
            
        }

    }

    function makeItem(item) {
        const $li = document.createElement('li');
        $li.className = 'pointer';
        $contentsContainer.appendChild($li);
        $li.style.listStyle = 'none';

        /*
        const desc = item.SMPL_DESC;
        const idx = desc.indexOf(item.BZ_NM);
        let descResult = desc;

        if(idx >= 0){
            const len = item.BZ_NM.length;
            descResult = desc.slice(0, idx + len)
            + desc.slice(idx + len + 1, desc.length);
        }
        */

        $li.innerHTML = `
            <h3>${item.BZ_NM}</h3>
            <div>종류 : ${item.FD_CS}</div>
            <div>연락처 : ${item.TLNO}</div>
            <div>주소 : ${item.GNG_CS}</div>
            <div>${item.MNU}</div>
            <p>${item.SMPL_DESC.replaceAll(`${item.BZ_NM} `, item.BZ_NM)}</p>
        `;

        $li.addEventListener('click', e => {

            const json = JSON.stringify(item);
            localStorage.setItem('item', json); // localStorage에는 문자열만 저장된다.
            // item을 그대로 넣게되면 안의 내용이 문자열로 바뀌어 [object]로 표시 된다.

            // set이 있으면 get이 있다.

            location.href = `detail.html`; // location.href: 주소값으로 이동시켜주는 코드

        })
    }

})();