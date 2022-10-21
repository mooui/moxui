# Toast 提示

## 介绍
弹出提示, 只支持单例模式

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

**普通提示**
```
import { Toast } from 'moxui';

// 普通提示
Toast('This is a normal test.');
// 普通长提示
Toast('This is a normal test.This is a normal tes...');
```

**提示图标**
```
import { Toast } from 'moxui';

// loading
Toast.loading({ message: 'loading...', duration: 2500 });

// success
Toast.success('success');

// warn
Toast.warn('warn');

// error
Toast.error('error');
```

**行内提示图标**
```
import { Toast } from 'moxui';

// loading
Toast({
  message: 'loading...',
  duration: 2500,
  icon: 'loading',
  iconPosition: 'inline',
});

// success
Toast({
  message: 'success...',
  icon: 'success',
  iconPosition: 'inline',
});

// warn
Toast({
  message: 'warn...',
  icon: 'warn',
  iconPosition: 'inline',
});

// error
Toast({
  message: 'error...',
  duration: 2500,
  icon: 'error',
  iconPosition: 'inline',
});
```

**衔接**
```
import { Toast } from 'moxui';

// 加载 - 成功
Toast.loading("加载中...");
setTimeout(() => {
  Toast.success("加载成功");
}, 1500);

// 加载 - 失败
Toast.loading("加载中...");
setTimeout(() => {
  Toast.error("加载失败");
}, 1500);

// 加载 - 提醒
Toast.loading("加载中...");
setTimeout(() => {
  Toast.warn("WARNING!");
}, 1500);
```

**遮罩**
```
import { Toast } from 'moxui';

Toast({
  message: '遮罩Toast',
  type: 'loading',
  duration: 2500,
  mask: 'rgba(0,0,0,.4)',
});
```

**自定义ICON**
```
import { Toast } from 'moxui';
import helpIcon from "/image/help.png";

Toast({
  message: '自定义ICON',
  icon: helpIcon,
});
```

## API

### options
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```message``` | 消息 | ```string``` ```number``` |  |
| ```show``` | 是否显示Toast | ```boolean``` | ```true``` |
| ```duration``` | 显示事件 | ```number``` | ```2500```, ```type=loading```时默认```0``` |
| ```transitionDuration``` | Toast动画时间 | ```number```  ```500```  |  |
| ```zIndex``` | 元素的zIndex | ```number``` |  |
| ```mask``` | 遮罩定义, string类型指定遮罩背景 | ```string``` ```boolean``` |  |
| ```forbidClick``` | 是否禁止背景点击, 存在mask是默认true | ```boolean``` |  |
| ```type``` | Toast图标类型, 可选```loading``` ```success``` ```warn``` ```error``` | ```string``` |  |
| ```icon``` | Toast图标, 可指定type值 | ```string``` ```{ src?: string; width?: number; height?: number; isLoading?: boolean; }``` |  |
| ```iconPosition``` | Icon位置, 可选```inline``` ```center``` | ```string``` | ```center``` |

### 方法
| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| ```Toast``` | 显示Toast | ```string``` ```number``` ```options```(见上方) | - |
| ```Toast.loading``` | 显示loading Toast | ```string``` ```number``` ```options```(见上方), options中不包含(icon, iconPosition, type) |  | - |
| ```Toast.success``` | 显示success Toast | ```string``` ```number``` ```options```(见上方), options中不包含(icon, iconPosition, type) | - |
| ```Toast.warn``` | 显示warn Toast | ```string``` ```number``` ```options```(见上方), options中不包含(icon, iconPosition, type) | - |
| ```Toast.error``` | 显示error Toast | ```string``` ```number``` ```options```(见上方), options中不包含(icon, iconPosition, type) | - |
| ```Toast.close``` | 关闭Toast | - | - |
