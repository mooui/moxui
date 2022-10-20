<template>
  <div class="page page-sms-code">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">SMSCODE</h2>
      </div>
    </div>
    <section class="code-section">
      <mo-sms-code
        v-model="code"
        title="输入验证码"
        tips="验证码已发送至 199 **** 0000"
        @finish="login"
      >
      </mo-sms-code>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { MoSmsCode } from "@moxui/components";
import { Toast } from "moxui";

const code = ref("");

function login(c: string) {
  Toast(`Input finish: ${c}`);
}
</script>
<style lang="scss">
.page-sms-code {
  .code-section {
    background-color: #fff;
  }
}
</style>
