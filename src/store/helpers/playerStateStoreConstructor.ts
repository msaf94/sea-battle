import { createStore, produce } from 'solid-js/store';

import { CurrentPlayerState, EnemyState, ShipPartLocation, ShipPartState, ShipType } from '../declare';
import { calculateFireResult } from './calculateFireResult';
import { getPlacedStateFunction } from './getPlacedStateFunction';

/** Конструктор состояния игрока */
export function playerStateStoreConstructor<T extends CurrentPlayerState | EnemyState>(initialState: T) {
    const [state, setState] = createStore(initialState);

    /** Получить состояние части корабля по координатам */
    function getShipPartState(parameters: ShipPartLocation) {
        return getPlacedStateFunction({ shipPartLocation: parameters, ships: state.ships });
    }

    /** Результат удара соперника */
    function calculateEnemyFireResult(aim: ShipPartLocation) {
        const result = calculateFireResult({ aim, shipsState: state.ships });

        if ('shipType' in result) {
            const { shipIndex, shipPartIndex, shipType } = result;

            setState(
                produce(state => {
                    state.ships[shipType][shipIndex][shipPartIndex].isDamaged = true;
                })
            );

            return {
                ...aim,
                isSuccessfulHit: true
            };
        }

        return { ...aim, isSuccessfulHit: false };
    }

    /** Вернет корабль по его части */
    function getShipByShipPart(shipPartLocation: ShipPartLocation) {
        for (const [shipType, ships] of Object.entries(state.ships) as [ShipType, ShipPartState[][]][]) {
            for (let index = 0; index < ships.length; index++) {
                const ship = ships[index];

                for (const { location } of ship) {
                    if (location.column === shipPartLocation.column && location.row === shipPartLocation.row) {
                        return { ship, shipIndex: index, shipType } as const;
                    }
                }
            }
        }
    }

    /** Свободная ячейка повреждена  */
    function isEmptyCellDamaged(cell: ShipPartLocation) {
        return !!state.attempts.find(attempt => cell.column === attempt.column && cell.row === attempt.row);
    }

    /** Добавление попытки выстрела по пустой ячейке */
    function addAttempt(attempt: ShipPartLocation) {
        setState(
            produce(state => {
                state.attempts.push(attempt);
            })
        );
    }

    /** Состояние готовности игрока */
    function isPlayerReady() {
        return state.ready;
    }

    return {
        addAttempt,
        calculateEnemyFireResult,
        getShipByShipPart,
        getShipPartState,
        isEmptyCellDamaged,
        isPlayerReady,
        setState,
        state
    };
}
