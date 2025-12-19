export interface BookClub {
  id: string;
  name: string;
  description: string;
  image_url: string;
  creator_id: string;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  description: string | null;
  first_publish_year: number | null;
  created_at: string;
}

export interface Post {
  id: string;
  title: string | null;
  content: string;
  author_id: string;
  club_id: string;
  book_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClubMember {
  id: string;
  club_id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export interface PostWithBook extends Post {
  book: {
    id: string;
    title: string;
    cover_url: string | null;
  } | null;
}