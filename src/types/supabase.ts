export interface Database {
  public: {
    Tables: {
      incrediboxbananacomments: {
        Row: {
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
        };
        Insert: {
          game_id: string;
          user_id: string;
          user_name: string;
          email: string;
          content: string;
          rating: number;
          parent_id?: number;
          level?: number;
        };
      };
    };
  };
} 