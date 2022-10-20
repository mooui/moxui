import { defineConfig } from 'vitepress'
import {resolve} from "path"
import { demoBlockPlugin } from "vitepress-theme-demoblock";

function getDemoSidebar() {
  return [
    {
      text: "介绍",
      items:[
        {
          text: "介绍",
          link: "/"
        },
      ]
    },
    {
      text: "Components组件",
      collapsible: true,
      collapsed:false,
      items: [
        {
          text: "组件说明",
          link: "/components/"
        },
        {
          text: "Button 按钮",
          link: "/components/button/"
        },
        {
          text: "Icon 图标",
          link: "/components/icon/"
        },
        {
          text: "Marquee 跑马灯",
          link: "/components/marquee/"
        },
        {
          text: "Picker 选择器",
          link: "/components/picker/"
        },
        {
          text: "Popup 遮罩",
          link: "/components/popup/"
        },
        {
          text: "SmsCode 验证码输入",
          link: "/components/sms-code/"
        },
        {
          text: "Stikcy 吸顶组件",
          link: "/components/sticky/"
        },
        {
          text: "Svga Svga动画播放",
          link: "/components/svga/"
        },
      ],
    },
    {
      text: "布局组件",
      items:[]
    },
  ]
}


export default defineConfig({
  title:"MOXUI",
  description: "A vue3 UI framework for mobile",
  lang: "zh-cn",
  head:[
    ["link",{rel:'icon',href:"../assets/logo-icon.png"}]
  ],
  themeConfig: {
    // 展示搜索框
    // algolia: {
    //   appId:"",
    //   apiKey: "",
    //   indexName: "",
    //   searchParameters: {
    //     faeFilters: ["tags:guide,api"]
    //   }
    // },
    logo:"../assets/logo.png",
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "GitHub",
        link: "https://github.com/mooui/moxui",
      },
    ],
    // 侧边栏
    sidebar: getDemoSidebar(),
  },
  markdown: {
    config: (md) =>{
      md.use(demoBlockPlugin)
    }
  },
  outDir:resolve(__dirname,'../../dist/docs')
});
