# Scratch 刮奖

## 介绍

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoScratch } from 'moxui';

const app = createApp();
app.use(MoScratch);

```

## 代码演示
**基本用法**
```

```

## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```type``` | 按钮类型, 可选 ```confirm``` ```cancel``` | ```string``` | ```confirm``` |


### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```click``` | 点击按钮，且按钮状态不为禁用时触发 | 	```event: MouseEvent``` |

### Slots
| 名称 | 说明 |
| :--- | :--- |
| ```default``` | 按钮内容 |
