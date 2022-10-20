<template>
  <div class="page page-popup">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">POPUP</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基础用法</h4>
      <mo-button size="small" @click="showPopup1 = true">打开</mo-button>
      <mo-popup v-model:show="showPopup1" mask-click-close>
        <div class="content1">弹窗内容</div>
      </mo-popup>
    </section>
    <section class="code-section">
      <h4 class="code-title">弹出位置</h4>
      <mo-button size="small" @click="(showPopup2 = true) && (position = 'top')"
        >top</mo-button
      >
      <mo-button
        size="small"
        @click="(showPopup2 = true) && (position = 'right')"
        >right</mo-button
      >
      <mo-button
        size="small"
        @click="(showPopup2 = true) && (position = 'bottom')"
        >bottom</mo-button
      >
      <mo-button
        size="small"
        @click="(showPopup2 = true) && (position = 'left')"
        >left</mo-button
      >
      <mo-popup v-model:show="showPopup2" mask-click-close :position="position">
        <div
          v-if="position === 'left' || position === 'right'"
          class="content-v"
        ></div>
        <div v-else class="content-h"></div>
      </mo-popup>
    </section>
    <section class="code-section">
      <h4 class="code-title">弹出动画</h4>
      <mo-button
        size="small"
        @click="(showPopup3 = true) && (animation = 'fade')"
        >fade</mo-button
      >
      <mo-button
        size="small"
        @click="(showPopup3 = true) && (animation = 'zoom')"
        >zoom</mo-button
      >
      <mo-button
        size="small"
        @click="(showPopup3 = true) && (animation = 'zoom-fade')"
        >zoom-fade</mo-button
      >
      <mo-button
        size="small"
        @click="(showPopup3 = true) && (animation = 'top')"
        >top</mo-button
      >
      <mo-popup
        v-model:show="showPopup3"
        mask-click-close
        :animation="animation"
      >
        <div class="content1">弹窗内容</div>
      </mo-popup>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { MoButton, MoPopup } from "moxui";

const showPopup1 = ref(false);

const showPopup2 = ref(false);
const position = ref("top");

const showPopup3 = ref(false);
const animation = ref("fade");
</script>
<style lang="scss">
.page-popup {
  .mo-button {
    margin-right: 10px;
  }
  .content1 {
    width: 300px;
    height: 300px;
    text-align: center;
    line-height: 300px;
    background-color: #fff;
  }
  .content-v {
    width: 40vw;
    height: 100vh;
    background-color: #fff;
  }
  .content-h {
    width: 100vw;
    height: 30vh;
    background-color: #fff;
  }
}
</style>
