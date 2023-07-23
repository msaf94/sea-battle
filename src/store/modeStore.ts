import { createRoot, createSignal } from 'solid-js';

type State = 'currentPlayer' | 'enemy';

const initialState: State = 'currentPlayer';

/** Хранилище поля для отображения */
function createState() {
    const [state, setState] = createSignal(initialState);

    /** Переключить поле для отображения */
    function toggleMode() {
        setState(prevState => {
            return prevState === 'currentPlayer' ? 'enemy' : 'currentPlayer';
        });
    }

    /** Получить поле для отображения */
    function getMode() {
        return state();
    }

    return { getMode, toggleMode };
}

export const modeStore = createRoot(createState);
