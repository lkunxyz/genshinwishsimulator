import { useRouter } from "nextra/hooks";
import { getLocaleMessages } from "./src/config/locales";

export default {
  logo: <span>GenshinWishSimulator logo</span>,
  i18n: [
    { locale: "en", name: "English" },
    { locale: "ja", name: "日本語" },
    { locale: "ko", name: "한국어" },
    { locale: "de", name: "Deutsch" },
    { locale: "fr", name: "Français" },
    { locale: "es", name: "Español" },
    { locale: "it", name: "Italiano" },
    // { locale: "it", name: "Italian" },
    // { locale: "ru", name: "Russian" },
    // { locale: "uk", name: "Ukrainian" },
    // { locale: "pt", name: "Portugal" },
    // { locale: "nb", name: "Norwegian" },
    // { locale: "zh", name: "中文" },
  ],
  darkMode: true,
  nextThemes: {
    defaultTheme: "dark",
    forcedTheme: "dark",
  },
  search: {
    placeholder: function SearchPlaceholder() {
      const { locale } = useRouter();
      return getLocaleMessages(locale).ui.searchPlaceholder;
    },
  },
  sidebar: {
    toggleButton: true,
  },
  toc: {
    float: true,
    title: function TocTitle() {
      const { locale } = useRouter();
      return getLocaleMessages(locale).ui.tocTitle;
    },
  },
  feedback: {
    content: function FeedbackContent() {
      const { locale } = useRouter();
      return getLocaleMessages(locale).ui.feedbackText;
    },
  },
  editLink: {
    text: function EditLinkText() {
      const { locale } = useRouter();
      return getLocaleMessages(locale).ui.editLinkText;
    },
  },
  siteName: "GenshinWishSimulator",

  // 主题颜色配置
  primaryColor: "#81c869", // 主题色

  // 背景颜色
  backgroundColor: {
    light: "#1a1a1a",
    dark: "#1a1a1a",
  },

  // 导航栏高度
  style: {
    navbarHeight: "5rem", // 80px
  },
};
