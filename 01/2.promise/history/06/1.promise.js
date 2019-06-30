let resolvePromise = (promise2,x,resolve,reject) => { //统一处理结果
    //promise2就是返回的promise
    //x就是then的成功或失败的返回值
    //promise2的resolve和reject
   if(promise2 === x){
       return reject(new TypeError("循环引用"))
   }
   let called;
   if(typeof x === "function" || (typeof x ==="object"&& x!=null)){

        try{
            let then = x.then;
            if(typeof then ==="function"){
                then.call(x,(y)=>{
                    //y有可能解析出来的还是一个promise
                    //再去调用resolvePromise方法 递归解析的过程
                    //总有y是普通值的时候
                    if(called)return;
                    called = true;
                    resolvePromise(promise2,y,resolve,reject)
                    // resolve(y)
                },(e)=>{
                    if(called)return;
                    called = true;
                    reject(e)
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

class Promise{
    constructor(executor){    
        this.value; 
        this.status = "pending";
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [] 
        let resolve = (value)=>{ 
            if(value instanceof Promise){
                return value.then(resolve,reject);
            }
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
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled :value=>value;
        console.log("onFulfilled",onFulfilled)
        onRejected = typeof onRejected === "function" ? onRejected :err=>{throw err};
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
    static deferred(){
        let dfd = {};
        dfd.promise = new Promise((resolve,reject)=>{
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd; 
    }

}

//yarn add promises-aplus-tests -g 

Promise.defer = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd; //可以检测这个对象上的promise属性 resolve reject 方法
}

module.exports = Promise;

//全局安装 只能在命令中使用
//本地安装 可以在命令下 和 我们的代码中使用
