export const STATS_ERRORS = {
    UNKNOWN_ERROR: { code: 'A001', message: 'Unexpected error' },
    GET_SYS_STATS_ERROR: (message: string) => ({
        code: 'A002',
        message: `Failed to get system stats: ${message}`,
    }),
    GET_ALL_USERS_STATS_ERROR: (message: string) => ({
        code: 'A003',
        message: `Failed to get all users stats: ${message}`,
    }),
    GET_USER_STATS_ERROR: (message: string) => ({
        code: 'A004',
        message: `Failed to get user stats: ${message}`,
    }),
    GET_USER_ONLINE_STATUS_ERROR: (message: string) => ({
        code: 'A005',
        message: `Failed to get user online status: ${message}`,
    }),
    GET_ALL_INBOUNDS_STATS_ERROR: (message: string) => ({
        code: 'A006',
        message: `Failed to get all inbounds stats: ${message}`,
    }),
    GET_INBOUND_STATS_ERROR: (message: string) => ({
        code: 'A007',
        message: `Failed to get inbound stats: ${message}`,
    }),
    GET_ALL_OUTBOUNDS_STATS_ERROR: (message: string) => ({
        code: 'A008',
        message: `Failed to get all outbounds stats: ${message}`,
    }),
    GET_OUTBOUND_STATS_ERROR: (message: string) => ({
        code: 'A009',
        message: `Failed to get outbound stats: ${message}`,
    }),
} as const;
