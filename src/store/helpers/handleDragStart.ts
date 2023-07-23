import { Rotation, ShipType } from 'store/declare';
import { dragStore } from 'store/dragStore';

/** Действие при начале переноса корабля */
export function handleDragStart({
    isReplacement,
    rotation,
    shipIndex,
    size,
    type
}: {
    isReplacement: boolean;
    rotation: Rotation;
    shipIndex?: number;
    size: number;
    type: ShipType;
}) {
    const { setDragState } = dragStore;

    return (e: DragEvent) => {
        e.dataTransfer?.setData('Text', ' '); // фикс draggable для touch устройств
        setDragState({ isReplacement, rotation, shipIndex, size, type });
    };
}
