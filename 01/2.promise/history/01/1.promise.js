
class Promise{
    constructor(executor){    
        this.value; //成功的原因
        this.reason; //失败的原因
        this.status = "pending" //默认有三种状态
        let resolve = (value)=>{ //如果成功就不能失败
            if(this.status==="pending"){
                this.status = "fulfilled";
                this.value = value;
            }
          
        }
        let reject =(reason) => { //如果失败就不能成功
            if(this.status==="pending"){
                this.status = "rejected"
                this.reason = reason;
            }
         
        }
        try{
            executor(resolve,reject);  //执行器就是一个函数，提供给用户2个参数，成功或者失败
        }catch(e){ // 如果执行的时候出错，直接走失败
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
    }

}
module.exports = Promise;