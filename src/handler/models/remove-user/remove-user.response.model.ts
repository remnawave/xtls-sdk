export class RemoveUserResponseModel {
    public readonly isDeleted: boolean;

    constructor(isDeleted: boolean) {
        this.isDeleted = isDeleted;
    }
}
