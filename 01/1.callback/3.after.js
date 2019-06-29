// lodash after(调用) 在 多少次之后
function after(times,cb){
    return function(){
        if(--times===0)cb()
    }
}
function say(){
    console.log("say")
}

let newSay = after(3,say);


newSay()
newSay()
newSay()