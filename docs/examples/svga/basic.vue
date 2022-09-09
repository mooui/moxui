<template>
  <div class="svga-basic">
    <mu-svga
      :file="loadingSvga"
      width="200"
      height="200"
      :loop-times="0"
    ></mu-svga>
  </div>
</template>
<script lang="ts" setup>
import { MuSvga } from "mooui";
import loadingSvga from "./loading.svga";
</script>
<style lang="scss">
.svga-basic {
}
</style>
