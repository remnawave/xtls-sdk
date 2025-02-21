export const ROUTER_ERRORS = {
    UNKNOWN_ERROR: { code: 'A001', message: 'Unexpected error' },
    ADD_SOURCE_IP_RULE_ERROR: (message: string) => ({
        code: 'A002',
        message: `Error adding source ip rule: ${message}`,
    }),
    REMOVE_RULE_BY_RULE_TAG_ERROR: (message: string) => ({
        code: 'A003',
        message: `Error removing rule by rule tag: ${message}`,
    }),
} as const;
