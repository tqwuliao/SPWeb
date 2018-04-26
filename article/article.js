import header, { register } from '../header.js'
import { HtmlElement, createElement } from '../createHtml.js';
import {myget,mypost} from '../myajax.js';

let aTitle = (str,id,list=false) => new HtmlElement(
    {   
        className:"article-title",
        content:str,
        onClick: id ? ()=>{

            id = id.toString();
            console.log(id);
            if (!list) return;
            history.pushState({ id: id }, "str", id);
            
            
            
            window.myreload["article"]();
            /*function getData(id) {
                if(id.length <= 0) {
                    myget("list/",cb)
                    
                } else {
                    myget(`get/${id}`,cb);
                }
            }
            
            let cb = articleGenerator(id,getData);
            cb.next();*/

        } : null
    });

let aDeta = (obj) => new HtmlElement({className: "article-info",content:"released at " + obj});
let aCont = (str,list=true) => new HtmlElement({className: "article-cont",content:function() {
    if(list) return str;
    let index = 0;
    if(!$(".quick-navi")[0]) {
        $(".content-container").append("<span class='quick-navi'></span>");
    }
    let navi = $(".quick-navi");
    str = str.replace(/<h2>([^<]*)<\/h2>/g,function(a,b) {
        let aa = $(`<a to=${index}>${b}</a>`);
        navi.append(aa);
        let ii = index;
        aa.click(function() {
            $(".visiting").removeClass("visiting");
            $(".content-container").animate({scrollTop:$(`[index=${ii}]`)[0].offsetTop},"normal",function() {
                setTimeout(()=>{$(".visiting").removeClass("visiting")},1000);
            });
            $(`[index=${ii}]`).addClass("visiting");
        });
        return `<h2 index="${index++}">${b}</h2>`;
    });
    return str;
}()});

function* articleGenerator(id,getData) {
    var data = yield getData(id);

    if (id.length <= 0) {
        data = typeof data === "undefined" ? "[]" : data;
        
        data = JSON.parse(data);
        let cont = [];
        data.map((v) => {
            cont.push(new HtmlElement(
                {
                    className: "article-entry",
                    content: [aTitle(v.title, v.id, true), aCont(v.content)]
                }
            ))
        })
        let articleEntry = new HtmlElement(
            {
                className: "article-list",
                content: cont
            }
        );
        createElement(articleEntry, $(".content-container"));
    } else {
        
        data = JSON.parse(data);
        $("title").html(`${data.title} - BoringHost`);
        let article = new HtmlElement(
            {
                className: "article-container",
                content: [aTitle(data.title),aDeta(data.info), aCont(data.content,false)]
            }
        );
        createElement(article, $(".content-container"));
        
    }
}

register("article",function() {
    document.querySelector(".content-container").innerHTML = "";
    let arr = window.location.href.split("/");
    
    const id = arr[arr.length-1];

    function getData(id) {
        if(id.length <= 0) {
            myget("list/",cb)
            
        } else {
            myget(`get/${id}`,cb);
        }
    }
    
    let cb = articleGenerator(id,getData);
    cb.next();
});

$(window).on("load", function() {
    header("article");

    window.myreload["article"]();
    
});
