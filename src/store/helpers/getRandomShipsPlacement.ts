import { ShipPartState, ShipsState } from 'store/declare';

import { getPlacementAvailability } from './getPlacementAvailability';

function getRandomCell() {
    return Math.floor(Math.random() * 10) + 1;
}

function getRandomRotation() {
    return Math.random() > 0.5 ? 'horizontal' : 'vertical';
}

/** Вернет список кораблей со случайным расположением */
export function getRandomShipsPlacement(): ShipsState {
    let completed = false;
    const totalShipCount = 10;

    const result: ShipsState = {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    };

    while (!completed) {
        const shipSize = (() => {
            if (result[4].length < 1) return 4;
            if (result[3].length < 2) return 3;
            if (result[2].length < 3) return 2;

            return 1;
        })();

        const randomCell = {
            x: getRandomCell(),
            y: getRandomCell()
        };

        const randomRotation = getRandomRotation();

        const ship: ShipPartState[] = Array(shipSize)
            .fill(undefined)
            .map((_, index) => {
                const column = randomCell.x + (randomRotation === 'horizontal' ? index : 0);
                const row = randomCell.y + (randomRotation === 'vertical' ? index : 0);

                return {
                    isDamaged: false,
                    location: {
                        column,
                        row
                    },
                    rotation: randomRotation
                };
            });

        const isAvailableToPlace = ship.every(shipPart =>
            getPlacementAvailability({ column: shipPart.location.column, row: shipPart.location.row, ships: result })
        );

        if (isAvailableToPlace) result[shipSize].push(ship);

        const currentShipCount = Object.values(result).flat().length;

        if (currentShipCount === totalShipCount) {
            completed = true;
        }
    }

    return result;
}
