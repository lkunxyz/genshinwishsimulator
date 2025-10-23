import * as React from 'react'
import { useRouter } from "nextra/hooks"
import Head from 'next/head'
import type { MainProps } from '@/theme/types'
import { layouts } from '@/theme/layouts'
import 'nextra-theme-docs/style.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SUPPORTED_LOCALES, SITE_CONFIG, LOCALE_CODES, DEFAULT_LOCALE } from '@/config/site'
import {
    StructuredData,
    generateWebSiteSchema,
    generateOrganizationSchema,
    generateWebPageSchema,
    generateVideoGameSchema,
    generateBreadcrumbSchema,
    generateFAQSchema,
    generateHowToSchema
} from '@/components/StructuredData'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'

export default function Layout({ children, pageOpts, themeConfig }: MainProps) {
    const router = useRouter()
    const { frontMatter, pageMap } = pageOpts
    const { locale = DEFAULT_LOCALE, asPath } = router

    // 获取面包屑数据
    const breadcrumbItems = useBreadcrumb()
    
    // 获取当前语言的 meta 数据
    const meta = React.useMemo(() => {
        // 从 pageMap 中获取第一个元素的 data
        if (pageMap && pageMap[0] && pageMap[0].data) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Found meta data in pageMap[0]:', pageMap[0].data)
            }
            return pageMap[0].data
        }

        // 如果没有找到，尝试直接导入对应的 meta 文件
        try {
            const metaModule = require(`../../pages/${locale}/_meta.js`)
            if (process.env.NODE_ENV === 'development') {
                console.log('Imported meta module:', metaModule)
            }
            return metaModule.default
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Error loading meta file:', error)
            }
            return {}
        }
    }, [pageMap, locale])

    // URL 清理和规范化
    const cleanPath = React.useMemo(() => {
        let path = asPath.replace(/\.(mdx|md)$/i, "")
        const [pathWithoutQuery] = path.split("?")
        const [cleanPath] = pathWithoutQuery.split("#")
        return cleanPath
    }, [asPath])

    // 生成规范的 canonical URL
    const canonicalUrl = React.useMemo(() => {
        const url = locale === DEFAULT_LOCALE
            ? `${SITE_CONFIG.url}${cleanPath}`
            : `${SITE_CONFIG.url}/${locale}${cleanPath.replace(new RegExp(`^/${locale}`), "")}`
        return url.replace(/\/$/, "")
    }, [cleanPath, locale])

    const { layout = 'default' } = frontMatter
    const LayoutComponent = layouts[layout] || layouts.default

    // 开发环境调试日志
    if (process.env.NODE_ENV === 'development') {
        console.log('=== Theme Debug Logs ===')
        console.log('FrontMatter:', frontMatter)
        console.log('Meta:', meta)
        console.log('Canonical URL:', canonicalUrl)
    }

    // 获取语言代码
    const htmlLang = React.useMemo(() => {
        const localeConfig = SUPPORTED_LOCALES[locale]
        return localeConfig?.htmlLang || locale
    }, [locale])

    // 生成页面标题
    const pageTitle = React.useMemo(() => {
        const baseTitle = frontMatter?.title || meta?.title || SITE_CONFIG.title
        const suffix = SUPPORTED_LOCALES[locale]?.titleSuffix || ''
        return `${baseTitle}${suffix}`
    }, [frontMatter?.title, meta?.title, locale])

    // 生成结构化数据
    const structuredData = React.useMemo(() => {
        const schemas = [];

        // 1. WebSite Schema - 首页使用
        if (cleanPath === '/en' || cleanPath === `/${locale}`) {
            schemas.push(generateWebSiteSchema(SITE_CONFIG.url, SITE_CONFIG.siteName));
            schemas.push(generateOrganizationSchema(
                SITE_CONFIG.url,
                SITE_CONFIG.siteName,
                `${SITE_CONFIG.url}/logo.png`
            ));

            // 首页添加 FAQ Schema
            schemas.push(generateFAQSchema([
                {
                    question: "Does using a genshin wish simulator affect my in-game luck?",
                    answer: "No. The genshin wish simulator is completely independent from the actual game. Your simulator results have no connection to your game account's future pulls. Each wish in the actual game uses its own random number generation based on the published rates."
                },
                {
                    question: "How accurate are genshin wish simulators?",
                    answer: "Quality simulators are highly accurate because they implement the exact probability systems documented by miHoYo. This includes 0.6% base rate for 5-star characters, pity at 90 wishes, soft pity starting at 74, and the 2024 Capturing Radiance mechanic."
                },
                {
                    question: "Can I use a genshin wish simulator to predict my pulls?",
                    answer: "No. Gacha systems use random number generation, and each pull is independent. A simulator can't predict what you'll get in the actual game. It's a practice tool for understanding mechanics, not a fortune-telling device."
                },
                {
                    question: "How does the pity system work in Genshin Impact?",
                    answer: "The pity system guarantees a 5-star character after 90 wishes on character banners, and 80 wishes on weapon banners. Soft pity increases rates starting at wish 74 for characters and 64 for weapons. A 4-star is guaranteed every 10 wishes."
                },
                {
                    question: "What is the 50/50 system in Genshin wish simulator?",
                    answer: "On character event banners, when you pull a 5-star, there's a 50% chance it will be the featured character. If you don't get the featured character (losing the 50/50), your next 5-star is guaranteed to be the featured character. With the 2024 Capturing Radiance update, this is now effectively 55/45."
                }
            ]));

            // 首页添加 HowTo Schema
            schemas.push(generateHowToSchema(
                "How to Use Genshin Wish Simulator",
                "Learn how to practice wishing in Genshin Impact without spending primogems using our free simulator",
                [
                    {
                        name: "Familiarize Yourself with the Interface",
                        text: "When you launch the genshin wish simulator, you'll see an interface that mirrors the official Genshin Impact wishing screen with banner artwork and wish animations."
                    },
                    {
                        name: "Select Your Banner",
                        text: "Choose from available banner types: Character Event Banner for limited 5-star characters, Weapon Event Banner for limited weapons with Epitomized Path, Standard Banner for permanent characters and weapons, or Beginner Banner."
                    },
                    {
                        name: "Track Your Pulls and Pity",
                        text: "As you make wishes, pay attention to: total wishes made, wishes since your last 5-star (pity counter), wishes since your last 4-star, and whether you're on guaranteed or 50/50 for your next 5-star."
                    },
                    {
                        name: "Experiment with Different Strategies",
                        text: "Use the simulator to test various approaches like single pulls vs 10-pulls, stopping at soft pity, and practicing weapon banner Epitomized Path."
                    },
                    {
                        name: "Apply Insights to Your Real Account",
                        text: "After using the genshin wish simulator, you'll have practical knowledge about pity requirements, soft pity ranges, 50/50 outcomes, and budget planning for future characters."
                    }
                ]
            ));
        }

        // 2. VideoGame Schema - 游戏页面使用
        if (frontMatter?.game) {
            schemas.push(generateVideoGameSchema(
                canonicalUrl,
                frontMatter.title || '',
                frontMatter.description || '',
                frontMatter.cover ? `${SITE_CONFIG.url}${frontMatter.cover}` : `${SITE_CONFIG.url}/logo.png`,
                frontMatter.game
            ));
        } else {
            // 3. WebPage Schema - 其他页面使用
            schemas.push(generateWebPageSchema(
                canonicalUrl,
                pageTitle,
                frontMatter?.description,
                frontMatter?.cover ? `${SITE_CONFIG.url}${frontMatter.cover}` : undefined
            ));
        }

        // 4. BreadcrumbList Schema - 非首页使用
        if (breadcrumbItems.length > 1) {
            schemas.push(generateBreadcrumbSchema(breadcrumbItems));
        }

        return schemas;
    }, [cleanPath, locale, frontMatter, canonicalUrl, pageTitle, breadcrumbItems])

    return (
        <div className="min-h-screen bg-[#1a1a1a]">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={frontMatter?.description} />
                <meta name="keywords" content={frontMatter?.keywords} />
                
                {/* HTML Language */}
                <meta httpEquiv="content-language" content={htmlLang} />
                <meta property="og:locale" content={SUPPORTED_LOCALES[locale]?.ogLocale || SUPPORTED_LOCALES[DEFAULT_LOCALE].ogLocale} />
                
                {/* Robots Tags */}
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
                <meta
                    name="googlebot"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
                <meta
                    httpEquiv="x-robots-tag"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />

                {/* Open Graph */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={frontMatter?.description} />
                <meta property="og:image" content={frontMatter?.cover ? `${SITE_CONFIG.url}${frontMatter?.cover}` : `${SITE_CONFIG.url}/logo.png`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={frontMatter?.title || pageTitle} />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={SITE_CONFIG.siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={SITE_CONFIG.twitter} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={frontMatter?.description} />
                <meta name="twitter:image" content={frontMatter?.cover ? `${SITE_CONFIG.url}${frontMatter?.cover}` : `${SITE_CONFIG.url}/logo.png`} />
                <meta name="twitter:image:alt" content={frontMatter?.title || pageTitle} />
                
                {/* Canonical URL */}
                <link rel="canonical" href={canonicalUrl} />

                {/* 添加其他语言版本的替代链接 - 仅为 next.config.mjs 中启用的语言 */}
                {/* 当前只启用了 en,如果未来添加更多语言,需要从 next.config.mjs 读取 */}
                {/* 暂时移除多语言 hreflang,因为只有 en 语言 */}

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

                {/* 其他元标签 */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Structured Data (Schema.org) */}
                {structuredData.map((schema, index) => (
                    <StructuredData key={`schema-${index}`} data={schema} />
                ))}
            </Head>

            <Header themeConfig={themeConfig} meta={meta} />

            <LayoutComponent
                frontMatter={frontMatter}
                themeConfig={themeConfig}
                pageMap={pageMap}
            >
                {children}
            </LayoutComponent>

            <Footer themeConfig={themeConfig} />
        </div>
    )
}