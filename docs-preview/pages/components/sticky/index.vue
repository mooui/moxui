<template>
  <div class="page page-sticky">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">STICKY</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基础用法</h4>
      <mo-sticky :offset-top="100">
        <div class="tab">基础用法</div>
      </mo-sticky>
    </section>
    <section class="code-section code-section-2">
      <h4 class="code-title">设置top</h4>
      <mo-sticky :offset-top="150">
        <div class="tab tab2">距顶部50</div>
      </mo-sticky>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { MoSticky } from "@moxui/components";
</script>
<style lang="scss">
.page-sticky {
  height: 2500px;
  padding-top: 200px;
  .tab {
    width: 300px;
    text-align: center;
    line-height: 88px;
    border-radius: 20px;
    color: #fff;
    background-color: #07c160;

    &.tab2 {
      margin-left: 330px;
    }
  }

  .code-section-2 {
    margin-top: 300px;
  }
}
</style>
