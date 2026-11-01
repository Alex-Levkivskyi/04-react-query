export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview?: string;
    release_date: string;
}

export interface MoviesHttpResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}