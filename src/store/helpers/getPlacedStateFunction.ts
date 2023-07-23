import { ShipPartLocation, ShipsState } from 'store/declare';

/** Установлена ли часть корабля по координатам */
export function getPlacedStateFunction({
    shipPartLocation: { column, row },
    ships
}: {
    shipPartLocation: ShipPartLocation;
    ships: ShipsState;
}) {
    const allShipParts = Object.values(Object.values(ships))
        .map(ship => Object.values(ship))
        .flat()
        .flat();

    return allShipParts.find(shipPart => {
        const shipPartLocation = shipPart.location;

        return shipPartLocation.column === column && shipPartLocation.row === row;
    });
}
