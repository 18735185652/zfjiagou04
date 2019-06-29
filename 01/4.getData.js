// node api 有异步的api readFile

//在获取结果的时候 需要通过回调
//错误处理 只能通过回调函数的参数处理
//处理并发的异步将结果进行同步
let fs = require("fs");


function render(obj){
    console.log(obj)
}

function after(times,cb){
    let obj = {}
    return function(key,value){
        obj[key] =value;
        if(times===Object.keys(obj).length){
            cb(obj);
        }
    }
}

let newRender = after(2,render);

fs.readFile("./age.txt","utf8",function(err,data){
    // console.log(data)
    newRender("age",18)
})
fs.readFile("./name.txt","utf8",function(err,data){
   newRender("name","珠峰")
})
