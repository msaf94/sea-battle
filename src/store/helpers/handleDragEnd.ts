import { currentPlayerStore } from 'store/currentPlayerStore';
import { ShipPartState } from 'store/declare';
import { dragStore } from 'store/dragStore';
import { highlightStore } from 'store/highlightStore';

import { getPlacementAvailability } from './getPlacementAvailability';

/** Действие при конце переноса корабля */
export function handleDragEnd() {
    const { replaceShip, setShip } = currentPlayerStore;
    const { clearDragState, getDragState } = dragStore;
    const { clearHighlightState, state: getHighlightState } = highlightStore;

    const highlightState = getHighlightState();
    const dragState = getDragState();

    if (highlightState.length) {
        if (dragState?.type) {
            const partsToAdd: ShipPartState[] = highlightState.map(item => ({
                isDamaged: false,
                location: { column: item.y, row: item.x },
                rotation: dragState.rotation
            }));

            const shipType = dragState.type;

            const isAvailableToPlace = partsToAdd.map(({ location }) => {
                return getPlacementAvailability({
                    column: location.column,
                    row: location.row
                });
            });

            if (isAvailableToPlace.every(Boolean)) {
                if (dragState.isReplacement && dragState.shipIndex !== undefined) {
                    replaceShip({ partsToReplace: partsToAdd, shipIndex: dragState.shipIndex, shipType });
                } else {
                    setShip({ partsToAdd, shipType });
                }
            }
        }
    }

    clearDragState();
    clearHighlightState();
}
