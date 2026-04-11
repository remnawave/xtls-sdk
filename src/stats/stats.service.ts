import { Channel, ClientError, Status, createClient } from 'nice-grpc';

import {
    GetAllUsersStatsResponseModel,
    GetUserStatsResponseModel,
    GetSysStatsResponseModel,
    GetUserOnlineStatusResponseModel,
    GetAllInboundsStatsResponseModel,
    GetInboundStatsResponseModel,
    GetAllOutboundsStatsResponseModel,
    GetOutboundStatsResponseModel,
    GetUsersStatsResponseModel,
    UserStat,
} from './models';
import {
    StatsServiceDefinition,
    StatsServiceClient,
} from '../xray-protos/app/stats/command/command';
import { STATS_ERRORS } from '../common/errors';
import { ISdkResponse } from '../common/types';

/**
 * Service class for interacting with Xray server statistics.
 * Provides methods to retrieve system and user statistics.
 *
 * @example
 * ```typescript
 * // Create a new StatsService instance
 * const stats = new StatsService(channel);
 *
 * // Get system stats
 * const sysStats = await stats.getSysStats();
 *
 * // Get all users stats
 * const allUsersStats = await stats.getAllUsersStats();
 *
 * // Get specific user stats
 * const userStats = await stats.getUserStats('username123');
 *
 * // Check if user is online
 * const isOnline = await stats.getUserOnlineStatus('username123');
 * ```
 */
export class StatsService {
    /**
     * The gRPC client instance for making stats-related requests to the Xray server
     * @private
     */
    private readonly client: StatsServiceClient;

    /**
     * Cached flag indicating whether the remote Xray server supports the
     * `GetUsersStats` unary method. `null` means "not probed yet", `true` means
     * the method is available, `false` means the legacy fallback should be used.
     *
     * The flag is cached for the lifetime of this instance — if the Xray core
     * is upgraded without re-creating the SDK, a manual re-instantiation is
     * required to re-detect support.
     * @private
     */
    private supportsGetUsersStats: boolean | null = null;

    /**
     * Creates a new StatsService instance
     * @param channel - The gRPC channel to use for communication with the Xray server
     */
    constructor(private readonly channel: Channel) {
        this.client = createClient(StatsServiceDefinition, channel);
    }

