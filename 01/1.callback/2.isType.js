//判断类型的方式
//typeof 
//instanceof
//constructor
//Object.prototype.toString.call

function isType(type){
   return function(obj){
     return Object.prototype.toString.call(obj)===`[object ${type}]`
   }
}

//批量生产方法 Number Boolean 
let objs = {}
// ["Number","String","Array","Null"].forEach(type=>{
//     // objs["is"+Type] = isType(type)
//     objs["is"+type] = isType(type)
// })

let arr =["Number","Boolean","String","Null","Undefined","Array"]
// console.log(arr instanceof Array)
arr.forEach(type=>{
   objs["is"+type] = isType(type)
})
// console.log(objs)

console.log(objs.isNumber(100))

//柯里化函数(可以组合) 函数的参数只能有一个  
//偏函数 函数的参数可以是多个