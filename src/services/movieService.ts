import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesHttpResponse> => {
  const response = await axios.get<MoviesHttpResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );
  return response.data;
};
