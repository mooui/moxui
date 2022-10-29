<template>
  <div class="page page-count-down">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">COUNTDOWN</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基本用法</h4>
      <mo-count-down :time="99999"></mo-count-down>
    </section>
    <section class="code-section">
      <h4 class="code-title">时间节点</h4>
      <mo-count-down
        :time="125"
        :time-point="[120, 100, 60]"
        @end="Toast('CountDown-2 End')"
        @time="
          (s:number) => {
            Toast(`CountDown-2 还剩${s}秒 ~`);
          }
        "
      ></mo-count-down>
    </section>
    <section class="code-section">
      <h4 class="code-title">格式定义</h4>
      <mo-count-down
        :time="99999"
        format="DD 天 hh时 mm分 ss秒"
      ></mo-count-down>
    </section>
    <section class="code-section">
      <h4 class="code-title">格式定义 {}</h4>
      <mo-count-down
        :time="99999"
        format="{DD} DDD {hh}hhh {mm}: {ss} ssss"
      ></mo-count-down>
    </section>
    <section class="code-section">
      <h4 class="code-title">自定义样式</h4>
      <mo-count-down :time="99999">
        <template #default="current">
          <div>
            <span class="num">{{ current.totalHours }}</span>
            时
            <span class="num">{{ current.minutes }}</span>
            分
            <span class="num">{{ current.seconds }}</span>
            秒
          </div>
        </template>
      </mo-count-down>
    </section>
    <section class="code-section">
      <h4 class="code-title">手动操作</h4>
      <div class="btns">
        <mo-button type="success" size="small" @click="cd?.start()"
          >开始</mo-button
        >
        <mo-button type="success" size="small" @click="cd?.pause()"
          >暂停</mo-button
        >
        <mo-button type="success" size="small" @click="cd?.stop()"
          >停止</mo-button
        >
        <mo-button type="success" size="small" @click="cd?.reset()"
          >重置</mo-button
        >
      </div>
      <mo-count-down ref="cd" :time="200" auto-start="false"></mo-count-down>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { MoCountDown, MoButton, Toast, CountDownInstance } from "moxui";

const cd = ref<CountDownInstance>();
</script>
<style lang="scss">
.page-count-down {
  .btns {
    margin-bottom: 25px;
    .mo-button {
      min-width: auto;
      width: 120px;
      margin-right: 15px;
    }
  }
  .num {
    display: inline-block;
    width: 42px;
    line-height: 42px;
    background-color: #ff0036;
    text-align: center;
    color: #fff;
    font-family: DIN-Bold;
    border-radius: 9px;
  }
}
</style>
