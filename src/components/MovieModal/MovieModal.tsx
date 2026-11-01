import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          ✕
        </button>

        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className={css.backdropImage}
          />
        )}

        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.info}>
            <strong>Release Date:</strong> {movie.release_date || "N/A"}
          </p>
          <p className={css.info}>
            <strong>Rating:</strong> {movie.vote_average ?? "N/A"}
          </p>
          <p className={css.overview}>
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;
