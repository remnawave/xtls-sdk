import { Channel, createClient } from 'nice-grpc';

import {
    RoutingServiceClient,
    RoutingServiceDefinition,
} from '../xray-protos/app/router/command/command';
import { ROUTER_ERRORS } from '../common/errors/router/router.errors';
import { RemoveRuleByRuleTagResponseModel } from './models';
import { ISdkResponse } from '../common/types/sdk-response';
import { IRemoveRuleByRuleTag } from './interfaces';

/**
 * Service for managing routing rules in XRAY/XTLS
 * RoutingService is required (enable on XRay Config) to add/remove routing rules.
 */
export class RouterService {
    private readonly client: RoutingServiceClient;

    /**
     * Creates an instance of RouterService
     * @param channel - The gRPC channel to use for communication
     */
    constructor(private readonly channel: Channel) {
        this.client = createClient(RoutingServiceDefinition, channel);
    }

    /**
     * Removes a routing rule by its tag
     * @param dto - Data transfer object containing rule tag
     * @param dto.ruleTag - Tag of the rule to remove
     * @returns Promise resolving to response indicating success or failure
     */
    public async removeRuleByRuleTag(
        dto: IRemoveRuleByRuleTag,
    ): Promise<ISdkResponse<RemoveRuleByRuleTagResponseModel>> {
        try {
            await this.client.removeRule({
                ruleTag: dto.ruleTag,
            });

            return {
                isOk: true,
                data: new RemoveRuleByRuleTagResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...ROUTER_ERRORS.REMOVE_RULE_BY_RULE_TAG_ERROR(message),
            };
        }
    }

    /**
     * Gets the raw gRPC client for direct access to all routing service methods
     * @returns The underlying RoutingServiceClient instance
     */
    public get rawClient(): RoutingServiceClient {
        return this.client;
    }
}
