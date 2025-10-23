https://mwsound.team/
https://babyyellow.io/fnaf-in-real-time
https://i-am-brud.itch.io/fnaf-in-real-time


<a href="https://genshinwishsimulator.com/">GenshinWishSimulator</a>
<a href="https://drivebeyondhorizons.net/">GenshinWishSimulator</a>


Just discovered <a href="https://genshinwishsimulator.com/">GenshinWishSimulator</a> —it's weirdly satisfying and totally addictive!




Just discovered <a href="https://drivebeyondhorizons.net">GenshinWishSimulator</a> —it's weirdly satisfying and totally addictive!




Just discovered GenshinWishSimulator —it's weirdly satisfying and totally addictive!

https://genshinwishsimulator.com/
https://drivebeyondhorizons.net

https://fortzonebattleroyale.com/


https://graffitiart.app/
https://www.proko.com/@joshhblack/activity






























# 游戏网站模板

这是一个基于 Next.js 的游戏网站模板，专门用于展示和分享游戏内容。该模板提供了多种页面布局和易于配置的特性。

## 🚀 特性

- 多种预设页面布局模板
- 游戏 iframe 嵌入支持
- 多语言支持
- 响应式设计
- 分类页面
- 自定义落地页
- 深色模式支持
- 自定义主题配置
- Google Analytics 支持
- Google AdSense 支持

## 📁 项目结构

```
.
├── src/
│   ├── theme/layouts/    # 页面布局模板
│   ├── config/          # 网站配置文件
│   │   └── locales/    # 多语言配置
│   └── components/      # 公共组件
├── pages/              # 页面文件
│   ├── _app.tsx       # 应用入口配置
│   ├── _document.tsx  # 文档结构配置
│   └── index.tsx      # 首页重定向
├── template/           # 页面模板示例
└── public/            # 静态资源
```

## 🛠️ 使用方法

### 1. 核心文件配置

#### 应用入口配置 (`pages/_app.tsx`)

配置应用的全局设置：

```typescript
// 配置 Google Analytics 和 AdSense ID
const GA_MEASUREMENT_ID = '你的 GA ID';
const ADSENSE_ID = '你的 AdSense ID';

// 主题配置
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <Component {...pageProps} />
</ThemeProvider>
```

#### 文档结构配置 (`pages/_document.tsx`)

配置 HTML 文档结构和语言：

```typescript
// 从配置文件中导入支持的语言
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/config/site'

// 自动设置 HTML lang 属性
const locale = typeof window !== 'undefined' 
  ? window.__NEXT_DATA__?.locale || DEFAULT_LOCALE 
  : DEFAULT_LOCALE
```

#### 首页重定向 (`pages/index.tsx`)

配置默认语言重定向：

```typescript
// 自动重定向到默认语言页面（例如：/en）
useEffect(() => {
    router.replace('/en')
}, [router])
```

### 2. 创建新页面布局

1. 在 `src/theme/layouts` 目录下创建新的布局模板文件
2. 参考现有模板进行开发
3. 在页面中通过 frontmatter 指定使用的布局

### 3. 配置游戏页面

1. 参考 `template` 目录下的示例模板
2. 创建新的 .mdx 文件
3. 配置页面 frontmatter：
```yaml
---
title: 游戏标题
layout: featured    # 使用的布局模板 
game: "游戏URL" # iframe 游戏地址
---
```

### 4. 网站配置

在 `src/config` 目录下修改相关配置：

- `locales/`: 多语言翻译文件
- 其他全局配置


### 5. 主题配置

在 `theme.config.jsx` 中可以自定义网站的主题配置：

```javascript
export default {
  // 网站基础信息
  logo: <span>GenshinWishSimulator logo</span>,
  siteName: "GenshinWishSimulator",

  // 多语言配置
  i18n: [
    { locale: "en", name: "English" },
    { locale: "zh", name: "中文" },
  ],

  // 深色模式配置
  darkMode: true,
  nextThemes: {
    defaultTheme: "system",
    forcedTheme: undefined,
  },

  // 主题样式
  primaryColor: "#81c869",    // 主题色
  backgroundColor: {
    light: "#ffffff",         // 亮色模式背景
    dark: "#111111",         // 暗色模式背景
  },

  // 导航栏配置
  style: {
    navbarHeight: "5rem",    // 80px
  },

  // UI 文本配置（支持多语言）
  search: {
    placeholder: function SearchPlaceholder() {
      // 搜索框占位文本
    }
  },
  toc: {
    float: true,
    title: function TocTitle() {
      // 目录标题
    }
  },
  feedback: {
    content: function FeedbackContent() {
      // 反馈文本
    }
  },
  editLink: {
    text: function EditLinkText() {
      // 编辑链接文本
    }
  }
}
```

## 📝 模板示例

- 游戏页面: `template/game.mdx`
- 落地页: `template/landing.mdx`
- 分类页: `template/category.mdx`

## 🌐 多语言支持

1. 在 `src/config/locales` 添加新语言配置
2. 在 `pages` 目录下创建对应语言的内容文件



最近自己刚做好的一套游戏上站的模板，我自己感觉用这套一小时上站没问题，找好游戏，弄个 iframe 然后 AI 生成内容， 我是部署在 pages 上的

原来没想分享出来的，看到刚才群友问，所以刚才就简单移除掉了我目前的一些站点信息，准备得有点仓促。

虽然我今年没赚到多少钱，但希望明年大家都能赚钱，就当新年礼物贡献给哥飞的群友们吧

可以使用 markdown 来进行页面内容生成管理，支持多语言然后对应的一些配置刚才让 AI 写了 readme 在根目录，大家可以自己研究看看

用的是 nextra https://nextra.site/ 不过是自定义主题这样，不懂的可以问问 AI 因为我也都是让 AI 弄的
