# SmsCode 验证码输入框

## 介绍
验证码输入

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoSmsCode } from 'moxui';

const app = createApp();
app.use(MoSmsCode);


// 单文件组件引入
<!-- script:setup -->
import { MoSmsCode } from 'moxui';

<!-- template -->
<mo-sms-code
  v-model="code"
  title="输入验证码"
  tips="验证码已发送至 199 **** 0000"
  @finish="login"
>
</mo-sms-code>
```

## 代码演示

```
<mo-sms-code
  v-model="code"
  title="输入验证码"
  tips="验证码已发送至 199 **** 0000"
  @finish="login"
>
</mo-sms-code>
```
```
import { ref } from "vue";
const code = ref("");
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

