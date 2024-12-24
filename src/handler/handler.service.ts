import { createClient, Channel } from 'nice-grpc';
import {
    AddUserOperation,
    HandlerServiceClient,
    HandlerServiceDefinition,
    RemoveUserOperation,
} from '../xray-protos/app/proxyman/command/command';
import { User } from '../xray-protos/common/protocol/user';
import createTypedMessage from '../common/utils/create-typed-message/create-typed-message';
import { ISdkResponse } from '../common/types/sdk-response';
import { HANDLER_ERRORS } from '../common/errors';
import { AddUserResponseModel } from './models';
import { IAddHttpUser, IAddTrojanUser, IAddVlessUser } from './interfaces';
import { Account as TrojanAccount } from '../xray-protos/proxy/trojan/config';
import { Account as VlessAccount } from '../xray-protos/proxy/vless/account';
import { Account as HttpAccount } from '../xray-protos/proxy/http/config';
import { RemoveUserResponseModel } from './models/remove-user/remove-user.response.model';

/**
 * Service for managing Xray inbound handlers and their users
 */
export class HandlerService {
    private readonly client: HandlerServiceClient;

    constructor(private readonly channel: Channel) {
        this.client = createClient(HandlerServiceDefinition, channel);
    }

    /**
     * Adds a new Trojan user to a specified inbound handler.
     *
     * @param {IAddTrojanUser} data - The user data containing tag, username, password and level
     * @returns {Promise<ISdkResponse<AddUserResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data.success` indicating if user was added
     * - On failure: An object with `isOk: false` and error details from HANDLER_ERRORS
     */
    public async addTrojanUser(data: IAddTrojanUser): Promise<ISdkResponse<AddUserResponseModel>> {
        try {
            const response = await this.client.alterInbound({
                tag: data.tag,
                operation: createTypedMessage(AddUserOperation, {
                    user: User.create({
                        email: data.username,
                        level: data.level,
                        account: createTypedMessage(TrojanAccount, {
                            password: data.password,
                        }),
                    }),
                }),
            });

            return {
                isOk: true,
                data: new AddUserResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }

            if (message.includes('already exists')) {
                return {
                    isOk: true,
                    data: new AddUserResponseModel(false),
                };
            }

            return {
                isOk: false,
                ...HANDLER_ERRORS.ADD_USER_ERROR(message),
            };
        }
    }

    /**
     * Adds a new VLESS user to a specified inbound handler.
     *
     * @param {IAddVlessUser} data - The user data containing tag, username, UUID, flow and level
     * @returns {Promise<ISdkResponse<AddUserResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data.success` indicating if user was added
     * - On failure: An object with `isOk: false` and error details from HANDLER_ERRORS
     */
    public async addVlessUser(data: IAddVlessUser): Promise<ISdkResponse<AddUserResponseModel>> {
        try {
            const response = await this.client.alterInbound({
                tag: data.tag,
                operation: createTypedMessage(AddUserOperation, {
                    user: User.create({
                        email: data.username,
                        level: data.level,
                        account: createTypedMessage(VlessAccount, {
                            id: data.uuid,
                            flow: data.flow,
                            encryption: 'none',
                        }),
                    }),
                }),
            });

            return {
                isOk: true,
                data: new AddUserResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }

            if (message.includes('already exists')) {
                return {
                    isOk: true,
                    data: new AddUserResponseModel(false),
                };
            }

            return {
                isOk: false,
                ...HANDLER_ERRORS.ADD_USER_ERROR(message),
            };
        }
    }

    /**
     * Adds a new HTTP user to a specified inbound handler.
     *
     * @param {IAddHttpUser} data - The user data containing tag, username, HTTP username, HTTP password and level
     * @returns {Promise<ISdkResponse<AddUserResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data.success` indicating if user was added
     * - On failure: An object with `isOk: false` and error details from HANDLER_ERRORS
     */
    public async addHttpUser(data: IAddHttpUser): Promise<ISdkResponse<AddUserResponseModel>> {
        try {
            const response = await this.client.alterInbound({
                tag: data.tag,
                operation: createTypedMessage(AddUserOperation, {
                    user: User.create({
                        email: data.username,
                        level: data.level,
                        account: createTypedMessage(HttpAccount, {
                            username: data.http_username,
                            password: data.http_password,
                        }),
                    }),
                }),
            });

            return {
                isOk: true,
                data: new AddUserResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }

            if (message.includes('already exists')) {
                return {
                    isOk: true,
                    data: new AddUserResponseModel(false),
                };
            }

            return {
                isOk: false,
                ...HANDLER_ERRORS.ADD_USER_ERROR(message),
            };
        }
    }

    /**
     * Removes a user from a specified inbound handler.
     *
     * @param {string} tag - The tag identifying the inbound handler
     * @param {string} username - The username/email of the user to remove
     * @returns {Promise<ISdkResponse<RemoveUserResponseModel>>} A promise that resolves to:
     * - On success: An object with `isOk: true` and `data.success` indicating if user was removed
     * - On failure: An object with `isOk: false` and error details from HANDLER_ERRORS
     */
    public async removeUser(
        tag: string,
        username: string,
    ): Promise<ISdkResponse<RemoveUserResponseModel>> {
        try {
            const response = await this.client.alterInbound({
                tag: tag,
                operation: createTypedMessage(RemoveUserOperation, { email: username }),
            });

            return {
                isOk: true,
                data: new RemoveUserResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }

            if (message.includes('not found')) {
                return {
                    isOk: true,
                    data: new RemoveUserResponseModel(false),
                };
            }

            return {
                isOk: false,
                ...HANDLER_ERRORS.REMOVE_USER_ERROR(message),
            };
        }
    }
}
