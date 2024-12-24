import { Account as TrojanAccount } from '../../../../xray-protos/proxy/trojan/config';
import { Account as VlessAccount } from '../../../../xray-protos/proxy/vless/account';
import { Account as HttpAccount } from '../../../../xray-protos/proxy/http/config';

export const ACCOUNT_TYPES = {
    [TrojanAccount.$type]: {
        decoder: TrojanAccount,
        protocol: 'trojan',
        getCredentials: (acc: TrojanAccount): Omit<TrojanAccount, '$type'> => ({
            password: acc.password,
        }),
    },
    [VlessAccount.$type]: {
        decoder: VlessAccount,
        protocol: 'vless',
        getCredentials: (acc: VlessAccount): Omit<VlessAccount, '$type'> => ({
            id: acc.id,
            flow: acc.flow,
            encryption: acc.encryption,
        }),
    },
    [HttpAccount.$type]: {
        decoder: HttpAccount,
        protocol: 'http',
        getCredentials: (acc: HttpAccount): Omit<HttpAccount, '$type'> => ({
            username: acc.username,
            password: acc.password,
        }),
    },
} as const;
