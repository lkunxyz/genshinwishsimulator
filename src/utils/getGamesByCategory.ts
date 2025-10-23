import type { Folder, MdxFile, PageMapItem } from 'nextra'
import type { FrontMatter } from '@/types'

function isMdxFile(item: PageMapItem): item is MdxFile {
    return 'frontMatter' in item && 'name' in item;
}

function isFolder(item: PageMapItem): item is Folder {
    return 'children' in item && 'name' in item;
}

// 获取指定目录下的所有游戏
export function getGamesByCategory(pageMap: PageMapItem[], category: string, locale: string = 'en') {
    const games: FrontMatter[] = [];

    console.log('=== getGamesByCategory Debug ===');
    console.log('Category:', category);
    console.log('Locale:', locale);

    // 递归遍历页面树
    const traverse = (items: PageMapItem[]) => {
        items.forEach(item => {
            if (isFolder(item)) {
                traverse(item.children);
            } else if (isMdxFile(item) && item.name !== 'index') {
                const route = item.route || '';
                console.log('Checking file:', {
                    name: item.name,
                    path: route,
                    abspath:`/${locale}/${category}`,
                    matches: route.startsWith(`/${locale}/${category}/`)
                });

                // 检查是否在指定分类目录下
                if (route.startsWith(`/${locale}/${category}/`)) {
                    const { frontMatter = {} } = item;
                    console.log('Adding game:', {
                        title: frontMatter.title,
                        cover: frontMatter.cover,
                        slug: route
                    });
                    games.push({
                        ...frontMatter,
                        slug: route
                    });
                }
            }
        });
    };

    traverse(pageMap);
    return games;
}

// 获取当前目录下的所有游戏
export function getGamesInCurrentDirectory(pageMap: PageMapItem[], currentPath: string, locale: string = 'en') {
    const games: FrontMatter[] = [];
    
    // 标准化路径处理
    const cleanPath = currentPath.replace(/\/index$/, '');
    const pathWithoutLocale = cleanPath.replace(new RegExp(`^/${locale}`), '');
    const targetPath = `/${locale}${pathWithoutLocale}`.replace(/\/$/, '');

    console.log('=== getGamesInCurrentDirectory Debug ===');
    console.log('Input Path:', currentPath);
    console.log('Clean Path:', cleanPath);
    console.log('Path Without Locale:', pathWithoutLocale);
    console.log('Target Path:', targetPath);

    // 递归遍历页面树
    const traverse = (items: PageMapItem[]) => {
        items.forEach(item => {
            if (isFolder(item)) {
                const folderPath = (item.route || '').replace(/\/$/, '');
                
                console.log('Checking folder:', {
                    name: item.name,
                    path: folderPath,
                    targetPath: targetPath,
                    matches: folderPath === targetPath
                });

                // 检查是否是目标目录
                if (folderPath === targetPath) {
                    console.log('Found matching folder:', folderPath);
                    // 处理当前目录下的文件
                    item.children.forEach(child => {
                        if (isMdxFile(child) && child.name !== 'index') {
                            const { frontMatter = {} } = child;
                            console.log('Adding game:', {
                                title: frontMatter.title,
                                slug: child.route
                            });
                            games.push({
                                ...frontMatter,
                                slug: child.route
                            });
                        }
                    });
                }
                
                // 继续遍历子目录
                traverse(item.children);
            }
        });
    };

    traverse(pageMap);
    console.log('Found games:', games.length);
    console.log('Games:', games);
    console.log('=== End Debug ===');
    
    return games;
}

// 获取指定feature的所有游戏
export function getGamesByFeature(pageMap: PageMapItem[], metaKey: string, locale: string = 'en') {
    const games: FrontMatter[] = [];

    console.log('=== getGamesByFeature Debug ===');
    console.log('MetaKey:', metaKey);
    console.log('Locale:', locale);
    console.log('PageMap length:', pageMap.length);

    // 递归遍历页面树
    const traverse = (items: PageMapItem[]) => {
        items.forEach(item => {
            if (isFolder(item)) {
                console.log('Traversing folder:', {
                    name: item.name,
                    type: 'folder',
                    childrenCount: item.children?.length
                });
                traverse(item.children);
            } else if (isMdxFile(item) && item.name !== 'index') {
                const { frontMatter = {} } = item;
                const route = item.route || '';
                
                console.log('Checking MDX file:', {
                    name: item.name,
                    path: route,
                    feature: frontMatter.feature,
                    metaKey: metaKey,
                    frontMatter: JSON.stringify(frontMatter),
                    matches: frontMatter.feature === metaKey
                });

                // 检查feature字段是否匹配
                if (frontMatter.feature === metaKey) {
                    console.log('Adding game:', {
                        title: frontMatter.title,
                        cover: frontMatter.cover,
                        slug: route,
                        feature: frontMatter.feature
                    });
                    games.push({
                        ...frontMatter,
                        slug: route
                    });
                }
            }
        });
    };

    traverse(pageMap);
    console.log('Total games found:', games.length);
    console.log('=== End getGamesByFeature Debug ===');
    return games;
}