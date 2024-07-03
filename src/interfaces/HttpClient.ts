import { HttpRequest } from "../types/http/HttpRequest";
import { HttpResponse } from "../types/http/HttpResponse";

export default interface HttpClient {
  request<T>(requestParameters: HttpRequest): Promise<HttpResponse<T>>;
}
