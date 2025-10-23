import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Comment, getGameComments, createComment } from '@/lib/supabase/comments';
import { commentTranslations } from '@/config/locales/comments';
import { Icon } from '@iconify/react';

const useTranslations = () => {
    const router = useRouter();
    const { locale = 'en' } = router;
    const t = (key: keyof typeof commentTranslations.en) => {
        return commentTranslations[locale as keyof typeof commentTranslations]?.[key] || commentTranslations.en[key];
    };
    return { t };
};

interface GameCommentsProps {
    gameId: string;
}

const CommentItem: React.FC<{
    comment: Comment;
    onReply: (parentId: number) => void;
    level: number;
}> = ({ comment, onReply, level }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const { t } = useTranslations();

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className={`${level > 0 ? 'ml-12 mt-2' : 'mt-4'}`}>
            <div className="flex gap-3">
                {/* 头像 */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                        {comment.user_name.charAt(0).toUpperCase()}
                    </div>
                </div>
                
                {/* 评论内容 */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">{comment.user_name}</span>
                        <span className="text-sm text-gray-500">·</span>
                        <span className="text-sm text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    
                    <p className="mt-1 text-gray-900 dark:text-gray-100">{comment.content}</p>
                    
                    {/* 操作按钮 */}
                    <div className="flex items-center gap-6 mt-2">
                        {/* 回复按钮 */}
                        <button 
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                            <Icon icon="material-symbols:chat-bubble-outline" className="w-5 h-5" />
                            <span className="text-sm">{t('reply')}</span>
                        </button>
                        
                        {/* 点赞按钮 */}
                        <button 
                            onClick={handleLike}
                            className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors"
                        >
                            <Icon 
                                icon={isLiked ? "material-symbols:favorite" : "material-symbols:favorite-outline"} 
                                className={`w-5 h-5 ${isLiked ? 'text-pink-500' : ''}`}
                            />
                            <span className="text-sm">{likeCount}</span>
                        </button>
                        
                        {/* 分享按钮 */}
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <Icon icon="material-symbols:share-outline" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 回复列表 */}
            {comment.replies?.map(reply => (
                <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    level={level + 1}
                />
            ))}
        </div>
    );
};

const MainCommentForm: React.FC<{
    gameId: string;
    onCommentSubmit: () => void;
}> = ({ gameId, onCommentSubmit }) => {
    const { t } = useTranslations();
    const [content, setContent] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !userName.trim()) return;

        setSubmitting(true);
        try {
            await createComment({
                game_id: gameId,
                user_id: 'anonymous',
                user_name: userName,
                email: email || null,
                content,
                rating: 5,
            });
            setContent('');
            setUserName('');
            setEmail('');
            setIsExpanded(false);
            onCommentSubmit();
        } catch (error) {
            console.error('Failed to submit comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCollapse = () => {
        setIsExpanded(false);
        // 清空所有输入内容
        setContent('');
        setUserName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : 'G'}
                </div>
                <div className="flex-1">
                    {!isExpanded ? (
                        <div 
                            onClick={() => setIsExpanded(true)}
                            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-2xl cursor-text text-gray-500 transition-colors"
                        >
                            {t('writeComment')}
                        </div>
                    ) : (
                        <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
                            {/* 收起按钮 */}
                            <div className="absolute right-0 -top-8 flex items-center gap-2 text-gray-500">
                                <button
                                    type="button"
                                    onClick={handleCollapse}
                                    className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-sm transition-colors"
                                >
                                    <Icon icon="material-symbols:close" className="w-4 h-4" />
                                    <span>{t('collapse')}</span>
                                </button>
                            </div>
                            
                            {/* 其他输入框内容 */}
                            <div className="flex gap-3 mb-3">
                                <input
                                    type="text"
                                    placeholder={t('yourName')}
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    required
                                />
                                <div className="flex-1 relative">
                                    <input
                                        type="email"
                                        placeholder={t('yourEmail')}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-20"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                        ({t('optional')})
                                    </span>
                                </div>
                            </div>
                            <textarea
                                placeholder={t('writeComment')}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                rows={3}
                                required
                            />
                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
                                >
                                    {submitting ? t('submitting') : t('submit')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export const GameComments: React.FC<GameCommentsProps> = ({ gameId }) => {
    const { t } = useTranslations();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalComments, setTotalComments] = useState(0);
    const pageSize = 10;

    const loadComments = async (page: number = currentPage) => {
        setLoading(true);
        try {
            const { comments, total } = await getGameComments(gameId, page, pageSize);
            setComments(comments);
            setTotalComments(total);
            setCurrentPage(page);
        } catch (err) {
            setError(t('error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments(1);
    }, [gameId]);

    const totalPages = Math.ceil(totalComments / pageSize);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        loadComments(page);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{t('comments')}</h2>
            <MainCommentForm gameId={gameId} onCommentSubmit={() => loadComments(1)} />
            
            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-8">{error}</div>
            ) : (
                <>
                    <div className="space-y-4 mt-6">
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                onReply={() => {}}
                                level={0}
                            />
                        ))}
                    </div>
                    
                    {/* 分页控件 */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
                            >
                                <Icon icon="material-symbols:chevron-left" className="w-5 h-5" />
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page => {
                                    // 显示第一页、最后一页，和当前页附近的页码
                                    return page === 1 || 
                                           page === totalPages || 
                                           Math.abs(page - currentPage) <= 1;
                                })
                                .map((page, index, array) => {
                                    // 如果页码不连续，显示省略号
                                    if (index > 0 && page - array[index - 1] > 1) {
                                        return (
                                            <React.Fragment key={`ellipsis-${page}`}>
                                                <span className="px-2">...</span>
                                                <button
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-8 h-8 rounded-lg ${
                                                        currentPage === page
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-100 dark:bg-gray-700'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            </React.Fragment>
                                        );
                                    }
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-8 h-8 rounded-lg ${
                                                currentPage === page
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
                            >
                                <Icon icon="material-symbols:chevron-right" className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GameComments;