    /**
     * Retrieves system statistics from the Xray server.
     * This includes information about the system's overall performance and resource usage.
     *
     * @returns {Promise<ISdkResponse<GetSysStatsResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data` containing the system stats
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     * const response = await stats.getSysStats();
     *
     * if (response.isOk) {
     *   console.log(response.data); // GetSysStatsResponseModel
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getSysStats(): Promise<ISdkResponse<GetSysStatsResponseModel>> {
        try {
            const response = await this.client.getSysStats({});

            return {
                isOk: true,
                data: new GetSysStatsResponseModel(response),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_SYS_STATS_ERROR(message),
            };
        }
    }

    /**
     * Retrieves statistics for all users from the Xray server.
     * This provides a comprehensive view of all user activities and their resource usage.
     *
     * @param {boolean} reset - Whether to reset the statistics after retrieving them. Defaults to false.
     * @returns {Promise<ISdkResponse<GetAllUsersStatsResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data` containing user stats
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     *
     * // Get stats without resetting
     * const response = await stats.getAllUsersStats();
     *
     * // Get stats and reset them
     * const responseWithReset = await stats.getAllUsersStats(true);
     *
     * if (response.isOk) {
     *   console.log(response.data.users); // Array of user statistics
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getAllUsersStats(
        reset: boolean = false,
    ): Promise<ISdkResponse<GetAllUsersStatsResponseModel>> {
        try {
            const response = await this.client.queryStats({
                pattern: 'user>>>',
                reset,
            });

            return {
                isOk: true,
                data: new GetAllUsersStatsResponseModel(response),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_ALL_USERS_STATS_ERROR(message),
            };
        }
    }

    /**
     * Retrieves statistics for a specific user from the Xray server.
     * This includes detailed information about the user's network usage, connections, and other metrics.
     *
     * @param {string} username - The username to get statistics for
     * @param {boolean} reset - Whether to reset the statistics after retrieving them. Defaults to false.
     * @returns {Promise<ISdkResponse<GetUserStatsResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data` containing the user's stats
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     *
     * // Get user stats without resetting
     * const response = await stats.getUserStats('username123');
     *
     * // Get user stats and reset them
     * const responseWithReset = await stats.getUserStats('username123', true);
     *
     * if (response.isOk) {
     *   console.log(response.data.user); // User statistics
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getUserStats(
        username: string,
        reset: boolean = false,
    ): Promise<ISdkResponse<GetUserStatsResponseModel>> {
        try {
            const response = await this.client.queryStats({
                pattern: `user>>>${username}>>>`,
                reset,
            });

            return {
                isOk: true,
                data: new GetUserStatsResponseModel(response),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_USER_STATS_ERROR(message),
            };
        }
    }

    /**
     * Checks if a specific user is currently online on the Xray server.
     * This method queries the server's real-time connection status for the specified user.
     *
     * @param {string} username - The username to check online status for
     * @returns {Promise<ISdkResponse<GetUserOnlineStatusResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data` containing the user's online status (`data.online`)
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     * const response = await stats.getUserOnlineStatus('username123');
     *
     * if (response.isOk) {
     *   if (response.data.online) {
     *     console.log('User is online');
     *   } else {
     *     console.log('User is offline');
     *   }
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getUserOnlineStatus(
        username: string,
    ): Promise<ISdkResponse<GetUserOnlineStatusResponseModel>> {
        try {
            await this.client.getStatsOnline({
                name: `user>>>${username}>>>online`,
            });

            return {
                isOk: true,
                data: new GetUserOnlineStatusResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            const isNotFound = message.includes('online not found.');
            if (isNotFound) {
                return {
                    isOk: true,
                    data: new GetUserOnlineStatusResponseModel(false),
                };
            }

            return {
                isOk: false,
                ...STATS_ERRORS.GET_USER_ONLINE_STATUS_ERROR(message),
            };
        }
    }

    /**
     * Gets statistics for all inbound connections.
     *
     * @param reset - Whether to reset the statistics after retrieving them. Defaults to false.
     * @returns A promise that resolves to an ISdkResponse containing:
     * - On success: An object with `isOk: true` and data containing an array of inbound stats
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     * const response = await stats.getAllInboundsStats();
     *
     * if (response.isOk) {
     *   console.log('Inbound stats:', response.data.inbounds);
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getAllInboundsStats(
        reset: boolean = false,
    ): Promise<ISdkResponse<GetAllInboundsStatsResponseModel>> {
        try {
            const response = await this.client.queryStats({
                pattern: 'inbound>>>',
                reset,
            });

            return {
                isOk: true,
                data: new GetAllInboundsStatsResponseModel(response),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_ALL_INBOUNDS_STATS_ERROR(message),
            };
        }
    }

    /**
     * Gets statistics for a specific inbound connection.
     *
     * @param inbound - The name/tag of the inbound connection to get stats for
     * @param reset - Whether to reset the statistics after retrieving them. Defaults to false.
     * @returns A promise that resolves to an ISdkResponse containing:
     * - On success: An object with `isOk: true` and data containing the inbound stats
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     * const response = await stats.getInboundStats('http_in');
     *
     * if (response.isOk) {
     *   console.log('Inbound stats:', response.data.stats);
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getInboundStats(
        inbound: string,
        reset: boolean = false,
    ): Promise<ISdkResponse<GetInboundStatsResponseModel>> {
        try {
            const response = await this.client.queryStats({
                pattern: `inbound>>>${inbound}>>>`,
                reset,
            });

            return {
                isOk: true,
                data: new GetInboundStatsResponseModel(response),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_INBOUND_STATS_ERROR(message),
            };
        }
    }

    /**
     * Gets statistics for all outbound connections.
     *
     * @param reset - Whether to reset the statistics after retrieving them. Defaults to false.
     * @returns A promise that resolves to an ISdkResponse containing:
     * - On success: An object with `isOk: true` and data containing an array of outbound stats
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     * const response = await stats.getAllOutboundsStats();
     *
     * if (response.isOk) {
     *   console.log('Outbound stats:', response.data.outbounds);
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getAllOutboundsStats(
        reset: boolean = false,
    ): Promise<ISdkResponse<GetAllOutboundsStatsResponseModel>> {
        try {
            const response = await this.client.queryStats({
                pattern: 'outbound>>>',
                reset,
            });

            return {
                isOk: true,
                data: new GetAllOutboundsStatsResponseModel(response),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_ALL_OUTBOUNDS_STATS_ERROR(message),
            };
        }
    }

    /**
     * Gets statistics for a specific outbound connection.
     *
     * @param outbound - The name/tag of the outbound connection to get stats for
     * @param reset - Whether to reset the statistics after retrieving them. Defaults to false.
     * @returns A promise that resolves to an ISdkResponse containing:
     * - On success: An object with `isOk: true` and data containing the outbound stats
     * - On failure: An object with `isOk: false` and error details from STATS_ERRORS
     *
     * @example
     * ```typescript
     * const stats = new StatsService(channel);
     * const response = await stats.getOutboundStats('http_out');
     *
     * if (response.isOk) {
     *   console.log('Outbound stats:', response.data.stats);
     * } else {
     *   console.error(response.message); // Error message
     * }
     * ```
     */
    public async getOutboundStats(
        outbound: string,
        reset: boolean = false,
    ): Promise<ISdkResponse<GetOutboundStatsResponseModel>> {
        try {
            const response = await this.client.queryStats({
                pattern: `outbound>>>${outbound}>>>`,
                reset,
            });

            return {
                isOk: true,
                data: new GetOutboundStatsResponseModel(response),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_OUTBOUND_STATS_ERROR(message),
            };
        }
    }

