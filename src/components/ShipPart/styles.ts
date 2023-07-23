import { styled } from 'solid-styled-components';
import { Rotation } from 'store/declare';

import { getBorderRadius } from './helpers/getBorderRadius';
import { getMargin } from './helpers/getMargin';

export const Wrapper = styled('div')<{
    isAvailableToPlace: boolean;
    isDamaged: boolean;
    isEmptyCellDamaged: boolean;
    isFirst: boolean;
    isLast: boolean;
    isSafeZone: boolean;
    isUnavailableToPlace: boolean;
    placed: boolean;
    rotation?: Rotation;
}>`
    box-shadow: inset 0 0 0 1px;
    width: ${({ theme }) => `${theme!.partSize}px`};
    height: ${({ theme }) => `${theme!.partSize}px`};

    display: flex;

    &:after {
        content: '';
        flex: 1;
        background-color: ${({
            isAvailableToPlace,
            isDamaged,
            isEmptyCellDamaged,
            isSafeZone,
            isUnavailableToPlace,
            placed
        }) =>
            (() => {
                if (isUnavailableToPlace) return 'pink';
                if (isDamaged) return 'red';
                if (isEmptyCellDamaged) return 'yellow';
                if (isSafeZone) return 'gray';
                if (placed) return 'blue';
                if (isAvailableToPlace) return 'green';

                return 'transparent';
            })()};

        margin: ${({ isFirst, isLast, placed, rotation }) => (placed ? getMargin({ isFirst, isLast, rotation }) : 0)};
        border-radius: ${({ isFirst, isLast, placed, rotation }) =>
            placed ? getBorderRadius({ isFirst, isLast, rotation }) : 0};
    }
`;
