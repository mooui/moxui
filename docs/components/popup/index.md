# Popup 弹窗遮罩

## 介绍
弹出层容器，用于展示弹窗。

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoPopup } from 'moxui';

const app = createApp();
app.use(MoPopup);


// 单文件组件引入
<!-- script:setup -->
import { MoPopup } from 'moxui';

<!-- template -->
<mo-popup v-model:show="showPopup"></mo-popup>
```

## 代码演示

**基础用法**
```
<mo-button size="small" @click="showPopup = true">打开</mo-button>
<mo-popup v-model:show="showPopup" mask-click-close>
  <div class="content1">弹窗内容</div>
</mo-popup>
```

**弹出位置**
```
<mo-button 
  size="small" 
  @click="(showPopup = true) && (position = 'top')"
  >top</mo-button
>
<mo-button
  size="small"
  @click="(showPopup = true) && (position = 'right')"
  >right</mo-button
>
<mo-button
  size="small"
  @click="(showPopup = true) && (position = 'bottom')"
  >bottom</mo-button
>
<mo-button
  size="small"
  @click="(showPopup = true) && (position = 'left')"
  >left</mo-button
>
<mo-popup 
  v-model:show="showPopup"
  mask-click-close
  :position="position"
>
  <div
    v-if="position === 'left' || position === 'right'"
    class="content-v"
  ></div>
  <div v-else class="content-h"></div>
</mo-popup>
```
```
const showPopup = ref(false);
const position = ref("top");
```

**弹出动画**
```
<mo-button
  size="small"
  @click="(showPopup3 = true) && (animation = 'fade')"
  >fade</mo-button
>
<mo-button
  size="small"
  @click="(showPopup3 = true) && (animation = 'zoom')"
  >zoom</mo-button
>
<mo-button
  size="small"
  @click="(showPopup3 = true) && (animation = 'zoom-fade')"
  >zoom-fade</mo-button
>
<mo-button
  size="small"
  @click="(showPopup3 = true) && (animation = 'top')"
  >top</mo-button
>
<mo-popup
  v-model:show="showPopup3"
  mask-click-close
  :animation="animation"
>
  <div class="content1">弹窗内容</div>
</mo-popup>
```
```
const showPopup3 = ref(false);
const animation = ref("fade");
```
## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```v-model:show``` | 控制弹窗显示  | ```boolean```  | ```false``` |
| ```z-index``` | 弹出层的zIndex, 可省略 | ```string``` ```number``` |  |
| ```mask-click-close``` | 点击遮罩层是否关闭弹窗 | ```boolean``` |  |
| ```position``` | 弹窗位置, ```center``` ```top``` ```right``` ```bottom``` ```left``` ```top:200```(等同```top:200px```) ```right:10vw``` ```left:50px``` 其他方向可以类推 | ```string``` | ```center``` |
| ```animation``` | 动画类型, 支持 ```fade``` ```zoom``` ```zoom-fade``` ```top``` ```right``` ```bottom``` ```left``` ```top-full``` ```right-full``` ```bottom-full``` ```left-full``` | ```string``` | 根据弹出层位置匹配动画 |
| ```duration``` | 弹窗动画时长, 单位ms | ```number``` | ```300``` |
| ```before-close``` | 关闭前拦截器, ```return false \| Promise<false>```, 阻止关闭弹窗 | ```function``` |  |
| ```teleport``` | 弹窗挂载位置, 相当于```teleport```的```to```属性 |  |  |
| ```lock-scroll``` | 是否阻止页面滚动 | ```boolean``` | ```true``` |
| ```mask-background``` | 遮罩背景 | ```string``` | ```rgba(0,0,0,.4)```  |

["update:show", "close", "closed", "open", "opened"]
### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```update:show``` | 更新show状态 | ```show:boolean```	 |
| ```close``` | 准备关闭 | 	 |
| ```closed``` | 弹窗已关闭, (动画已结束) |  |
| ```open``` | 准备打开 |  |
| ```opened``` | 弹窗已打开, (动画已结束) |  |

### Slots
| 名称 | 说明 |
| :--- | :--- |
| ```default``` | 弹窗内容 |
