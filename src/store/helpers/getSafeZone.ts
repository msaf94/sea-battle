import { ShipPartLocation, ShipPartState } from 'store/declare';

export function getSafeZone(ships: ShipPartState[][]) {
    const result: ShipPartLocation[] = [];

    ships.forEach(ship => {
        if (ship.every(i => i.isDamaged)) {
            ship.forEach(shipPart => {
                const topLeft: ShipPartLocation = {
                    column: shipPart.location.column - 1,
                    row: shipPart.location.row - 1
                };

                const top: ShipPartLocation = { column: shipPart.location.column, row: shipPart.location.row - 1 };

                const topRight: ShipPartLocation = {
                    column: shipPart.location.column + 1,
                    row: shipPart.location.row - 1
                };
                const right: ShipPartLocation = { column: shipPart.location.column + 1, row: shipPart.location.row };

                const bottomRight: ShipPartLocation = {
                    column: shipPart.location.column + 1,
                    row: shipPart.location.row + 1
                };
                const bottom: ShipPartLocation = { column: shipPart.location.column, row: shipPart.location.row + 1 };

                const bottomLeft: ShipPartLocation = {
                    column: shipPart.location.column - 1,
                    row: shipPart.location.row + 1
                };

                const left: ShipPartLocation = { column: shipPart.location.column - 1, row: shipPart.location.row };

                [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left].forEach(safeCell => {
                    result.push(safeCell);
                });
            });
        }
    });

    return result;
}
