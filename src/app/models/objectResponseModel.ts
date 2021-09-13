import { ResponseModel } from "./responsemodel";

export interface ObjectResponseModel<T> extends ResponseModel{
    data:T
}