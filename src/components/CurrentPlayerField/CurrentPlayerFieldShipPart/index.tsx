import { Component, createMemo } from 'solid-js';
import { currentPlayerStore } from 'store/currentPlayerStore';
import { dragStore } from 'store/dragStore';
import { gameStore } from 'store/gameStore';
import { getPlacementAvailability } from 'store/helpers/getPlacementAvailability';
import { handleDragEnd } from 'store/helpers/handleDragEnd';
import { handleDragStart } from 'store/helpers/handleDragStart';
import { highlightStore } from 'store/highlightStore';

import { ShipPart } from 'components/ShipPart';

interface Props {
    column: number;
    row: number;
}

export const CurrentPlayerFieldShipPart: Component<Props> = ({ column, row }) => {
    const { getShipByShipPart, getShipPartState, isEmptyCellDamaged } = currentPlayerStore;
    const { getDragState } = dragStore;
    const { setHighlightState, state: getHighlightState } = highlightStore;
    const { isPreparationStage } = gameStore;
    const getDragShipSize = createMemo(() => getDragState()?.size ?? NaN);
    const getDragShipRotation = createMemo(() => getDragState()?.rotation);

    const dragEnterHandler = () => {
        const shipSize = getDragShipSize();

        if (!shipSize) return;

        const rotation = getDragShipRotation();

        const partsToHighlight = Array(shipSize)
            .fill(undefined)
            .map((_, index) => {
                const x = row + (rotation === 'horizontal' ? 0 : index);
                const y = column + (rotation === 'horizontal' ? index : 0);

                return {
                    x,
                    y
                };
            });

        const partsHighlightState = partsToHighlight.every(part => {
            return getPlacementAvailability({
                column: part.y,
                row: part.x
            });
        });

        setHighlightState(partsToHighlight.map(part => ({ ...part, isAvailableToPlace: partsHighlightState })));
    };

    const availabilityToPlace = createMemo(() => {
        const isHighlighted = getHighlightState().find(({ x, y }) => x === row && y === column);

        return {
            isAvailableToPlace: isHighlighted !== undefined ? isHighlighted.isAvailableToPlace : undefined,
            isUnavailableToPlace: isHighlighted !== undefined ? !isHighlighted.isAvailableToPlace : undefined
        };
    });

    function dragStartHandler(e: DragEvent) {
        const shipToDrag = getShipByShipPart({ column, row });

        if (shipToDrag) {
            const { ship, shipIndex, shipType } = shipToDrag;

            handleDragStart({
                isReplacement: true,
                rotation: ship[0].rotation,
                shipIndex,
                size: ship.length,
                type: shipType
            })(e);
        }
    }

    const getIsPlaced = createMemo(() => {
        return !!getShipPartState({ column, row });
    });

    const isDraggable = createMemo(() => isPreparationStage() && getIsPlaced());

    const shipPartData = createMemo(() => {
        const { ship = [] } = getShipByShipPart({ column, row }) ?? {};
        const shipPartIndex = ship.findIndex(({ location }) => location.row === row && location.column === column);

        return {
            isFirst: shipPartIndex === 0,
            isLast: shipPartIndex === ship.length - 1
        };
    });

    return (
        <ShipPart
            isAvailableToPlace={availabilityToPlace().isAvailableToPlace}
            isUnavailableToPlace={availabilityToPlace().isUnavailableToPlace}
            placed={getIsPlaced()}
            onDragEnter={dragEnterHandler}
            isDamaged={getShipPartState({ column, row })?.isDamaged}
            onDragStart={dragStartHandler}
            onDragEnd={handleDragEnd}
            draggable={isDraggable()}
            isEmptyCellDamaged={isEmptyCellDamaged({ column, row })}
            isFirst={shipPartData().isFirst}
            isLast={shipPartData().isLast}
            rotation={getShipPartState({ column, row })?.rotation}
        />
    );
};
