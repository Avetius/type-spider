export const ErrorCodes = {
    ERROR_CREATE_USER: 1,
    ERROR_UPDATE_USER: 2,
    ERROR_DELETE_USER: 3,
    ERROR_GET_USER: 4,
    ERROR_LIST_USER: 5,

    ERROR_CREATE_DEVICE: 6,
    ERROR_UPDATE_DEVICE: 7,
    ERROR_DELETE_DEVICE: 8,
    ERROR_LIST_DEVICES_BY_OWNER_ID: 9,
    ERROR_GET_DEVICE_BY_ID: 10
}

export class ErrorUtil {
    static newError(errorCode) { // : ErrorCodes | string) {
        if (errorCode in ErrorCodes) return new Error(ErrorCodes[errorCode]);
        return new Error(errorCode);
    }
}