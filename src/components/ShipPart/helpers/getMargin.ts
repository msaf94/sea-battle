import { Rotation } from 'store/declare';

/** Получить отступы для части корабля */
export function getMargin({ isFirst, isLast, rotation }: { isFirst: boolean; isLast: boolean; rotation?: Rotation }) {
    const indent = '5px';

    function getStyleValue(parts: string[]) {
        return parts.join(' ');
    }

    if (isFirst && isLast) return indent;

    if (rotation) {
        if (rotation === 'horizontal') {
            if (isFirst) return getStyleValue([indent, '0', indent, indent]);
            if (isLast) return getStyleValue([indent, indent, indent, '0']);

            return getStyleValue([indent, '0']);
        }

        if (rotation === 'vertical') {
            if (isFirst) return getStyleValue([indent, indent, '0', indent]);
            if (isLast) return getStyleValue(['0', indent, indent, indent]);

            return getStyleValue(['0', indent]);
        }
    }

    return '0';
}
