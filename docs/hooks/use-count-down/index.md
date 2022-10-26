# useCountDown

## 介绍
倒计时

## 引入
```
import { useCountDown } from "moxui";
```

## 代码演示
**基础用法**
```
<!-- script:setup -->
import { useCountDown, Toast } from "moxui";

const countDown = useCountDown(100);
// 当前倒计时对象
const current = countDown.current;

countDown.on("update", () => {
  console.log('countdown update');
});
countDown.on("end", () => {
  Toast('countdown end');
});

<!-- template -->
<span>{{ current.days }}天</span>
<span>{{ current.hours }}时</span>
<span>{{ current.minutes }}分</span>
<span>{{ current.seconds }}秒</span>
```

**定时任务**
```
<!-- script:setup -->
const countDown = useCountDown(Infinity, 5, true);
const taskTimes = ref(0);
countDown.on("update", () => {
  taskTimes.value++;
});

<!-- template -->
<div>任务执行次数: {{ taskTimes }}</div>
```

**异步开启**
```
<!-- script:setup -->
// 内部使用了生命周期, countDown需要在setup顶层初始化
const countDown3 = useCountDown(0);
const current3 = countDown3.current;
countDown3.on("end", () => {
  Toast("countDown3 end");
});
function startCountDown() {
  countDown3.reset(20);
}

<!-- template -->
<mo-button type="success" size="small" @click="startCountDown"
  >点击开始</mo-button
>
<div>
  <span>{{ current3.days }}天</span>
  <span>{{ current3.hours }}时</span>
  <span>{{ current3.minutes }}分</span>
  <span>{{ current3.seconds }}秒</span>
</div>
```
### API


### 参数
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```time``` | 倒计时,秒值 | ```number``` | - |
| ```interval``` | 倒计时间隔, 秒值 | ```number``` | ```1``` |
| ```autoStart``` | 是否自动开始 | ```boolean``` | ```false``` |
| ```rounded``` | 是否取整, 如 interval = 5, 逢 5 10 15 ... 更新 | ```boolean```  | ```true``` |

### 返回值
| 参数 | 说明	| 类型 | 
| :--- | :--- | :--- | 
| ```current``` | 倒计时对象 | ```CurrentTime```,见下方 | 
| ```start``` | 开始 | ```()=>void``` | 
| ```stop``` | 停止 | ```()=>void``` | 
| ```reset``` | 重新开始 | ```(time:number=0,  startCount:boolean=true,  intv?:number)=>void``` | 
| ```on``` | 事件监听, 支持```update``` ```end``` | ```(type:'update'\|'end',callback)=>void``` | 
| ```off``` | 取消事件监听 | ```(type?:'update'\|'end',callback?:()=>void)=>void``` | 

### CurrentTime类型
| 名称 | 说明	| 类型 | 
| :--- | :--- | :--- | 
| ```total``` | 剩余倒计时, 秒值 | ```number``` | 
| ```days``` | 天数 | ```number``` | 
| ```hours``` | 小时数 | ```number``` | 
| ```totalHours``` | 总小时数(不计天数) | ```number``` | 
| ```minutes``` | 分钟数 | ```number``` | 
| ```seconds``` | 秒数 | ```number``` | 

