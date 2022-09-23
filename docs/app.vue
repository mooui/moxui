<template>
  <div @click="showLoading">启动测试</div>
</template>

<script setup lang="ts">
import { Loading } from "moxui";
function showLoading() {
  Loading({ duration: 200000 });
}
</script>

<style lang="scss"></style>
