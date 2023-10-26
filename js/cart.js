// json = JSON.parse(JSON.stringify(data));
let cart = JSON.parse(localStorage.getItem("cart"))


$(document).ready(function () {
    
    cartUpdate()

    $("#emp").click(function () {
        localStorage.clear();
        Basket()
        cartUpdate()
    })

    $("#checkAll").click(function () {

        $(".check").prop('checked', $('#checkAll').prop('checked'));
    })

    $("#elim").click(function () {
        if(cart == null) return

        let cut = cart

        for (let index = 0; index < cart.length; index++) {
            if($(".check").eq(index).prop('checked'))
            {
                cut = cut.filter((itme) => itme.id !== cart[index].id)
            }
        }


        if(cut.length > 0)
        {
            localStorage.setItem(`cart`,JSON.stringify(cut))
        }
        else
        {
            localStorage.clear();
        }

        Basket()
        cartUpdate()
    })

    


})

function onChange(th, id) {
    if(th.value > 10)
    {
        th.value = 10;
        console.log(th.value)

    }
    else if(th.value < 1)
    {
        th.value = 1;
        console.log(th.value)

    }

    cart[id].quan = th.value
    console.log(id)
    localStorage.setItem(`cart`,JSON.stringify(cart))
    cartUpdate()
}

function cartUpdate() {
    cart = JSON.parse(localStorage.getItem("cart"))
    let totalPay = 0, totalShip = 0;

    $("tbody").empty()
    if(cart != null)
    {
        let i = 0;
        for(let item of cart)
        {
            let gosd = json[json.findIndex(itme => itme.id == item.id)]
            let pay = gosd.pay - (gosd.pay * (gosd.sale / 100))
            totalPay += pay * item.quan;
            $("tbody").append(`
                <tr>
                    <td><label><input type="checkbox" class="check"></td></label>
                    <td>
                        <a href="./goods.html?id=${item.id}">
                            <img src=".${gosd.img}" alt="">
                            <div class="name">${gosd.name}</div>
                        </a>
                        
                        <div class="quan"><label> 수량 : <input type="number" class="number" id="quan" name="quan" min="1" max="10" value="${item.quan}" onchange="onChange(this, ${i})">개 </label></div>
                        <div class="pay">${(pay).toLocaleString()}원</div>
                            
                    </td>
                    <td>
                        <div class="total">${(pay * item.quan).toLocaleString()}원</div>
                    </td>
                    <td>
                        <div class="ship">무료</div>
                    </td>
                </tr>
            `)
            i++

        }
    }
    else
    {
        

        $("#choice").remove()
        $("tbody").append(`
        <tr>
            <td colspan="4">
                <h3>장바구니에 담은 상품이 없습니다.</h3>
            </td>
        </tr>
        `)
    }

    // totalGoods totalShip totalPay
    $("#totalGoods").html(`총 상품가격 : <span>${(totalPay).toLocaleString()}</span>원 + `)
    $("#totalShip").html(`총 배송비 : <span>${(totalShip).toLocaleString()}</span>원 = `)

    $("#totalPay").html(`총 주문금액 : <span>${(totalPay + totalShip).toLocaleString()}</span>원`)
}

function lobby(){
    location.href = "../index.html";
}






