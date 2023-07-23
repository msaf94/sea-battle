import { ShipPartLocation, ShipsState, ShipType } from 'store/declare';

import { getPlacedStateFunction } from './getPlacedStateFunction';

/**
 * Функция для вычисления результата удара соперника
 *
 * Если удар успешный - вернет информацию о части корабля, по которой попали.
 * Иначе переданный `aim`
 */
export function calculateFireResult({ aim, shipsState }: { aim: ShipPartLocation; shipsState: ShipsState }) {
    const shipPartToDamage = getPlacedStateFunction({ shipPartLocation: aim, ships: shipsState });

    if (shipPartToDamage) {
        for (const [_shipType, ships] of Object.entries(shipsState)) {
            const shipType = _shipType as ShipType;

            for (let shipIndex = 0; shipIndex < ships.length; shipIndex++) {
                const shipParts = ships[shipIndex];

                for (let shipPartIndex = 0; shipPartIndex < shipParts.length; shipPartIndex++) {
                    const shipPart = shipParts[shipPartIndex];

                    const successfulHit =
                        shipPart.location.column === shipPartToDamage.location.column &&
                        shipPart.location.row === shipPartToDamage.location.row;

                    if (successfulHit) {
                        return { shipIndex, shipPartIndex, shipType };
                    }
                }
            }
        }
    }

    return aim;
}
