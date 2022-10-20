<template>
  <div class="page page-marquee">
    <div class="header">
      <div class="header-content">
        <router-link to="/index" class="back"></router-link>
        <h2 class="title">MARQUEE</h2>
      </div>
    </div>
    <section class="code-section">
      <h4 class="code-title">消息展示</h4>
      <div class="marquee-txt-container">
        <mo-marquee>
          <div class="message">单条消息, 默认不滚动</div>
        </mo-marquee>
      </div>
      <div class="marquee-txt-container">
        <mo-marquee scroll-behavior="scroll">
          <div class="message">单条消息, 强制滚动</div>
        </mo-marquee>
      </div>
      <div class="marquee-txt-container">
        <mo-marquee>
          <div class="message">多条消息, 超出容器, 自动滚动</div>
          <div class="message">多条消息, 超出容器, 自动滚动</div>
        </mo-marquee>
      </div>
    </section>
    <section class="code-section">
      <h4 class="code-title">奖品展示</h4>
      <div class="marquee-gift-container">
        <mo-marquee>
          <div class="gift-list">
            <div v-for="gift in gifts" :key="gift.id" class="gift-item">
              <img :src="gift.img" alt="" />
              <p class="name">{{ gift.name }}</p>
            </div>
          </div>
        </mo-marquee>
      </div>
    </section>
    <section class="code-section">
      <h4 class="code-title">步跳滚动</h4>
      <div class="marquee-txt-container marquee-txt-left-container">
        <mo-marquee scroll="step" :speed="650">
          <div class="message">向左步跳滚动消息1</div>
          <div class="message">向左步跳滚动消息2</div>
        </mo-marquee>
      </div>
      <div class="marquee-txt-container">
        <mo-marquee scroll="step" direction="top" :speed="150">
          <div class="message">向上步跳滚动消息1</div>
          <div class="message">向上步跳滚动消息2</div>
        </mo-marquee>
      </div>
    </section>
    <section class="code-section">
      <h4 class="code-title">步跳滚动距离</h4>
      <div class="marquee-txt-container marquee-txt-container-1">
        <mo-marquee
          scroll="step"
          :speed="650"
          scroll-behavior="scroll"
          step-distance="300"
        >
          <div class="message">向左步跳滚动消息1</div>
          <div class="message">向左步跳滚动消息2</div>
        </mo-marquee>
      </div>
      <div class="marquee-txt-container marquee-txt-container-2">
        <mo-marquee
          scroll="step"
          direction="top"
          :speed="150"
          step-distance="50"
          scroll-behavior="scroll"
        >
          <div class="message">向上步跳滚动消息1</div>
          <div class="message">向上步跳滚动消息2</div>
        </mo-marquee>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { MoMarquee } from "moxui";

const gifts = [
  {
    id: 1,
    name: "盲盒",
    img: new URL("../../../img/box.png", import.meta.url).href,
  },
  {
    id: 2,
    name: "飞船",
    img: new URL("../../../img/space.png", import.meta.url).href,
  },
  {
    id: 3,
    name: "戒指",
    img: new URL("../../../img/ring.png", import.meta.url).href,
  },
];
</script>
<style lang="scss">
.page-marquee {
  .marquee-txt-container {
    height: 50px;
    margin: 20px;
    background-color: #a6d6f6;
    &.marquee-txt-left-container {
      width: 350px;
      .message {
        margin-right: 0;
        width: 350px;
      }
    }
    &.marquee-txt-container-1 {
      width: 600px;
      .message {
        margin-right: 0;
        width: 300px;
      }
    }
    &.marquee-txt-container-2 {
      height: 100px;
    }
    .message {
      margin-right: 20px;
      line-height: 50px;
      white-space: nowrap;
      color: #333;
    }
  }
  .marquee-gift-container {
    height: 240px;
    background-color: #ccc;
    border-radius: 10px;
    .gift-list {
      display: flex;
    }
    .gift-item {
      width: 200px;
      margin-right: 20px;
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
      .name {
        margin-top: 10px;
        text-align: center;
        font-size: 24px;
        color: #666;
      }
    }
  }
}
</style>
