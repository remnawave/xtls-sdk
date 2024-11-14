import { XtlsApi } from '../index';

describe('StatsService', () => {
    const validIp = '127.0.0.1';
    const validPort = '8080';
    let api: XtlsApi;

    beforeEach(() => {
        api = new XtlsApi(validIp, validPort);
    });

    describe('System Stats', () => {
        it('should get system stats', async () => {
            const response = await api.stats.getSysStats();
            expect(response.isOk).toBe(true);
            if (response.isOk) {
                expect(response.data).toBeDefined();
            }
        });
    });

    describe('User Stats', () => {
        const testUsername = 'testUser';

        it('should get all users stats', async () => {
            const response = await api.stats.getAllUsersStats();
            expect(response.isOk).toBe(true);
            if (response.isOk) {
                expect(Array.isArray(response.data?.users)).toBe(true);
            }
        });

        it('should get all users stats with reset', async () => {
            const response = await api.stats.getAllUsersStats(true);
            expect(response.isOk).toBe(true);
        });

        it('should get specific user stats', async () => {
            const response = await api.stats.getUserStats(testUsername);
            expect(response.isOk).toBe(true);
        });

        it('should get user online status', async () => {
            const response = await api.stats.getUserOnlineStatus(testUsername);
            expect(response.isOk).toBe(true);
            if (response.isOk) {
                expect(typeof response.data?.online).toBe('boolean');
            }
        });
    });

    describe('Inbound Stats', () => {
        const testInbound = 'testInbound';

        it('should get all inbounds stats', async () => {
            const response = await api.stats.getAllInboundsStats();
            expect(response.isOk).toBe(true);
            if (response.isOk) {
                expect(Array.isArray(response.data?.inbounds)).toBe(true);
            }
        });

        it('should get specific inbound stats', async () => {
            const response = await api.stats.getInboundStats(testInbound);
            expect(response.isOk).toBe(true);
        });

        it('should get all inbounds stats with reset', async () => {
            const response = await api.stats.getAllInboundsStats(true);
            expect(response.isOk).toBe(true);
        });
    });

    describe('Outbound Stats', () => {
        const testOutbound = 'testOutbound';

        it('should get all outbounds stats', async () => {
            const response = await api.stats.getAllOutboundsStats();
            expect(response.isOk).toBe(true);
            if (response.isOk) {
                expect(Array.isArray(response.data?.outbounds)).toBe(true);
            }
        });

        it('should get specific outbound stats', async () => {
            const response = await api.stats.getOutboundStats(testOutbound);
            expect(response.isOk).toBe(true);
        });

        it('should get all outbounds stats with reset', async () => {
            const response = await api.stats.getAllOutboundsStats(true);
            expect(response.isOk).toBe(true);
        });
    });

    afterEach(async () => {
        if (api?.channel) {
            await api.channel.close();
        }
    });
});
