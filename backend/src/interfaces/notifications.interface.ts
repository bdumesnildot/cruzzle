interface NotificationIdea {
  id: number;
  idea_id: number;
  user_id: number;
  type: string;
  created_at?: string;
  red_at?: string;
}

interface NotificationComment {
  id: number;
  comment_id: number;
  user_id: number;
  type: string;
  created_at?: string;
  red_at?: string;
}

export { NotificationIdea, NotificationComment };
