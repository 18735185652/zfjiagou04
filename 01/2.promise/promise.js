let resolvePromise = (promise2,x,resolve,reject)=>{
    if(x === promise2){
        return reject(new TypeError("循环引用"))
    }
    let called;
    if(typeof x ==="function" || (typeof x === "object" && x!==null)){
        try{
            let then = x.then;
            if(typeof then==="function"){
                then.call(x,(y)=>{
                    if(called) return;
                    called = true;
                    resolvePromise(promise2,y,resolve,reject)
                },(err)=>{
                    if(called) return;
                    called = true;
                    reject(err)
                })
            }else{
                resolve(x)
            }
        }catch(e){
            if(called)return;
            called = true;
            reject(e)
        }
       
    }else{
        resolve(x)
    }
}

class Promise {
    constructor(executor){
        this.value;
        this.reason;
        this.status = "pending";
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value)=>{
            if(value instanceof Promise){
                return value.then(resolve,reject);
            }
            if(this.status = "pending"){
                this.status = "fulfilled"
                this.value = value; 
                this.onFulfilledCallbacks.forEach(fn=>{fn()})        
            }
        }
        let reject = (reason)=>{
            if(this.status = "pending"){
                this.status = "rejected"
                this.reason = reason
                this.onRejectedCallbacks.forEach(err=>{err()})
            }
        }
        try{
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }
       
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled==="function"?onFulfilled:value=>value;
        onRejected = typeof onRejected === "function"?onRejected:err=>{throw err}
        let Promise2 = new Promise((resolve,reject)=>{
            if(this.status==="fulfilled"){
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        resolvePromise(Promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }  
                })  
            }
            if(this.status==="rejected"){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(Promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }   
                })
               
            }
            if(this.status==="pending"){
                this.onFulfilledCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(Promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }  
                    })        
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(Promise2,x,resolve,reject)
                        }catch(e){
                            reject(e)
                        }  
                    })  
                })
            }
        })
        return Promise2;
    }
    static deferred(){
        let dfd = {};
        dfd.promise = new Promise((resolve,reject)=>{
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd; 
    }
}
Promise.defer = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd; //可以检测这个对象上的promise属性 resolve reject 方法
}

module.exports = Promise;
