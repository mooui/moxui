# Picker 选择器

## 介绍
提供多个选项集合供选择，支持单列选择和多列级联，通常与popup配合使用。

## 引入
```
// 入口引入
import { createApp } from 'vue';
import { MoPicker } from 'moxui';

const app = createApp();
app.use(MoPicker);


// 单文件组件引入
<!-- script:setup -->
import { MoPicker } from 'moxui';

<!-- template -->
<mo-picker :columns="columns"></mo-picker>
```

## 代码演示
**单列**
```
<mo-picker
  :toolbar="{ title: '有标题' }"
  :columns="days"
  :default-index="5"
  @confirm="onConfirm"
  @change="onChange"
></mo-picker>
```
```
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
```
无标题
```
<mo-picker
  :columns="days"
  :default-index="5"
  @confirm="onConfirm"
  @change="onChange"
></mo-picker>
```

**多列**
```
<mo-picker
  :toolbar="{ title: '星期选择' }"
  :columns="week"
  @confirm="onConfirm"
  @change="onChange"
></mo-picker>
```
```
const week = [
  {
    values: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    defaultIndex: 4,
  },
  {
    values: ["morning", "afternoon", "night"],
    defaultIndex: 0,
  },
];
```
**级联**
```
<mo-picker
  :toolbar="{ title: '地区选择' }"
  :columns="provinces"
  @confirm="onConfirm"
  @change="onChange"
></mo-picker>
```
```
const provinces = [
  {
    text: "广东省",
    children: [
      {
        text: "广州市",
        children: [
          {
            text: "天河区",
          },
          {
            text: "黄埔区",
          },
          {
            text: "花都区",
          },
          {
            text: "从化区",
          },
          {
            text: "白云区",
          },
        ],
      },
      {
        text: "佛山市",
        children: [
          {
            text: "南海区",
          },
          {
            text: "顺德区",
          },
          {
            text: "禅城区",
          },
          {
            text: "三水区",
          },
          {
            text: "高明区",
          },
        ],
      },
      {
        text: "珠海市",
        children: [
          {
            text: "斗门区",
          },
          {
            text: "香洲区",
          },
        ],
      },
    ],
  },
  {
    text: "江西省",
    active: true,
    children: [
      {
        text: "南昌市",
        children: [
          {
            text: "南昌县",
          },
          {
            text: "红谷滩新区",
          },
          {
            text: "西湖区",
          },
          {
            text: "青山湖区",
          },
        ],
      },
      {
        text: "吉安市",
        active: true,
        children: [
          {
            text: "新干县",
            active: true,
          },
          {
            text: "吉水县",
          },
          {
            text: "峡江县",
          },
          {
            text: "吉州区",
          },
        ],
      },
      {
        text: "宜春市",
        children: [
          {
            text: "樟树市",
          },
          {
            text: "丰城市",
          },
          {
            text: "高安市",
          },
          {
            text: "袁州区",
          },
        ],
      },
    ],
  },
  {
    text: "浙江省",
    children: [
      {
        text: "杭州市",
        children: [
          {
            text: "上城区",
          },
          {
            text: "西湖区",
          },
          {
            text: "滨江区",
          },
          {
            text: "拱墅区",
          },
        ],
      },
      {
        text: "宁波市",
        children: [
          {
            text: "海曙区",
          },
          {
            text: "江北区",
          },
          {
            text: "镇海区",
          },
        ],
      },
    ],
  },
];
```
**配合popup使用**
```
<teleport to="body">
  <mo-popup 
    v-model:show="showPicker"
    position="bottom"
    mask-click-close
  >
    <div class="picker-wrapper">
      <mo-picker
        :toolbar="{ title: '地区选择' }"
        :columns="provinces"
        @confirm="onConfirm"
        @change="onChange"
        @cancel="showPicker = false"
      ></mo-picker>
    </div>
  </mo-popup>
</teleport>
```
```
import { ref } from "vue";
import { MoPicker, MoPopup, Toast } from "moxui";

const showPicker = ref(false);

function onConfirm(
  values: string | number | Array<string | number>,
  indexes: number | number[]
) {
  showPicker.value = false;
  Toast(
    `confirm--- values: ${JSON.stringify(values)},
    indexes: ${JSON.stringify(
      indexes
    )}`
  );
}

function onChange(
  values: string | number | Array<string | number>,
  indexes: number | number[]
) {
  Toast(
    `change--- values: ${JSON.stringify(values)},
    indexes: ${JSON.stringify(
      indexes
    )}`
  );
}
```
## API

### props
| 参数 | 说明	| 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ```toolbar``` | 标题栏配置, 包含```toolbar slot```时无效  | ```{ title: string; cancelText?: string; confirmText?: string; }```  |  |
| ```defaultIndex``` | 单列下的初始值 | ```number``` | ```0``` |
| ```itemHeight``` | 选项高度, 支持px vw number | ```string``` ```number``` | ```98``` |
| ```columns``` | 供选择的值 | 下方详细说明 | 必填 |
| ```visibleCount``` | 显示的选项数 | ```number``` | ```5``` |
| ```inertialDuration``` | 惯性滚动动画时长, 单位ms | ```number``` | ```1000``` |

### columns数据结构
```
interface Column {
  text: string | number;
  active?: boolean;
  children?: Column[];
}

type Columns = Array<
  | string
  | number
  | { values: Array<string | number>; defaultIndex: number }
  | Column
>;
```

### Events
**多列时回调参数为数组**
| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| ```cancel``` | 点击取消按钮 | ```values:string\|number\|Array<sttring\|number>,``` ```indexes:number\|number[]```	 |
| ```change``` | 滚动切换 | ```values:string\|number\|Array<sttring\|number>,``` ```indexes:number\|number[]```	 |
| ```confirm``` | 点击确认按钮 | ```values:string\|number\|Array<sttring\|number>,``` ```indexes:number\|number[]```	 |

### Slots
| 名称 | 说明 |
| :--- | :--- |
| ```toolbar``` | 标题栏 |
