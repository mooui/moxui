# Loading 加载遮罩

## 介绍
用于页面初始化时展示加载遮罩    
容器下执行单例模式

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { Loading } from 'moxui';

const app = createApp();
app.use(Loading);


// 单文件组件引入
<!-- script:setup -->
import { Loading } from 'moxui';

Loading();
```

## 代码演示

**基础用法**
```
import { Loading } from 'moxui';

Loading();
init().then(()=>{
  Loading.close();
});

function init(){
  // 初始化...
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve();
    },2000)
  })
}
```

**显示固定时间**
```
import { Loading } from 'moxui';

Loading(2500);
```

**配置**
```
import { Loading } from 'moxui';

Loading({
  duration:4000,
  zIndex:1000,
  backgroundColor: "rgba(0,100,0,.1)",
});
```
**指定容器**
```
import { Loading } from 'moxui';

const container = ref<HTMLElement>();
const close = Loading({
  duration:0,
  container
});
setTimeout(close,2500);
```

## API

### 方法
| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| ```Loading``` | 显示loading | 见下方 **参数类型** | ```close:()=>{}``` 关闭Loading |
| ```Loading.close``` | 关闭所有loading | - | - |


### 参数类型
```
// Loading(options);
options?: 
  | { 
      show?: boolean;
      duration?: number;
      backgroundColor?: string;
      zIndex?: number;
      container?: string | HTMLElement
    } 
  | boolean  // false关闭
  | number   // duration
```
