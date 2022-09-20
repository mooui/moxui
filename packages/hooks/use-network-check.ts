import { ref, onBeforeMount, onBeforeUnmount } from "vue";

// 自定义isOnline状态
function useNetworkCheck() {
  const isOnline = ref(true);

  const online = () => {
    isOnline.value = true;
  };
  const offline = () => {
    isOnline.value = false;
  };

  onBeforeMount(() => {
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("online", online);
    window.removeEventListener("offline", offline);
  });

  return {
    isOnline,
  };
}

export { useNetworkCheck };
