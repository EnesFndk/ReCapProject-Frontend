import { ResponseModel } from "./responsemodel";

export interface ListResponseModel<T> extends ResponseModel {
    data: T[];
}