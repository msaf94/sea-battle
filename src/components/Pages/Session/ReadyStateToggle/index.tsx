import type { Component } from 'solid-js';
import { currentPlayerStore } from 'store/currentPlayerStore';
import { enemyStore } from 'store/enemyStore';
import { gameStore } from 'store/gameStore';

import { ShareGameSession } from '../ShareGameSession';
import { Button, Wrapper } from './styles';

export const ReadyStateToggle: Component = () => {
    const { areAllShipsPlaced, state, toggleReadyState } = currentPlayerStore;
    const { isHostById, isPreparationStage } = gameStore;
    const { enemyIsPresent, state: enemyState } = enemyStore;

    return (
        <Wrapper>
            <Button disabled={!areAllShipsPlaced()} onClick={toggleReadyState}>
                {state.ready ? 'Не готов' : 'Готов'}
            </Button>
            {!enemyIsPresent() && state.id && isPreparationStage() && isHostById(state.id) && <ShareGameSession />}
        </Wrapper>
    );
};
