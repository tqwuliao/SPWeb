'use strict';

import {siteName,sliderItems} from "./const.js";
import {HtmlElement,createElement} from './createHtml.js';

class Select extends HtmlElement {
    constructor(obj) {
        super(obj);
        this.className += " select";
        this.key = obj.content;
    }
}

jQuery.extend(jQuery.easing, 
    { 
      easeOut: function (x, t, b, c, d) { 
        return (t==d) ? b+c : c * (Math.pow(t/d,1.5)) + b; 
      }
    }
);

window.myreload = [];
window.nowat = "";

window.onpopstate = function() { 
    window.nowat = window.location.pathname.split("/")[1];
    if(window.nowat == "") window.nowat = "homePage";
    window.myreload[window.nowat]();
    reload(window.nowat);
 };

export function register(key,func) {
    window.myreload[key] = function() {
        if($(".content-container").children().length > 0) {
            $(".content-container").animate({marginTop:"-6%",opacity:0},
            300,"easeOut",() => {
                $(".content-container").html("");
                func();
                $(".content-container").animate({marginTop:"0%",opacity:1},300);
            }
        )} else {
            func();
        }
    }
}

function reload(location) {
    let t = $("title");
    if(!t[0]) {
        $("head").append("<title></title>");
        t = $("title");
    }
    t.html(`${location.toUpperCase()} - BoringHost`);
    $(`[key="${location}"]`).addClass("bolded");
    $(`.bolded[key!="${location}"]`).removeClass("bolded");
    
}

export default function(location) {
    
    let headerDiv = $("<div></div>");
    headerDiv.addClass("header");
    let expandSign = $("<span class='expand'></span>");
    let headerTitle = $(`<span class='title'>${siteName}</span>`);
    headerDiv.append(expandSign);
    headerDiv.append(headerTitle);
    //$("#container").append(headerDiv);

    let SliderItems = [];
    for (let key of Object.keys(sliderItems)) {
        SliderItems.push(
            new Select({
                content: key,
                onClick: () => {
                    history.pushState({},key,sliderItems[key][0]);
                    
                    reload(key);

                    if(!window.myreload[key]) {
                        import(sliderItems[key][1]).then((e)=>{
                            window.myreload[key]();
                        });
                        $("body").append(`<link rel="stylesheet" type="text/css" href="${sliderItems[key][2]}"/>`);
                    } else {
                        window.myreload[key]();
                    }
                    
                }
            })
        );
    }
    
    let Slider = new HtmlElement({
        className: "slider",
        content: SliderItems
    }
    );
    createElement(Slider,$("#container"));

    let cc = new HtmlElement({
        className: "content-container"
    }
    );

    createElement(cc,$("#container"));
    reload(location);
}