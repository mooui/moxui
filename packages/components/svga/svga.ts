import {
  h,
  defineComponent,
  ref,
  watch,
  computed,
  onMounted,
  nextTick,
} from "vue";
import {
  Downloader,
  Parser,
  Player,
  VideoEntity,
  EVENT_TYPES,
  FILL_MODE,
} from "svga.lite";
import { svgaProps } from "./types";

import { pxToVw } from "@moxui/utils/utils";

export default defineComponent({
  name: "MoSvga",
  props: svgaProps,
  emits: ["start", "pause", "stop", "end", "clear", "process"],
  setup(props, { emit, expose, attrs }) {
    const isReady = ref(false);
    const isShowSVGA = ref(false);
    const player = ref<Player>();
    const cacheSVGA = ref<{ [key: string]: { svgaData: VideoEntity } }>({});
    const canvasRef = ref<HTMLCanvasElement>();

    const isSVGA = computed(() =>
      /(^data:application\/octet-stream)|(\.svga$)/i.test(props.file)
    );
    const isShow = computed(() => (isSVGA.value ? isShowSVGA.value : true));
    const style = computed(() => {
      return {
        width: pxToVw(props.width),
        height: pxToVw(props.height),
      };
    });

    function init() {
      if (!props.file || !isSVGA.value) return;

      nextTick(async () => {
        // calls WebWorker parsing by default, configurable `new Parser({ disableWorker: true })`
        player.value = new Player(canvasRef.value!); // #canvas is HTMLCanvasElement
        player.value.set({
          loop: props.loopTimes,
          fillMode: "forwards" as FILL_MODE.FORWARDS,
          cacheFrames: false,
          intersectionObserverRender: false,
        });

        // 缓存数据
        let svgaData;
        if (!cacheSVGA.value[props.file]) {
          const downloader = new Downloader();
          const parser = new Parser();

          svgaData = await parser.do(await downloader.get(props.file));
          cacheSVGA.value[props.file] = {
            svgaData,
          };
        } else {
          svgaData = cacheSVGA.value[props.file].svgaData;
        }

        await player.value?.mount(svgaData);

        if (!isReady.value && player.value) {
          player.value
            .$on("start" as EVENT_TYPES.START, () => {
              emit("start", player.value);
            })
            .$on("pause" as EVENT_TYPES.PAUSE, () => {
              emit("pause", player.value);
            })
            .$on("stop" as EVENT_TYPES.STOP, () => {
              emit("stop", player.value);
            })
            .$on("end" as EVENT_TYPES.END, () => {
              clear();
              isShowSVGA.value = false;
              emit("end", player.value);
            })
            .$on("clear" as EVENT_TYPES.CLEAR, () => {
              emit("clear", player.value);
            })
            .$on("process" as EVENT_TYPES.PROCESS, () => {
              emit("process", player.value);
              // console.log('event process', this.player.progress)
            });
        }

        isReady.value = true;
        start();
      });
    }

    onMounted(() => {
      init();
      watch(
        () => props.file,
        () => {
          isReady.value = false;
          isShowSVGA.value = false;
          player.value = void 0;
          init();
        }
      );
    });

    function start() {
      if (!player.value) return;

      isShowSVGA.value = true;
      nextTick(() => {
        // 重置否则不会重播
        if (player.value) {
          player.value.currentFrame = 0;
          player.value.progress = 0;
          player.value.start();
        }
      });
    }

    function stop() {
      player.value?.stop();
    }

    function pause() {
      player.value?.pause();
    }

    function clear() {
      player.value?.clear();
      isShowSVGA.value = false;
    }

    expose({
      start,
      stop,
      pause,
      clear,
    });

    // render
    const baseClass = "mo-svga";
    return () => {
      return h(
        "div",
        {
          class: baseClass,
          style: {
            display: isShow.value ? "block" : "none",
            ...style.value,
          },
          ...attrs,
        },
        isSVGA.value
          ? h("canvas", {
              class: `${baseClass}__canvas`,
              ref: canvasRef,
            })
          : h("img", {
              class: `${baseClass}__img`,
              src: props.file,
            })
      );
    };
  },
});
