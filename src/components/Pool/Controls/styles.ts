import { styled } from 'solid-styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    gap: 1rem;
`;

export const Control = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ theme }) => `${theme!.partSize}px`};
    height: ${({ theme }) => `${theme!.partSize}px`};
    border: 1px solid;
`;
