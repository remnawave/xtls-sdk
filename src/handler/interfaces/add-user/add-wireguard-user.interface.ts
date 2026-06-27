export interface IAddWireguardUser {
    tag: string;
    username: string;
    level: number;
    publicKey: string;
    allowedIps: string[];
}
