# useLockScroll

## 介绍
阻止滚动, 多用于弹窗时阻止背景页滚动

## 引入
```
import { useLockScroll } from "moxui";
```

## 代码演示
**基础用法**
```
<!-- script:setup -->
import { useLockScroll } from "moxui";

useLockScroll(scrollContainerRef,()=>showLock.value);
```

### API


### 参数
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```rootRef``` | 元素ref, 其内部仍可滚动 | ```Ref<HTMLElement>``` | - |
| ```shouldLock``` | 当前是否阻止滚动 | ```()=>boolean``` | - |

