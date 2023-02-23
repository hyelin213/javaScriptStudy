/*(function(){
    'use strict';

    const $frm = document.querySelector('#frm');
    console.log($frm.uid);
    // form 태그만 되는 기능. 자식에게 바로 접근할 수 있다.
    // $frm.name명

    $frm.addEventListener('submit', e => {
        // return false;
        e.preventDefault();
    });

})();
*/
/*
    스코프를 이용하여 공간을 나누는 것

    기본 형태()(); => 즉시 실행 함수
     -> (function() {})();
*/

/*

    방법 두 가지

    1. 일단 막는다. e.preventDefault();
    문제가 없었을 때 submit(); 호출한다.

    2. 일단 안 막는다. 문제가 됐을 때 e.preventDefault();
    문제가 없었을 때 submit(); 호출한다.
*/

// 방법 2번 형식

const $frm = document.querySelector('#frm');

// $frm.onsubmit = function () {
//     return chk();
// }

$frm.addEventListener('submit', chk);

function emptyValChk(ele, name){
    if(!ele.value){
        alert(`${name}를(을) 입력해 주세요.`);
        ele.focus(); // 경고문 띄워준 후 해당 자리에 focus
        return true;
    }
    return false;
}

// 이메일 테스트
// const regex2 = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
//     let testEamils = ["testemail.com", "testemail@naver.com", "testemail@daum.net", "testemail@ccc.co.kr", "testemail@ddd.kom"]
//     testEamils.forEach( address => {
//         console.log(regex2.test(address));
//     } );


function chk(e){
    if(
        emptyValChk($frm.uid, '아이디')
        || emptyValChk($frm.upw, '비밀번호')
        || emptyValChk($frm.email, '이메일')
        || emptyValChk($frm.state_msg, '상태메세지')
    ){
        // return false;
        return e.preventDefault(); // return을 적어줘야 해당 코드만 적용됨
    }

    if($frm.upw.value !== $frm.re_upw.value){
        alert('비밀번호를 확인해 주세요.');
        // return false;
        return e.preventDefault();
    }

    const regex = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,8}$/;
    if(!regex.test($frm.email.value)){
        alert('이메일을 확인해 주세요.');
        // return false;
        return e.preventDefault();
    }

    const pwReg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    if(!pwReg.test($frm.upw.value)){
        alert('비밀번호는 문자, 숫자, 특수문자를 포함한 8자리 이상이어야합니다.');
        // return false;
        return e.preventDefault();
    }

    return true;
}

/*
function chk() {
    const uidVal = $frm.uid.value;
    const upwVal = $frm.upw.value;
    const re_upwVal = $frm.re_upw.value;
    const emailVal = $frm.email.value;

    if(!uidVal){
        alert('아이디를 입력해 주세요.');
        return false;
    }
    if(!upwVal){
        alert('비밀번호를 입력해 주세요.');
        return false;
    }
    if(re_upwVal !== upwVal){
        alert('비밀번호를 확인해 주세요.');
        return false;
    }
    if(!emailVal){
        alert('이메일을 입력해 주세요.');
        return false;
    }
    const pwReg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    if(!pwReg.test($frm.upw.value)){
        alert('비밀번호는 문자, 숫자, 특수문자를 포함한 8자리 이상이어야합니다.');
        return false;
    }
    return true;
}
*/