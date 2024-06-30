import RemoteTask from "../../data/RemoteTask";
import { AxiosHttpClientService } from "../infrastructure/AxiosHttpClientService";

export const RemoteTaskService = new RemoteTask(
  "/tasks",
  AxiosHttpClientService
);
