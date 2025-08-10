import { decodeUser } from '../../../common/utils/decode-user/decode-user';
import { DecodedUser } from '../../../common/utils/decode-user/types/decoded-user.type';
import { User } from '../../../xray-protos/common/protocol/user';

export class GetInboundUsersResponseModel {
    public users: DecodedUser[];

    constructor(users: User[]) {
        this.users = users.map(decodeUser);
    }
}
