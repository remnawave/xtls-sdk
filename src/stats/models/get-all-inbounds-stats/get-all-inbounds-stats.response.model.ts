import { QueryStatsResponse, Stat } from '../../../xray-protos/app/stats/command/command';
import { IInboundStat } from './interfaces';

/**
 * Model for handling and formatting inbound statistics response data
 */
export class GetAllInboundsStatsResponseModel {
    /** Array of inbound statistics containing inbound tag, uplink and downlink data */
    public inbounds: IInboundStat[];

    /**
     * Creates an instance of GetAllInboundsStatsResponseModel
     * @param data Raw stats response data from the query
     */
    constructor(data: QueryStatsResponse) {
        this.inbounds = this.parseData(data);
    }

    /**
     * Parses and formats the raw stats data into inbound-specific statistics
     * @param data Raw stats response data containing individual stat entries
     * @returns Array of formatted inbound statistics
     */
    private parseData(data: QueryStatsResponse): IInboundStat[] {
        const formattedStats = data.stat.reduce((acc: IInboundStat[], curr: Stat) => {
            const nameParts = curr.name.split('>>>');
            const tagValue = nameParts[1];
            const type = nameParts[3];
            const value = curr.value;

            let inbound = acc.find((item) => item.inbound === tagValue);

            if (!inbound) {
                inbound = { inbound: tagValue, uplink: 0, downlink: 0 };
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
