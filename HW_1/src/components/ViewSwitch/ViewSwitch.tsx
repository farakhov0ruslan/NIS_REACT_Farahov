import { ViewMode } from '../../types/movie';
import './viewswitch.css';

type Props = {
    view: ViewMode;
    onChange: (v: ViewMode) => void;
};

export default function ViewSwitch({ view, onChange }: Props) {
    return (
        <div className="view-switch" role="group" aria-label="Переключатель вида">
            <button
                type="button"
                className={`segmented ${view === ViewMode.Grid ? 'segmented--active' : ''}`}
                aria-pressed={view === ViewMode.Grid}
                onClick={() => onChange(ViewMode.Grid)}
                title="Плитка"
            >
                ⬚⬚
            </button>
            <button
                type="button"
                className={`segmented ${view === ViewMode.List ? 'segmented--active' : ''}`}
                aria-pressed={view === ViewMode.List}
                onClick={() => onChange(ViewMode.List)}
                title="Список"
            >
                ☰
            </button>
        </div>
    );
}
