<template>
  <div class="page">
    <div class="header">
      <div class="header-content">
        <router-link to="./" class="back"></router-link>
        <h2 class="title">BUTTON</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">确认</h4>
      <mo-button type="confirm">确认</mo-button>
    </section>
    <section class="code-section" style="background-color: #f1f1f1">
      <h4 class="code-title">取消</h4>
      <mo-button type="cancel">取消</mo-button>
    </section>
    <section class="code-section">
      <h4 class="code-title">large</h4>
      <mo-button size="large">LARGE</mo-button>
    </section>
    <section class="code-section">
      <h4 class="code-title">自定义</h4>
      <mo-button height="80" width="500" background-color="#ff0036" color="#fff"
        >自定义</mo-button
      >
    </section>
  </div>
</template>
<script lang="ts" setup>
import { MoButton } from "moxui";
</script>
