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
  },
  ja: {
    comments: 'コメント',
    loading: '読み込み中...',
    error: 'コメントの読み込みに失敗しました',
    noComments: 'まだコメントがありません。最初にコメントしてください!',
    reply: '返信',
    submit: '送信',
    submitting: '送信中...',
    yourName: 'お名前',
    yourEmail: 'メールアドレス',
    writeComment: 'コメントを書く...',
    collapse: '折りたたむ',
    optional: '任意',
  },
  ko: {
    comments: '댓글',
    loading: '로딩 중...',
    error: '댓글을 불러오는데 실패했습니다',
    noComments: '아직 댓글이 없습니다. 첫 댓글을 남겨보세요!',
    reply: '답글',
    submit: '제출',
    submitting: '제출 중...',
    yourName: '이름',
    yourEmail: '이메일',
    writeComment: '댓글을 작성하세요...',
    collapse: '접기',
    optional: '선택사항',
  },
  de: {
    comments: 'Kommentare',
    loading: 'Laden...',
    error: 'Fehler beim Laden der Kommentare',
    noComments: 'Noch keine Kommentare. Seien Sie der Erste!',
    reply: 'Antworten',
    submit: 'Absenden',
    submitting: 'Wird gesendet...',
    yourName: 'Ihr Name',
    yourEmail: 'Ihre E-Mail',
    writeComment: 'Schreiben Sie Ihren Kommentar...',
    collapse: 'Einklappen',
    optional: 'optional',
  },
  fr: {
    comments: 'Commentaires',
    loading: 'Chargement...',
    error: 'Échec du chargement des commentaires',
    noComments: 'Aucun commentaire pour le moment. Soyez le premier à commenter !',
    reply: 'Répondre',
    submit: 'Envoyer',
    submitting: 'Envoi en cours...',
    yourName: 'Votre nom',
    yourEmail: 'Votre e-mail',
    writeComment: 'Écrivez votre commentaire...',
    collapse: 'Réduire',
    optional: 'facultatif',
  },
  es: {
    comments: 'Comentarios',
    loading: 'Cargando...',
    error: 'Error al cargar los comentarios',
    noComments: 'Aún no hay comentarios. ¡Sé el primero en comentar!',
    reply: 'Responder',
    submit: 'Enviar',
    submitting: 'Enviando...',
    yourName: 'Tu nombre',
    yourEmail: 'Tu correo electrónico',
    writeComment: 'Escribe tu comentario...',
    collapse: 'Contraer',
    optional: 'opcional',
  },
  it: {
    comments: 'Commenti',
    loading: 'Caricamento...',
    error: 'Errore nel caricamento dei commenti',
    noComments: 'Nessun commento ancora. Sii il primo a commentare!',
    reply: 'Rispondi',
    submit: 'Invia',
    submitting: 'Invio in corso...',
    yourName: 'Il tuo nome',
    yourEmail: 'La tua email',
    writeComment: 'Scrivi il tuo commento...',
    collapse: 'Riduci',
    optional: 'facoltativo',
  }
}; 