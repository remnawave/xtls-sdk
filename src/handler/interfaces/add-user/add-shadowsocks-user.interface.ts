import { CipherType } from '../../../xray-protos/proxy/shadowsocks/config';

export interface IAddShadowsocksUser {
    tag: string;
    username: string;
    level: number;
    password: string;
    cipherType: CipherType;
    ivCheck: boolean;
}
