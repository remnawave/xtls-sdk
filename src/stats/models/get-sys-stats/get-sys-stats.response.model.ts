import { SysStatsResponse } from '../../../xray-protos/app/stats/command/command';
import Long from 'long';

export class GetSysStatsResponseModel {
    public readonly numGoroutine: number;
    public readonly numGC: number;
    public readonly alloc: number;
    public readonly totalAlloc: number;
    public readonly sys: number;
    public readonly mallocs: number;
    public readonly frees: number;
    public readonly liveObjects: number;
    public readonly pauseTotalNs: number;
    public readonly uptime: number;

    constructor(data: SysStatsResponse) {
        this.numGoroutine = Long.fromValue(data.NumGoroutine).toNumber();
        this.numGC = Long.fromValue(data.NumGC).toNumber();
        this.alloc = Long.fromValue(data.Alloc).toNumber();
        this.totalAlloc = Long.fromValue(data.TotalAlloc).toNumber();
        this.sys = Long.fromValue(data.Sys).toNumber();
        this.mallocs = Long.fromValue(data.Mallocs).toNumber();
        this.frees = Long.fromValue(data.Frees).toNumber();
        this.liveObjects = Long.fromValue(data.LiveObjects).toNumber();
        this.pauseTotalNs = Long.fromValue(data.PauseTotalNs).toNumber();
        this.uptime = Long.fromValue(data.Uptime).toNumber();
    }
}
