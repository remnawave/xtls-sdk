import { QueryStatsResponse, Stat } from '../../../xray-protos/app/stats/command/command';
import { IOutboundStat } from './interfaces';

/**
 * Model class for handling outbound statistics response data from the Xray server.
 */
export class GetOutboundStatsResponseModel {
    /**
     * The outbound statistics data, or null if no data is available.
     * Contains traffic statistics (uplink/downlink) for a specific outbound connection.
     */
    public outbound: IOutboundStat | null;

    /**
     * Creates a new GetOutboundStatsResponseModel instance.
     *
     * @param data - The raw query stats response from the Xray server
     */
    constructor(data: QueryStatsResponse) {
        const outbounds = this.parseData(data);
        this.outbound = outbounds[0] ?? null;
    }

    /**
     * Parses the raw stats response data into formatted outbound statistics.
     *
     * @param data - The raw query stats response to parse
     * @returns An array of formatted outbound statistics containing traffic data
     * @private
     */
    private parseData(data: QueryStatsResponse): IOutboundStat[] {
        const formattedStats = data.stat.reduce((acc: IOutboundStat[], curr: Stat) => {
            const nameParts = curr.name.split('>>>');
            const outboundTag = nameParts[1];
            const type = nameParts[3];
            const value = curr.value;

            let outbound = acc.find((item) => item.outbound === outboundTag);

            if (!outbound) {
                outbound = { outbound: outboundTag, uplink: 0, downlink: 0 };
                acc.push(outbound);
            }

            if (type === 'uplink') {
                outbound.uplink += value;
            } else if (type === 'downlink') {
                outbound.downlink += value;
            }

            return acc;
        }, []);

        return formattedStats;
    }
}
