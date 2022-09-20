import { reactive } from "vue";

/**
 * 倒计时
 * @param time 秒值
 */
function useCountDown(time: number = 0) {
  const current = reactive({
    total: 0,
    days: 0,
    hours: 0,
    totalHours: 0,
    minutes: 0,
    seconds: 0,
  });
  let isCounting = false;
  let countTimer: ReturnType<typeof setTimeout>;
  let finishCallbacks: Array<() => void> = [];

  function onEnd(callback: () => void) {
    finishCallbacks.push(callback);
  }

  function off(callback?: () => void) {
    if (callback) {
      finishCallbacks = finishCallbacks.filter((cb) => cb !== callback);
    } else {
      finishCallbacks = [];
    }
  }
  function trigger() {
    finishCallbacks.forEach((cb) => cb());
  }

  function initCurrent(time: number) {
    current.total = time;
    current.days = Math.floor(time / (24 * 60 * 60));
    current.totalHours = Math.floor(time / (60 * 60));
    time %= 24 * 60 * 60;
    current.hours = Math.floor(time / (60 * 60));
    time %= 60 * 60;
    current.minutes = Math.floor(time / 60);
    current.seconds = time % 60;
  }

  function start() {
    countTimer && clearTimeout(countTimer);
    if (current.total > 0) {
      isCounting = true;
      countDown();
    } else {
      trigger();
    }
  }
  function countDown() {
    countTimer && clearTimeout(countTimer);
    countTimer = setTimeout(() => {
      if (current.seconds > 0) {
        current.total--;
        current.seconds--;
      } else {
        initCurrent(current.total - 1);
      }
      if (current.total > 0) {
        countDown();
      } else {
        isCounting = false;
        trigger();
      }
    }, 1000);
  }
  function stop() {
    countTimer && clearTimeout(countTimer);
    isCounting = false;
  }

  function set(time: number = 0, startCount: boolean = true) {
    countTimer && clearTimeout(countTimer);
    initCurrent(time);
    if (startCount) {
      start();
    }
  }

  initCurrent(time);
  return {
    current,
    start,
    stop,
    set,
    onEnd,
    off,
  };
}

export { useCountDown };
