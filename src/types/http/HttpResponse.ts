import { HttpStatusCode } from "../../enums/HttpStatusCode";
import { DefaultDataType } from "../data/DefaultDataType";

export type HttpResponse<T = DefaultDataType<any>> = {
  statusCode: HttpStatusCode;
  header: any;
  data: T;
};
