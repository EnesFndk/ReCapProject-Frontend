import { Color } from "./color";
import { ResponseModel } from "../responsemodel";

export interface ColorResponseModel extends ResponseModel {
    data:Color[],
}