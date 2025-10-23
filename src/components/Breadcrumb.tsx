import Link from 'next/link'
import { Fragment } from 'react'
import { Icon } from '@iconify/react'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'

export function Breadcrumb() {
    const breadcrumbs = useBreadcrumb()

    return (
        <nav className="flex items-center gap-2 text-sm text-theme-text-secondary mb-6">
            {/* 首页图标 */}
            <Link
                href={breadcrumbs[0].href}
                className="hover:text-primary-500 transition-colors"
            >
                <Icon icon="material-symbols:home" className="w-4 h-4" />
            </Link>

            {/* 其他导航项 */}
            {breadcrumbs.slice(1).map((item, index) => (
                <Fragment key={item.href}>
                    <Icon
                        icon="material-symbols:chevron-right"
                        className="w-4 h-4 opacity-50 text-theme-text-secondary"
                    />
                    <Link
                        href={item.href}
                        className={`
                            transition-colors hover:text-primary-500
                            ${index === breadcrumbs.length - 2
                                ? 'text-primary-500 font-medium'
                                : 'text-theme-text-secondary'
                            }
                        `}
                    >
                        {item.name}
                    </Link>
                </Fragment>
            ))}
        </nav>
    )
} 