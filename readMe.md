### 一些配置
#### .npmrc
```
# 依赖包扁平化安装(安装在同一级别)
shamefully-hoist = true
```

#### pnpm-workspace.yaml
```
# 关联packages目录和examples目录, 使其能够互相引用
# packages 存放组件
# docs     文档/测试代码
packages:
  - 'packages/**'
  - 'docs'
```

#### 依赖安装
添加参数-w, 拍平安装在整个项目根目录下

#### 内部依赖使用install
```
# 如在examples内
# 失败
pnpm add mooui
# 成功
pnpm install mooui
```

#### 开源协议 
```
"license": "MIT",
```
