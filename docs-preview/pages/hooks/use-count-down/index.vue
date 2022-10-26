<template>
  <div class="page page-use-count-down">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">USECOUNTDOWN</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">基础用法</h4>
      <div>
        <span>{{ current1.days }}天</span>
        <span>{{ current1.hours }}时</span>
        <span>{{ current1.minutes }}分</span>
        <span>{{ current1.seconds }}秒</span>
      </div>
    </section>

    <section class="code-section">
      <h4 class="code-title">定时任务</h4>
      <div>任务执行次数: {{ taskTimes }}</div>
    </section>

    <section class="code-section">
      <h4 class="code-title">异步任务</h4>
      <mo-button type="success" size="small" @click="startCountDown"
        >点击开始</mo-button
      >
      <span style="margin-left: 10px">
        <span>{{ current3.days }}天</span>
        <span>{{ current3.hours }}时</span>
        <span>{{ current3.minutes }}分</span>
        <span>{{ current3.seconds }}秒</span>
      </span>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useCountDown, Toast, MoButton } from "moxui";

// #region 基础用法
const countDown1 = useCountDown(100, 1, true);
// 当前倒计时对象
const current1 = countDown1.current;

countDown1.on("end", () => {
  Toast("countdown end");
});
// #endregion

// #region 定时任务
const countDown2 = useCountDown(Infinity, 5, true);
const taskTimes = ref(0);
countDown2.on("update", () => {
  taskTimes.value++;
});
// #endregion

// #region 异步开启
const countDown3 = useCountDown(0);
const current3 = countDown3.current;
countDown3.on("end", () => {
  Toast("countDown3 end");
});
function startCountDown() {
  countDown3.reset(20);
}
// #endregion
</script>
<style lang="scss">
.page-use-count-down {
}
</style>
