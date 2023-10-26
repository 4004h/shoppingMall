let user = [{
    id   : "abcd",
    pwd  : "a1234",
    name : "홍길동",
    mail : "홍길동@mail.com",
    Phone: "010-1234-5678"
}]


$(document).ready(function () {
    








})

function passwordvft() {

    if(password())
    {
        let vft = $("#pwdvft").val()

        if(vft === $("#userPwd").val())
        {
            $("#pwdvft ~ p").removeClass('vft')
        }
        else
        {
            $("#pwdvft ~ p").addClass('vft')
        }
    }

}

function password() {
    let pwd = $("#userPwd").val()
    let regExp = /^(?!((?:[A-Za-z]+)|(?:[0-9~!@#$%^&*()_+=]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;

    if(!regExp.test(pwd))
    {
        $("#userPwd ~ p").addClass('pwd')
    }
    else
    {
        $("#userPwd ~ p").removeClass('pwd')
    }

    return regExp.test(pwd);

}


// console.log(user.find(itme => itme.id == "abcd"))
function idOverlap() {
    let id = $("#userId").val()

    if(user.find(itme => itme.id == id))
    {
        $("#userId ~ p").addClass('overlap')
    }
    else
    {
        $("#userId ~ p").removeClass('overlap')
    }
}


function valid() {
    console.log()
    
    if(!$("#agree1").is(':checked') && !$("#agree2").is(':checked'))
    {
        alert(`회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.`)
        location.href = `#conditions`
        return false;
    }

    
}


function login() {
    location.href = `./login.html`

}











