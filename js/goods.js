let json = JSON.parse(JSON.stringify(data));
let gds;
$(document).ready(function () {
    let url = new URLSearchParams(location.search);
    let id = url.get("id")

    if(id!='')
    {
        gds = json[json.findIndex(itme => itme.id == id)]
    
        $("#goodsPage img").attr("src", `.${gds.img}`);
        $("#goodsPage h1").text(gds.name)

        if(gds.sale > 0)
        {
            $(".old").text(`${gds.pay.toLocaleString()}원`)
            $(".sale").text(`${gds.sale}%`)
            $(".pay").text(`${(gds.pay - (gds.pay * (gds.sale / 100))).toLocaleString()}원`)
        }
        else
        {
            $(".pay").text(`${gds.pay.toLocaleString()}원`)
        }

    }

    $("#shopBasket").click(function () {
        let gods = {id : gds.id, quan : $("#quan").val()}
        if(localStorage.getItem("cart") != null)
        {
            // console.log(gds.id, JSON.parse(localStorage.getItem("cart")).find(itme => itme.id = gds.id))

            if(JSON.parse(localStorage.getItem("cart")).find(itme => itme.id == gds.id))
            {
                alert("상품이 장바구니에 담겼습니다.");
            }
            else
            {
                let cart = JSON.parse(localStorage.cart)
                cart.push(gods)
                localStorage.setItem(`cart`,JSON.stringify(cart))
            }
        }
        else
        {
            localStorage.setItem(`cart`,JSON.stringify([gods]))
        }

        Basket()
        // console.log(JSON.parse(localStorage.getItem("cart")))

    })
    
})


















