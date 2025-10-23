import { useRouter } from 'nextra/hooks'
import { useMemo } from 'react'
import { SITE_CONFIG } from '@/config/site'

export interface BreadcrumbItem {
    name: string
    href: string
    url: string
}

/**
 * Hook to generate breadcrumb data
 * Used for both UI rendering and Schema.org structured data
 */
export function useBreadcrumb(): BreadcrumbItem[] {
    const router = useRouter()
    const { asPath, locale = 'en' } = router

    return useMemo(() => {
        // 移除查询参数
        const pathWithoutQuery = asPath.split('?')[0]
        const paths = pathWithoutQuery.split('/').filter(Boolean)
        const items: BreadcrumbItem[] = []

        // 添加首页
        const homeHref = `/${locale}`
        items.push({
            name: locale === 'zh' ? '首页' : 'Home',
            href: homeHref,
            url: `${SITE_CONFIG.url}${homeHref}`
        })

        // 构建路径
        let currentPath = ''
        paths.forEach((path, index) => {
            if (index === 0) return // 跳过语言代码
            currentPath += `/${path}`

            // 根据路径生成名称
            let name = path
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

            // 特殊路径的翻译
            switch (path) {
                case 'games':
                    name = locale === 'zh' ? '游戏' : 'Games'
                    break
                case 'about':
                    name = locale === 'zh' ? '关于' : 'About'
                    break
                case 'download':
                    name = locale === 'zh' ? '下载' : 'Download'
                    break
                case 'popular':
                    name = locale === 'zh' ? '热门' : 'Popular'
                    break
                case 'recommend':
                    name = locale === 'zh' ? '推荐' : 'Recommend'
                    break
                case 'blog':
                    name = locale === 'zh' ? '博客' : 'Blog'
                    break
            }

            const href = `/${locale}${currentPath}`
            items.push({
                name,
                href,
                url: `${SITE_CONFIG.url}${href}`
            })
        })

        return items
    }, [asPath, locale])
}
