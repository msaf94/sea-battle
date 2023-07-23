import { styled } from 'solid-styled-components';

export const Wrapper = styled('div')`
    padding: ${({ theme }) => theme!.padding}px;
    display: inline-flex;
    row-gap: 1.5rem;
    flex-flow: column;
`;
