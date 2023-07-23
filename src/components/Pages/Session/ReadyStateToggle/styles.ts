import { styled } from 'solid-styled-components';

export const Wrapper = styled.div`
    display: flex;
    gap: 0.5rem;

    & > * {
        flex: 1;
    }
`;

export const Button = styled.button`
    display: inline-block;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;
