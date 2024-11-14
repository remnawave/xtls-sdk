import { AccountTypeMapping } from './account-type-mapping.type';
import { Account as TrojanAccount } from '../../../../xray-protos/proxy/trojan/config';
import { Account as VlessAccount } from '../../../../xray-protos/proxy/vless/account';
import { Account as ShadowsocksAccount } from '../../../../xray-protos/proxy/shadowsocks/config';
import { Account as Shadowsocks2022Account } from '../../../../xray-protos/proxy/shadowsocks_2022/config';
import { Account as SocksAccount } from '../../../../xray-protos/proxy/socks/config';
import { Account as HttpAccount } from '../../../../xray-protos/proxy/http/config';

export interface DecodedUser {
    username: string;
    level: number;
    protocol: string;
    trojan?: Omit<TrojanAccount, '$type'>;
    vless?: Omit<VlessAccount, '$type'>;
    http?: Omit<HttpAccount, '$type'>;
    shadowsocks?: Omit<ShadowsocksAccount, '$type'>;
    shadowsocks2022?: Omit<Shadowsocks2022Account, '$type'>;
    socks?: Omit<SocksAccount, '$type'>;
}
