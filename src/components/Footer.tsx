import { Link } from 'nextra-theme-docs'
import type { ThemeConfig } from '../theme/types'
import { useRouter } from 'next/router'
import themeConfig from '../../theme.config.jsx'

export function Footer({ themeConfig: footerThemeConfig }: { themeConfig?: ThemeConfig }) {
    const siteName = footerThemeConfig?.siteName
    const router = useRouter()
    
    const handleLanguageChange = (langCode: string) => {
        const currentPath = router.asPath
        const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${langCode}`)
        router.push(newPath)
    }

    return (
        <footer className="bg-theme-bg-primary/80 dark:bg-dark-secondary/80 backdrop-blur-sm border-t border-theme-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                    {themeConfig.i18n.map((lang) => (
                        <button
                            key={lang.locale}
                            onClick={() => handleLanguageChange(lang.locale)}
                            className={`text-sl text-theme-text-secondary hover:text-gaming-accent transition-colors duration-200 ${
                                router.locale === lang.locale ? 'text-gaming-accent font-medium' : ''
                            }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
                
                <div className="text-center text-sm text-theme-text-secondary md:gap-6 mt-4">
                    © {new Date().getFullYear()} {siteName}. All rights reserved.
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
                     <Link 
                        href="https://deltaruneprophecypanelgenerator.com" 
                        className="text-theme-text-secondary hover:text-gaming-accent transition-colors duration-200"
                    >
                        merge fellas
                    </Link>
                     <Link 
                        href="https://discordtags.net/" 
                        className="text-theme-text-secondary hover:text-gaming-accent transition-colors duration-200"
                    >
                        discord
                    </Link>
                    <Link 
                        href="/terms" 
                        className="text-theme-text-secondary hover:text-gaming-accent transition-colors duration-200"
                    >
                        Terms
                    </Link>
                    <Link 
                        href="/privacy" 
                        className="text-theme-text-secondary hover:text-gaming-accent transition-colors duration-200"
                    >
                        Privacy
                    </Link>
                    <Link 
                        href="/change-log" 
                        className="text-theme-text-secondary hover:text-gaming-accent transition-colors duration-200"
                    >
                        Change Log
                    </Link>
                </div>
            </div>
        </footer>
    )
} 
