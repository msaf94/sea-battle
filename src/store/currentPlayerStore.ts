import { createRoot } from 'solid-js';

import { CurrentPlayerState, ShipPartLocation, ShipPartState, ShipsState, ShipType, totalShipsCount } from './declare';
import { playerStateStoreConstructor } from './helpers/playerStateStoreConstructor';

const initialState: CurrentPlayerState = {
    attempts: [],
    currentAim: null,
    id: window.crypto.randomUUID(),
    ready: false,
    ships: {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    }
};

/** Состояние текущего игрока */
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

    /** Выставил ли игрок все корабли */
    function areAllShipsPlaced() {
        return [...Object.values(state.ships).values()].flat().length === totalShipsCount;
    }

    /** Переключить состояние готовности */
    function toggleReadyState() {
        setState('ready', !state.ready);
    }

    /** Добавить корабль */
    function setShip({ partsToAdd, shipType }: { partsToAdd: ShipPartState[]; shipType: ShipType }) {
        setState('ships', shipType, prevState => {
            return [...prevState, partsToAdd];
        });
    }

    /** Заменить корабль */
    function replaceShip({
        partsToReplace,
        shipIndex,
        shipType
    }: {
        partsToReplace: ShipPartState[];
        shipIndex: number;
        shipType: ShipType;
    }) {
        setState('ships', shipType, shipIndex, partsToReplace);
    }

    /** Очистить текущую цель */
    function clearCurrentAim() {
        setState('currentAim', () => null);
    }

    /** Установить текущую цель */
    function setCurrentAim(aim: ShipPartLocation) {
        return setState('currentAim', aim);
    }

    /** Очистить поле игрока */
    function resetShips() {
        setState('ships', initialState.ships);
    }

    /** Установить все корабли по переданным данным */
    function setShips(newState: ShipsState) {
        setState('ships', newState);
    }

    return {
        addAttempt,
        areAllShipsPlaced,
        calculateEnemyFireResult,
        clearCurrentAim,
        getShipByShipPart,
        getShipPartState,
        isEmptyCellDamaged,
        isPlayerReady,
        replaceShip,
        resetShips,
        setCurrentAim,
        setShip,
        setShips,
        setState,
        state,
        toggleReadyState
    };
}

export const currentPlayerStore = createRoot(state);
