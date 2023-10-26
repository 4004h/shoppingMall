// let json = JSON.parse(JSON.stringify(data));
json = JSON.parse(JSON.stringify(data));
let today = new Date;
let suggest = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)
let max

$(document).ready(function(){
    let display = $(".display>ul")
    let cont = 0;

    for (let jndex = 0; jndex < display.length; jndex++) {
        displayId(display[jndex].id)
    }
    
    function displayId(id) {
        switch (id) {
            case "today":
                let todayNum = []
                let nums = [219302,173878,207307,197698]
                for (let jndex = 0; jndex < 4; jndex++) {
                    let num = Overflow(Math.round(suggest.getTime()%nums[jndex]))

                    for (let kndex = 0; kndex < todayNum.length; kndex++) {
                        if(todayNum[kndex] == num)
                        {
                            num = Overflow(num + Math.round(suggest.getTime()%nums[kndex]))
                            kndex = 0;
                        }
                    }
                    todayNum.push(num)
                    
                }
                for(index=0; index < 4; index++)
                {
                    $(`#${id}`).append(`
                    <li>
                        <a href="${$("#searchimg img")[0].id}goods.html?id=${ json[todayNum[index]].id }">
                            <img src="${$("data-link")[0].id+json[todayNum[index]].img}" alt="${json[todayNum[index]].name}">
                            <hr>
                            <ul class="goodsInfo">
                                <li>${json[todayNum[index]].name}</li>
                                <li>무료배송</li>
            
                                ${price(json[todayNum[index]].pay, json[todayNum[index]].sale)}
            
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
                    if(cont >= 4 * 3)
                    {
                        break;
                    }
                }
    
                break;

            case "searched":
                cont = 0;
                max = 4 * 5
                let url = new URLSearchParams(location.search);
                let page = url.get('page')

                if(url.get('search'))
                {
                    let search = url.get('search').split("-");

                    // page.len

                    let list = json.filter(itme => itme.category.split("-")[ search.length > 1 ? 1 : 0 ] == search[ search.length > 1 ? 1 : 0 ])
                    $(".display>h1").text(`검색된 상품 ${list.length}개`)
                    
                    for(let json of list)
                    {
                        // if(json[index].category.split("-")[ search.length > 1 ? 1 : 0 ] == search[ search.length > 1 ? 1 : 0 ])
                        // { [index] } // index=0; index < json.length; index++

                        if(cont >= max * page - max && !cont < max * page)
                        {
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

                        }
                        else
                        {
                            cont++;
                            continue;
                        }

                        if(cont >= max * page)
                        {
                            break;
                        }
                    }
                    if(display.children().length < 1)
                    {
                        console.log("없는페이지")
                        $(".display").append(`
                            <h2 style="font-size: 22px; text-align: center; height: 280px; margin-top: 150px;"> 존재하지 않는 페이지입니다</h2>
                        `)
                    }
                    //page
                    paging(Math.ceil(list.length / max), page)
                }
                else if(url.get('select'))
                {
                    let list
                    if(url.get('select') == "all")
                        list = json
                    else
                        list = json.filter(itme => itme.name.includes(url.get('select')))
                    $(".display>h1").text(`'${url.get('select')}'로 검색된 상품 ${list.length}개`)
                    // console.log(list)
                    if(list.length > 0)
                    {
                        // page.len

                        for (let json of list) {

                            // console.log(cont, max * page - max, max * page)
                            // console.log(cont, max * page - max <= cont && cont < max * page)
                            if(cont >= max * page - max && !cont < max * page)
                            {
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
                            }
                            else
                            {
                                cont++;
                                continue;
                            }

                            cont++;
                            if(cont >= max * page)
                            {
                                break;
                            }
                        }
                        if(display.children().length < 1)
                        {
                            console.log("없는페이지")
                            $(".display").append(`
                                <h2 style="font-size: 22px; text-align: center; height: 280px; margin-top: 150px;"> 존재하지 않는 페이지입니다</h2>
                            `)
                        }
                        //page
                        paging(Math.ceil(list.length / max), page)
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

            case "related":
                // 관련상품
                let urlid = new URLSearchParams(location.search);
                urlid = urlid.get("id")
                let gds = json[json.findIndex(itme => itme.id == urlid)]
                cont = 0;
                let list = json.filter(itme => itme.category.split("-")[0] == gds.category.split("-")[0])

                let filter = list.filter(itme => itme.id != gds.id)
                let lists = []

                for (let index = 0; index < (filter.length < 4 ? filter.length : 4); index++) {
                    if(filter.length < index)
                        break;
                    let num = list.findIndex(itme => itme.id == urlid) - index + (1 == filter.length ? 0 : 1)

                    lists[index] = filter.at(num >= list.length-1 ? num - list.length+1 : num)

                }
                list = lists

                for (let json of list)
                {
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
                    if(cont >= 4 * 1 || cont > lists.length)
                    {
                        break;
                    }
                
                }

                break;
            default:
            
            

                break;
        }
    }

})

function movePage(page) {
    let url = new URLSearchParams(location.search);
    url.set('page', String(page));
    url.toString();
    location.href = (`${location.pathname}?${url.toString()}`)
}


function paging(pageMax, curPage) {
    let pages = $("#paging ul")
    let pagingMax = 8;

    let pagings = Math.ceil(parseInt(curPage) / pagingMax )
    
    pages.append(`
        <li><a onclick="" id="L" class="pageLeft ${activ("Left", curPage)}">〈 </a></li>
    `)

    for (let index = 1; index <= pageMax; index++) {

        if(pagingMax * pagings - pagingMax+1 <= index && index < pagingMax * pagings+1)
        {
            pages.append(`
                <li><a onclick="movePage(${index})" class="pageNum ${point(index, curPage)}"> ${index} </a></li>
            `)
        }

    }

    pages.append(`
        <li><a onclick="" id="R" class="pageRight ${activ("Right", curPage)}"> 〉</a></li>
    `)  

    if($(".activ").length > 1)
    {
        $("#L").click(function () {
            movePage(parseInt(curPage)-1) 
        })
        $("#R").click(function () {
            movePage(parseInt(curPage)+1)
        })
    }
    else
    {
        $(".activ").click(function () {
            if($(".activ").attr('id') == 'L')
            {
                movePage(parseInt(curPage)-1)
            }
            else
            {
                movePage(parseInt(curPage)+1)
            }
        })
        console.log()
        
    }

    function activ(posit, curPage) {
        if(posit == "Left")
        {
            return curPage > 1 ? "activ" : "" ;
        }
        else if(posit == "Right")
        {
            return curPage < pageMax ? "activ" : "" ;
        }
        
    }

    function point(index, cur) {
        if(index == cur)
        {
            return "point";
        }
        else
        {
            return "";
        }
    }

}



//Math.round(suggest.getTime()%219302)
//최대 219302
function Overflow(params) {
    if(params < 0)
    {
        if(json.length + params < 0)
            return Overflow(json.length + params);

        return json.length + params;
    }
    else if(params >= json.length)
    {
        if(params - json.length >= json.length)
            return Overflow(params - json.length);

        return params - json.length;
    }
    return params;
    
}


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
