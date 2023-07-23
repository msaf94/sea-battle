import { styled } from 'solid-styled-components';

export const Wrapper = styled('div')<{ colCount: number; rowCount: number }>`
    display: inline-grid;
    grid-template-rows: ${({ rowCount }) => `repeat(${rowCount}, 1fr)`};
    grid-template-columns: ${({ colCount }) => `repeat(${colCount}, 1fr)`};
`;
