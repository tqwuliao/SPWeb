import header, { register } from './header.js'
import { HtmlElement, createElement } from './createHtml.js';

class RowContainer extends HtmlElement {
    constructor(obj)
    {
        super(obj);
        this.className += " row-container";
    }
}

class ColContainer extends HtmlElement {
    constructor(obj)
    {
        super(obj);
        this.className += " col-container";
    }
}

register("homePage",function() {
    
    let display = [[{ title: "Test1", flex: 3 }, { title: "Test3", flex: 2 }],
    [{ title: "Test-A", flex: 2 }, { title: "Test-B", flex: 2 }, { title: "Test-C", flex: 2 }],
    [{ title: "Test-A", flex: 1 }, { title: "Test-B", flex: 2 }, { title: "Test-C", flex: 2 }],
    [{ title: "Test-A", flex: 2 }, { title: "Test-B", flex: 1 }, { title: "Test-C", flex: 2 }],
    [{ title: "Test-A", flex: 2 }, { title: "Test-B", flex: 2 }, { title: "Test-C", flex: 4 }]];
    let display_real = [];
    let endline = 0;
    display.map((row) => {
        let rc = [];
        let id = 0;
        let t = endline;
        row.map((grip) => {
            id++;
            let child = new ColContainer({
                className: id > 1 ? 'col-container-right' : 'col-container-left',
                content: `<span>${grip.title}</span>`,
                after: (dom) => { dom.css("flex", `${grip.flex}`); dom.attr("linec", t) }
            });
            rc.push(child);
        });
        endline++;
        display_real.push(new RowContainer({ content: rc }));

    });
    let display1 = display_real.slice(0, 3);
    //console.log(display_real);
    createElement(new HtmlElement({ className: "grip-container", content: display1 }), $(".content-container"));
    let offset = document.body.scrollTop + document.body.clientHeight;
    let es = document.querySelectorAll(".col-container");
    for (let i of es) {

        let box = i.getBoundingClientRect();
        //console.log(offset, box);
        if (offset > box.y) {
            i.classList.remove("col-container-left");
            i.classList.remove("col-container-right");
        }
    }
    endline = 2;
    $(".content-container").on("scroll", (e) => {
        if (endline >= display_real.length) return;
        let offset = document.querySelector(".content-container").scrollTop + document.querySelector(".content-container").clientHeight;
        let es = document.querySelectorAll(`[linec="${endline}"]`);
        let flag = false;
        for (let i of es) {

            let box = i.getBoundingClientRect();
            console.log(offset, box);
            if (offset > box.y + 100) {
                i.classList.remove("col-container-left");
                i.classList.remove("col-container-right");
                flag = true;
            }
        }
        if (flag) {
            endline++;
            let displayn = display_real[endline];
            createElement(displayn, $(".grip-container"));
        }
    });
    //window.nowat = "homePage";
});


console.log(1);
$(window).on("load",()=>{ 
    header("homePage");
    window.myreload["homePage"]();
});