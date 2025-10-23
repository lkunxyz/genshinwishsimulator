import React from "react";
import type { ReactNode } from "react";

export interface PageOpts {
  title: string;
  frontMatter: {
    title?: string;
    description?: string;
    game?: string;
    cover?: string;
    [key: string]: any;
  };
  pageMap: any[];
}

interface HeadProps {
  locale?: string;
  asPath: string;
}

export interface ThemeConfig {
  logo?: React.ReactElement;
  head?: (props: HeadProps) => React.ReactElement;
  i18n: {
    locale: string;
    name: string;
    direction?: "ltr" | "rtl";
  }[];
  siteName?: string;
  primaryColor?: string;
}

export interface MainProps {
  children: ReactNode;
  pageOpts: PageOpts;
  themeConfig?: ThemeConfig;
}

export interface LayoutProps {
  children: ReactNode;
  frontMatter: PageOpts["frontMatter"];
  themeConfig?: ThemeConfig;
  pageMap: any[]; // 添加这一行
}