    /**
     * Retrieves per-user statistics (online IP list and, optionally, traffic)
     * from the Xray server.
     *
     * Prefers the native `GetUsersStats` gRPC method introduced in recent
     * Xray-core versions. If the server replies with `UNIMPLEMENTED` (i.e. the
     * method is missing), transparently falls back to the legacy approach of
     * combining `GetAllOnlineUsers` + `GetStatsOnlineIpList`. The detection
     * result is cached for the lifetime of this service instance, so the
     * `UNIMPLEMENTED` round-trip happens at most once.
     *
     * Note: the `includeTraffic` flag is honored only on the native path. In
     * legacy mode traffic is always returned as `undefined`, since the old
     * endpoints do not expose per-user traffic in a single call.
     *
     * @param includeTraffic - Whether to request traffic counters alongside IPs (native path only).
     * @param reset - Whether to reset the stats after retrieving them.
     */
    public async getUsersStats(
        includeTraffic: boolean = false,
        reset: boolean = false,
    ): Promise<ISdkResponse<GetUsersStatsResponseModel>> {
        if (this.supportsGetUsersStats === false) {
            return this.getUsersStatsLegacy(reset);
        }

        try {
            const response = await this.client.getUsersStats({
                includeTraffic,
                reset,
            });

            this.supportsGetUsersStats = true;

            return {
                isOk: true,
                data: new GetUsersStatsResponseModel(response),
            };
        } catch (error) {
            if (error instanceof ClientError && error.code === Status.UNIMPLEMENTED) {
                this.supportsGetUsersStats = false;
                return this.getUsersStatsLegacy(reset);
            }

            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_USERS_STATS_ERROR(message),
            };
        }
    }

    /**
     * Legacy fallback for {@link getUsersStats}. Uses `GetAllOnlineUsers` to
     * enumerate currently connected users and then queries
     * `GetStatsOnlineIpList` for each of them in parallel with a bounded
     * worker pool. Always returns `traffic: undefined` for every user.
     * @private
     */
    private async getUsersStatsLegacy(
        reset: boolean,
    ): Promise<ISdkResponse<GetUsersStatsResponseModel>> {
        try {
            const { users: onlineUsers } = await this.client.getAllOnlineUsers({});

            const onlinePairs = Array.from(new Set(onlineUsers)).map((metricName) => ({
                metricName,
                email: metricName.slice('user>>>'.length, -'>>>online'.length),
            }));

            const results: UserStat[] = new Array(onlinePairs.length);
            const concurrency = Math.min(50, onlinePairs.length);
            let cursor = 0;

            const worker = async (): Promise<void> => {
                while (true) {
                    const index = cursor++;
                    if (index >= onlinePairs.length) return;

                    const { metricName, email } = onlinePairs[index];
                    let ips: UserStat['ips'] = [];
                    try {
                        const ipListResponse = await this.client.getStatsOnlineIpList({
                            name: metricName,
                            reset,
                        });
                        ips = Object.entries(ipListResponse.ips).map(([ip, lastSeen]) => ({
                            ip,
                            lastSeen: new Date(lastSeen * 1000),
                        }));
                    } catch {
                        // ignore
                    }

                    results[index] = { userId: email, ips, traffic: undefined };
                }
            };

            const workers: Promise<void>[] = [];
            for (let i = 0; i < concurrency; i++) {
                workers.push(worker());
            }
            await Promise.all(workers);

            const filtered = results.filter((user) => user.ips.length > 0);

            return {
                isOk: true,
                data: GetUsersStatsResponseModel.fromUserStats(filtered),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...STATS_ERRORS.GET_USERS_STATS_ERROR(message),
            };
        }
    }

    /**
     * Gets the raw gRPC client for direct access to all stats service methods
     * @returns The underlying StatsServiceClient instance
     */
    public get rawClient(): StatsServiceClient {
        return this.client;
    }
}
