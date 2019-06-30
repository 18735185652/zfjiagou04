let fs = require("fs");
let path = require("path")




let Promise = require("./1.promise")
// 如果promise中的then方法，无论是成功还是失败，他的返回结果是一个普通的时候就会把这个结果传递给外层
// then的下一个then的成功回调
// 如果then的方法内部 成功、失败 内部跑错就会走外层的then的下一个then的失败回调，如果下一个then没有
// 错误处理 会继续向下找，如果找不到就报错
// 如果成功或者失败的回调的返回值 返回是一个promise 那么会让这个promise执行 采用他的状态

// promise 实现链式调用  靠的是返回一个新的promise，因为promise的状态一旦确定 不能重新更改

// fs.readFile(path.resolve(__dirname,"name.txt"),"utf8",function(err,data){
//     console.log(data)
// })

function readFile(url){
    // console.log("url",url)
    return new Promise((resolve,reject)=>{
        // fs.readFile(path.resolve(__dirname,url),"utf8",(err,data)=>{
        //     if(err)reject(err);
        //     resolve(data)
        // })
        resolve(1000)
        // setTimeout(()=>{
        //     reject(1000)
        // },1000)
    
    })
}

readFile("name.txt")
.then()
.then((data)=>{
    // console.log(data)
    return new Promise((resolve,reject)=>{
        resolve(new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(400)
            },1000)
        }))
    })
    // throw new Error("xxx")
},(err)=>{
    return err
})
.then((data)=>{
    console.log("aa",data)
},(err)=>{
    console.log("err",err)
})

