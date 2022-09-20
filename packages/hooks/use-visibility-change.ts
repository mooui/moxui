import { ref, onBeforeMount, onBeforeUnmount } from "vue";

// 自定义isShowPage状态
function useVisibilityChange() {
  const isShowPage = ref(true);

  // 切换应用或者主界面(按需保留)
  const _visibilityChange = (function () {
    let hidden: string = "hidden";
    if (typeof document.hidden === "undefined") {
      hidden = "webkitHidden";
    }
    return function () {
      isShowPage.value = !(document as any)[hidden];
    };
  })();

  onBeforeMount(() => {
    document.addEventListener("visibilitychange", _visibilityChange, false);
    window.addEventListener("pageshow", _visibilityChange, false);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("visibilitychange", _visibilityChange, false);
    window.removeEventListener("pageshow", _visibilityChange);
  });

  return {
    isShowPage,
  };
}

export { useVisibilityChange };
