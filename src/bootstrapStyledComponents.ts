import { setup, shouldForwardProp } from 'solid-styled-components';

export function bootstrapStyledComponents() {
    // список атрибутов которые будут проигнорированы при формировании DOM
    const attributesToIgnore = [
        'isEmptyCellDamaged',
        'isDamaged',
        'isAvailableToPlace',
        'isUnavailableToPlace',
        'isSafeZone',
        'placed',
        'rowCount',
        'colCount',
        'isFirst',
        'isLast',
        'ready',
        'rotation'
    ];

    setup(
        null,
        shouldForwardProp(prop => {
            return !attributesToIgnore.includes(prop);
        })
    );
}
