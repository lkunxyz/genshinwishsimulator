import { supabase } from './client';

// 缓存接口定义
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CommentCache {
  [key: string]: CacheItem<CommentsResponse>;
}

export interface Comment {
  id: number;
  game_id: string;
  user_id: string;
  user_name: string;
  email: string;
  content: string;
  rating: number;
  likes: number;
  parent_id: number | null;
  level: number;
  path: string;
  created_at: string;
  updated_at: string;
  replies?: Comment[];
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
}

// 缓存配置
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5分钟过期
const commentsCache: CommentCache = {};

// 生成缓存键
const getCacheKey = (gameId: string, page: number, pageSize: number): string => {
  return `comments_${gameId}_${page}_${pageSize}`;
};

// 检查缓存是否有效
const isCacheValid = (cacheItem: CacheItem<CommentsResponse>): boolean => {
  return Date.now() - cacheItem.timestamp < CACHE_EXPIRY_TIME;
};

// 清除指定游戏的所有缓存
const clearGameCache = (gameId: string) => {
  Object.keys(commentsCache).forEach(key => {
    if (key.startsWith(`comments_${gameId}`)) {
      delete commentsCache[key];
    }
  });
};

export const getGameComments = async (gameId: string, page: number = 1, pageSize: number = 10): Promise<CommentsResponse> => {
  const cacheKey = getCacheKey(gameId, page, pageSize);
  
  // 检查缓存
  const cachedData = commentsCache[cacheKey];
  if (cachedData && isCacheValid(cachedData)) {
    return cachedData.data;
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // 首先获取总数
  const countQuery = await supabase
    .from('incrediboxbananacomments')
    .select('id', { count: 'exact' })
    .eq('game_id', gameId);

  // 获取分页数据
  const { data, error } = await supabase
    .from('incrediboxbananacomments')
    .select('*')
    .eq('game_id', gameId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  const response = {
    comments: data || [],
    total: countQuery.count || 0
  };

  // 更新缓存
  commentsCache[cacheKey] = {
    data: response,
    timestamp: Date.now()
  };

  return response;
};

export const createComment = async (comment: any) => {
  const { data, error } = await supabase
    .from('incrediboxbananacomments')
    .insert([comment])
    .select()
    .single();

  if (error) throw error;

  // 清除该游戏的所有缓存
  clearGameCache(comment.game_id);

  return data;
}; 