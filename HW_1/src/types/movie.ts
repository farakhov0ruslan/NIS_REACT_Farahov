export type Movie = {
    id: number;
    title: string;
    year: number;
    posterUrl: string;
    isFavorite: boolean;
};

export enum Filter {
    All = 'all',
    Favorites = 'favorites',
}

export enum ViewMode {
    Grid = 'grid',
    List = 'list',
}

export enum SortKey {
    Title = 'title',
    Year = 'year',
}

export enum SortOrder {
    Asc = 'asc',
    Desc = 'desc',
}
