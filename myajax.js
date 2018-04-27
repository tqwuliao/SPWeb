'use strict';

const FAKE_QUERY = true;

export function myget(url,yieldcall) {


    if(!yieldcall) {
        return new Promise(function(resolve,reject) {
            if(!FAKE_QUERY) {
                $.ajax({
                    method: "GET",
                    url: url,
                    success: (data) => resolve(data)
                });
            } else {
                switch(url.split("/")[0]) {
                    case "list":
                    resolve([{id:"1",title:"hello",content:"world"},{id:"2",title:"hello",content:"world"}]);
                    break;
                    case "get":
                    resolve({id:"1",title:"ARTICLE DEMO",content:`
                    <h2>TestA</h2><p>Content</p><p>Content</p><br>
                    <h2>TestB</h2><p>Content</p><p>Content</p><br>
                    <h2>TestC</h2><p>Content</p><p>Content</p><br>
                    `,info:"Today"});
                    break;
                }
            }
        })
    }
    return new Promise(function(resolve,reject) {
        $.ajax( {
            method: "GET",
            url: url,
            success: (data) => {
                if(!FAKE_QUERY) yieldcall.next(data);
                else {
                    switch(url.split("/")[0]) {
                        case "list":
                        yieldcall.next([{id:"1",title:"hello",content:"world"},{id:"2",title:"hello",content:"world"}]);
                        break;
                        case "get":
                        yieldcall.next({id:"1",title:"ARTICLE DEMO",content:`
                        <h2>TestA</h2><p>Content</p><p>Content</p><br>
                        <h2>TestB</h2><p>Content</p><p>Content</p><br>
                        <h2>TestC</h2><p>Content</p><p>Content</p><br>
                        <h2>TestD</h2><p>Content</p><p>Content</p><br>
                        <h2>TestE</h2><p>Content</p><p>Content</p><br>
                        `,info:"Today"});
                        break;
                    }
                }
            }
        });
    })
}

export function mypost(url,data) {
    return new Promise(function(resolve,reject) {
        $.ajax( {
            method: "POST",
            data: data,
            url: url,
            success: (data) => resolve(data)
        });
    })
}