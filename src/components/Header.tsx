import * as React from 'react'
import { useRouter } from 'nextra/hooks'
import Link from 'next/link'
import { LocaleSwitch } from './LocaleSwitch'
import { ThemeSwitch } from './ThemeSwitch'
import type { ThemeConfig } from '../theme/types'
import { useConfig } from 'nextra-theme-docs'
import { useFSRoute } from 'nextra/hooks'
import { Icon } from '@iconify/react'

interface HeaderProps {
    themeConfig?: ThemeConfig
    meta?: any
}

type MenuItem = {
    title: string
    type: string
    icon?: string
    route?: string
    href?: string
    items?: Record<string, MenuItem>
    key?: string
}

export function Header({ themeConfig, meta }: HeaderProps) {
    const router = useRouter()
    const { asPath, locale } = router
    const config = useConfig()
    const fsRoute = useFSRoute()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    // 处理菜单配置
    const menuConfig = React.useMemo(() => {
        if (!meta) return {}
        if (typeof meta === 'function') return meta()
        return meta
    }, [meta])

    // 转换菜单配置为数组形式
    const menuItems = Object.entries(menuConfig).map(([key, item]: [string, any]) => ({
        ...item,
        route: item.href || `/${locale}/${key}`,
        key
    }))

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50">
                <nav className="bg-theme-bg-primary dark:bg-dark-secondary border-b border-theme-border">
                    <div className="flex h-16 items-center justify-between max-w-[1200px] mx-auto px-4">
                        {/* Logo */}
                        <Link href={`/${locale}`} className="flex items-center space-x-2 hover:text-theme-text-primary transition-colors">
                            <img src="/logo-small.webp" alt="Logo" width={40} height={40} className="w-10 h-10" />
                            <span className="font-bold text-lg hidden sm:block text-theme-text-primary">GenshinWishSimulator</span>
                        </Link>

                        {/* 中间导航菜单 - 桌面端 */}
                        <div className="hidden md:flex items-center space-x-1">
                            {menuItems.map((item: MenuItem) => (
                                <Link
                                    key={item.key}
                                    href={item.href || item.route || ''}
                                    className="px-3 py-2 rounded-lg hover:bg-theme-hover dark:hover:bg-dark-hover transition-colors flex items-center space-x-2 text-theme-text-secondary hover:text-theme-text-primary"
                                >
                                    {item.icon && (
                                        <Icon 
                                            icon={item.icon === 'material-symbols:menu' ? 
                                                  (item.title === 'New Games' ? 'material-symbols:new-releases' : 
                                                   item.title === 'Hots Games' ? 'material-symbols:local-fire-department' : 
                                                   item.icon) : 
                                                  item.icon} 
                                            className="w-5 h-5" 
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </div>

                        {/* 右侧功能区 */}
                        <div className="flex items-center space-x-2">
                            {/* 搜索按钮 */}
                            <button 
                                className="p-2 hover:bg-theme-hover dark:hover:bg-dark-hover rounded-lg transition-colors text-theme-text-secondary hover:text-theme-text-primary"
                                aria-label="Search"
                            >
                                <Icon icon="material-symbols:search" className="w-5 h-5" />
                            </button>

                            {/* 主题切换和语言切换 */}
                            <div className="hidden md:flex items-center space-x-1">
                                <ThemeSwitch />
                                <LocaleSwitch themeConfig={themeConfig} />
                            </div>

                            {/* 移动端菜单按钮 */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 hover:bg-theme-hover dark:hover:bg-dark-hover rounded-lg transition-colors text-theme-text-secondary hover:text-theme-text-primary"
                                aria-label="Toggle menu"
                            >
                                <Icon 
                                    icon={isMenuOpen ? "material-symbols:close" : "material-symbols:menu"} 
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>

                    {/* 移动端菜单 */}
                    <div 
                        className={`md:hidden fixed inset-x-0 top-16 bg-theme-bg-primary dark:bg-dark-secondary border-t border-theme-border transform transition-transform duration-300 ease-in-out ${
                            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                        }`}
                    >
                        <div className="px-4 py-2 space-y-1">
                            {menuItems.map((item: MenuItem) => (
                                <Link
                                    key={item.key}
                                    href={item.href || item.route || ''}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-theme-hover dark:hover:bg-dark-hover transition-colors text-theme-text-secondary hover:text-theme-text-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.icon && (
                                        <Icon 
                                            icon={item.icon === 'material-symbols:menu' ? 
                                                  (item.title === 'New Games' ? 'material-symbols:new-releases' : 
                                                   item.title === 'Hots Games' ? 'material-symbols:local-fire-department' : 
                                                   item.icon) : 
                                                  item.icon} 
                                            className="w-5 h-5" 
                                        />
                                    )}
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </div>

                        {/* 移动端功能区 */}
                        <div className="border-t border-theme-border px-4 py-3 flex items-center justify-between">
                            <LocaleSwitch themeConfig={themeConfig} />
                            <ThemeSwitch />
                        </div>
                    </div>
                </nav>
            </header>
            {/* 添加顶部间距 */}
            <div className="h-16" />
        </>
    )
} 