import { type Component } from 'solid-js';
import { modeStore } from 'store/modeStore';

import { Field } from 'components/Field';

import { EnemyFieldShipPart } from './EnemyFieldShipPart';

export const EnemyField: Component = () => {
    const { getMode } = modeStore;

    return <Field isActive={getMode() === 'enemy'} component={EnemyFieldShipPart} />;
};
