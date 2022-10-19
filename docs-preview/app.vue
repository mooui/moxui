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
    window.parent.postMessage(
      { type: "moxui:inner", value: route.fullPath },
      "*"
    );
  }
});
window.addEventListener("message", (e) => {
  if (e.data.type === "moxui:outter" && e.data.value !== route.fullPath) {
    fromOutterChange = true;
    router.replace(e.data.value);
  }
});
</script>

<style lang="scss"></style>
