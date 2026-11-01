import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className={css.card}>
      <img src={posterUrl} alt={movie.title} className={css.poster} />
      <h3 className={css.title}>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
