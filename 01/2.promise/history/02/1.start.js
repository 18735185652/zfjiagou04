
let Promise = require("./1.promise")

let p = new Promise((resolve,reject)=>{
  
   setTimeout(()=>{
     resolve("发钱了")
   },1000)
})


p.then((data)=>{ 
    console.log("success",data)
},(err)=>{ 
    console.log("fail",err)
})
