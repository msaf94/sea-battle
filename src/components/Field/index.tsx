import type { Component, Ref } from 'solid-js';

import { colCount, rowCount } from 'constants';

import { Wrapper } from './styles';

interface Props {
    component: Component<{ column: number; row: number }>;
    isActive: boolean;
    onDragLeave?: (e: DragEvent) => void;
    ref?: Ref<HTMLDivElement>;
}

export const Field: Component<Props> = props => {
    const ComponentProp = props.component;

    return (
        <Wrapper
            class={`field${props.isActive ? ' is-active' : ''}`}
            ref={props.ref}
            rowCount={rowCount}
            colCount={colCount}
            onDragLeave={props.onDragLeave}
        >
            {Array(rowCount)
                .fill(undefined)
                .map((_, rowIndex) => {
                    return Array(colCount)
                        .fill(undefined)
                        .map((_, colIndex) => {
                            return <ComponentProp row={rowIndex + 1} column={colIndex + 1} />;
                        });
                })}
        </Wrapper>
    );
};
