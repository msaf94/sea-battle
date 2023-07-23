import { currentPlayerStore } from 'store/currentPlayerStore';
import { ShipPartLocation, ShipsState } from 'store/declare';

import { colCount, rowCount } from 'constants';

/** Функция проверки на возможность установки корабля */
export function getPlacementAvailability({
    column,
    row,
    ships: _ships
}: {
    column: number;
    row: number;
    ships?: ShipsState;
}) {
    const { state } = currentPlayerStore;
    const ships = Object.values(_ships ?? state.ships).flat();
    const isAvailableByHorizontalBoundaries = (row - 1) * colCount + column <= row * colCount;
    const isAvailableByVerticalBoundaries = (column - 1) * rowCount + row <= column * rowCount;

    function doesIntersect({
        partToAdd,
        partToCompareWith
    }: {
        partToAdd: ShipPartLocation;
        partToCompareWith: ShipPartLocation;
    }) {
        function doesIntersectBySide({
            partToAddSide,
            partToCompareSide
        }: {
            partToAddSide: number;
            partToCompareSide: number;
        }) {
            return [partToCompareSide, partToCompareSide - 1, partToCompareSide + 1].includes(partToAddSide);
        }

        const doesIntersectByColumn = doesIntersectBySide({
            partToAddSide: partToAdd.column,
            partToCompareSide: partToCompareWith.column
        });

        const doesIntersectByRow = doesIntersectBySide({
            partToAddSide: partToAdd.row,
            partToCompareSide: partToCompareWith.row
        });

        return doesIntersectByColumn && doesIntersectByRow;
    }

    const isAvailableByNearShips = !ships.flat().some(shipPart => {
        return doesIntersect({ partToAdd: { column, row }, partToCompareWith: shipPart.location });
    });

    return isAvailableByHorizontalBoundaries && isAvailableByVerticalBoundaries && isAvailableByNearShips;
}
