import { RouteDefinition } from '@solidjs/router';

import { GetSessionID } from 'components/Pages/GetSessionID';
import { Session } from 'components/Pages/Session';

export const routes: RouteDefinition[] = [
    {
        component: Session,
        path: '/session/:id'
    },
    {
        component: GetSessionID,
        path: '/'
    }
];
