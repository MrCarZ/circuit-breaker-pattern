import { Badge } from "antd";
import { CircuitBreakerStatus } from "../../../../enums/CircuitBreakerStatus";

export type CircuitBreakerStatusInfoProps = {
  breakerStatus: CircuitBreakerStatus;
};

export default function CircuitBreakerStatusInfo({
  breakerStatus,
}: CircuitBreakerStatusInfoProps) {
  const breakerStatusColor = {
    [CircuitBreakerStatus.OPEN]: "red",
    [CircuitBreakerStatus.CLOSED]: "green",
    [CircuitBreakerStatus.HALF]: "yellow",
  };

  return (
    <Badge
      status="processing"
      text={breakerStatus}
      color={breakerStatusColor[breakerStatus]}
    />
  );
}
