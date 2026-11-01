import { useEffect } from "react";
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.overview}>
          {movie.overview || "No overview available."}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
