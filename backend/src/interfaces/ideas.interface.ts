interface Idea {
  id: number;
  title: string;
  context: string;
  user_id: number;
  created_at: Date;
  archived_at?: Date | null;
  deleted_at?: Date | null;
  goal?: string | null;
  profits?: string | null;
  risks?: string | null;
  cloudshare?: string | null;
  primary_img?: string | null;
  views: number;
  [key: string]: string | number | Date | null | undefined;
}

interface PostIdea {
  title: string;
  context: string;
  user_id: number;
  goal?: string | null;
  profits?: string | null;
  risks?: string | null;
  cloudshare?: string | null;
  primary_img?: string | null;
  [key: string]: string | number | Date | null | undefined;
}

interface IdeaUpdate {
  title?: string;
  context?: string;
  goal?: string | null;
  profits?: string | null;
  risks?: string | null;
  cloudshare?: string | null;
  primary_img?: string | null;
}

interface IdeaFilterQuery {
  userId?: string;
  userAgencyId?: string;
  publicationDateStart?: string;
  publicationDateEnd?: string;
  autorSelectionTag?: string;
  selectedCategories?: string[];
  trendingTag?: string;
  titleContains?: string;
  hasAttachment?: string;
  hasNoComment?: string;
}

export { Idea, IdeaFilterQuery, PostIdea, IdeaUpdate };
