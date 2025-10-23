import React from 'react';
import type { PageMapItem } from 'nextra';
import { Breadcrumb } from '@/components/Breadcrumb';
import { GameCarousel } from '@/components/GameCarousel';
import { useRouter } from 'nextra/hooks';
import { getGamesByCategory } from '@/utils/getGamesByCategory';
import type { FrontMatter } from '@/types';
import { Icon } from '@iconify/react';

interface FeaturedLayoutProps {
    children: React.ReactNode;
    frontMatter: FrontMatter;
    pageMap: PageMapItem[];
}

export function FeaturedLayout({ children, frontMatter, pageMap }: FeaturedLayoutProps) {
    const router = useRouter();
    const { locale = 'en' } = router;

    // 获取特色分类的游戏
    const getFeaturedGames = (category: string) => {
        const games = getGamesByCategory(pageMap, category, locale);
        return games.slice(0, 20); // 只取前20个游戏
    };

    // 从路径获取分类名称
    const getCategoryTitle = (path: string) => {
        const parts = path.split('/');
        const lastPart = parts[parts.length - 1];
        return lastPart
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // 从 frontMatter 中获取分类列表
    const categories = frontMatter.categories || [];

    return (
        <main className="min-h-screen bg-[#1a1a1a]">
            {/* 头部区域 */}
            <div className={`relative h-[60vh] min-h-[400px] ${!frontMatter.cover ? 'bg-[#242424]' : ''}`}>
                {frontMatter.cover && (
                    <img
                        src={frontMatter.cover}
                        alt={frontMatter.title || ''}
                        className="w-full h-full object-cover"
                    />
                )}
                {frontMatter.game && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
                        <iframe
                            src={frontMatter.game}
                            className="w-full h-full"
                            allow="fullscreen"
                        />
                    </div>
                )}
            </div>

            {/* 内容区域 */}
            <div className="container mx-auto px-4 py-8">
                {/* 根据配置显示面包屑 */}
                {frontMatter.breadcrumb !== false && <Breadcrumb />}

                {/* 分类游戏列表 */}
                {categories.length > 0 ? (
                    categories.map((category) => {
                        const games = getFeaturedGames(category);
                        return (
                            <GameCarousel
                                key={category}
                                title={getCategoryTitle(category)}
                                games={games}
                                className="bg-[#242424] rounded-xl p-6 mb-8"
                            />
                        );
                    })
                ) : (
                    <div className="text-center py-12 bg-[#242424] rounded-xl">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                            <Icon icon="material-symbols:games-outline" className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-theme-text-primary mb-2">
                            No Categories Found
                        </p>
                        <p className="text-sm text-theme-text-secondary">
                            Please add some categories in the frontmatter to display games.
                        </p>
                    </div>
                )}

                {/* MDX 内容 */}
                <div className="mt-8 prose dark:prose-invert max-w-none bg-[#242424] rounded-xl p-6">
                    <article className="nextra-body relative pb-8 w-full">
                        {children}
                    </article>
                </div>
            </div>
        </main>
    );
} 