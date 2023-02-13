# SlotMachine 老虎机

## 介绍

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoSlotMachine } from 'moxui';

const app = createApp();
app.use(MoSlotMachine);

```

## 代码演示
**抽靓号**
```
<!-- html -->
<mo-button size="small" type="success" @click="getGoodNumber"
  >抽奖</mo-button
>
<input v-model="numbers" type="text" class="good-num" />
<mo-slot-machine
  ref="goodNumberSlot"
  :cols="6"
  item-style="font-size:60px;font-weight:700;"
/>
```

```
// js
const numbers = ref("666666");
const goodNumberSlot = ref<SlotMachineInstance>();

function getGoodNumber() {
  if (!/^\d{6}$/.test(numbers.value)) {
    Toast("靓号应为6位数字 ~");
    return;
  }
  goodNumberSlot.value?.reset(false).then(() => {
    goodNumberSlot
      .value?
      .scroll(numbers.value.split("")
      .map((n) => Number(n)));
  });
}
```

**老虎机**
```
<!-- html -->
<mo-button size="small" type="success" @click="getSlotMachine"
  >老虎机</mo-button
>
<div class="slot-machine-wrapper">
  <mo-slot-machine
    ref="slotMachine"
    :type="1"
    :cols="3"
    :items="items"
    item-style="max-width:150px;max-height:150px;"
  />
</div>
```

```
// js
const slotMachine = ref<SlotMachineInstance>();
const items = [
  // pass
];
function getSlotMachine() {
  // 模拟结果
  const result = new Array(7)
    .fill(0)
    .map((n, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
    
  slotMachine.value?.reset(false).then(() => {
    slotMachine.value?.scroll(result);
  });
}
```

## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```type``` | 类型, 0-文字 1-图片 | ```number``` | ```0``` |
| ```items``` | 滚动的物品, 文字或图片url | ```string[]``` | ```["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]``` |
| ```width``` | 宽度 | ```string``` ```number``` | ```100%``` |
| ```height``` | 高度 | ```string``` ```number``` | ```100%``` |
| ```cols``` | 元素列数 | ```number``` | ```3``` |
| ```rows``` | 滚动行数 | ```number``` | ```Math.round(items.length * 1.6)``` |
| ```result``` | 结果 | ```number[]``` |  |
| ```default``` | 初始显示元素 | ```number[]``` | 默认```items[0]``` |
| ```animationDuration``` | 滚动时间 | ```number``` | ```2``` |
| ```itemStyle``` | 元素样式 | ```string, object``` |  |



### 方法
| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| ```scroll``` | 开始滚动 | ```result:number[]```, props.result 或 result参数至少需要一个 | ```Promise<any>``` |
| ```reset``` | 重置 | ```useDefault:boolean = true```, 是否以初始值重置, 否则使用上次结果重置 | ```Promise<any>``` |
