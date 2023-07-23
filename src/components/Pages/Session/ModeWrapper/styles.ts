import { styled } from 'solid-styled-components';

import { colCount, rowCount } from 'constants';

export const Wrapper = styled.div`
    position: relative;
    width: ${({ theme }) => `calc(${theme!.partSize}px * ${colCount})`};
    height: ${({ theme }) => `calc(${theme!.partSize}px * ${rowCount})`};
    .field {
        position: absolute;
        left: 0;
        top: 0;
        transform: rotateY(180deg);
        backface-visibility: hidden;
        transition: transform 0.6s;
        perspective: ${({ theme }) => `${(theme!.partSize * colCount) / 2}px`};
        &.is-active {
            transform: rotateY(0);
        }
    }
`;

export const Toggler = styled.button`
    display: inline-block;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;
