export interface BookClub {
  id: string;
  name: string;
  description: string;
  image_url: string;
  creator_id: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string | null;
  content: string;
  author_id: string;
  club_id: string;
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