export interface ISdkResponse<T> {
    isOk: boolean;
    data?: T;
    message?: string;
}
