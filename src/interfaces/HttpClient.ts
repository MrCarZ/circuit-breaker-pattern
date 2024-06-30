import { DefaultDataType } from "../types/data/DefaultDataType";
import { HttpRequest } from "../types/http/HttpRequest";
import { HttpResponse } from "../types/http/HttpResponse";

export default interface HttpClient {
  request<T = DefaultDataType<any>>(
    params: HttpRequest
  ): Promise<HttpResponse<T>>;
}
