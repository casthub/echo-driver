<div align="center">
    <a href="https://www.npmjs.com/package/@casthub/echo-driver" target="_blank">
        <img src="https://img.shields.io/npm/v/@casthub/echo-driver?style=flat-square" alt="NPM" />
    </a>
    <a href="https://discord.gg/XMrHXtN" target="_blank">
        <img src="https://img.shields.io/discord/123906549860139008?color=7289DA&label=discord&logo=discord&logoColor=FFFFFF&style=flat-square" alt="Discord" />
    </a>
    <img src="https://img.shields.io/npm/l/@casthub/echo-driver?style=flat-square" alt="Apache-2.0" />
    <h3>Echo Driver for AWS API Gateway</h3>
</div>

This is a [Laravel Echo](https://laravel.com/docs/8.x/broadcasting) Driver for AWS API Gateway WebSockets, developed for use in [CastHub](https://casthub.app).

Technically it would work for any custom WebSocket implementation that resembles the Pusher driver specification.

## Usage

When creating a new `Echo` instance using `laravel-echo`, you can provide a custom driver. All you need to do is provide this package as that driver. For example:

```typescript
import { Broadcaster } from '@casthub/echo-driver';

const echo = new Echo({
    broadcaster: 'pusher',
    client: new Broadcaster({
        host: 'wss://my-url',
    }),
});
```

The Driver follows the same specification as the Pusher Client, whilst still using Pusher as the broadcaster.

## AWS

TODO:
