import { Component, JSX } from 'solid-js';
import { currentPlayerStore } from 'store/currentPlayerStore';
import { ShipType } from 'store/declare';
import { handleDragEnd } from 'store/helpers/handleDragEnd';
import { handleDragStart } from 'store/helpers/handleDragStart';
import { rotationStore } from 'store/rotationStore';

import { ShipPart } from 'components/ShipPart';

import { shipTemplates } from './constants';
import { Controls } from './Controls';
import { getShipPartContent } from './helpers/getShipPartContent';
import { Ship, Ships, ShipTemplate, Wrapper } from './styles';

export const Pool: Component = () => {
    const { state: currentPlayerShipState } = currentPlayerStore;
    const { getRotation } = rotationStore;

    return (
        <Wrapper>
            <Ships rotation={getRotation()}>
                {Object.entries(shipTemplates).map(([_shipType, { count, size }]) => {
                    const shipType = _shipType as ShipType;
                    const availableCount = count - currentPlayerShipState.ships[shipType].length;

                    return (
                        <ShipTemplate>
                            <span>x{availableCount}</span>
                            <Ship
                                draggable
                                onDragStart={handleDragStart({
                                    isReplacement: false,
                                    rotation: getRotation(),
                                    size,
                                    type: shipType as ShipType
                                })}
                                onDragEnd={handleDragEnd}
                            >
                                {Array(size)
                                    .fill(undefined)
                                    .map((_, index) => {
                                        const isFirstPart = index === 0;

                                        const style: JSX.CSSProperties = {
                                            'pointer-events': isFirstPart && availableCount > 0 ? 'auto' : 'none'
                                        };

                                        return <ShipPart style={style}>{getShipPartContent(isFirstPart)}</ShipPart>;
                                    })}
                            </Ship>
                        </ShipTemplate>
                    );
                })}
            </Ships>
            <Controls />
        </Wrapper>
    );
};
