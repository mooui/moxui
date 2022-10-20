<template>
  <div class="page page-svga">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">SVGA</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基础用法</h4>
      <mo-svga
        :offset-top="100"
        :file="loadingSvga"
        width="200"
        height="200"
      ></mo-svga>
    </section>
    <section class="code-section">
      <h4 class="code-title">播放次数</h4>
      <mo-svga
        :offset-top="100"
        :file="loadingSvga"
        width="200"
        height="200"
        :loop-times="2"
      ></mo-svga>
    </section>
    <section class="code-section">
      <h4 class="code-title">播完清除</h4>
      <mo-svga
        :offset-top="100"
        :file="loadingSvga"
        width="200"
        height="200"
        :loop-times="1"
        clear-on-end
      ></mo-svga>
    </section>
    <section class="code-section">
      <h4 class="code-title">操作</h4>
      <mo-button size="small" @click="svga?.clear()">clear</mo-button>
      <mo-button size="small" @click="svga?.start()">start</mo-button>
      <mo-button size="small" @click="svga?.stop()">stop</mo-button>
      <mo-button size="small" @click="svga?.pause()">pause</mo-button>
      <mo-svga
        ref="svga"
        :offset-top="100"
        :file="loadingSvga"
        width="200"
        height="200"
      ></mo-svga>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { MoButton, MoSvga, SvgaInstance } from "moxui";
import loadingSvga from "../../../img/loading.svga";

const svga = ref<SvgaInstance>();
</script>
<style lang="scss">
.page-svga {
  .mo-button {
    margin-right: 10px;
  }
}
</style>
