import Peer, { DataConnection } from 'peerjs';
import { Component, createContext, createEffect, createSignal, on, ParentProps, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

import { currentPlayerStore } from './currentPlayerStore';
import { PeerMessage, PeerMessageType } from './declare';
import { enemyStore } from './enemyStore';
import { gameStore } from './gameStore';
import { sendPeerMessage } from './helpers/sendPeerMessage';

interface State {
    peerId: string | null;
}

const initialState: State = {
    peerId: null
};

interface IContext {
    startPeerSession: (id?: string) => void;
    state: State;
}

const Context = createContext<IContext>();

export const usePeerState = () => useContext(Context)!;

/** Состояние peer соединения */
export const PeerStoreProvider: Component<ParentProps> = props => {
    const [state, setState] = createStore(initialState);
    const { addAttempt: addCurrentPlayerAttempt, setSafeZone, setState: setEnemyState } = enemyStore;
    const {
        addAttempt: addEnemyAttempt,
        calculateEnemyFireResult,
        clearCurrentAim,
        isPlayerReady: isCurrentPlayerReady,
        state: currentPlayerState
    } = currentPlayerStore;

    const {
        isActionStage,
        isHostById,
        setCurrentActivePlayer,
        setHost,
        setState: setGameState,
        state: gameState,
        toggleActivePlayer
    } = gameStore;

    const [conn, setConn] = createSignal<DataConnection | null>(null);

    // при изменении состояния игры хоста отправляем все состояние сопернику
    createEffect(
        on(
            () => Object.values(gameState),
            () => {
                if (currentPlayerState.id) {
                    if (isHostById(currentPlayerState.id)) {
                        sendPeerMessage(conn?.(), { data: gameState, type: PeerMessageType.GAME_STATE });
                    }
                }
            }
        )
    );

    // выстрел по сопернику
    createEffect(() => {
        if (conn()) {
            if (currentPlayerState.currentAim) {
                sendPeerMessage(conn?.(), { data: currentPlayerState.currentAim, type: PeerMessageType.ENEMY_FIRE });
                clearCurrentAim();
            }
        }
    });

    // отправляем состояние кораблей текущего игрока сопернику
    function sendCurrentPlayerState() {
        sendPeerMessage(conn?.(), { data: currentPlayerState.ships, type: PeerMessageType.SHIP_PLACEMENT });
    }

    // отправка состояния игры сопернику
    function sendGameState() {
        sendPeerMessage(conn?.(), { data: gameState, type: PeerMessageType.GAME_STATE });
    }

    // отправляем состояние готовности сопернику
    function sendCurrentPlayerReadyState() {
        sendPeerMessage(conn?.(), { data: isCurrentPlayerReady(), type: PeerMessageType.READY_STATE });
    }

    createEffect(
        on(
            () => isCurrentPlayerReady(),
            () => {
                if (isCurrentPlayerReady()) {
                    sendCurrentPlayerState();
                }
            }
        )
    );

    // отправляем состояние готовности текущего игрока сопернику
    createEffect(sendCurrentPlayerReadyState);

    // установка хоста в качестве активного игрока вначале игры
    createEffect(
        on(
            () => gameState.stage,
            () => {
                if (isActionStage()) {
                    if (currentPlayerState.id) {
                        if (isHostById(currentPlayerState.id))
                            // выбор игрока, который будет ходить первым
                            setCurrentActivePlayer(currentPlayerState.id);
                    }
                }
            }
        )
    );

    // отправляем ID текущего игрока сопернику
    function sendOurId() {
        sendPeerMessage(conn?.(), { data: currentPlayerState.id, type: PeerMessageType.PLAYER_ID });
    }

    // отправка основной информации текущего игрока
    // хост дополнительно отправляет состояние игры
    function sendGeneralData() {
        if (currentPlayerState.id && isHostById(currentPlayerState.id)) {
            sendGameState();
        }

        sendCurrentPlayerState();
        sendCurrentPlayerReadyState();
    }

    // запись экземпляра соединения в переменную для дальнейшего использования и слушаем сообщения от соперника
    function initConnection(_conn: DataConnection) {
        setConn(_conn);

        if (currentPlayerState.id) {
            if (isHostById(currentPlayerState.id)) {
                setTimeout(() => {
                    sendPeerMessage(conn?.(), { data: gameState, type: PeerMessageType.GAME_STATE });
                }, 1000);
            }
        }

        conn()?.on('data', _peerMessage => {
            const peerMessage = _peerMessage as PeerMessage;

            console.log(peerMessage);

            if (peerMessage.type === PeerMessageType.READY_STATE) {
                setEnemyState('ready', peerMessage.data);
            }

            if (peerMessage.type === PeerMessageType.SHIP_PLACEMENT) {
                setEnemyState('ships', peerMessage.data);
            }

            if (peerMessage.type === PeerMessageType.PLAYER_ID) {
                setEnemyState('id', peerMessage.data);
                sendGeneralData();
            }

            if (peerMessage.type === PeerMessageType.ENEMY_FIRE) {
                const attempt = calculateEnemyFireResult(peerMessage.data);

                if (!attempt.isSuccessfulHit) {
                    if (currentPlayerState.id) {
                        if (isHostById(currentPlayerState.id)) {
                            toggleActivePlayer();
                        }
                    }
                }

                addEnemyAttempt(attempt);

                // отправляем состояние кораблей текущего пользователя при выстреле соперником
                // TODO: не нравится то данные отправляются отсюда
                // хотелось бы реагировать на изменение состояния кораблей и при изменении отправлять состояние кораблей
                sendCurrentPlayerState();
                sendPeerMessage(conn?.(), { data: attempt, type: PeerMessageType.FIRE_RESULT });
            }

            if (peerMessage.type === PeerMessageType.GAME_STATE) {
                setGameState(peerMessage.data);
            }

            if (peerMessage.type === PeerMessageType.FIRE_RESULT) {
                const { isSuccessfulHit, ...attempt } = peerMessage.data;

                if (isSuccessfulHit) {
                    setSafeZone();
                } else {
                    if (currentPlayerState.id) {
                        if (isHostById(currentPlayerState.id)) {
                            toggleActivePlayer();
                        }
                    }
                    addCurrentPlayerAttempt(attempt);
                }
            }
        });
        conn()?.on('open', sendOurId);
    }

    function startPeerSession(id?: string) {
        // @ts-ignore
        const peer = new Peer(null, { debug: 2 });

        peer.on('connection', initConnection);

        // текущий игрок является хостом
        if (!id) {
            if (currentPlayerState.id) {
                console.log('host', currentPlayerState.id);

                setHost(currentPlayerState.id);
            }

            return peer.on('open', id => setState('peerId', id));
        }

        setTimeout(() => {
            const _conn = peer.connect(id, { reliable: true });

            initConnection(_conn);
        }, 1000);
    }

    const contextValue: IContext = {
        startPeerSession,
        state
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};
