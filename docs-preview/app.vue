<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

let fromOutterChange = false;

watch(route, () => {
  if (fromOutterChange) {
    fromOutterChange = false;
  } else {
    console.log(route.fullPath);
    window.parent.postMessage(
      { type: "moxui:inner", value: route.fullPath },
      "*"
    );
  }
});
window.addEventListener("message", (e) => {
  if (e.data.type === "moxui:outter" && e.data.value !== route.fullPath) {
    fromOutterChange = true;
    console.log(e.data.value);
    router.replace(e.data.value);
  }
});
</script>

<style lang="scss"></style>
