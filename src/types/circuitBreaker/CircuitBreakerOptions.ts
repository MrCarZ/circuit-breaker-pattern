import { CircuitBreakerStatus } from "../../enums/CircuitBreakerStatus";

export type CircuitBreakerParameters = {
  status: CircuitBreakerStatus;
  failureCount: number;
  successCount: number;
  successThreshold: number;
  failureThreshold: number;
  tryCloseAfter: number;
  halfOpenRequestTimeout: number;
};
