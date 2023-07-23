import { createRoot, createSignal } from 'solid-js';

import { Rotation } from './declare';

type State = Rotation;

const initialState: State = 'horizontal';

/** Хранилище поворота кораблей при расстановке */
function createDragState() {
    const [state, setState] = createSignal(initialState);

    /** Переключить поворот */
    function toggleRotationState() {
        setState(prevState => {
            return prevState === 'horizontal' ? 'vertical' : 'horizontal';
        });
    }

    function getRotation() {
        return state();
    }

    return { getRotation, toggleRotationState };
}

export const rotationStore = createRoot(createDragState);
