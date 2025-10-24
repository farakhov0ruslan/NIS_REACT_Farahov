import type { RefObject, MutableRefObject } from 'react';
import { Filter, SortKey, SortOrder } from '../../types/movie';
import './toolbar.css';

type InputRef =
    | RefObject<HTMLInputElement>
    | MutableRefObject<HTMLInputElement | null>;

type Props = {
    filter: Filter;
    onChangeFilter: (f: Filter) => void;

    inputRef: InputRef;
    onApplySearch: () => void;
    onClearSearch: () => void;

    sortKey: SortKey;
    sortOrder: SortOrder;
    onChangeSortKey: (k: SortKey) => void;
    onToggleSortOrder: () => void;
};

export default function Toolbar({
                                    filter,
                                    onChangeFilter,
                                    inputRef,
                                    onApplySearch,
                                    onClearSearch,
                                    sortKey,
                                    sortOrder,
                                    onChangeSortKey,
                                    onToggleSortOrder,
                                }: Props) {
    return (
        <div className="toolbar">
            <div className="toolbar__filters" role="group" aria-label="Фильтр по избранному">
                <button
                    type="button"
                    className={`segmented ${filter === Filter.All ? 'segmented--active' : ''}`}
                    aria-pressed={filter === Filter.All}
                    onClick={() => onChangeFilter(Filter.All)}
                >
                    Все
                </button>
                <button
                    type="button"
                    className={`segmented ${filter === Filter.Favorites ? 'segmented--active' : ''}`}
                    aria-pressed={filter === Filter.Favorites}
                    onClick={() => onChangeFilter(Filter.Favorites)}
                >
                    Только избранные
                </button>
            </div>

            <div className="toolbar__search">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Название фильма…"
                    aria-label="Поиск по названию"
                />
                <button type="button" className="btn" onClick={onApplySearch}>Найти</button>
                <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => {
                        if (inputRef.current) inputRef.current.value = '';
                        onClearSearch();
                    }}
                >
                    Очистить
                </button>
            </div>

            <div className="toolbar__sort" aria-label="Сортировка">
                <select
                    className="select"
                    value={sortKey}
                    onChange={(e) => onChangeSortKey(e.target.value as SortKey)}
                    aria-label="Поле сортировки"
                >
                    <option value={SortKey.Title}>Название</option>
                    <option value={SortKey.Year}>Год выпуска</option>
                </select>

                <button
                    type="button"
                    className="btn btn--ghost sortDir"
                    onClick={onToggleSortOrder}
                    aria-label={sortOrder === SortOrder.Asc ? 'По возрастанию' : 'По убыванию'}
                    title={sortOrder === SortOrder.Asc ? 'По возрастанию' : 'По убыванию'}
                    aria-pressed={sortOrder === SortOrder.Desc}
                >
                    {sortOrder === SortOrder.Asc ? '↑' : '↓'}
                </button>
            </div>
        </div>
    );
}
