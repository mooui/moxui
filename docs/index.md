# MOXUI

## 介绍
基于vue3的移动端组件库   
[npm地址](https://www.npmjs.com/package/moxui)

## 安装使用
```
pnpm add moxui

// 全部安装
import { createApp } from "vue";
import Moxui from "moxui";
const app = createApp();
app.use(Moxui);

// 个别使用
import { Toast, MoSticky } from "moxui";

<!-- template -->
<mo-sticky></mo-sticky>

<!-- setup -->
Toast.loading("加载中...");
```


