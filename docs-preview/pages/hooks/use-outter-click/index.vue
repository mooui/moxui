<template>
  <div class="page page-use-outter-click">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">USEOUTTERCLICK</h2>
      </div>
    </div>
    <section class="code-section code-section-fixed">
      <h4 class="code-title">基础用法</h4>
      <div ref="container" class="container">click outter to toast</div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Toast, useOutterClick } from "moxui";

const container = ref<HTMLElement>();
useOutterClick(container, () => {
  Toast.success("outter clicked");
});
</script>
<style lang="scss">
.page-use-outter-click {
  .container {
    width: 400px;
    margin: 0 auto;
    line-height: 400px;
    text-align: center;
    font-size: 24px;
    background-color: #ccc;
    cursor: not-allowed;
    user-select: none;
  }
}
</style>
