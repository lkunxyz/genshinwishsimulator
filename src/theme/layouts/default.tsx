import React from 'react';
import { useRouter } from 'next/router';
import { GameFrame } from '@/components/GameFrame';
import { ShareButtons } from '@/components/ShareButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CollapsibleArticle } from '@/components/CollapsibleArticle';
import type { FrontMatter } from '@/types';
import { getGamesByCategory } from '@/utils/getGamesByCategory';
import { GameCarousel } from '@/components/GameCarousel';
import { PageMapItem } from 'nextra';
import { Icon } from '@iconify/react';
import { VideoCarousel } from '@/components/VideoCarousel';
import dynamic from 'next/dynamic';
import { getGames } from '@/utils/getGames';

// 只使用动态导入
const GameComments = dynamic(() => import('@/components/GameComments'), {
    loading: () => <div>Loading comments...</div>,
    ssr: true
});

interface DefaultLayoutProps {
    children: React.ReactNode;
    frontMatter: FrontMatter;
    pageMap: PageMapItem[];
}

export function DefaultLayout({ children, frontMatter, pageMap }: DefaultLayoutProps) {
    console.log('DefaultLayout rendering');

    const router = useRouter();
    const pathLocale = router.pathname.split('/')[1];
    const locale = pathLocale || router.locale || 'en';

    console.log('Locale:', locale, 'pathLocale', pathLocale);

    const gameUrl = frontMatter.game;

    // 定义所有可用的特性
    const availableFeatures = ['popular', 'recommend'];

    // 检查是否是博客页面
    const isBlogPage = router.pathname.includes('/blog/');

    // 获取特性游戏列表
    const getFeaturedGames = (feature: string) => {
        console.log('=== getFeaturedGames Debug ===');
        console.log('Feature:', feature);
        console.log('Locale:', locale);
        return getGames(pageMap, {
            category: feature,
            locale,
            limit: 20
        });
    };

    // 获取特性显示名称
    const getFeatureTitle = (feature: string): string => {
        const titles: Record<string, string> = {
            popular: 'Popular Games',
            recommend: 'Recommended Games'
        };
        return titles[feature] || feature.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <main className="min-h-screen bg-theme-bg-primary dark:bg-[#1a1a1a] flex justify-center">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
                {/* 游戏播放器 */}
                {gameUrl && (
                    <div className="mb-6 flex justify-center">
                        <GameFrame
                            src={gameUrl}
                            title={frontMatter.title || 'Game'}
                            cover={frontMatter.cover}
                        />
                    </div>
                )}

                {/* 文章内容区域 */}
                <div className="bg-white dark:bg-[#242424] rounded-xl shadow-sm">
                    <div className="p-6">
                        {/* 面包屑导航 */}
                        <Breadcrumb />

                        {/* 添加视频展示区域 */}
                        {frontMatter.videos && (
                            <div className="max-w-7xl mx-auto px-4 py-2">
                                <VideoCarousel
                                    title={frontMatter.videosTitle}
                                    description={frontMatter.videosDescription}
                                    videos={frontMatter.videos}
                                />
                            </div>
                        )}

                        {/* 游戏列表 - 只在非博客页面显示 */}
                        {!isBlogPage && availableFeatures.map((feature) => {
                            const games = getFeaturedGames(feature);
                            if (games.length === 0) return null;

                            return (
                                <GameCarousel
                                    key={feature}
                                    title={getFeatureTitle(feature)}
                                    games={games}
                                />
                            );
                        })}

                        {/* 添加评论组件 */}
                        {/* {frontMatter.game && (
                            <div className="mb-20">
                                <GameComments gameId={frontMatter.game} />
                            </div>
                        )} */}

                       

                        {/* 文章内容 */}
                        <CollapsibleArticle>
                            <article className="prose dark:prose-invert max-w-none">
                                {children}
                            </article>
                        </CollapsibleArticle>

                        {/* 评论区 */}
                        {frontMatter.comments !== false && (
                            <div className="mt-8">
                                <GameComments gameId={frontMatter.slug || ''} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}