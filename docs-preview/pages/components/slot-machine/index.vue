<template>
  <div class="page page-slot-machine">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">SLOTMACHINE</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">抽靓号</h4>
      <mo-button size="small" type="success" @click="getGoodNumber"
        >抽奖</mo-button
      >
      <input v-model="numbers" type="text" class="good-num" />
      <div class="good-number-wrapper">
        <mo-slot-machine
          ref="goodNumberSlot"
          :cols="6"
          item-style="font-size:60px;font-weight:700;"
        />
      </div>
    </section>
    <section class="code-section">
      <h4 class="code-title">老虎机</h4>
      <mo-button size="small" type="success" @click="getSlotMachine"
        >老虎机</mo-button
      >
      <div class="slot-machine-wrapper">
        <mo-slot-machine
          ref="slotMachine"
          :type="1"
          :cols="3"
          :items="items"
          item-style="max-width:150px;max-height:150px;"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { MoSlotMachine, SlotMachineInstance, MoButton, Toast } from "moxui";

// #region 抽靓号
const numbers = ref("666666");
const goodNumberSlot = ref<SlotMachineInstance>();

function getGoodNumber() {
  if (!/^\d{6}$/.test(numbers.value)) {
    Toast("靓号应为6位数字 ~");
    return;
  }
  goodNumberSlot.value?.reset(false).then(() => {
    goodNumberSlot.value?.scroll(numbers.value.split("").map((n) => Number(n)));
  });
}
// #endregion

// #region 老虎机
const slotMachine = ref<SlotMachineInstance>();
const items = [
  "https://beta-breathing-cdn.2tianxin.com/beta/resources/activity/slot_machine_2020/1663640667758198929.png",
  "https://beta-breathing-cdn.2tianxin.com/beta/resources/activity/slot_machine_2020/1663640944244379157.png",
  "https://beta-breathing-cdn.2tianxin.com/beta/resources/activity/slot_machine_2020/1663640965846343037.png",
  "https://beta-breathing-cdn.2tianxin.com/beta/resources/activity/slot_machine_2020/1663641090632078575.png",
  "https://beta-breathing-cdn.2tianxin.com/beta/resources/activity/slot_machine_2020/1663641116927400612.png",
  "https://beta-breathing-cdn.2tianxin.com/beta/resources/activity/slot_machine_2020/1663844141888447228.png",
  "https://beta-breathing-cdn.2tianxin.com/beta/resources/activity/slot_machine_2020/1663642615235079799.png",
];
function getSlotMachine() {
  const result = new Array(7)
    .fill(0)
    .map((n, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  slotMachine.value?.reset(false).then(() => {
    slotMachine.value?.scroll(result);
  });
}
// #endregion
</script>
<style lang="scss">
.page-slot-machine {
  .good-num {
    height: 56px;
    margin-left: 15px;
    padding: 0 15px;
    border-radius: 20px;
    background-color: #fff;
    font-size: 28px;
    font-family: DIN-Bold;
  }
  .good-number-wrapper {
    width: 400px;
    height: 100px;
    margin: 0 auto;
    font-family: DIN-Bold;
  }

  .slot-machine-wrapper {
    width: 600px;
    height: 200px;
    margin-top: 20px;
    background-color: #ccc;
  }
}
</style>
