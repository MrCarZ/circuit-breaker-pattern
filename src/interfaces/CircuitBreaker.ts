import { CircuitBreakerParameters } from "../types/circuitBreaker/CircuitBreakerOptions";
import { HttpRequest } from "../types/http/HttpRequest";
import { HttpResponse } from "../types/http/HttpResponse";

export default interface CircuitBreaker {
  fire<T>(requestParameters: HttpRequest): Promise<HttpResponse<T>>;
  success<T>(response: HttpResponse<T>): HttpResponse<T>;
  failure<T>(response: HttpResponse<T>): HttpResponse<T>;
  get circuitParametersInfo(): CircuitBreakerParameters;
}
