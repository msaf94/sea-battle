import { Rotation } from 'store/declare';

/** Получить скругления для части корабля */
export function getBorderRadius({
    isFirst,
    isLast,
    rotation
}: {
    isFirst: boolean;
    isLast: boolean;
    rotation?: Rotation;
}) {
    const radius = '8px';

    function getStyleValue(parts: string[]) {
        return parts.join(' ');
    }

    if (isFirst && isLast) return radius;

    if (rotation) {
        if (rotation === 'horizontal') {
            if (isFirst) return getStyleValue([radius, '0', '0', radius]);
            if (isLast) return getStyleValue(['0', radius, radius, '0']);

            return '0';
        }

        if (rotation === 'vertical') {
            if (isFirst) return getStyleValue([radius, radius, '0', '0']);
            if (isLast) return getStyleValue(['0', '0', radius, radius]);

            return '0';
        }
    }

    return '0';
}
