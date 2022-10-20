# Marquee 跑马灯

## 介绍
跑马灯, 用于消息/奖品等列表滚动展示

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoMarquee } from 'moxui';

const app = createApp();
app.use(MoMarquee);


// 单文件组件引入
<!-- script:setup -->
import { MoMarquee } from 'moxui';

<!-- template -->
<mo-marquee></mo-marquee>
```

## 代码演示
**消息展示**
```
<mo-marquee>
  <div class="message">单条消息, 默认不滚动</div>
</mo-marquee>
<mo-marquee>
  <div class="message" scroll-behavior="scroll">单条消息, 强制滚动</div>
</mo-marquee>
<mo-marquee>
  <div class="message">多条消息, 超出容器, 自动滚动</div>
  <div class="message">多条消息, 超出容器, 自动滚动</div>
</mo-marquee>
```
**奖品展示**
```
<mo-marquee height="200">
  <gift-list>
    <gift-item></gift-item>
    ...
  </gift-list>
</mo-marquee>
```
**步跳滚动**
```
<mo-marquee scroll="step" :speed="650">
  <div class="message">向左步跳滚动消息1</div>
  <div class="message">向左步跳滚动消息2</div>
</mo-marquee>

<mo-marquee scroll="step" direction="top" :speed="150">
  <div class="message">向上步跳滚动消息1</div>
  <div class="message">向上步跳滚动消息2</div>
</mo-marquee>
```
**步跳滚动距离**
```
<!-- 消息宽度设置300一条, 与stepDistance匹配 -->
<mo-marquee
  scroll="step"
  :speed="650"
  scroll-behavior="scroll"
  step-distance="300"
>
  <div class="message">向左步跳滚动消息1</div>
  <div class="message">向左步跳滚动消息2</div>
</mo-marquee>

<!-- 消息高度设置50一条, 与stepDistance匹配 -->
<mo-marquee
  scroll="step"
  direction="top"
  :speed="150"
  step-distance="50"
  scroll-behavior="scroll"
>
  <div class="message">向上步跳滚动消息1</div>
  <div class="message">向上步跳滚动消息2</div>
</mo-marquee>
```
## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```width``` | 宽度 | ```string``` ```number``` | ```100%``` |
| ```height``` | 高度 | ```string``` ```number``` | ```100%``` |
| ```speed``` | 滚动速度 px per second | ```number``` | ```100``` |
| ```direction``` | 滚动方向, 可选 ```left``` ```top``` | ```string``` | ```left``` |
| ```scroll``` | 滚动方式, 可选 平滑```smooth``` 步跳```step``` | ```string``` | ```smooth``` |
| ```scrollBehavior``` | 滚动行为, 可选 ```auto```内容超出才滚动 ```scroll```一律滚动 ```none```不滚动 | ```string``` | ```auto``` |
| ```refreshBehavior``` | 内容更新时, 滚动更新方式, 可选 ```auto```在当前位置继续滚动  仅当已滚动距离超出现有宽度时才重置, ```restart```从头开始滚动  | ```string``` | ```auto``` |
| ```interval``` | 滚动间隔, 仅在 ```scrollBehavior === 'step'```时生效 | ```number``` | ```2500``` |
| ```stepDistance``` | 滚动距离, 仅在 ```scrollBehavior === 'step'```时生效, 默认100%的宽(direction:left)/高(direction:top)  | ```string``` ```number``` | ```auto``` |

### Events
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```scrollEnd``` | 一轮滚动结束 | 	 |

### Slots
| 名称 | 说明 |
| :--- | :--- |
| ```default``` | 滚动内容 |
