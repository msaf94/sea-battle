import type { Component } from 'solid-js';
import { highlightStore } from 'store/highlightStore';
import { modeStore } from 'store/modeStore';

import { Field } from 'components/Field';

import { CurrentPlayerFieldShipPart } from './CurrentPlayerFieldShipPart';

export const CurrentPlayerField: Component = () => {
    const { clearHighlightState } = highlightStore;
    const { getMode } = modeStore;

    let ref: HTMLDivElement | undefined;

    function handleDragLeave(e: DragEvent) {
        if (ref && e.relatedTarget && (e.relatedTarget as HTMLElement).contains(ref)) {
            clearHighlightState();
        }
    }

    return (
        <Field
            isActive={getMode() === 'currentPlayer'}
            ref={ref!}
            component={CurrentPlayerFieldShipPart}
            onDragLeave={handleDragLeave}
        />
    );
};
