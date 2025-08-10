import { QueryStatsResponse } from '../../../xray-protos/app/stats/command/command';
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
        const usersMap = new Map<string, IUserStat>();

        for (const stat of data.stat) {
            const nameParts = stat.name.split('>>>');
            const username = nameParts[1];
            const type = nameParts[3];
            const value = stat.value;

            let user = usersMap.get(username);
            if (!user) {
                user = { username, uplink: 0, downlink: 0 };
                usersMap.set(username, user);
            }

            if (type === 'uplink') {
                user.uplink += value;
            } else if (type === 'downlink') {
                user.downlink += value;
            }
        }

        return Array.from(usersMap.values());
    }
}
