import { createRoot, createSignal } from 'solid-js';

import { Rotation, ShipType } from './declare';

type State = {
    isReplacement?: boolean;
    rotation: Rotation;
    shipIndex?: number;
    size: number;
    type: ShipType;
} | null;

const initialState: State = null;

/** Хранилище корабля, который находится в режиме drag */
function createDragState() {
    const [state, setState] = createSignal(initialState);

    /** Очистить хранилище */
    function clearDragState() {
        setState(null);
    }

    /** обновление drag хранилища  */
    function setDragState(newState: State) {
        setState(newState);
    }

    return { clearDragState, getDragState: state, setDragState };
}

export const dragStore = createRoot(createDragState);
