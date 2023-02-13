<template>
  <div class="page page-scratch">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">SCRATCH</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基本用法</h4>
      <mo-button size="small" type="success" @click="startScratch"
        >开始</mo-button
      >
      <mo-button
        size="small"
        type="success"
        :style="{ 'margin-left': '20px' }"
        @click="resetScratch"
        >重置</mo-button
      >
      <div class="scratch-wrapper">
        <div class="content">666666</div>
        <div class="scratch-container">
          <mo-scratch
            ref="scratchInstance"
            :scratch-able="canScratch"
            absolute
            :area-padding="70"
            :finish-percent="85"
            :background="scratchBg"
            @finish="scratchEnd"
          ></mo-scratch>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { MoScratch, ScratchInstance, MoButton, Toast } from "moxui";

import scratchBg from "./scratch.png";
const scratchInstance = ref<ScratchInstance>();
const canScratch = ref(false);
function startScratch() {
  canScratch.value = true;
}
function resetScratch() {
  scratchInstance.value?.reset();
  canScratch.value = false;
}
function scratchEnd() {
  Toast("刮完了");
}
</script>
<style lang="scss">
.page-scratch {
}
</style>
