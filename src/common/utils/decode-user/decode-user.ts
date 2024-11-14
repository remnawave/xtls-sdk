import { User } from '../../../xray-protos/common/protocol/user';
import { ACCOUNT_TYPES } from './constants';
import { DecodedUser } from './types';

/**
 * Decodes a User object into a DecodedUser with credentials and metadata.
 * The function extracts account credentials based on the account type and protocol.
 *
 * @param user - The User object to decode, containing account information including:
 *   - email: User's email address used as username
 *   - level: User's permission level
 *   - account: Object containing account type and encoded credentials
 * @returns DecodedUser object containing:
 *   - Protocol-specific credentials decoded from the account value
 *   - Protocol identifier
 *   - Username (from email)
 *   - Permission level
 * @throws Error if user object is missing account information
 * @throws Error if account type is not recognized
 *
 * @example
 * const user = {
 *   email: "user@example.com",
 *   level: 1,
 *   account: {
 *     type: "standard",
 *     value: Buffer.from("...") // Encoded credentials
 *   }
 * };
 * const decoded = decodeUser(user);
 * // Returns: {
 * //   standard: { ... decoded credentials ... },
 * //   protocol: "standard",
 * //   username: "user@example.com",
 * //   level: 1
 * // }
 */
export const decodeUser = (user: User): DecodedUser => {
    if (!user?.account) {
        throw new Error('Invalid user object: missing account');
    }
    const accountType = user.account.type as keyof typeof ACCOUNT_TYPES;
    const accountConfig = ACCOUNT_TYPES[accountType];

    if (!accountConfig) {
        throw new Error(`Unknown account type: ${accountType}`);
    }

    const accountBuffer = Buffer.from(user.account.value);
    const decodedAccount = accountConfig.decoder.decode(accountBuffer);

    return {
        [accountConfig.protocol]: accountConfig.getCredentials(decodedAccount as never),
        protocol: accountConfig.protocol,
        username: user.email,
        level: user.level,
    };
};
