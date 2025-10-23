import React from 'react';
import type { PageMapItem } from 'nextra';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useRouter } from 'nextra/hooks';
import type { FrontMatter } from '@/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { getGames } from '@/utils/getGames';

interface BlogLayoutProps {
    children: React.ReactNode;
    pageMap: PageMapItem[];
}

export function BlogLayout({ children, pageMap}: BlogLayoutProps) {
    const router = useRouter();
    const pathLocale = router.pathname.split('/')[1];
    const locale = pathLocale || router.locale || 'en';
    const { query } = router;
    const currentPage = Number(query.page) || 1;
    const pageSize = 12;

    // 获取当前目录下的所有博客文章
    const allPosts = getGames(pageMap, {
        directory: router.pathname,
        locale
    });
    
    // 计算分页
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const posts = allPosts.slice(start, end);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    // 构建分页链接
    const buildPageUrl = (page: number) => {
        const { pathname, query } = router;
        return {
            pathname,
            query: { ...query, page }
        };
    };

    return (
        <main className="min-h-screen bg-theme-bg-primary dark:bg-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Breadcrumb />
                <div className="mt-8">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {posts.map((post) => (
                                <Link href={post.slug || '#'} key={post.slug}>
                                    <div className="group bg-white dark:bg-[#242424] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                        {post.cover && (
                                            <div className="aspect-video overflow-hidden">
                                                <img 
                                                    src={post.cover} 
                                                    alt={post.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <h2 className="text-xl font-semibold text-theme-text-primary mb-2 group-hover:text-primary-500 transition-colors">
                                                {post.title}
                                            </h2>
                                            {post.description && (
                                                <p className="text-theme-text-secondary mb-4 line-clamp-2">
                                                    {post.description}
                                                </p>
                                            )}
                                            <div className="flex items-center text-sm text-theme-text-secondary">
                                                {post.date && (
                                                    <span className="flex items-center">
                                                        <Icon icon="material-symbols:calendar-month-outline" className="w-4 h-4 mr-1" />
                                                        {new Date(post.date).toLocaleDateString()}
                                                    </span>
                                                )}
                                                {post.author && (
                                                    <span className="flex items-center ml-4">
                                                        <Icon icon="material-symbols:person-outline" className="w-4 h-4 mr-1" />
                                                        {post.author}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <Icon icon="material-symbols:article-outline" className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-theme-text-primary mb-2">
                                No Posts Found
                            </h3>
                            <p className="text-sm text-theme-text-secondary">
                                There are no blog posts in this category yet.
                            </p>
                        </div>
                    )}
                </div>

                {children}
            </div>
        </main>
    );
} 