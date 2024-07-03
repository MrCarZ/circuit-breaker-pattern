import { useEffect, useState } from "react";
import "./App.css";
import { RemoteTaskService } from "../services/data/RemoteTaskService";
import { Button, Skeleton, notification } from "antd";
import { Task } from "../types/data/Task";
import CircuitBreakerDescription from "./component/CircuitBreakerDescription";
import { CircuitBreakerParameters } from "../types/circuitBreaker/CircuitBreakerOptions";
import { CircuitBreakerStatus } from "../enums/CircuitBreakerStatus";

function App() {
  const [circuitBreakerParameters, setCircuitBreakerParameters] =
    useState<CircuitBreakerParameters>(
      RemoteTaskService.getCircuitBreakerParameters()
    );

  const [isLoading, setIsLoading] = useState(false);

  const updateTaskList = async () => {
    setIsLoading(true);
    try {
      const startingTime = Date.now();
      await RemoteTaskService.findAllTasks<Task[]>();
      notification.success({
        message: `Query succeeded in ${Date.now() - startingTime} ms.`,
      });
    } catch (error: any) {
      notification.error({ message: error.message });
    } finally {
      setCircuitBreakerParameters(
        RemoteTaskService.getCircuitBreakerParameters()
      );

      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (circuitBreakerParameters.status === CircuitBreakerStatus.OPEN) {
  //     setInterval(() => {
  //       setCircuitBreakerParameters(
  //         (previousCircuitBreakerParameters: CircuitBreakerParameters) => ({
  //           ...previousCircuitBreakerParameters,
  //           status: CircuitBreakerStatus.HALF,
  //         })
  //       );
  //     }, circuitBreakerParameters.halfOpenRequestTimeout);
  //   }
  // }, [circuitBreakerParameters.status]);

  return (
    circuitBreakerParameters && (
      <CircuitBreakerDescription
        isLoading={isLoading}
        circuitBreakerParameters={circuitBreakerParameters}
        extra={
          <Button type="primary" onClick={updateTaskList}>
            API Call
          </Button>
        }
      />
    )
  );
}

export default App;
