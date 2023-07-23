import { createGlobalStyles } from 'solid-styled-components';

export const GlobalStyles = () => {
    const Styles = createGlobalStyles`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        line-height: 1;
    }

    #root {
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`;

    return <Styles />;
};
