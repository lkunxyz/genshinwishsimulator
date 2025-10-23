// 定义语言配置的接口
export interface LocaleConfig {
  name: string;
  localeName: string;
  ogLocale: string;
  htmlLang: string;
  titleSuffix: string;
  isDefault?: boolean;
}

// 定义网站配置的接口
export interface SiteConfig {
  url: string;
  title: string;
  twitter: string;
  siteName: string;
}

// 定义 URL 优先级配置接口
export interface URLPriorityConfig {
  pattern: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// URL 优先级配置
export const URL_PRIORITIES: URLPriorityConfig[] = [
  {
    pattern: "^/$",  // 首页
    priority: 1.0,
    changefreq: "daily",
  },
  {
    pattern: "^/games",  // 游戏页面
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    pattern: "^/games/fighting",  // 格斗游戏页面
    priority: 0.8,
    changefreq: "weekly",
  },
  {
    pattern: "^/about",  // 关于页面
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    pattern: ".*",  // 默认配置
    priority: 0.5,
    changefreq: "weekly",
  },
] as const;

// 支持的语言配置 - 仅保留实际在 next.config.mjs 中启用的语言
export const SUPPORTED_LOCALES: Record<string, LocaleConfig> = {
  en: {
    name: "English",
    localeName: "English",
    ogLocale: "en_US",
    htmlLang: "en",
    titleSuffix: " - Genshin Wish Simulator",
    isDefault: true,
  },
  ja: {
    name: "Japanese",
    localeName: "日本語",
    ogLocale: "ja_JP",
    htmlLang: "ja",
    titleSuffix: " - 原神祈願シミュレーター",
  },
  ko: {
    name: "Korean",
    localeName: "한국어",
    ogLocale: "ko_KR",
    htmlLang: "ko",
    titleSuffix: " - 원신 기원 시뮬레이터",
  },
  de: {
    name: "German",
    localeName: "Deutsch",
    ogLocale: "de_DE",
    htmlLang: "de",
    titleSuffix: " - Genshin Wunsch-Simulator",
  },
  fr: {
    name: "French",
    localeName: "Français",
    ogLocale: "fr_FR",
    htmlLang: "fr",
    titleSuffix: " - Simulateur de Vœux Genshin",
  },
  es: {
    name: "Spanish",
    localeName: "Español",
    ogLocale: "es_ES",
    htmlLang: "es",
    titleSuffix: " - Simulador de Deseos Genshin",
  },
  it: {
    name: "Italian",
    localeName: "Italiano",
    ogLocale: "it_IT",
    htmlLang: "it",
    titleSuffix: " - Simulatore di Desideri Genshin",
  },
  // 如果未来需要添加其他语言,请先在 next.config.mjs 中启用
  // pt: {
  //   name: "Português",
  //   localeName: "Português",
  //   ogLocale: "pt_PT",
  //   htmlLang: "pt",
  //   titleSuffix: " - GenshinWishSimulator",
  // },
  // zh: {
  //   name: "中文",
  //   localeName: "简体中文",
  //   ogLocale: "zh_CN",
  //   htmlLang: "zh-CN",
  //   titleSuffix: " - GenshinWishSimulator",
  // },
} as const;

// 网站配置
export const SITE_CONFIG: SiteConfig = {
  url: "https://genshinwishsimulator.com",
  title: "Genshin Wish Simulator | Free Practice Tool for Genshin Impact",
  twitter: "@GenshinWish",
  siteName: "Genshin Wish Simulator",
} as const;

// 获取所有语言代码数组
export const LOCALE_CODES = Object.keys(SUPPORTED_LOCALES);

// 获取默认语言
export const DEFAULT_LOCALE = Object.entries(SUPPORTED_LOCALES).find(
  ([_, config]) => config.isDefault
)?.[0] || "en"; 