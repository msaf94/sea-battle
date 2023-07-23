import { ShipType } from 'store/declare';

export const shipTemplates: Record<ShipType, { count: number; size: number }> = {
    '1': {
        count: 4,
        size: 1
    },
    '2': {
        count: 3,
        size: 2
    },
    '3': {
        count: 2,
        size: 3
    },
    '4': {
        count: 1,
        size: 4
    }
};
