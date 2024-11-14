import { QueryStatsResponse, Stat } from '../../../xray-protos/app/stats/command/command';
import { IInboundStat } from './interfaces';

/**
 * Model class for handling inbound statistics response data from the Xray server.
 */
export class GetInboundStatsResponseModel {
    /**
     * The inbound statistics data, or null if no data is available.
     * Contains traffic statistics (uplink/downlink) for a specific inbound connection.
     */
    public inbound: IInboundStat | null;

    /**
     * Creates a new GetInboundStatsResponseModel instance.
     *
     * @param data - The raw query stats response from the Xray server
     */
    constructor(data: QueryStatsResponse) {
        const inbounds = this.parseData(data);
        this.inbound = inbounds[0] ?? null;
    }

    /**
     * Parses the raw stats response data into formatted inbound statistics.
     *
     * @param data - The raw query stats response to parse
     * @returns An array of formatted inbound statistics containing traffic data
     * @private
     */
    private parseData(data: QueryStatsResponse): IInboundStat[] {
        const formattedStats = data.stat.reduce((acc: IInboundStat[], curr: Stat) => {
            const nameParts = curr.name.split('>>>');
            const inboundTag = nameParts[1];
            const type = nameParts[3];
            const value = curr.value;

            let inbound = acc.find((item) => item.inbound === inboundTag);

            if (!inbound) {
                inbound = { inbound: inboundTag, uplink: 0, downlink: 0 };
                acc.push(inbound);
            }

            if (type === 'uplink') {
                inbound.uplink += value;
            } else if (type === 'downlink') {
                inbound.downlink += value;
            }

            return acc;
        }, []);

        return formattedStats;
    }
}
