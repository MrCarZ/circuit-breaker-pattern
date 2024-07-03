import CircuitBreakerClass from "../../infrastructure/CircuitBreakerClass";
import { CircuitBreakerParameters } from "../../types/circuitBreaker/CircuitBreakerOptions";
import { AxiosHttpClientService } from "./AxiosHttpClientService";

export const CircuitBreakerClassService = (
  circuitBreakerParameters: CircuitBreakerParameters
) => new CircuitBreakerClass(AxiosHttpClientService, circuitBreakerParameters);
