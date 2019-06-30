
class Promise{
    constructor(executor){    
        this.value; 
        this.status = "pending";
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [] 
        let resolve = (value)=>{ 
            if(this.status==="pending"){
                this.status = "fulfilled";
                this.value = value;
                this.onResolvedCallbacks.forEach((fn)=>{
                    fn()
                })
            }
          
        }
        let reject =(reason) => { 
            if(this.status==="pending"){
                this.status = "rejected"
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn=>{
                    fn()
                })
            }
         
        }
        try{
            executor(resolve,reject);  
        }catch(e){ 
            reject(e);
        }
       

    }
    //当then方法调用后还需要返回一个新的promise
    //new Promise的时候会让Promise立即执行
    then(onFulfilled,onRejected){
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status === "fulfilled"){
               let x = onFulfilled(this.value)
               resolve(x)
            }
            if(this.status === "rejected"){
               let x = onRejected(this.reason)
               resolve(x)
            }
            if(this.status === "pending"){
              this.onResolvedCallbacks.push(()=>{
                let x = onFulfilled(this.value)
                console.log("xx",x)
                resolve(x)
              });
              this.onRejectedCallbacks.push(()=>{
                let x = onRejected(this.reason)
                console.log("errx",x)
                resolve(x)
              });
            }
        })
        return promise2


        
    }

}
module.exports = Promise;