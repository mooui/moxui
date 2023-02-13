<template>
  <div class="page page-scratch">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">SCRATCH</h2>
      </div>
    </div>
    <div v-if="isPC" class="tips">
      电脑端无法触发touch事件, 请跳转<a
        href="/mobile/index.html#/components/scratch"
        target="_blank"
        >手机版</a
      >, 并使用手机预览模式查看
    </div>
    <section class="code-section">
      <h4 class="code-title">基本用法</h4>
      <mo-button size="small" type="success" @click="startScratch1"
        >开始</mo-button
      >
      <mo-button
        size="small"
        type="success"
        :style="{ 'margin-left': '20px' }"
        @click="resetScratch1"
        >重置</mo-button
      >
      <div class="scratch-wrapper">
        <div class="content">666666</div>
        <div class="scratch-container">
          <mo-scratch
            ref="scratchInstance1"
            :scratch-able="canScratch1"
            absolute
            :area-padding="70"
            :finish-percent="85"
            text="刮开涂层"
            @finish="scratchEnd"
          ></mo-scratch>
        </div>
      </div>
    </section>
    <section class="code-section">
      <h4 class="code-title">图片背景</h4>
      <mo-button size="small" type="success" @click="startScratch2"
        >开始</mo-button
      >
      <mo-button
        size="small"
        type="success"
        :style="{ 'margin-left': '20px' }"
        @click="resetScratch2"
        >重置</mo-button
      >
      <div class="scratch-wrapper">
        <div class="content">666666</div>
        <div class="scratch-container">
          <mo-scratch
            ref="scratchInstance2"
            :scratch-able="canScratch2"
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
import { MoScratch, ScratchInstance, MoButton, Toast } from "moxui";
import { ref } from "vue";
import scratchBg from "./scratch.png";

const isPC =
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// #region 基本用法
const scratchInstance1 = ref<ScratchInstance>();
const canScratch1 = ref(false);
function startScratch1() {
  canScratch1.value = true;
}
function resetScratch1() {
  scratchInstance1.value?.reset();
  canScratch1.value = false;
}
function scratchEnd() {
  Toast("刮完了");
}
// #endregion

// #region 图片背景
const scratchInstance2 = ref<ScratchInstance>();
const canScratch2 = ref(false);
function startScratch2() {
  canScratch2.value = true;
}
function resetScratch2() {
  scratchInstance2.value?.reset();
  canScratch2.value = false;
}
// #endregion
</script>
<style lang="scss">
.page-scratch {
  .tips {
    margin: 10px 0 30px;
    line-height: 42px;
    color: #ff976a;
  }
  .scratch-wrapper {
    position: relative;
    width: 524px;
    height: 235px;
    margin: 20px auto;
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      font-family: DIN-Bold;
      font-size: 100px;
    }

    .scratch-container {
    }
  }
}
</style>
