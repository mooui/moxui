<template>
  <div class="page page-toast">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">TOAST</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">普通提示</h4>
      <mo-button
        type="success"
        size="small"
        @click="Toast('This is a normal Toast.')"
        >普通提示</mo-button
      >
      <mo-button
        size="small"
        type="success"
        @click="
          Toast(
            'This is a normal Toast.This is a normal Toast.This is a normal Toast.'
          )
        "
        >普通长提示</mo-button
      >
    </section>
    <section class="code-section">
      <h4 class="code-title">提示图标</h4>
      <mo-button
        size="small"
        type="success"
        @click="Toast.loading({ message: 'loading...', duration: 2500 })"
        >loading</mo-button
      >
      <mo-button size="small" type="success" @click="Toast.success('success')"
        >success</mo-button
      >
      <mo-button size="small" type="success" @click="Toast.warn('warn')"
        >warn</mo-button
      >
      <mo-button size="small" type="success" @click="Toast.error('error')"
        >error</mo-button
      >
    </section>

    <section class="code-section">
      <h4 class="code-title">行内提示图标</h4>
      <mo-button
        size="small"
        type="success"
        @click="
          Toast({
            message: 'loading...',
            duration: 2500,
            icon: 'loading',
            iconPosition: 'inline',
          })
        "
        >loading</mo-button
      >
      <mo-button
        size="small"
        type="success"
        @click="
          Toast({
            message: 'success...',
            duration: 2500,
            icon: 'success',
            iconPosition: 'inline',
          })
        "
        >success</mo-button
      >
      <mo-button
        size="small"
        type="success"
        @click="
          Toast({
            message: 'warn...',
            duration: 2500,
            icon: 'warn',
            iconPosition: 'inline',
          })
        "
        >warn</mo-button
      >
      <mo-button
        size="small"
        type="success"
        @click="
          Toast({
            message: 'error...',
            duration: 2500,
            icon: 'error',
            iconPosition: 'inline',
          })
        "
        >error</mo-button
      >
    </section>
    <section class="code-section">
      <h4 class="code-title">衔接</h4>
      <mo-button type="success" size="small" @click="loadThen('success')"
        >加载 - 成功</mo-button
      >
      <mo-button size="small" type="success" @click="loadThen('error')"
        >加载 - 失败</mo-button
      >
      <mo-button size="small" type="success" @click="loadThen('warn')"
        >加载 - 提醒</mo-button
      >
    </section>
    <section class="code-section">
      <h4 class="code-title">遮罩</h4>
      <mo-button
        type="success"
        size="small"
        @click="
          Toast({
            message: '遮罩Toast',
            type: 'loading',
            duration: 2500,
            mask: 'rgba(0,0,0,.4)',
          })
        "
        >带有遮罩</mo-button
      >
    </section>
    <section class="code-section">
      <h4 class="code-title">自定义ICON</h4>
      <mo-button
        type="success"
        size="small"
        @click="
          Toast({
            message: '自定义ICON',
            icon: helpIcon,
          })
        "
        >自定义ICON</mo-button
      >
    </section>
  </div>
</template>
<script lang="ts" setup>
import { MoButton, Toast } from "moxui";

import helpIcon from "../../../img/help.png";

function loadThen(type: "success" | "error" | "warn") {
  Toast.loading("加载中...");
  setTimeout(() => {
    switch (type) {
      case "success":
        Toast.success("加载成功");
        break;
      case "error":
        Toast.error("加载失败");
        break;
      case "warn":
        Toast.warn("WARNING!!");
        break;
    }
  }, 1500);
}
</script>
<style lang="scss">
.page-toast {
  .mo-button__small {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
