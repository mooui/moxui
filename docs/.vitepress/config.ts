import { defineConfig } from 'vitepress'
import { resolve } from "path"
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
          text: "CountDown 倒计时",
          link: "/components/count-down/"
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
          text: "Scratch 刮奖",
          link: "/components/scratch/"
        },
        {
          text: "SlotMachine 老虎机",
          link: "/components/slot-machine/"
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
      text: "Plugins插件",
      collapsible: true,
      collapsed:false,
      items: [
        {
          text: "Dialog 对话框",
          link: "/plugins/dialog/"
        },
        {
          text: "Loading 加载遮罩",
          link: "/plugins/loading/"
        },
        {
          text: "Toast 提示",
          link: "/plugins/toast/"
        },
      ],
    },
    {
      text: "组合式API",
      collapsible: true,
      collapsed:false,
      items: [
        {
          text: "useCountDown 倒计时",
          link: "/hooks/use-count-down/"
        },
        {
          text: "useLockScroll 阻止滚动",
          link: "/hooks/use-lock-scroll/"
        },
        {
          text: "useOutterClick 外部点击",
          link: "/hooks/use-outter-click/"
        }
      ],
    },
  ]
}


export default defineConfig({
  title:"MOXUI",
  description: "A vue3 UI framework for mobile",
  lang: "zh-cn",
  head:[
    ["link",{rel:'icon',type:"image/png",href:"/logo-icon.png"}],
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}],
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
    logo:"/logo.png",
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



