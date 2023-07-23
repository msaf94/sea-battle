import { ShipPartLocation, ShipsState } from 'store/declare';

import { getPlacedStateFunction } from './getPlacedStateFunction';

/** Получить состояние части корабля по координатам */
export function getShipPartState({
    shipPartLocation,
    ships
}: {
    shipPartLocation: ShipPartLocation;
    ships: ShipsState;
}) {
    return getPlacedStateFunction({ shipPartLocation, ships });
}
