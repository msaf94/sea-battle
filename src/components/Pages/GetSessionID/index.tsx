import { useNavigate } from '@solidjs/router';
import { Component, onMount } from 'solid-js';
import { usePeerState } from 'store/PeerStoreProvider';

import { urlBasename } from 'constants';

import { Wrapper } from './styles';

export const GetSessionID: Component = () => {
    const { startPeerSession, state } = usePeerState();
    const navigate = useNavigate();

    onMount(() => {
        startPeerSession();
        setTimeout(() => {
            navigate(`/${urlBasename}/session/${state.peerId}`);
        }, 1000);
    });

    return <Wrapper>Создаем игровую сессию...</Wrapper>;
};
