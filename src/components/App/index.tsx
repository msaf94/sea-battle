import { Router, useRoutes } from '@solidjs/router';
import type { Component } from 'solid-js';
import { ThemeProvider } from 'solid-styled-components';
import { PeerStoreProvider } from 'store/PeerStoreProvider';

import { urlBasename } from 'constants';

import { GlobalStyles } from './GlobalStyles';
import { routes } from './routes';
import { theme } from './theme';

export const App: Component = () => {
    const Routes = useRoutes(routes, import.meta.env.DEV ? '/' : `/${urlBasename}/`);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router>
                <PeerStoreProvider>
                    <Routes />
                </PeerStoreProvider>
            </Router>
        </ThemeProvider>
    );
};
