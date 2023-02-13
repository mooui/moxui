<template>
  <div class="p-index">
    <div class="logo-wrapper">
      <h2 class="logo">
        <img src="../img/logo-icon.png" alt="" />
        MOXUI
      </h2>
      <p class="desc">基于vue3的移动端UI组件库</p>
    </div>
    <div class="content">
      <div class="tit">组件 Components</div>
      <div class="list">
        <router-link to="/components/button" class="item"
          >Button 按钮</router-link
        >
        <router-link to="/components/count-down" class="item"
          >CountDown 倒计时</router-link
        >
        <router-link to="/components/icon" class="item">Icon 图标</router-link>
        <router-link to="/components/marquee" class="item"
          >Marquee 跑马灯</router-link
        >
        <router-link to="/components/picker" class="item"
          >Picker 选择器</router-link
        >
        <router-link to="/components/popup" class="item"
          >Popup 遮罩</router-link
        >
        <router-link to="/components/slot-machine" class="item"
          >SlotMachine 老虎机</router-link
        >
        <router-link to="/components/sms-code" class="item"
          >SmsCode 验证码输入</router-link
        >
        <router-link to="/components/sticky" class="item"
          >Stikcy 吸顶组件</router-link
        >
        <router-link to="/components/svga" class="item"
          >Svga Svga动画播放</router-link
        >
      </div>
    </div>

    <div class="content">
      <div class="tit">插件 Plugins</div>
      <div class="list">
        <router-link to="/plugins/dialog" class="item"
          >Dialog 对话框</router-link
        >
        <router-link to="/plugins/loading" class="item"
          >Loading 加载遮罩</router-link
        >
        <router-link to="/plugins/toast" class="item">Toast 提示</router-link>
      </div>
    </div>

    <div class="content">
      <div class="tit">组合式API Composables</div>
      <div class="list">
        <router-link to="/hooks/use-count-down" class="item"
          >useCountDown 倒计时</router-link
        >
        <router-link to="/hooks/use-lock-scroll" class="item"
          >useLockScroll 阻止滚动</router-link
        >
        <router-link to="/hooks/use-outter-click" class="item"
          >useOutterClick 外部点击</router-link
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.p-index {
  padding: 60px 0;
  .logo-wrapper {
    .logo {
      padding: 0 25px;
      vertical-align: middle;
      font-size: 42px;
      line-height: 50px;
      text-align: center;
      img {
        height: 50px;
        margin-right: 10px;
        vertical-align: baseline;
      }
    }
    .desc {
      margin-top: 20px;
      font-size: 26px;
      color: #666;
      text-align: center;
    }
  }

  .content {
    padding: 50px 50px 0;
    .tit {
      margin-bottom: 15px;
      padding-left: 20px;
      color: #333;
      font-weight: 600;
      font-size: 30px;
    }
    .list {
      .item {
        display: flex;
        align-items: center;
        height: 60px;
        margin: 15px 0;
        padding: 0 20px;
        border-radius: 12px;
        background-color: #f9f9f9;
        color: #666;
        font-size: 24px;
        background-image: url(../img/right.png);
        background-size: 30px 30px;
        background-repeat: no-repeat;
        background-position: right 20px bottom 15px;
      }
    }
  }
}
</style>
