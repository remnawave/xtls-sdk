import { createChannel, Channel } from 'nice-grpc';
import { StatsService } from './src/stats/stats.service';
import { HandlerService } from './src/handler/handler.service';

export class XtlsApi {
    public readonly channel: Channel;
    public readonly stats: StatsService;
    public readonly handler: HandlerService;
    constructor(ip: string, port: string) {
        this.channel = createChannel(`${ip}:${port}`);
        this.stats = new StatsService(this.channel);
        this.handler = new HandlerService(this.channel);
        return this;
    }
}
