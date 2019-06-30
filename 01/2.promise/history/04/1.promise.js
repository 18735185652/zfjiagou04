let resolvePromise = (promise2,x,resolve,reject) => { //统一处理结果
    //promise2就是返回的promise
    //x就是then的成功或失败的返回值
    //promise2的resolve和reject
   if(promise2 === x){
       return reject(new TypeError("循环引用"))
   }
   if(typeof x === "function" || (typeof x ==="object"&& x!=null)){
        try{
            let then = x.then;
            if(typeof then ==="function"){
                then.call(x,(y)=>{
                    resolve(y)
                },(e)=>{
                    reject(e)
                })
            }else{
                resolve(x)
            }
        }catch(e){
            reject(e)
        }
        
   }else{
       resolve(x)
   }
}

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
            //如果执行函数的时候报错了，那么promise2直接失败即可
            if(this.status === "fulfilled"){
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value) 
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })      
            }
            if(this.status === "rejected"){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                }) 
            }
            if(this.status === "pending"){
              this.onResolvedCallbacks.push(()=>{
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value) 
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
               
              
              });
              this.onRejectedCallbacks.push(()=>{
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
               
                
              });
            }
        })
        return promise2


        
    }

}
module.exports = Promise;