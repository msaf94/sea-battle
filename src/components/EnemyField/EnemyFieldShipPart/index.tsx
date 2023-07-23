import { type Component, createMemo } from 'solid-js';
import { currentPlayerStore } from 'store/currentPlayerStore';
import { enemyStore } from 'store/enemyStore';
import { gameStore } from 'store/gameStore';

import { ShipPart } from 'components/ShipPart';

interface Props {
    column: number;
    row: number;
}

export const EnemyFieldShipPart: Component<Props> = props => {
    const { getShipByShipPart, getShipPartState, isEmptyCellDamaged, isSafeZone } = enemyStore;
    const { isCurrentPlayerActive, isDebugModeEnabled } = gameStore;
    const { setCurrentAim } = currentPlayerStore;

    function clickHandler() {
        if (isCurrentPlayerActive()) {
            const cellCanBeDamaged =
                !isEmptyCellDamaged(props) && !getShipPartState(props)?.isDamaged && !isSafeZone(props);

            if (cellCanBeDamaged) setCurrentAim(props);
        }
    }

    const shipPartData = createMemo(() => {
        const { ship = [] } = getShipByShipPart({ column: props.column, row: props.row }) ?? {};
        const shipPartIndex = ship.findIndex(
            ({ location }) => location.row === props.row && location.column === props.column
        );

        return {
            isFirst: shipPartIndex === 0,
            isLast: shipPartIndex === ship.length - 1
        };
    });

    return (
        <ShipPart
            onClick={clickHandler}
            placed={isDebugModeEnabled() ? !!getShipPartState(props) : undefined}
            isDamaged={getShipPartState(props)?.isDamaged}
            isEmptyCellDamaged={isEmptyCellDamaged(props)}
            isSafeZone={!!isSafeZone(props)}
            rotation={getShipPartState(props)?.rotation}
            isFirst={shipPartData().isFirst}
            isLast={shipPartData().isLast}
        />
    );
};
