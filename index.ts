import { createChannel, Channel } from 'nice-grpc';
import { StatsService } from './src/stats/stats.service';
import { HandlerService } from './src/handler/handler.service';
import { RouterService } from './src/router/router.service';

export class XtlsApi {
    public readonly channel: Channel;
    public readonly stats: StatsService;
    public readonly handler: HandlerService;
    public readonly router: RouterService;
    constructor(ip: string, port: string) {
        this.channel = createChannel(`${ip}:${port}`);
        this.stats = new StatsService(this.channel);
        this.handler = new HandlerService(this.channel);
        this.router = new RouterService(this.channel);
        return this;
    }
}
