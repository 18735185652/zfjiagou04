// 观察者模式 vue 典型的观察者 发布订阅
// 观察者模式 > 发布订阅

//区别：
// 发布和订阅是无关的
// 观察者 和 被观察者肯定是有关系的

class Subject{  //被观察者 我家宝宝
    constructor(){
        this.state = "开心的",
        this.events = [];
    }
    setState(newState){
        this.state = newState;
        this.events.forEach(o=>o.update(newState));
    }
    attach(o){
        this.events.push(o)
    }
}

class Observer{ //我
    constructor(name){
        this.name = name;
    }
    update(newState){
        console.log(this.name +":小宝宝现在的状态是"+newState);
    }

}
let o1 = new Observer("我");
let o2 = new Observer("妈妈");

let s = new Subject;
s.attach(o1)
s.attach(o2)
s.setState("哭了")
s.setState("笑了")

