<template>
  <div @click="showLoading">启动测试</div>
</template>

<script setup lang="ts">
import { Toast } from "moxui";
function showLoading() {
  Toast.loading({
    message: "加载中...",
    duration: 0,
  });
  setTimeout(() => {
    Toast.error("加载成功 ~");
  }, 2500);
}
</script>

<style lang="scss"></style>
