# Sticky 吸顶组件

## 介绍
验证码输入

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoSticky } from 'moxui';

const app = createApp();
app.use(MoSticky);


// 单文件组件引入
<!-- script:setup -->
import { MoSticky } from 'moxui';

<!-- template -->
<mo-sticky>
  ...
</mo-sticky>
```

## 代码演示
**基础用法**
```
<mo-sticky>
  <div>基础用法</div>
</mo-sticky>
```
**设置top**
```
<mo-sticky :offset-top="50">
  <div>距顶部50</div>
</mo-sticky>
```
## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```v-model``` | 验证码的值 | ```string``` | "" |
| ```length``` | 验证码长度 | ```number``` | ```6``` |
| ```title``` | 标题 | ```string``` |  |
| ```tips``` | 提示 | ```string``` |  |

### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```update:modelValue``` | 验证码更新 | ```code``` |
| ```finish``` | 验证码输入完成 | 	```code``` |

