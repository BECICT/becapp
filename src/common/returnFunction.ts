import { IReturnObject } from "./returnInterface";

export function returnFeedback(option: IReturnObject): IReturnObject {
    return {
        error: option.error,
        statusCode: option.statusCode,
        errorMessage: option.errorMessage || null,
        sucessMessage: option.sucessMessage || null,
        data: option.data || null,
        trace: option.trace || null
    }
}
