import { ResponseModel } from "../responsemodel";
import { CarDetail } from "./cardetail";


export interface CarDetailResponseModel extends ResponseModel {
    data:CarDetail[]
}