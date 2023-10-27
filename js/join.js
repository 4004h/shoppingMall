let user = [{
    id   : "abcd",
    pwd  : "abcd1234",
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
            return true;
        }
        else
        {
            $("#pwdvft ~ p").addClass('vft')
            return false;
        }
    }
    else
    {
        return false;
    }

}

function password() {
    let pwd = $("#userPwd").val()
    if(pwd == '') return false;
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

function phon() {
    let phonNum = $(".phoneNum")
    let check = /^[0-9]{4,}$/; 

    if(check.test(parseInt(phonNum.eq(0).val())) && check.test(parseInt(phonNum.eq(1).val())))
        return true;
    else 
        return false;

}


// console.log(user.find(itme => itme.id == "abcd"))
function idOverlap() {
    let id = $("#userId").val()
    if(id == '' || $("#userId").val().length < 4) return false;

    if(user.find(itme => itme.id == id))
    {
        $("#userId ~ p").addClass('overlap')
        return false;
    }
    else
    {
        $("#userId ~ p").removeClass('overlap')
        return true;
    }
}

function uName() {
    if($("#userName").val() == "")
        return false;
    else
        return true;
        
}

function valid() {

    if(!idOverlap())
    {
        alert(`아이디를 다시 입력해주세요.`)
        location.href = `#userId`
        return false;
    }

    if(!password())
    {
        alert(`비밀번호를 다시 입력해주세요.`)
        location.href = `#userPwd`
        return false;
    }

    if(!passwordvft())
    {
        alert(`비밀번호 확인을 다시 입력해주세요.`)
        location.href = `#pwdvft`
        return false;
    }

    if(!uName())
    {
        alert(`이름을 입력해주세요.`)
        location.href = `#userName`
        return false;
    }


    if(!phon())
    {
        alert(`전화번호를 다시 입력해주세요.`)
        location.href = `#phoneNum1`
        return false;
    }


    
    if(!$("#agree1").is(':checked') && !$("#agree2").is(':checked'))
    {
        alert(`회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.`)
        location.href = `#conditions`
        return false;
    }

    return true;
    
}

function joinBut() {
    if(valid())
    {
        let id = $("#userId").val()
        let pwd = $("#userPwd").val()
        let userName = $("#userName").val()
        let email = $("#email").val()
        let phoneNum = `${$("#phoneNum0").val()}-${$("#phoneNum1").val()}-${$("#phoneNum2").val()}`
        console.log("id :",id)
        console.log("pwd :",pwd)
        console.log("name :",userName)
        console.log("email :",email)
        console.log("phoneNum :",phoneNum)
    }
    else
    {

    }
}


function login() {
    location.href = `./login.html`

}











