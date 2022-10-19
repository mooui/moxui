# Button 按钮

## 介绍
通用按钮

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoButton } from 'moxui';

const app = createApp();
app.use(MoButton);


// 单文件组件引入
<!-- script:setup -->
import { MoButton } from 'moxui';

<!-- template -->
<mo-button>按钮</mo-button>
```

## 代码演示
**确认**
```
<mo-button>确认</mo-button>
// 或
<mo-button type="confirm">确认</mo-button>
```
**取消**
```
<mo-button type="cancel">取消</mo-button>
```
**large**
```
<mo-button size="large">LARGE</mo-button>
```
**自定义**
```
<mo-button height="60" width="200" background-color="#ff0036" color="#fff">自定义</mo-button>
```
## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```type``` | 按钮类型, 可选 ```confirm``` ```cancel``` | ```string``` | ```confirm``` |
| ```size``` | 按钮大小, 可选 ```normal``` ```large``` , 会被 ```width``` ```height``` 属性覆盖 | ```string``` | ```normal``` |
| ```txt``` | 按钮内文字, 优先级低于 ```default slot``` | ```string``` |  |
| ```width``` | 按钮宽度, 可设置px vw | ```string```  ```number```  |  |
| ```height``` | 按钮高度, 可设置px vw | ```string```  ```number``` |  |
| ```backgroundColor``` | 按钮颜色 | ```string``` |  |
| ```color``` | 按钮文字颜色 | ```string``` |  |
| ```disabled``` | 是否禁用按钮 | ```boolean``` | ```false``` |

### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```click``` | 点击按钮，且按钮状态不为禁用时触发 | 	```event: MouseEvent``` |

### Slots
| 名称 | 说明 |
| :--- | :--- |
| ```default``` | 按钮内容 |
