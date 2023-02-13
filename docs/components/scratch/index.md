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
<!-- html -->
<mo-button size="small" type="success" @click="startScratch"
  >开始</mo-button
>
<mo-button
  size="small"
  type="success"
  :style="{ 'margin-left': '20px' }"
  @click="resetScratch"
  >重置</mo-button
>
<div class="scratch-wrapper">
  <div class="content">666666</div>
  <div class="scratch-container">
    <mo-scratch
      ref="scratchInstance"
      :scratch-able="canScratch"
      absolute
      :area-padding="70"
      :finish-percent="85"
      text="刮开涂层"
      @finish="scratchEnd"
    ></mo-scratch>
  </div>
</div>
```

```
// js
const scratchInstance = ref<ScratchInstance>();
const canScratch = ref(false);
function startScratch() {
  canScratch.value = true;
}
function resetScratch() {
  scratchInstance.value?.reset();
  canScratch.value = false;
}
function scratchEnd() {
  Toast("刮完了");
}
```
**图片背景**
```
<!-- html -->
<mo-button size="small" type="success" @click="startScratch"
  >开始</mo-button
>
<mo-button
  size="small"
  type="success"
  :style="{ 'margin-left': '20px' }"
  @click="resetScratch"
  >重置</mo-button
>
<div class="scratch-wrapper">
  <div class="content">666666</div>
  <div class="scratch-container">
    <mo-scratch
      ref="scratchInstance"
      :scratch-able="canScratch"
      absolute
      :area-padding="70"
      :finish-percent="85"
      :background="scratchBg"
      @finish="scratchEnd"
    ></mo-scratch>
  </div>
</div>
```

```
// js
import scratchBg from "./scratch.png";
const scratchInstance = ref<ScratchInstance>();
const canScratch = ref(false);
function startScratch() {
  canScratch.value = true;
}
function resetScratch() {
  scratchInstance.value?.reset();
  canScratch.value = false;
}
function scratchEnd() {
  Toast("刮完了");
}
```

## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```absolute``` | 是否绝对定位 | ```boolean``` | ```false``` |
| ```radius``` | 手指触点刮开半径 | ```number``` | ```8``` |
| ```scratchAble``` | 是否能够刮动 | ```boolean``` | ```false``` |
| ```styles``` | 样式, 决定区域大小 | ```Object``` | ```{width: "100%",height: "100%"}``` |
| ```background``` | 背景: 颜色/图片 | ```string``` | ```#ccc``` |
| ```finishPercent``` | 判定刮完比例, 刮开多少算刮完, 百分比值, default: 80 | ```number``` | ```80``` |
| ```areaPadding``` | 有效刮奖区域, 以该区域内刮开比例判断是否finish, 定义类似padding, 上右下左 | ```number|numbers``` | ```0``` |
| ```autoClear``` | 是否触发finish后自动清空 | ```boolean``` | ```true``` |
| ```text``` | 涂层上的文字 | ```string``` |  |
| ```textStyle``` | 涂层上的文字样式 | ```{color?: string;fontSize?: number | string;fontWeight?: number | string;fontFamily?: string;}``` | ```{}``` |

### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```finish``` | 当前已刮完 |  |

### 方法
| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| ```reset``` | 重置 |  |  |
| ```clear``` | 清空刮板 |  |  |
