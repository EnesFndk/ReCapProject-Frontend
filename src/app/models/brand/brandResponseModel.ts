import { ResponseModel } from "../responsemodel";
import { Brand } from "./brand";

export interface BrandResponseModel extends ResponseModel {
    data:Brand[]
}