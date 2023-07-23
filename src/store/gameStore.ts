import { createEffect, createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';

import { currentPlayerStore } from './currentPlayerStore';
import { PlayerID } from './declare';
import { enemyStore } from './enemyStore';

/** Состояние игровой сессии "Подготовка" */
type GameStagePreparation = 'preparation';
/** Состояние игровой сессии "Игра" */
type GameStageAction = 'action';

type GameStage = GameStagePreparation | GameStageAction;

export type State = {
    /** текущий активный игрок */
    currentActivePlayer: PlayerID | null;
    /** Включен debug режим */
    debug: boolean;
    /** ID хоста */
    hostId: string | null;
    /** состояние игровой сессии */
    stage: GameStage;
};

const initialState: State = {
    currentActivePlayer: null,
    debug: false,
    hostId: null,
    stage: 'preparation'
};

/** Состояние игровой сессии */
function createState() {
    const [state, setState] = createStore(initialState);
    const { state: currentPlayerState } = currentPlayerStore;
    const { state: enemyState } = enemyStore;

    // если оба игрока готовы - меняем стадию игры на "начало боя"
    createEffect(() => {
        if (currentPlayerState.ready && enemyState.ready) {
            setState('stage', 'action');
        }
    });

    /** Установить текущего активного игрока */
    function setCurrentActivePlayer(playerID: PlayerID) {
        return setState('currentActivePlayer', playerID);
    }

    /** Установить состояние игровой сессии */
    function setGameStage(stage: GameStage) {
        return setState('stage', stage);
    }

    /** Текущий игрок является активным */
    function isCurrentPlayerActive() {
        return state.currentActivePlayer === currentPlayerState.id;
    }

    /** Переключение активного игрока */
    function toggleActivePlayer() {
        const playerIdToSet =
            state.currentActivePlayer === currentPlayerState.id ? enemyState.id : currentPlayerState.id;

        setState('currentActivePlayer', playerIdToSet);
    }

    /** Установка хоста по его ID */
    function setHost(id: string) {
        setState('hostId', id);
    }

    /** Является ли игрок с ID хостом */
    function isHostById(id: string) {
        return state.hostId === id;
    }

    /** состояние Debug режима */
    function isDebugModeEnabled() {
        return state.debug;
    }

    /** Игра находится на стадии "Подготовка" */
    function isPreparationStage() {
        return state.stage === 'preparation';
    }

    /** Игра находится на стадии "Бой" */
    function isActionStage() {
        return state.stage === 'action';
    }

    return {
        isActionStage,
        isCurrentPlayerActive,
        isDebugModeEnabled,
        isHostById,
        isPreparationStage,
        setCurrentActivePlayer,
        setGameStage,
        setHost,
        setState,
        state,
        toggleActivePlayer
    };
}

export const gameStore = createRoot(createState);
