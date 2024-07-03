import { CircuitBreakerStatus } from "../enums/CircuitBreakerStatus";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import CircuitBreaker from "../interfaces/CircuitBreaker";
import HttpClient from "../interfaces/HttpClient";
import { CircuitBreakerParameters } from "../types/circuitBreaker/CircuitBreakerOptions";
import { HttpRequest } from "../types/http/HttpRequest";
import { HttpResponse } from "../types/http/HttpResponse";

export default class CircuitBreakerClass implements CircuitBreaker {
  protected httpClient: HttpClient;
  protected circuitParameters: CircuitBreakerParameters = {
    status: CircuitBreakerStatus.CLOSED,
    failureCount: 0,
    successCount: 0,
    failureThreshold: 2,
    successThreshold: 2,
    tryCloseAfter: Date.now(),
    halfOpenRequestTimeout: 20000,
  };

  constructor(
    httpClient: HttpClient,
    circuitParameters: CircuitBreakerParameters
  ) {
    this.httpClient = httpClient;

    if (circuitParameters) {
      this.circuitParameters = {
        ...circuitParameters,
      };
    }
  }

  async fire<T>(requestParameters: HttpRequest) {
    if (this.circuitParameters.status === CircuitBreakerStatus.OPEN) {
      if (this.circuitParameters.tryCloseAfter <= Date.now()) {
        this.circuitParameters.status = CircuitBreakerStatus.HALF;
      } else {
        throw new Error(
          `The circuit is currently opened. It will try to restabilish connection in ${
            this.circuitParameters.tryCloseAfter - Date.now()
          } ms.`
        );
      }
    }
    try {
      const response = await this.httpClient.request<T>(requestParameters);
      if (response.statusCode === HttpStatusCode.OK) {
        return this.success<T>(response);
      }
      return this.failure<T>(response);
    } catch (error: any) {
      return this.failure<T>(error.message);
    }
  }

  success<T>(requestResponse: HttpResponse<T>) {
    this.circuitParameters.failureCount = 0;
    if (this.circuitParameters.status === CircuitBreakerStatus.HALF) {
      this.circuitParameters.successCount += 1;
      if (
        this.circuitParameters.successCount >
        this.circuitParameters.successThreshold
      ) {
        this.circuitParameters.successCount = 0;
        this.circuitParameters.status = CircuitBreakerStatus.CLOSED;
      }
    }
    return requestResponse;
  }

  failure<T>(requestResponse: HttpResponse<T>) {
    this.circuitParameters.failureCount += 1;

    if (
      this.circuitParameters.status === CircuitBreakerStatus.HALF ||
      this.circuitParameters.failureCount >
        this.circuitParameters.failureThreshold
    ) {
      this.circuitParameters.failureCount = 0;
      this.circuitParameters.successCount = 0;
      this.circuitParameters.status = CircuitBreakerStatus.OPEN;
      this.circuitParameters.tryCloseAfter =
        Date.now() + this.circuitParameters.halfOpenRequestTimeout;
    }

    return requestResponse;
  }

  get circuitParametersInfo() {
    return this.circuitParameters;
  }
}
