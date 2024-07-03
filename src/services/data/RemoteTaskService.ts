import RemoteTask from "../../data/RemoteTask";
import { CircuitBreakerStatus } from "../../enums/CircuitBreakerStatus";
import { ApiUrlGeneratorService } from "../infrastructure/ApiUrlGeneratorService";
import { CircuitBreakerClassService } from "../infrastructure/CircuitBreakerClassService";

export const RemoteTaskService = new RemoteTask(
  ApiUrlGeneratorService("/tasks"),
  CircuitBreakerClassService({
    status: CircuitBreakerStatus.CLOSED,
    failureCount: 0,
    successCount: 0,
    successThreshold: 2,
    failureThreshold: 2,
    tryCloseAfter: Date.now(),
    halfOpenRequestTimeout: 5000,
  })
);
