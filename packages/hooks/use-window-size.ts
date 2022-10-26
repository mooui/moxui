import { ref, onBeforeMount, onBeforeUnmount, onMounted } from "vue";

// 自定义isShowPage状态
function useWindowSize() {
  const width = ref(0);
  const height = ref(0);

  const getWindowSize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", getWindowSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", getWindowSize);
  });

  getWindowSize();

  return {
    width,
    height,
  };
}

export { useWindowSize };
