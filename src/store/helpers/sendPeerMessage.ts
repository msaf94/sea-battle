import { DataConnection } from 'peerjs';
import { PeerMessage } from 'store/declare';

export function sendPeerMessage(connection: DataConnection | null, message: PeerMessage) {
    if (connection) {
        connection.send(message);
    }
}
