import type { Component } from 'solid-js';

import { Random } from '../Random';
import { Rotate } from '../Rotate';
import { Control, Wrapper } from './styles';

export const Controls: Component = () => {
    return (
        <Wrapper>
            <Control>
                <Rotate />
            </Control>
            <Control>
                <Random />
            </Control>
        </Wrapper>
    );
};
