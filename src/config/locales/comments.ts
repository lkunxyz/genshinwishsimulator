import { SUPPORTED_LOCALES } from '../site';

type CommentTranslations = {
  comments: string;
  loading: string;
  error: string;
  noComments: string;
  reply: string;
  submit: string;
  submitting: string;
  yourName: string;
  yourEmail: string;
  writeComment: string;
  collapse: string;
  optional: string;
};

export const commentTranslations: Record<keyof typeof SUPPORTED_LOCALES, CommentTranslations> = {
  en: {
    comments: 'Comments',
    loading: 'Loading...',
    error: 'Failed to load comments',
    noComments: 'No comments yet. Be the first to comment!',
    reply: 'Reply',
    submit: 'Submit',
    submitting: 'Submitting...',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    writeComment: 'Write your comment...',
    collapse: 'Collapse',
    optional: 'optional',
  },
  zh: {
    comments: '评论',
    loading: '加载中...',
    error: '加载评论失败',
    noComments: '还没有评论，来说两句吧~',
    reply: '回复',
    submit: '发表评论',
    submitting: '提交中...',
    yourName: '你的名字',
    yourEmail: '你的邮箱',
    writeComment: '写下你的评论...',
    collapse: '收起',
    optional: '可选',
  }
}; 