export interface FrontMatter {
    title?: string;
    description?: string;
    cover?: string;
    game?: string;
    mainVideoId?: string;
    videos?: Array<{
        id: string;
        title: string;
        description?: string;
    }>;
    videosTitle?: string;
    videosDescription?: string;
    breadcrumb?: boolean;
    comments?: boolean;
    categories?: string[];
    layout?: string;
    date?: string;
    author?: string;
    tags?: string[];
    slug?: string;
    category?: string;
    gameId?: string;
}

export interface VideoItem {
    id: string;
    title: string;
    description?: string;
}

export interface PageData {
    frontMatter: FrontMatter;
    filePath: string;
    name: string;
    route: string;
    locale?: string;
} 