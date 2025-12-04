import { useMemo, useRef, useState } from 'react';
import { Filter, ViewMode, type Movie, SortKey, SortOrder } from './types/movie';
import { MOVIES } from './data/movies';
import { Toolbar } from './components/Toolbar';
import { ViewSwitch } from './components/ViewSwitch';
import { MovieList } from './components/MovieList';
import './App.css';

function normalize(str: string) {
    return str.trim().toLocaleLowerCase();
}

export default function App() {
    const [movies, setMovies] = useState<Movie[]>(() => MOVIES);
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [view, setView] = useState<ViewMode>(ViewMode.Grid);

    const [sortKey, setSortKey] = useState<SortKey>(SortKey.Title);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);

    // По ТЗ: значение инпута в ref
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchTick, setSearchTick] = useState(0);

    /* Один collator для всей жизни компонента
       sensitivity: 'base' — игнорирует регистр/диакритику
       numeric: true — числа в строках сравниваются по числовому смыслу */
    const collator = useMemo(
        () => new Intl.Collator('ru', { sensitivity: 'base', numeric: true }),
        []
    );

    const visible: Movie[] = useMemo(() => {
        const query = normalize(searchRef.current?.value ?? '');
        let list = movies;

        if (filter === Filter.Favorites) list = list.filter((m) => m.isFavorite);
        if (query) list = list.filter((m) => normalize(m.title).includes(query));

        // сортировка (копируем массив перед sort)
        const compare = (a: Movie, b: Movie) => {
            let res = 0;
            if (sortKey === SortKey.Title) {
                res = collator.compare(a.title, b.title);
            } else {
                res = a.year - b.year;
            }
            return sortOrder === SortOrder.Asc ? res : -res;
        };

        return [...list].sort(compare);
    }, [movies, filter, sortKey, sortOrder, collator]);

    function toggleFavorite(id: number) {
        setMovies((prev) =>
            prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m)),
        );
    }

    function applySearch() { setSearchTick((t) => t + 1); }
    function clearSearch()  { if (searchRef.current) searchRef.current.value = ''; setSearchTick((t) => t + 1); }

    return (
        <main className="container">
            <header className="pageHead">
                <h1 className="title">Каталог фильмов</h1>
                <ViewSwitch view={view} onChange={setView} />
            </header>

            <Toolbar
                filter={filter}
                onChangeFilter={setFilter}
                inputRef={searchRef}
                onApplySearch={applySearch}
                onClearSearch={clearSearch}

                /* NEW: сортировка */
                sortKey={sortKey}
                sortOrder={sortOrder}
                onChangeSortKey={setSortKey}
                onToggleSortOrder={() =>
                    setSortOrder((o) => (o === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc))
                }
            />

            <MovieList movies={visible} view={view} onToggleFavorite={toggleFavorite} />
        </main>
    );
}
