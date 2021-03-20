import Broadcaster from './index';

export default class Subscription {
    name: string;
    private broadcaster: Broadcaster;
    private bindings: { [name: string]: Function[] } = {};
    private $handleMessage: any;

    constructor(broadcaster: Broadcaster, name: string) {
        this.broadcaster = broadcaster;
        this.name = name;

        this.send('subscribe');

        this.$handleMessage = this.handleMessage.bind(this);
        broadcaster.connection.ws.addEventListener('message', this.$handleMessage);
    }

    bind(event: string, callback: Function): void {
        if (!this.bindings[event]) {
            this.bindings[event] = [];
        }

        this.bindings[event].push(callback);
    }

    unbind(event: string): void {
        this.bindings[event] = [];
    }

    handleMessage(e: MessageEvent): void {
        const data = JSON.parse(e.data);

        if (this.bindings[data.event]) {
            const total = this.bindings[data.event].length;

            for (let i = 0; i < total; i++) {
                this.bindings[data.event][i](data.data);
            }
        }
    }

    send(action: string, payload: any = {}): void {
        this.broadcaster.connection.send({
            action,
            body: {
                channel: this.name,
                auth: this.broadcaster.options.auth || {},
                ...payload,
            },
        });
    }

    destroy(): void {
        const keys = Object.keys(this.bindings);

        keys.forEach((key: string) => {
            this.unbind(key);
        });

        this.send('unsubscribe');
        this.broadcaster.connection.ws.removeEventListener('message', this.$handleMessage);
    }
}
