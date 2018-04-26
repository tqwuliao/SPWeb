import header , {register} from '../header.js'
import { HtmlElement, createElement } from '../createHtml.js';
import {myget,mypost} from '../myajax.js';

class InputHandler extends HtmlElement {
    constructor(data) {
        const {label,type} = data;
        super(data);
        this.label = label;
        this.type = type ? type : "text";
        this.check = data.check;
    }
    render(parent) {
        let str = `<span class="input-container"><input type=${this.type}></input><label>${this.label}</label></span>`;
        this.messageBox = $(`<span class="input-message hidden"></span>`);
        let dom = $(str);
        dom.append(this.messageBox);

        parent.append(dom);
        this.callBack && this.callBack(dom);
        this.check && dom.children("input").on("change",this.check(this));
    }
    /*
    @param type = 0 warning,1 error
     */
    message(str,type=0) {
        if(str == "") {
            this.messageBox.addClass("hidden");
        } else {
            this.messageBox.removeClass("hidden");
            this.messageBox.html(str);
        }
    }
}

register("admin",function() {
    document.querySelector(".content-container").innerHTML = "";
    let inputs = [];
    inputs.push(new InputHandler({
        label: "用户名",
        check: function(par) {
            
            return function(e) {
                console.log(this.value);
                if(this.value == "") par.message(`${par.label}不能为空！`); else par.message("");
            }
        }
    }));
    inputs.push(new InputHandler({
        label: "密码",
        type: "password"
    }));
    inputs.push(new InputHandler({
        label: "巴拉巴拉"
    }));
    createElement(new HtmlElement({className:"input-form",content:["<h2 >管理员登录</h2>",...inputs,
        new HtmlElement({labelName:"button",content:"登录"})]}),$(".content-container"));
    $("input").on("change",function(e) {
        if(this.value != "") {
            this.classList.add("nonempty");
        } else {
            this.classList.remove("nonempty");
        }
    });
    $("input").on("focus",function(e) {
        this.parentNode.classList.add("focused");
    });
    $("input").on("blur",function(e) {
        this.parentNode.classList.remove("focused");
    });
});

$(window).on("load", function() {
    header("admin");
    window.myreload["admin"]();
});
