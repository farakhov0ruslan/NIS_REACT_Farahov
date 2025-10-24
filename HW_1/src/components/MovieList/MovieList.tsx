import { Movie, ViewMode } from '../../types/movie';
import { MovieCard } from '../MovieCard';
import { EmptyState } from '../EmptyState';
import '../../styles/movie-grid.css';
import '../../styles/movie-list.css';

type Props = {
    movies: Movie[];
    view: ViewMode;
    onToggleFavorite: (id: number) => void;
};

export default function MovieList({ movies, view, onToggleFavorite }: Props) {
    if (movies.length === 0) {
        return <EmptyState />;
    }

    if (view === ViewMode.List) {
        return (
            <div className="movieList">
                {movies.map((m) => (
                    <div className="movieList__row" key={m.id}>
                        <img className="movieList__poster" src={m.posterUrl} alt={m.title} loading="lazy" />
                        <div className="movieList__content">
                            <div className="movieList__title">{m.title}</div>
                            <div className="movieList__year">{m.year}</div>
                            <button
                                type="button"
                                className={`favRow ${m.isFavorite ? 'favRow--active' : ''}`}
                                aria-pressed={m.isFavorite}
                                onClick={() => onToggleFavorite(m.id)}
                            >
                                {m.isFavorite ? '★ Убрать' : '☆ В избранное'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Grid
    return (
        <div className="grid">
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} onToggleFavorite={onToggleFavorite} />
            ))}
        </div>
    );
}
