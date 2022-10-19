<!--.vitepress/theme/MyLayout.vue-->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

const isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent);

const isLocal = /(localhost|192\.168|0\.0|127\.0)/.test(location.href);

const iframeSrc = isLocal ? 'http://127.0.0.1:3000/#/index':''


// #region router postMessage
const iframe = ref<HTMLIFrameElement>();
const router = useRouter();

// 父页面接受消息
window.addEventListener('message', function (event) {
  console.log(router)
  if (event.data.type === 'moxui:inner') {
    router.go(event.data.value === '/index' ? '/' : event.data.value + '/');
  }
});

// 发出消息
watch(router.route,(val)=>{
  if(iframe.value){
    iframe.value.contentWindow.postMessage({
      type:"moxui:outter",
      value:/(\/components\/.*\/|\/plugins\/.*\/)/.test(val.path) ? val.path.slice(0,-1) : '/index'
    },"*")
  }
})

// #endregion
</script>

<template>
  <template v-if="!isMobile">
    <Layout>
    <template #layout-bottom>
      <div class="iframe-container">
        <iframe :src="iframeSrc" frameborder="0" ref="iframe"></iframe>
      </div>
    </template>
  </Layout>
  <!-- <teleport to=".VPDoc .container">
    <div class="iframe-container">
      <iframe :src="iframeSrc" frameborder="0"></iframe>
    </div>
  </teleport> -->
  </template>

  <div class="iframe-container-mobile" v-else>
    <iframe :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<style lang="scss">
.iframe-container{
  overflow: hidden;
  position: fixed;
  z-index: 100;
  top:100px;
  right:25px;
  flex-shrink: 0;
  width: 375px;
  height: 667px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 15px #ccc;
  iframe{
    width: 100%;
    height: 100%;
  }
}
.iframe-container-mobile{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  iframe{
    width: 100%;
    height: 100%;
  }
}
</style>
