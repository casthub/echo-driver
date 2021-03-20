import { v4 as uuid } from 'uuid';

export default class Connection {
    socket_id: string;
    ws: WebSocket;
    private pingInterval: number;

    constructor(host: string) {
        this.socket_id = uuid();
        this.ws = new WebSocket(host);

        /**
         * WebSockets disconnect after certain lengths
         * of inactivity, so we have to ping every so
         * often as a keep-alive.
         */
        this.pingInterval = setInterval((() => {
            this.send({
                action: 'ping',
            });
        }) as TimerHandler, 60000 * 3); // 3 mins

        this.ws.addEventListener('close', () => {
            clearInterval(this.pingInterval);
        });
    }

    send(payload: any): void {
        this.ws.send(JSON.stringify(payload));
    }

    close(): void {
        this.ws.close();
    }

    get connected(): boolean {
        return this.ws.readyState === WebSocket.OPEN;
    }
}
