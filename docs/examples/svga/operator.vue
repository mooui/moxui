<template>
  <div class="svga-operator">
    <mu-svga
      ref="svga"
      :file="loadingSvga"
      width="200"
      height="200"
      :loop-times="0"
    ></mu-svga>

    <div class="operators">
      <a href="javascript:void(0);" @click="operator('start')">start</a>
      <a href="javascript:void(0);" @click="operator('stop')">stop</a>
      <a href="javascript:void(0);" @click="operator('pause')">pause</a>
      <a href="javascript:void(0);" @click="operator('clear')">clear</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { MuSvga } from "mooui";
import { ref } from "vue";
import loadingSvga from "./loading.svga";

const svga = ref<InstanceType<typeof MuSvga>>();

function operator(type: "start" | "stop" | "pause" | "clear") {
  if (svga.value) {
    (svga.value as any)[type]();
  }
}
</script>
<style lang="scss">
.svga-operator {
}
</style>
