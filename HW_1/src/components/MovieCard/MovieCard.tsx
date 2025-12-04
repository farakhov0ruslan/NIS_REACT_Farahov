import { Movie } from '../../types/movie';
import './moviecard.css';

type Props = {
    movie: Movie;
    onToggleFavorite: (id: number) => void;
};

export default function MovieCard({ movie, onToggleFavorite }: Props) {
    const { id, title, year, posterUrl, isFavorite } = movie;

    return (
        <article className="movie-card">
            <div className="movie-card__posterWrap">
                <img className="movie-card__poster" src={posterUrl} alt={title} loading="lazy" />
                <button
                    type="button"
                    className={`fav ${isFavorite ? 'fav--active' : ''}`}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                    onClick={() => onToggleFavorite(id)}
                    title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>
            <div className="movie-card__meta">
                <h3 className="movie-card__title">{title}</h3>
                <div className="movie-card__year">{year}</div>
            </div>
        </article>
    );
}
