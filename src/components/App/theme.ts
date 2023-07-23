import { DefaultTheme } from 'solid-styled-components';

const padding = 10;
const maxPartSize = 40;
const calculatedPartSize = (window.outerWidth - padding * 2) / 10;

export const theme: DefaultTheme = {
    padding,
    partSize: calculatedPartSize > maxPartSize ? maxPartSize : calculatedPartSize
};
