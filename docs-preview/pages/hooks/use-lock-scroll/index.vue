<template>
  <div ref="page" class="page page-use-lock-scroll">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">USELOCKSCROLL</h2>
      </div>
    </div>
    <section class="code-section code-section-fixed">
      <h4 class="code-title">基础用法</h4>
      <mo-button @click="isLock = !isLock">切换</mo-button>
      <span style="margin-left: 10px">{{ isLock ? "LOCK" : "UNLOCK" }}</span>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useLockScroll, MoButton } from "moxui";

const isLock = ref(false);
const page = ref<HTMLElement>();
useLockScroll(page, () => isLock.value);
</script>
<style lang="scss">
.page-use-lock-scroll {
  height: 2500px;
  background: linear-gradient(180deg, #ccc, #444);
  .code-section-fixed {
    position: fixed;
    z-index: 5;
    top: 150px;
    left: 30px;
    right: 30px;
  }
}
</style>
