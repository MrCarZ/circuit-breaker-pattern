import { Descriptions, DescriptionsProps, Progress, notification } from "antd";
import CircuitBreakerStatusInfo from "./CircuitBreakerStatus";
import { CircuitBreakerParameters } from "../../../types/circuitBreaker/CircuitBreakerOptions";
import { CircuitBreakerStatus } from "../../../enums/CircuitBreakerStatus";
import { useEffect, useMemo } from "react";

type CircuitBreakerDescriptionProps = {
  isLoading: boolean;
  circuitBreakerParameters: CircuitBreakerParameters;
  extra: React.ReactNode;
};

export default function CircuitBreakerDescription({
  circuitBreakerParameters,
  extra,
}: CircuitBreakerDescriptionProps) {
  const {
    status,
    successCount,
    successThreshold,
    failureCount,
    failureThreshold,
    halfOpenRequestTimeout,
  } = circuitBreakerParameters;

  const circuitBreakerNotification = useMemo(
    () => ({
      [CircuitBreakerStatus.CLOSED]: () =>
        notification.info({
          message: "Circuit Closed!",
        }),
      [CircuitBreakerStatus.HALF]: () =>
        notification.info({
          message: "Circuit went Half-Open!",
        }),
      [CircuitBreakerStatus.OPEN]: () =>
        notification.info({
          message: "Circuit Opened!",
        }),
    }),
    []
  );

  useEffect(() => {
    if (status) {
      circuitBreakerNotification[status]();
    }
  }, [status, circuitBreakerNotification]);

  const successPercentage: number =
    (successCount / (successThreshold + 1)) * 100;

  const failurePercentage: number =
    (failureCount / (failureThreshold + 1)) * 100;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Circuit State",
      children: <CircuitBreakerStatusInfo breakerStatus={status} />,
    },
    {
      key: "2",
      label: "Time to start Half-open",
      children: `${halfOpenRequestTimeout} ms`,
    },
    {
      key: "3",
      label: "Failed Request Count",
      children: <Progress percent={failurePercentage} status="exception" />,
      span: 2,
    },
    {
      key: "4",
      label: "Success Request Count",
      children: <Progress percent={successPercentage} status="success" />,
      span: 2,
    },
  ];

  return (
    <Descriptions
      style={{ minWidth: "100%" }}
      column={2}
      title="Circuit Breaker Information"
      bordered
      items={items}
      extra={extra}
      size="default"
    />
  );
}
