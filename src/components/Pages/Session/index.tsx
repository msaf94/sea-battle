import { useNavigate, useParams } from '@solidjs/router';
import { Component, createEffect } from 'solid-js';
import { enemyStore } from 'store/enemyStore';
import { gameStore } from 'store/gameStore';
import { usePeerState } from 'store/PeerStoreProvider';

import { CurrentPlayerField } from 'components/CurrentPlayerField';
import { EnemyField } from 'components/EnemyField';
import { Pool } from 'components/Pool';

import { ModeWrapper } from './ModeWrapper';
import { Wrapper } from './styles';

export const Session: Component = () => {
    const { startPeerSession, state } = usePeerState();
    const { isCurrentPlayerActive, isDebugModeEnabled, isPreparationStage, state: getGameState } = gameStore;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { enemyIsPresent, isPlayerReady: isEnemyReady } = enemyStore;

    createEffect(() => {
        if (id && !state.peerId) startPeerSession(id);
    });

    function renderGameStatus() {
        if (!enemyIsPresent()) return 'Соперник еще не присоединился';
        if (isPreparationStage()) {
            if (isEnemyReady()) {
                return 'Соперник готов';
            }

            return 'Соперник расставляет корабли';
        }

        return isCurrentPlayerActive() ? 'Ваш ход' : 'Ход соперника';
    }

    return (
        <>
            <Wrapper>
                <span>{renderGameStatus()}</span>
                <ModeWrapper>
                    <CurrentPlayerField />
                    <EnemyField />
                </ModeWrapper>
                {getGameState.stage === 'preparation' && <Pool />}
                {isDebugModeEnabled() && <button onClick={() => navigate('/')}>запустить новую сессию</button>}
            </Wrapper>
        </>
    );
};
