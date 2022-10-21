# Toast 提示

## 介绍
弹出提示

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { Toast } from 'moxui';

const app = createApp();
app.use(Toast);


// 单文件组件引入
<!-- script:setup -->
import { Toast } from 'moxui';

Toast('message');
```

## 代码演示

**基础用法**
```
import { Toast } from 'moxui';

Toast('This is a normal test');
```

**带有ICON**
```
import { Loading } from 'moxui';

Loading(2500);
```

**配置**
```
import { Loading } from 'moxui';

Loading({
  duration:4000,
  zIndex:1000,
  backgroundColor: "rgba(0,100,0,.1)",
});
```

## API

### 方法
| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| ```Loading``` | 显示loading | ```options?: { show?: boolean; duration?: number; backgroundColor?: string; zIndex?: number; } \| boolean \| number``` | - |
| ```Loading.close``` | 关闭loading | - | - |
