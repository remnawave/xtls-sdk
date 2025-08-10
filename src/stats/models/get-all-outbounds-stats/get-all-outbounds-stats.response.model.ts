import { QueryStatsResponse } from '../../../xray-protos/app/stats/command/command';
import { IOutboundStat } from './interfaces';

/**
 * Model for handling and formatting outbound statistics response data
 */
export class GetAllOutboundsStatsResponseModel {
    /** Array of outbound statistics containing outbound tag, uplink and downlink data */
    public outbounds: IOutboundStat[];

    /**
     * Creates an instance of GetAllOutboundsStatsResponseModel
     * @param data Raw stats response data from the query
     */
    constructor(data: QueryStatsResponse) {
        this.outbounds = this.parseData(data);
    }

    /**
     * Parses and formats the raw stats data into outbound-specific statistics
     * @param data Raw stats response data containing individual stat entries
     * @returns Array of formatted outbound statistics
     */
    private parseData(data: QueryStatsResponse): IOutboundStat[] {
        const outboundsMap = new Map<string, IOutboundStat>();

        for (const stat of data.stat) {
            const nameParts = stat.name.split('>>>');
            const tagValue = nameParts[1];
            const type = nameParts[3];
            const value = stat.value;

            let outbound = outboundsMap.get(tagValue);
            if (!outbound) {
                outbound = { outbound: tagValue, uplink: 0, downlink: 0 };
                outboundsMap.set(tagValue, outbound);
            }

            if (type === 'uplink') {
                outbound.uplink += value;
            } else if (type === 'downlink') {
                outbound.downlink += value;
            }
        }

        return Array.from(outboundsMap.values());
    }
}
