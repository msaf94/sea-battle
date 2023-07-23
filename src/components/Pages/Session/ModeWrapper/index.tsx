import { Component, ParentProps } from 'solid-js';
import { currentPlayerStore } from 'store/currentPlayerStore';
import { gameStore } from 'store/gameStore';
import { modeStore } from 'store/modeStore';

import { ReadyStateToggle } from '../ReadyStateToggle';
import { Toggler, Wrapper } from './styles';

export const ModeWrapper: Component<ParentProps> = props => {
    const { getMode, toggleMode } = modeStore;
    const { state: currentPlayerState } = currentPlayerStore;
    const { isPreparationStage } = gameStore;

    return (
        <>
            {isPreparationStage() ? (
                <ReadyStateToggle />
            ) : (
                <Toggler onClick={toggleMode}>
                    Переключиться на {getMode() === 'enemy' ? 'мое поле' : 'поле соперника'}
                </Toggler>
            )}

            <Wrapper>{props.children}</Wrapper>
        </>
    );
};
