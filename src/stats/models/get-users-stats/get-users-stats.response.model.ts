import { GetUsersStatsResponse } from '../../../xray-protos/app/stats/command/command';

export interface UserIPEntry {
    ip: string;
    lastSeen: Date;
}

export interface UserTrafficStat {
    uplink: number;
    downlink: number;
}

export interface UserStat {
    /**
     * User identifier. Maps to the `email` field from Xray core.
     */
    userId: string;
    ips: UserIPEntry[];
    traffic?: UserTrafficStat;
}
/**
 * Model class for handling user statistics response data from the Xray server.
 */
export class GetUsersStatsResponseModel {
    /**
     * The user statistics data, or null if no data is available.
     */
    public users: UserStat[] | null;

    /**
     * Creates a new GetUserStatsResponseModel instance.
     *
     * @param data - The raw query stats response from the Xray server
     */
    constructor(data: GetUsersStatsResponse) {
        const users = this.parseData(data);
        this.users = users;
    }

    /**
     * Creates a model instance from an already-parsed array of user stats,
     * bypassing the native `GetUsersStatsResponse` parser.
     *
     * Intended for code paths that build `UserStat[]` from other sources
     * (e.g. the legacy fallback that combines `GetAllOnlineUsers` and
     * `GetStatsOnlineIpList`).
     */
    public static fromUserStats(users: UserStat[]): GetUsersStatsResponseModel {
        const model = Object.create(
            GetUsersStatsResponseModel.prototype,
        ) as GetUsersStatsResponseModel;
        model.users = users;
        return model;
    }

    /**
     * Parses the raw stats response data into formatted user statistics.
     *
     * @param data - The raw query stats response to parse
     * @returns An array of formatted user statistics
     * @private
     */
    private parseData(data: GetUsersStatsResponse): UserStat[] {
        const users: UserStat[] = [];
        for (const user of data.users) {
            const userStat = {
                userId: user.email,
                ips: user.ips.map((ip) => ({ ip: ip.ip, lastSeen: new Date(ip.lastSeen * 1000) })),
                traffic: user.traffic
                    ? { uplink: user.traffic.uplink, downlink: user.traffic.downlink }
                    : undefined,
            };
            users.push(userStat);
        }
        return users;
    }
}
