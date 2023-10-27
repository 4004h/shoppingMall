let user = [{
    id   : "abcd",
    pwd  : "abcd1234",
    name : "홍길동",
    mail : "홍길동@mail.com",
    Phone: "010-1234-5678"
}]



$(document).ready(function () {

})

function Login() {
    let userid = $("#id").val()

    let log = user.find(itme => itme.id == userid)

    if(log)
    {
        let userpw = $("#pw").val()

        if(log.pwd == userpw)
        {
            $("#pw ~ p").text("")

            console.log("로그인 성공")
        }
        else
        {
            $("#pw ~ p").text("아이디 또는 비밀번호가 올바르지 않습니다.")
            // console.log("비밀번호가 일치하지 않습니다.")
        }
    }
    else
    {
        $("#pw ~ p").text("아이디 또는 비밀번호가 올바르지 않습니다.")
        // console.log("id가 존재하지 않습니다.")
    }

}


function Join() {
    location.href = `./join.html`

}










