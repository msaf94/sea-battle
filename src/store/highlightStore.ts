import { createRoot, createSignal } from 'solid-js';

type State = { isAvailableToPlace?: boolean; x: number; y: number }[];

const initialState: State = [];

/** Хранилище частей корабля для подсветки при drag */
function createState() {
    const [state, setState] = createSignal(initialState);

    /** Очистить хранилище */
    function clearHighlightState() {
        setState([]);
    }

    function setHighlightState(newState: State) {
        setState(newState);
    }

    return { clearHighlightState, setHighlightState, state };
}

export const highlightStore = createRoot(createState);
