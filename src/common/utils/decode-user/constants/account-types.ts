import { Account as TrojanAccount } from '../../../../xray-protos/proxy/trojan/config';
import { Account as VlessAccount } from '../../../../xray-protos/proxy/vless/account';
import { Account as ShadowsocksAccount } from '../../../../xray-protos/proxy/shadowsocks/config';
import { Account as Shadowsocks2022Account } from '../../../../xray-protos/proxy/shadowsocks_2022/config';
import { Account as SocksAccount } from '../../../../xray-protos/proxy/socks/config';
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
    [ShadowsocksAccount.$type]: {
        decoder: ShadowsocksAccount,
        protocol: 'shadowsocks',
        getCredentials: (acc: ShadowsocksAccount): Omit<ShadowsocksAccount, '$type'> => ({
            password: acc.password,
            cipherType: acc.cipherType,
            ivCheck: acc.ivCheck,
        }),
    },
    [Shadowsocks2022Account.$type]: {
        decoder: Shadowsocks2022Account,
        protocol: 'shadowsocks2022',
        getCredentials: (acc: Shadowsocks2022Account): Omit<Shadowsocks2022Account, '$type'> => ({
            key: acc.key,
        }),
    },
    [SocksAccount.$type]: {
        decoder: SocksAccount,
        protocol: 'socks',
        getCredentials: (acc: SocksAccount): Omit<SocksAccount, '$type'> => ({
            username: acc.username,
            password: acc.password,
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
