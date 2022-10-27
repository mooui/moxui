<template>
  <div class="page page-dialog">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">DIALOG</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基础用法</h4>
      <mo-button type="success" size="small" @click="showDialog"
        >显示dialog</mo-button
      >
    </section>
    <section class="code-section">
      <h4 class="code-title">拦截器</h4>
      <mo-button type="success" size="small" @click="showInterceptorDialog"
        >显示dialog</mo-button
      >
    </section>
    <section class="code-section">
      <h4 class="code-title">组件调用</h4>
      <mo-button type="success" size="small" @click="showComponentDialog"
        >显示dialog</mo-button
      >
      <mo-dialog :show="isShowDialog" :title="'组件调用'">
        <template #close>
          <a
            href="javascript:void(0);"
            class="close-0"
            @click="isShowDialog = false"
          ></a>
        </template>
        <template #button>
          <mo-button type="success" @click="isShowDialog = false"
            >成功</mo-button
          >
        </template>
        <div class="messages">
          <div class="txt">Dialog 组件调用</div>
          <div class="icon"></div>
        </div>
      </mo-dialog>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Dialog, Toast, MoButton, DialogActionType } from "moxui";
const MoDialog = Dialog.Component;
function showDialog() {
  Dialog({
    title: "基础用法",
    content: "基础用法 基础用法 基础用法",
    close: true,
  }).then((type) => {
    Toast(["close", "cancel", "confirm"][type]);
  });
}

function showInterceptorDialog() {
  Dialog({
    title: "拦截器",
    content: "使用拦截器, 点击右上角关闭按钮才能关闭, 其余将被拦截",
    close: true,
    beforeClose: (type: DialogActionType) => {
      switch (type) {
        case DialogActionType.CLOSE:
          Toast("closed");
          break;
        case DialogActionType.CANCEL:
          Toast("interceptor canceled!");
          return false;
        case DialogActionType.CONFIRM:
          Toast("async interceptor canceled!");
          return false;
      }
    },
  });
}

const isShowDialog = ref(false);
function showComponentDialog() {
  isShowDialog.value = true;
}
</script>
<style lang="scss">
.page-dialog {
  .close-0 {
    display: block;
    width: 32px;
    height: 32px;
    background-size: 100% 100%;
    background-image: url(../../../img/close.png);
  }
  .messages {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
    .icon {
      width: 40px;
      height: 40px;
      margin-left: 10px;
      background-size: 100% 100%;
      background-image: url(../../../img/dialog.png);
    }
  }
}
</style>
