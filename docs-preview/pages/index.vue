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
        <router-link to="/components/icon" class="item">Icon 图标</router-link>
        <div class="item">Marquee 跑马灯</div>
        <div class="item">Picker 选择器</div>
        <div class="item">Popup 遮罩</div>
        <div class="item">SmsCode 验证码输入</div>
        <div class="item">Stikcy 吸顶组件</div>
        <div class="item">Svga Svga动画播放</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.p-index {
  .logo-wrapper {
    .logo {
      padding: 60px 25px 0;
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
    padding: 50px;
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
