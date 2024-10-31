export interface TvShow {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    first_air_date: string;
    vote_count: number;
    vote_average: number;
    original_language: string;
    poster_path: string;
}


export interface TvShowDetails extends TvShow {
    languages: string[],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string,
    original_language: string,
    popularity: number,
    status: string;
}