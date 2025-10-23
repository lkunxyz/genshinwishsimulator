import { en } from './en'
import { zh } from './zh'
import { pt } from './pt'

export const locales = {
  en,
  zh,
  pt,
} as const

// 定义语言配置的类型
export type LocaleMessages = typeof en

// 获取语言文本
export function getLocaleMessages(locale: string): LocaleMessages {
  return locales[locale as keyof typeof locales] as LocaleMessages
}