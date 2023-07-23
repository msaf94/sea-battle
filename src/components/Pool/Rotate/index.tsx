import type { Component } from 'solid-js';
import { rotationStore } from 'store/rotationStore';

import { Wrapper } from './styles';

export const Rotate: Component = () => {
    const { toggleRotationState } = rotationStore;

    return (
        <Wrapper onClick={toggleRotationState}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M3.51 14.99a9 9 0 1 0 7.235-11.902C7.483 3.547 5.327 5.91 3 8m0 0V2m0 6h6"
                />
            </svg>
        </Wrapper>
    );
};
