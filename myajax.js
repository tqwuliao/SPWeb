'use strict';

export function myget(url,yieldcall) {
    if(!yieldcall) {
        return new Promise(function(resolve,reject) {
            $.ajax( {
                method: "GET",
                url: url,
                success: (data) => resolve(data)
            });
        })
    }
    return new Promise(function(resolve,reject) {
        $.ajax( {
            method: "GET",
            url: url,
            success: (data) => yieldcall.next(data)
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