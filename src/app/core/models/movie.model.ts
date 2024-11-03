export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  original_language: string;
  poster_path: string;
}

export interface MovieDetails extends Movie {
  budget: number;
  homepage: string;
  popularity: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
}
