# Svga Svga动画播放

## 介绍
用于播放svga动画

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoSvga } from 'moxui';

const app = createApp();
app.use(MoSvga);


// 单文件组件引入
<!-- script:setup -->
import { MoSvga } from 'moxui';

<!-- template -->
<mo-svga :file="loading">
  ...
</mo-svga>
```

## 代码演示

**基础用法**
```
<mo-svga
  :offset-top="100"
  :file="loadingSvga"
  width="200"
  height="200"
></mo-svga>
```

**播放次数**
```
<mo-svga
  :offset-top="100"
  :file="loadingSvga"
  width="200"
  height="200"
  :loop-times="2"
></mo-svga>
```

**播完清除**
```
<mo-svga
  :offset-top="100"
  :file="loadingSvga"
  width="200"
  height="200"
  :loop-times="1"
  clear-on-end
></mo-svga>
```

**操作**
```
<mo-button size="small" @click="svga?.clear()">clear</mo-button>
<mo-button size="small" @click="svga?.start()">start</mo-button>
<mo-button size="small" @click="svga?.stop()">stop</mo-button>
<mo-button size="small" @click="svga?.pause()">pause</mo-button>
<mo-svga
  ref="svga"
  :offset-top="100"
  :file="loadingSvga"
  width="200"
  height="200"
></mo-svga>
```
```
import { ref } from "vue";
import { MoButton, MoSvga, SvgaInstance } from "@moxui/components";
import loadingSvga from "../../../img/loading.svga";

const svga = ref<SvgaInstance>();
```

## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```file``` | svga文件url | ```string``` |  |
| ```loop-times``` | 循环次数, 0-无限循环 | ```number``` | ```0``` |
| ```width``` | 宽度 | ```string``` ```number``` | ```100%``` |
| ```height``` | 高度 | ```string``` ```number``` | ```100%``` |
| ```clear-on-end``` | 是否播放完清除 | ```boolean``` |  |

### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```start``` | 开始播放 |  |
| ```pause``` | 暂停播放 |  |
| ```stop``` | 停止播放 |  |
| ```end``` | 播放结束 |  |
| ```clear``` | 清除svga |  |
| ```process``` | 开始处理svga |  |

### 方法
| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| start | 开始播放 | - | - |
| stop | 停止播放 | - | - |
| pause | 暂停播放 | - | - |
| clear | 清除svga | - | - |
