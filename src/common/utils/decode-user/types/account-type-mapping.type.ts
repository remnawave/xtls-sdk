import { ACCOUNT_TYPES } from '../constants';
import { TAccountTypesKey } from './account-type-keys.type';

export type AccountTypeMapping = ReturnType<
    (typeof ACCOUNT_TYPES)[TAccountTypesKey]['getCredentials']
>;
