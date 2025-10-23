import { en } from './en'
import { zh } from './zh'
import { pt } from './pt'
import { ja } from './ja'
import { ko } from './ko'
import { de } from './de'
import { fr } from './fr'
import { es } from './es'
import { it } from './it'

export const locales = {
  en,
  zh,
  pt,
  ja,
  ko,
  de,
  fr,
  es,
  it,
} as const

// 定义语言配置的类型
export type LocaleMessages = typeof en

// 获取语言文本
export function getLocaleMessages(locale: string): LocaleMessages {
  return locales[locale as keyof typeof locales] as LocaleMessages
}