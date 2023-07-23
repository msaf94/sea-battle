import { createRoot } from 'solid-js';
import { produce } from 'solid-js/store';

import { EnemyState, ShipPartLocation } from './declare';
import { getSafeZone } from './helpers/getSafeZone';
import { playerStateStoreConstructor } from './helpers/playerStateStoreConstructor';

const initialState: EnemyState = {
    attempts: [],
    id: null,
    ready: false,
    safeZone: [],
    ships: {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    }
};

/** Состояние соперника */
function state() {
    const {
        addAttempt,
        calculateEnemyFireResult,
        getShipByShipPart,
        getShipPartState,
        isEmptyCellDamaged,
        isPlayerReady,
        setState,
        state
    } = playerStateStoreConstructor(initialState);

    /** Установка безопасных ячеек */
    function setSafeZone() {
        setState(
            produce(state => {
                state.safeZone = getSafeZone(Object.values(state.ships).flat());
            })
        );
    }

    /** Ячейка является безопасной зоной */
    function isSafeZone(cell: ShipPartLocation) {
        return state.safeZone.find(
            safeZoneItem => safeZoneItem.column === cell.column && safeZoneItem.row === cell.row
        );
    }

    /** Установка готовности соперника */
    function setReadyState(readyState: boolean) {
        setState('ready', readyState);
    }

    /** Установка ID соперника */
    function setId(id: string) {
        setState('id', id);
    }

    /** Соперник подключился к игре */
    function enemyIsPresent() {
        return state.id !== null;
    }

    return {
        addAttempt,
        calculateEnemyFireResult,
        enemyIsPresent,
        getShipByShipPart,
        getShipPartState,
        isEmptyCellDamaged,
        isPlayerReady,
        isSafeZone,
        setId,
        setReadyState,
        setSafeZone,
        setState,
        state
    };
}

export const enemyStore = createRoot(state);
