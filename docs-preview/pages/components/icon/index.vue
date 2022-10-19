<template>
  <div class="page">
    <div class="header">
      <div class="header-content">
        <router-link to="./" class="back"></router-link>
        <h2 class="title">ICON</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">success</h4>
      <mo-icon size="60"></mo-icon>
    </section>
    <section class="code-section" style="background-color: #f1f1f1">
      <h4 class="code-title">error</h4>
      <mo-icon size="60" type="error"></mo-icon>
    </section>
    <section class="code-section">
      <h4 class="code-title">warn</h4>
      <mo-icon size="60" type="warn"></mo-icon>
    </section>
    <section class="code-section">
      <h4 class="code-title">loading</h4>
      <mo-icon size="60" type="loading"></mo-icon>
    </section>
    <section class="code-section">
      <h4 class="code-title">动画 (除loading外, 仅显示时动画一次)</h4>
      <mo-icon size="60" type="success" animate></mo-icon>
      <mo-icon size="60" type="error" animate></mo-icon>
      <mo-icon size="60" type="warn" animate></mo-icon>
      <mo-icon size="60" type="loading" animate></mo-icon>
    </section>
    <section class="code-section">
      <h4 class="code-title">切换</h4>
      <mo-icon size="60" :type="type" animate></mo-icon>
      <mo-button
        width="150"
        height="60"
        color="#fff"
        class="change-button"
        background-color="#ff0036"
        @click="changeType"
        >切换</mo-button
      >
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { MoIcon, MoButton } from "moxui";

const type = ref("success");
const types = ["success", "warn", "error", "loading"];
function changeType() {
  type.value = types[(types.indexOf(type.value) + 1) % types.length];
}
</script>
<style lang="scss">
.change-button {
  margin-left: 20px;
  vertical-align: middle;
}
.code-section:nth-child(6) {
  .mo-icon {
    margin: 0 10px;
  }
}
</style>
