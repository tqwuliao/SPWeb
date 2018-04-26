export class HtmlElement {

    constructor(obj) {
        this.className = "";
        const {content,onClick,className,after,labelName} = obj;
        this.content = content ? content : "";
        this.onClick = onClick;
        this.className = className ? className : "";
        this.callBack = after;
        this.labelName = labelName ? labelName : "div";
    }
    
    render(parent) {
        
        let html = `<${this.labelName} class="${this.className}"></${this.labelName}>`;
        let DOMElement = $(html);

        this.key && DOMElement.attr("key",this.key);

        if(typeof this.content === 'string') {
            DOMElement.html(this.content);
        } else if(!this.content) {
            
        } else if (this.content.length) {
            this.content.map((value) => {
                 if(typeof value === 'string') DOMElement.html(value);
                 else value.render(DOMElement);
            })
        } else {
            this.content.render(DOMElement);
        }
        DOMElement.click(this.onClick);
        if(parent) {
            if(parent instanceof Node)  parent = $(parent);
            parent.append(DOMElement);
        }
        if (this.callBack) {
            this.callBack(DOMElement);
        }

        this.ref = DOMElement;
        return DOMElement;
    }
}

export function createElement(obj,parent) {
    if(typeof obj === "object" && Array.isArray(obj)) {
        console.log(obj);
        obj.map((v) => {createElement(v);});
    }
    else obj.render(parent);
    
}
