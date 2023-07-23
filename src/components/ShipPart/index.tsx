import { Component, JSX, ParentProps } from 'solid-js';
import { Rotation } from 'store/declare';

import { Wrapper } from './styles';

export interface ShipPartProps extends JSX.HTMLAttributes<HTMLDivElement>, ParentProps {
    isAvailableToPlace?: boolean;
    isDamaged?: boolean;
    isEmptyCellDamaged?: boolean;
    isFirst?: boolean;
    isLast?: boolean;
    isSafeZone?: boolean;
    isUnavailableToPlace?: boolean;
    placed?: boolean;
    rotation?: Rotation;
}

export const ShipPart: Component<ShipPartProps> = props => {
    return (
        <Wrapper
            {...props}
            isEmptyCellDamaged={!!props.isEmptyCellDamaged}
            isDamaged={!!props.isDamaged}
            isAvailableToPlace={!!props.isAvailableToPlace}
            isUnavailableToPlace={!!props.isUnavailableToPlace}
            placed={!!props.placed}
            isSafeZone={!!props.isSafeZone}
            isFirst={!!props.isFirst}
            isLast={!!props.isLast}
            rotation={props.rotation}
        >
            {props.children}
        </Wrapper>
    );
};
