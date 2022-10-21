<template>
  <div class="page page-svga">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">LOADING</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基础用法</h4>
      <mo-button size="small" type="success" @click="func1">基础用法</mo-button>
    </section>
    <section class="code-section">
      <h4 class="code-title">显示固定时间</h4>
      <mo-button size="small" type="success" @click="func1"
        >显示固定时间</mo-button
      >
    </section>
    <section class="code-section">
      <h4 class="code-title">配置</h4>
      <mo-button size="small" type="success" @click="func2">配置</mo-button>
    </section>
    <section ref="container" class="code-section">
      <h4 class="code-title">指定容器</h4>
      <mo-button size="small" type="success" @click="func3">指定容器</mo-button>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { MoButton, Loading } from "moxui";

function func1() {
  Loading();
  setTimeout(() => {
    Loading.close();
  }, 2500);
}

function func2() {
  Loading({
    duration: 4000,
    zIndex: 1000,
    backgroundColor: "rgba(0,100,0,.1)",
  });
}
const container = ref<HTMLElement>();
function func3() {
  console.log(container.value);
  Loading({
    duration: 2500,
    container: container.value,
  });
}
</script>
<style lang="scss">
.page-loading {
}
</style>
