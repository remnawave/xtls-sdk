import { QueryStatsResponse, Stat } from '../../../xray-protos/app/stats/command/command';
import { IUserStat } from './interfaces';

/**
 * Model class for handling user statistics response data from the Xray server.
 */
export class GetUserStatsResponseModel {
    /**
     * The user statistics data, or null if no data is available.
     */
    public user: IUserStat | null;

    /**
     * Creates a new GetUserStatsResponseModel instance.
     *
     * @param data - The raw query stats response from the Xray server
     */
    constructor(data: QueryStatsResponse) {
        const users = this.parseData(data);
        this.user = users[0] ?? null;
    }

    /**
     * Parses the raw stats response data into formatted user statistics.
     *
     * @param data - The raw query stats response to parse
     * @returns An array of formatted user statistics
     * @private
     */
    private parseData(data: QueryStatsResponse): IUserStat[] {
        const formattedStats = data.stat.reduce((acc: IUserStat[], curr: Stat) => {
            const nameParts = curr.name.split('>>>');
            const username = nameParts[1];
            const type = nameParts[3];
            const value = curr.value;

            let user = acc.find((item) => item.username === username);

            if (!user) {
                user = { username, uplink: 0, downlink: 0 };
                acc.push(user);
            }

            if (type === 'uplink') {
                user.uplink += value;
            } else if (type === 'downlink') {
                user.downlink += value;
            }

            return acc;
        }, []);

        return formattedStats;
    }
}
