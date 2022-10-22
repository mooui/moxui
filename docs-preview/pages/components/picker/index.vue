<template>
  <div class="page page-picker">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">PICKER</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">单列</h4>
      <mo-picker
        :toolbar="{ title: '有标题' }"
        :columns="days"
        :default-index="5"
        @confirm="onConfirm"
        @change="onChange"
      ></mo-picker>
      <div class="sep">无标题</div>
      <mo-picker :columns="days" :default-index="3"></mo-picker>
    </section>
    <section class="code-section">
      <h4 class="code-title">多列</h4>
      <mo-picker
        :toolbar="{ title: '星期选择' }"
        :columns="week"
        @confirm="onConfirm"
        @change="onChange"
      ></mo-picker>
    </section>
    <section class="code-section">
      <h4 class="code-title">级联</h4>
      <mo-picker
        :toolbar="{ title: '地区选择' }"
        :columns="provinces"
        @confirm="onConfirm"
        @change="onChange"
      ></mo-picker>
    </section>
    <section class="code-section">
      <h4 class="code-title">配合popup使用</h4>
      <mo-button
        width="150"
        height="60"
        color="#fff"
        background-color="#ff0036"
        style="margin-left: 15px"
        @click="showPicker = true"
        >显示</mo-button
      >
    </section>
    <teleport to="body">
      <mo-popup v-model:show="showPicker" position="bottom" mask-click-close>
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
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { MoPicker, MoButton, MoPopup, Toast } from "moxui";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const week = [
  {
    values: days,
    defaultIndex: 4,
  },
  {
    values: ["morning", "afternoon", "night"],
    defaultIndex: 0,
  },
];

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

function onConfirm(
  values: string | number | Array<string | number>,
  indexes: number | number[]
) {
  showPicker.value = false;
  Toast(
    `confirm--- values: ${JSON.stringify(values)}, indexes: ${JSON.stringify(
      indexes
    )}`
  );
}
function onChange(
  values: string | number | Array<string | number>,
  indexes: number | number[]
) {
  Toast(
    `change--- values: ${JSON.stringify(values)}, indexes: ${JSON.stringify(
      indexes
    )}`
  );
}

const showPicker = ref(false);
</script>
<style lang="scss">
.page-picker {
  .mo-picker {
    background-color: #fff;
  }
  .sep {
    margin: 10px;
    font-size: 24px;
    color: #333;
  }
}
.picker-wrapper {
  overflow: auto;
  width: 100vw;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}
</style>
