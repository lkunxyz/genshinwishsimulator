import nextra from "nextra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextra = nextra({
  theme: "./src/theme/index.tsx",
  themeConfig: "./theme.config.jsx",
});

export default withNextra({
  i18n: {
    locales: ["en", "ja", "ko", "de", "fr", "es", "it"],
    //  locales: ["en", "es", "fr", "de", "it", "ru", "uk", "pt", "ja", "nb", "zh"],
    defaultLocale: "en",
  },
  // 添加重写规则确保正确处理这些路由
  async rewrites() {
    return [
      {
        source: '/terms',
        destination: '/terms'
      },
      {
        source: '/privacy',
        destination: '/privacy'
      }
    ]
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  // Optimize bundle size
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  webpack(config) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
});
