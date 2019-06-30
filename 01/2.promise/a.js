let Promise = require("./promise");
let fs = require("fs");
let path = require("path")
 let p1 = new Promise((resolve,reject)=>{
    // throw new Error("xxx")
    // setTimeout(()=>{
        
    // },1000)
    resolve(new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1000)
        },1100)
    }))
 })
// function readFile(url){
//     let defer = Promise.defer();
//     fs.readFile(path.resolve(__dirname,url),"utf8",(err,data)=>{
//         if(err) defer.reject(err);
//         defer.resolve(data);
//     })
//     return defer.promise;

// }

//  readFile("age.txt").then((data)=>{
//      console.log(data);
//  })
 p1.then().then((data)=>{
     console.log("data",data)
     return data
    //  throw new Error("xxx")
 },err=>{
    //  console.log("err",err)
 })
 .then((data)=>{console.log("aa",data)},(err)=>{
     console.log("err",err)
 })