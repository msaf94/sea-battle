import { State as GameState } from 'store/gameStore';

export type ShipType = '1' | '2' | '3' | '4';

export type ShipPartLocation = {
    column: number;
    row: number;
};

export type Rotation = 'horizontal' | 'vertical';

export interface ShipPartState {
    isDamaged: boolean;
    location: ShipPartLocation;
    rotation: Rotation;
}

export type ShipName = string;

export type ShipsState = Record<ShipType, ShipPartState[][]>;

interface State {
    attempts: ShipPartLocation[];
    /** ID игрока */
    id: string | null;
    ready: boolean;
    ships: ShipsState;
}

export interface CurrentPlayerState extends State {
    /** выбранная клетка для удара */
    currentAim: ShipPartLocation | null;
}

export interface EnemyState extends State {
    safeZone: ShipPartLocation[];
}

/** Идентификатор игрока */
export type PlayerID = string;

export const totalShipsCount = 10;

export enum PeerMessageType {
    ENEMY_FIRE = 'enemy-fire',
    FIRE_RESULT = 'fire-result',
    GAME_STATE = 'game-state',
    PLAYER_ID = 'player-id',
    READY_STATE = 'ready-state',
    SHIP_PLACEMENT = 'ship-placement'
}

export type PeerMessage =
    | {
          data: State['ships'];
          type: PeerMessageType.SHIP_PLACEMENT;
      }
    | {
          data: State['ready'];
          type: PeerMessageType.READY_STATE;
      }
    | {
          data: State['id'];
          type: PeerMessageType.PLAYER_ID;
      }
    | {
          data: ShipPartLocation;
          type: PeerMessageType.ENEMY_FIRE;
      }
    | {
          data: GameState;
          type: PeerMessageType.GAME_STATE;
      }
    | {
          data: ShipPartLocation & { isSuccessfulHit: boolean };
          type: PeerMessageType.FIRE_RESULT;
      };
