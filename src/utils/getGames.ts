import { FrontMatter, PageMapItem } from 'nextra';
import { getGamesByCategory, getGamesByFeature } from './getGamesByCategory';
import { getGamesInCurrentDirectory } from './getGamesByCategory';

export function getGames(
    pageMap: PageMapItem[],
    options: {
        directory?: string;
        category?: string;
        feature?: string;
        locale?: string;
        limit?: number;
    }
) {
    console.log('getGames', options);
    const { directory, category, feature, locale = 'en', limit } = options;
    console.log('getGames', directory, category, feature, locale, limit);

    // 明确指定 games 的类型为 FrontMatter[]
    let games: FrontMatter[] = [];

    if (feature && feature !== 'undefined') {
        // 使用新的feature-based过滤
        console.log('Using feature-based filtering:', feature);
        games = getGamesByFeature(pageMap, feature, locale);
    } else if (directory) {
        console.log('Using directory-based filtering:', directory);
        games = getGamesInCurrentDirectory(pageMap, directory, locale);
    } else if (category) {
        console.log('Using category-based filtering:', category);
        games = getGamesByCategory(pageMap, category, locale);
    }

    // 应用限制
    if (limit) {
        games = games.slice(0, limit);
    }

    return games;
} 