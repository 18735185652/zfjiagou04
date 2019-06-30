//promise 承诺
//pending 等待态 resolved 成功态 rejected 失败态

//类 new es6.promise
let Promise = require("./1.promise")
// console.dir(Promise)
//p就是Promise的实例
let p = new Promise((resolve,reject)=>{
   resolve("发钱了")
   reject("钱丢了")
    throw new Error("钱丢了") //一旦发生错误就会执行失败态
})
//每一个promise中的实例上都会有一个then方法

p.then((data)=>{ //成功的函数
    console.log("success",data)
},(err)=>{ //失败的函数
    console.log("fail",err)
})
