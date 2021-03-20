import Connection from './connection';
import Subscription from './subscription';

export interface Options {
    host: string;
    auth?: {
        token: string;
    };
}

export class Broadcaster {
    connection: Connection;
    options: Options;
    private subscriptions: { [name: string]: Subscription } = {};

    constructor(options: Options) {
        this.connection = new Connection(options.host);
        this.options = options;
    }

    subscribe(name: string): any {
        if (!this.subscriptions[name]) {
            this.subscriptions[name] = new Subscription(this, name);
        }

        return this.subscriptions[name];
    }

    unsubscribe(name: string): any {
        const subscription = this.subscriptions[name];

        if (!subscription) {
            return;
        }

        subscription.destroy();
        delete this.subscriptions[name];
    }

    disconnect(): void {
        const keys = Object.keys(this.subscriptions);

        keys.forEach((key: string) => {
            this.unsubscribe(key);
        });

        this.connection.close();
    }

    get socketId(): string {
        return this.connection.socket_id;
    }
}
