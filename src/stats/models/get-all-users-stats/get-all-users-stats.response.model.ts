import { QueryStatsResponse, Stat } from '../../../xray-protos/app/stats/command/command';
import { IUserStat } from './interfaces';

/**
 * Model for handling and formatting user statistics response data
 */
export class GetAllUsersStatsResponseModel {
    /** Array of user statistics containing username, uplink and downlink data */
    public users: IUserStat[];

    /**
     * Creates an instance of GetAllUsersStatsResponseModel
     * @param data Raw stats response data from the query
     */
    constructor(data: QueryStatsResponse) {
        this.users = this.parseData(data);
    }

    /**
     * Parses and formats the raw stats data into user-specific statistics
     * @param data Raw stats response data containing individual stat entries
     * @returns Array of formatted user statistics
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
