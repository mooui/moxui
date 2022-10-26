# useOutterClick

## 介绍
外部点击, 多用于外部点击时关闭组件内弹出层

## 引入
```
import { useOutterClick } from "moxui";
```

## 代码演示
**基础用法**
```
<!-- script:setup -->

const container = ref<HTMLElement>();

useOutterClick(container, () => {
  Toast.success("outter clicked");
});

```

### API


### 参数
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```rootRef``` | 元素ref, 其内部点击不触发 | ```Ref<HTMLElement>``` | - |
| ```callback``` | 外部点击回调 | ```()=>void``` | - |

