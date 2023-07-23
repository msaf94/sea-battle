import 'solid-styled-components';

declare module 'solid-styled-components' {
    export interface DefaultTheme {
        /** Внешний отступ контейнера приложения */
        padding: number;
        /** Размер клетки поля */
        partSize: number;
    }
}
