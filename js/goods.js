let json = JSON.parse(JSON.stringify(data));

$(document).ready(function () {
    let url = new URLSearchParams(location.search);
    let id = url.get("id")

    if(id!='')
    {
        let gds = json[json.findIndex(itme => itme.id == id)]
    
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
    

    

})


















