import { createChannel, Channel } from 'nice-grpc';
import { StatsService } from './src/stats/stats.service';

export class XtlsApi {
    public readonly channel: Channel;
    public readonly stats: StatsService;
    constructor(ip: string, port: string) {
        this.channel = createChannel(`${ip}:${port}`);
        this.stats = new StatsService(this.channel);
        return this;
    }
}
