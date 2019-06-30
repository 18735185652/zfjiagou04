
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
    then(onFulfilled,onRejected){
        if(this.status === "fulfilled"){
            onFulfilled(this.value)
        }
        if(this.status === "rejected"){
            onRejected(this.reason)
        }
        if(this.status === "pending"){
          this.onResolvedCallbacks.push(()=>{
            onFulfilled(this.value)
          });
          this.onRejectedCallbacks.push(()=>{
            onRejected(this.reason)
          });
        }


        
    }

}
module.exports = Promise;