let json = JSON.parse(JSON.stringify(data));

$(document).ready(function(){
    let display = $(".display>ul")
    let cont = 0;

    for (let jndex = 0; jndex < display.length; jndex++) {
        displayId(display[jndex].id)
    }
    
    function displayId(id) {
        switch (id) {
            case "today":
                for(index=0; index < 4; index++)
                {
                    $(`#${id}`).append(`
                    <li>
                        <a href="${$("#searchimg img")[0].id}goods.html?id=${ json[index].id }">
                            <img src="${json[index].img}" alt="${json[index].name}">
                            <hr>
                            <ul class="goodsInfo">
                                <li>${json[index].name}</li>
                                <li>무료배송</li>
            
                                ${price(json[index].pay, json[index].sale)}
            
                            </ul>
                        </a>
                    </li>`)
                }
                break;
        
            case "sale":
                cont = 0;
                for(index=0; index < json.length; index++)
                {
                    if(json[index].sale > 0)
                    {
                        $(`#${id}`).append(`
                        <li>
                            <a href="${$("#searchimg img")[0].id}goods.html?id=${ json[index].id }">
                                <img src="${json[index].img}" alt="">
                                <hr>
                                <ul class="goodsInfo">
                                    <li>${json[index].name}</li>
                                    <li>무료배송</li>
                
                                    ${price(json[index].pay, json[index].sale)}
                
                                </ul>
                            </a>
                        </li>`)
                        cont++;
                    }
                    if(cont >= 4 * 4)
                    {
                        break;
                    }
                }
    
                break;

            case "searched":
                cont = 0;
                let url = new URLSearchParams(location.search);

                if(url.get('search'))
                {
                    let search = url.get('search').split("-");

                    for(index=0; index < json.length; index++)
                    {
                        if(json[index].category.split("-")[ search.length > 1 ? 1 : 0 ] == search[ search.length > 1 ? 1 : 0 ])
                        {
                            display.append(`
                            <li>
                                <a href="${$("#searchimg img")[0].id}goods.html?id=${ json[index].id }">
                                    <img src="../${json[index].img}" alt="">
                                    <hr>
                                    <ul class="goodsInfo">
                                        <li>${json[index].name}</li>
                                        <li>무료배송</li>
                    
                                        ${price(json[index].pay, json[index].sale)}
                        
                                    </ul>
                                </a>
                            </li>`)
                            cont++;
                            $(".display>h1").text(`검색된 상품 ${cont}개`)
                        }
                        if(cont >= 4 * 8)
                        {
                            break;
                        }
                    }
                }
                else if(url.get('select'))
                {
                    let list = json.filter(itme => itme.name.includes(url.get('select')))
                    $(".display>h1").text(`'${url.get('select')}'로 검색된 상품 ${list.length}개`)
                    console.log(list)
                    if(list.length > 0)
                    {
                        for (let json of list) {
                            display.append(`
                            <li>
                                <a href="${$("#searchimg img")[0].id}goods.html?id=${ json.id }">
                                    <img src="../${json.img}" alt="">
                                    <hr>
                                    <ul class="goodsInfo">
                                        <li>${json.name}</li>
                                        <li>무료배송</li>
                    
                                        ${price(json.pay, json.sale)}
                        
                                    </ul>
                                </a>
                            </li>`)
                            cont++;
                            if(cont >= 4 * 8)
                            {
                                break;
                            }
                        }
                        
                    }
                    else
                    {
                        console.log("존재하지 않는 상품입니다.")
                        $(".display").append(`
                            <h2 style="font-size: 22px; text-align: center; height: 280px; margin-top: 150px;"> 존재하지 않는 상품입니다</h2>
                        `)
                    }
                }
                else
                {
                    console.log("존재하지 않는 상품입니다.")
                    $(".display").append(`
                        <h2 style="font-size: 22px; text-align: center; height: 280px; margin-top: 150px;"> 존재하지 않는 상품입니다</h2>
                    `)
                }


        
                break;
    
            default:
            
            

                break;
        }
    }

})


function price(old, sale)
{
    if(sale > 0)
    {
        let pir = old - (old * (sale / 100))
        return `<li><span class="old">${old.toLocaleString()}원</span> <span class="sale"> ${sale}% </span></li> <li> ${pir.toLocaleString()}원 </li>`;
    }
    else
    {
        return `<li><span class="old"></span> <span class="sale"> </span></li> <li> ${old.toLocaleString()}원 </li>`;
    }

}

//select

// for(index=0; index < json.length; index++)
// {
//     if(json[index].category.split("-")[0] == "clothes")
//     {
//         console.log(json[index].name)
//     }
// }

// json[json.findIndex(itme => itme.id == "02")].name
