# CountDown 倒计时

## 介绍

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoCountDown } from 'moxui';

const app = createApp();
app.use(MoCountDown);

```

## 代码演示

**基本用法**
```
<mo-count-down :time="99999"></mo-count-down>
```

**时间节点**
```
<mo-count-down
  :time="125"
  :time-point="[120, 100, 60]"
  @end="Toast('CountDown-2 End')"
  @time="
    (s:number) => {
      Toast(`CountDown-2 还剩${s}秒 ~`);
    }
  "
></mo-count-down>
```

**格式定义**
```
<mo-count-down
  :time="99999"
  format="DD 天 hh时 mm分 ss秒"
></mo-count-down>
```

**格式定义 {}**     
当格式字符串中存在模板字符(D|h|m|s), 模板字符需用{}包裹
```
<mo-count-down
  :time="99999"
  format="{DD} DDD {hh}hhh {mm}: {ss} ssss"
></mo-count-down>
```
**自定义样式**
```
<mo-count-down :time="99999">
  <template #default="current">
    <div>
      <span class="num">{{ current.totalHours }}</span>
      时
      <span class="num">{{ current.minutes }}</span>
      分
      <span class="num">{{ current.seconds }}</span>
      秒
    </div>
  </template>
</mo-count-down>
```

**手动操作**
```
<div class="btns">
  <mo-button type="success" size="small" @click="cd?.start()"
    >开始</mo-button
  >
  <mo-button type="success" size="small" @click="cd?.pause()"
    >暂停</mo-button
  >
  <mo-button type="success" size="small" @click="cd?.stop()"
    >停止</mo-button
  >
  <mo-button type="success" size="small" @click="cd?.reset()"
    >重置</mo-button
  >
</div>
<mo-count-down ref="cd" :time="200" auto-start="false"></mo-count-down>

<!-- script:setup -->
import { 
  MoCountDown,
  MoButton,
  CountDownInstance
} from "moxui";

const cd = ref<CountDownInstance>();
```

## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```time``` | 倒计时时间, 秒值 | ```number``` | - |
| ```auto-start``` | 是否自动开始 | ```boolean``` | ```true``` |
| ```format``` | 格式字符串, 模板字符: D-天, h-时, m-分, s-秒, 若格式字符串中存在模板字符, 模板字符用{}包裹, 模板字符两个(或以上)连写时, 不足10的数字才会在前置补0, 如 h -> 9  hh -> 09 | ```string``` | ```hh:mm:ss``` |
| ```time-point``` | 时间节点, 遇到对应的时间节点会抛出time事件  | ```number \| number[]``` | - |


### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```end``` | 倒计时结束 | 	- |
| ```time``` | 遇到设置的时间节点 | ```time:number``` |

### Slots
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| ```default``` | 自定义的倒计时格式 | ```current: { total:number; days:number; totalHours:number; hours:number; minutes:number; seconds:number; }``` | 
