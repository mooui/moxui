# Dialog 对话框

## 介绍
弹出对话框

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { Dialog } from 'moxui';

const app = createApp();
app.use(Dialog);


// 单文件组件引入
<!-- script:setup -->
import { Dialog } from 'moxui';

Dialog({
  title:'消息',
  content:'一条消息'
});
```

## 代码演示

**基础用法**
```
import { Dialog, Toast } from "moxui";

function showDialog() {
  Dialog({
    title: "基础用法",
    content: "基础用法 基础用法 基础用法",
    close: true,
  }).then((type) => {
    Toast(["close", "cancel", "confirm"][type]);
  });
}
```

**拦截器**
```
import { Dialog, Toast, DialogActionType } from "moxui";

function showDialog() {
  Dialog({
    title: "拦截器",
    content: "使用拦截器",
    close: true,
    beforeClose: (type: DialogActionType) => {
      switch (type) {
        case DialogActionType.CLOSE:
          Toast("closed");
          break;
        case DialogActionType.CANCEL:
          Toast("interceptor canceled!");
          return false;
        case DialogActionType.CONFIRM:
          Toast("async interceptor canceled!");
          return false;
      }
    },
  });
}
```

**使用组件**           
当需要定制内容时, 使用组件形式
```
import { Dialog, Toast, MoButton, DialogActionType } from "moxui";
const MoDialog = Dialog.Component;

function showDialog() {
  Dialog({
    title: "基础用法",
    content: "基础用法 基础用法 基础用法",
    close: true,
  }).then((type) => {
    Toast(["close", "cancel", "confirm"][type]);
  });
}
<!-- template -->
<mo-dialog v-model:show="isShowDialog" :title="'组件调用'">
  <template #close>
    <a 
      href="javascript:void(0);" 
      class="close-0" 
      @click="isShowDialog = false"
    ></a>
  </template>
  <template #button>
    <mo-button type="success" @click="isShowDialog = false"
      >成功</mo-button
    >
  </template>
  <div class="messages">
    <div class="txt">Dialog 组件调用</div>
    <div class="icon"></div>
  </div>
</mo-dialog>
```

## API

### options DialogOptions
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```title``` | 标题  | ```string``` | - |
| ```content``` | 内容 | ```string``` | - |
| ```close``` | 关闭按钮配置 | ```true``` or ```DialogCloseOption```(见下表) | - |
| ```btns``` | 按钮配置 | ```Array<string \| { txt: string; active?: boolean }>```  | 取消、确认 |
| ```contentHeight``` | 内容高度, 若设置, 超出内容将滚动 | ```number``` | - |
| ```style``` | 内容样式 | ```CSSProperties``` | - |
| ```duration``` | 对话框显示时间ms, 到时自动关闭 | ```number``` | - |
| ```beforeClose``` | 点击拦截器, 默认点击后就关闭, 拦截器显式返回```false \| Promise<false>```, 将阻止弹窗关闭 | ```(args:any)=>boolean \| Promise<boolean> \| undefined``` | - |
| ```parent``` | 挂载位置 | ```string``` ```HTMLElement``` | - |



### 返回值
| 参数 | 说明	| 类型 | 
| :--- | :--- | :--- | 
| ```Promise<DialogActionType>``` | DialogActionType标识点击的按钮 | - | 

### DialogCloseOption
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```top``` | 距顶部距离  | ```number``` | ```20``` |
| ```right``` | 距右侧距离  | ```number``` | ```20``` |
| ```width``` | 关闭图标宽 | ```number``` | ```30``` |
| ```height``` | 关闭图标高 | ```number``` | ```30``` |
| ```icon``` | 关闭按钮src | ```string``` | 内置图片 |


### 组件Props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```v-model:show``` | 是否显示对话框  | ```boolean``` | - |
| ```title``` | 标题  | ```string``` | - |
| ```content``` | 内容 | ```string``` | - |
| ```close``` | 关闭按钮配置 | ```true``` or ```DialogCloseOption```(见下表) | - |
| ```btns``` | 按钮配置 | ```Array<string \| { txt: string; active?: boolean }>```  | 取消、确认 |
| ```contentHeight``` | 内容高度, 若设置, 超出内容将滚动 | ```number``` | - |
| ```style``` | 内容样式 | ```CSSProperties``` | - |

### 组件Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```close``` | 关闭按钮点击 | 	- |
| ```cancel``` | 取消按钮点击 | 	- |
| ```confirm``` | 确认按钮点击 | 	- |

### 组件Slots
| 名称 | 说明 |
| :--- | :--- |
| ```default``` | 对话内容 |
| ```close``` | 关闭按钮 |
| ```button``` | 按钮 |
