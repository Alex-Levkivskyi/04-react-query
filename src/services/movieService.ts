import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3";
const TMBD_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODliZTMyYzQxNGUzMjkwODQwNzcxZDRiZDZjY2IxMCIsIm5iZiI6MTc5MjkwOTE1MC4zNDUsInN1YiI6IjZhZGQ5ZjVlNTBiMGM0OTU0MGQ4MjIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l-Dw-eW2pRduOwrxeCTPF-Jv_SR4tC0OSQ9PKznXt6c";

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
        Authorization: `Bearer ${TMBD_TOKEN}`,
      },
    }
  );
  return response.data;
};