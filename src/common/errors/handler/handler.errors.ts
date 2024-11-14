export const HANDLER_ERRORS = {
    UNKNOWN_ERROR: { code: 'A001', message: 'Unexpected error' },
    GET_ALL_USERS_ERROR: (message: string) => ({
        code: 'A002',
        message: `Error getting all users: ${message}`,
    }),
    ADD_USER_ERROR: (message: string) => ({
        code: 'A003',
        message: `Error adding user: ${message}`,
    }),
    REMOVE_USER_ERROR: (message: string) => ({
        code: 'A004',
        message: `Error removing user: ${message}`,
    }),
    GET_INBOUND_USERS_COUNT_ERROR: (message: string) => ({
        code: 'A005',
        message: `Error getting inbound users count: ${message}`,
    }),
} as const;
