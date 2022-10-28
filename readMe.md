# MOXUI - 移动端 Vue3 组件库 (Mobile UI Components built on Vue3)

## 项目结构
### packages
  组件库关键代码

### play 
  vite+vue3项目, 用于开发阶段组件调试

### docs
  基于vitepress的项目文档

### docs-preview
  vite+vue3项目, 组件移动端预览效果, 以iframe形式嵌入vitepress文档中

## 开发脚本 scripts

### dev   
  运行play项目, 用于开发阶段调试
### build    
  构建组件库

### docs:dev    
  运行docs docs-preview 项目, 编写文档 

### docs:build    
  构建文档项目

### addDoc    
  新增组件文档    
  示例: 
      pnpm addDoc count-down


### release
  发布组件库, 完成构建, 递增版本号, 发布, 更新文档依赖 等操作    
  参数 maj mid mini 分别对应 大版本  中版本 小版本    
  示例:    
      pnpm release (同pnpm release mini)  1.0.0 -> 1.0.1        
      pnpm release mid  1.0.8 -> 1.1.0          
      pnpm release maj  1.4.8 -> 2.0.0           

### release:doc
  发布文档, 完成构建文档, 提交至github仓库 等操作    
  Github Pages 需要重新deploy才能更新

### initCmp
  新增组件, 生成组件基本代码     
  示例 pnpm initCmp button

### initPl
  新增插件, 生成插件基本代码     
  示例 pnpm initPl toast

### rmCmp
  删除某组件相关代码     
  示例 pnpm rmCmp button

### rmPl
  删除某插件相关代码       
  示例 pnpm rmPl toast

### rmmo
  删除所有node_modules

### rmdt 
  删除打包dist目录

## 组件 - Components
所有组件均带有Mo前缀
### button 
按钮

### icon 
svg图标, loading success error warn   
主要用于toast

### marquee
跑马灯

### picker
选择器

### popup
弹窗遮罩

### sms-code 
验证码输入框

### sticky
粘性顶栏

### svga
svga动画播放


## 插件-plugins

### loading
页面初始化加载 loading

### toast
提示


## hooks

### use-count-down 
倒计时

### use-lock-scroll
禁止滚动, 多用于弹窗

### use-network-check
网络检查

### use-outter-click
外部点击

### use-touch
触摸行为

### use-visibility-change
页面可见性变化
