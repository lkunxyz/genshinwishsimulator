/** @type {import('next-sitemap').IConfig} */
const {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  SITE_CONFIG,
  URL_PRIORITIES,
} = require("./src/config/site");

// 多语言配置 - 只使用实际在 next.config.mjs 中启用的语言
const SUPPORTED_LANGUAGES = ["en"]; // 修复：移除未实现的 pt 和 zh
const DEFAULT_LANGUAGE = DEFAULT_LOCALE;

function findUrlConfig(path) {
  // 移除语言前缀以进行匹配
  const pathWithoutLang = path.split("/").slice(2).join("/");
  const matchedConfig = URL_PRIORITIES.find((config) =>
    new RegExp(config.pattern).test("/" + pathWithoutLang)
  );
  return matchedConfig || URL_PRIORITIES[URL_PRIORITIES.length - 1];
}

module.exports = {
  siteUrl: SITE_CONFIG.url,
  generateRobotsTxt: true,
  changefreq: "weekly",
  exclude: ["*/404", "*/500", "*/404.html", "*/500.html"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/404", "/500"],
      },
    ],
  },
  transform: async (config, path) => {
    console.log(`Processing URL: ${path}`);

    path = modifyUrl(path);
    const pathParts = path.split("/");
    const currentLang = pathParts[1];

    if (!currentLang || !SUPPORTED_LANGUAGES.includes(currentLang)) {
      return null;
    }

    const baseUrl = config.siteUrl.replace(/\/+$/, "");
    const pathWithoutLang = pathParts.slice(2).join("/");

    // 构建所有语言版本的 alternateRefs
    const alternateRefs = SUPPORTED_LANGUAGES.map((lang) => ({
      href: `${baseUrl}/${lang}/${pathWithoutLang}`.replace(/\/$/, ""),
      hreflang: lang,
      hrefIsAbsolute: true,
    }));

    // 添加 x-default
    alternateRefs.push({
      href: `${baseUrl}/${DEFAULT_LANGUAGE}/${pathWithoutLang}`.replace(
        /\/$/,
        ""
      ),
      hreflang: "x-default",
      hrefIsAbsolute: true,
    });

    const urlConfig = findUrlConfig(path);

    return {
      loc: `${baseUrl}${path}`,
      changefreq: urlConfig.changefreq,
      priority: urlConfig.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs,
    };
  },
};

function modifyUrl(url) {
  if (/index$/.test(url)) {
    url = url.replace(/(.*)\/index$/, "$1");
  }
  if (!url) {
    return `/${DEFAULT_LANGUAGE}`;
  }
  return url.replace(/\/+/g, "/");
}
