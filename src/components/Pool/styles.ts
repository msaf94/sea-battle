import { styled } from 'solid-styled-components';
import { Rotation } from 'store/declare';

export const Wrapper = styled.div`
    display: flex;
    column-gap: 1rem;
    justify-content: space-between;
`;

export const Ship = styled.div`
    display: flex;
    cursor: pointer;
    pointer-events: none;

    > * {
        &:first-child {
            pointer-events: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            &:after {
                content: none;
            }
        }
    }
`;

export const ShipTemplate = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Ships = styled.div<{ rotation: Rotation }>`
    display: flex;
    flex-flow: ${({ rotation }) => (rotation === 'horizontal' ? 'column' : 'unset')};
    align-items: ${({ rotation }) => (rotation === 'horizontal' ? 'unset' : 'flex-start')};
    gap: 1rem;

    ${Ship.class} {
        flex-flow: ${({ rotation }) => (rotation === 'horizontal' ? 'unset' : 'column')};
        order: ${({ rotation }) => (rotation === 'horizontal' ? 'unset' : '1')};
    }

    ${ShipTemplate.class} {
        flex-flow: ${({ rotation }) => (rotation === 'horizontal' ? 'unset' : 'column')};
    }
`;
