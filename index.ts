import { createChannel, Channel, ChannelOptions, ChannelCredentials } from 'nice-grpc';

import { HandlerService } from './src/handler/handler.service';
import { RouterService } from './src/router/router.service';
import { StatsService } from './src/stats/stats.service';

export class XtlsApi {
    public readonly channel: Channel;
    public readonly stats: StatsService;
    public readonly handler: HandlerService;
    public readonly router: RouterService;
    constructor(
        ip: string,
        port: string,
        options?: ChannelOptions,
        credentials?: ChannelCredentials,
    ) {
        this.channel = createChannel(`${ip}:${port}`, credentials, {
            ...options,
        });
        this.stats = new StatsService(this.channel);
        this.handler = new HandlerService(this.channel);
        this.router = new RouterService(this.channel);
        return this;
    }
}
