// URL 优先级配置
const URL_PRIORITIES = [
  {
    pattern: "^/$", // 首页
    priority: 1.0,
    changefreq: "daily",
  },
  {
    pattern: "^/games", // 游戏页面
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    pattern: ".*", // 默认配置
    priority: 0.5,
    changefreq: "weekly",
  },
];

// 支持的语言配置
const SUPPORTED_LOCALES = {
  en: {
    name: "English",
    localeName: "English",
    ogLocale: "en_US",
    htmlLang: "en",
    titleSuffix: ": GenshinWishSimulator",
    isDefault: true,
  },
  pt: {
    name: "English",
    localeName: "葡萄牙",
    ogLocale: "pt_PT",
    htmlLang: "pt",
    titleSuffix: ": GenshinWishSimulator",
    isDefault: true,
  },
  zh: {
    name: "中文",
    localeName: "简体中文",
    ogLocale: "zh_CN",
    htmlLang: "zh-CN",
    titleSuffix: ": GenshinWishSimulator",
  },
};

// 网站配置
const SITE_CONFIG = {
  url: "https://genshinwishsimulator.com",
  title: "GenshinWishSimulator - Fan Game | Real Time Studios",
  twitter: "@",
  siteName: "fnafinrealtime.com",
};

// 获取所有语言代码数组
const LOCALE_CODES = Object.keys(SUPPORTED_LOCALES);

// 获取默认语言
const DEFAULT_LOCALE =
  Object.entries(SUPPORTED_LOCALES).find(
    ([_, config]) => config.isDefault
  )?.[0] || "en";

module.exports = {
  SUPPORTED_LOCALES,
  SITE_CONFIG,
  LOCALE_CODES,
  DEFAULT_LOCALE,
  URL_PRIORITIES,
};
