import { useNavigate } from '@solidjs/router';
import { Component, createEffect, onMount } from 'solid-js';
import { usePeerState } from 'store/PeerStoreProvider';

import { baseName } from 'constants';

import { Wrapper } from './styles';

export const GetSessionID: Component = () => {
    const { startPeerSession, state } = usePeerState();
    const navigate = useNavigate();

    createEffect(() => {
        if (state.peerId) {
            navigate(`${baseName}/session/${state.peerId}`);
        }
    });

    onMount(() => {
        startPeerSession();
    });

    return <Wrapper>Создаем игровую сессию...</Wrapper>;
};
