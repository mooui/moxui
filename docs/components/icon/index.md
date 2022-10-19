# Icon 图标

## 介绍
Toast 中用到的 Icon

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoIcon } from 'moxui';

const app = createApp();
app.use(MoIcon);


// 单文件组件引入
<!-- script:setup -->
import { MoIcon } from 'moxui';

<!-- template -->
<mo-icon></mo-icon>
```

## 代码演示
**success**
```
<mo-icon></mo-icon>
```
**error**
```
<mo-icon type="error"></mo-icon>
```
**warn**
```
<mo-icon type="warn"></mo-icon>
```
**loading**
```
<mo-icon type="loading"></mo-icon>
```
**动画**
```
<mo-icon type="success" animate></mo-icon>
<mo-icon type="error" animate></mo-icon>
<mo-icon type="warn" animate></mo-icon>
<mo-icon type="loading" animate></mo-icon>
```
**切换**
```
<mo-icon :type="type" animate></mo-icon>
<button @click="changeType">切换</button>


const type = ref("success");
const types = ["success","warn","error","loading"];
function changeType(){
  type.value = types[(types.indexOf(type.value) + 1) % types.length]
}
```
## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```type``` | 图标类型, 可选 ```success``` ```error``` ```warn``` ```loading``` | ```string``` | ```success``` |
| ```size``` | 图标大小 | ```string``` ```number``` | ```30``` |
| ```color``` | 图标颜色 | ```string``` | ```#666``` |
| ```animate``` | 是否展示动画 | ```boolean``` ```undefined``` |  |

