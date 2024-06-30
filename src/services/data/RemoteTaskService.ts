import RemoteTask from "../../data/RemoteTask";
import { ApiUrlGeneratorService } from "../infrastructure/ApiUrlGeneratorService";
import { AxiosHttpClientService } from "../infrastructure/AxiosHttpClientService";

export const RemoteTaskService = new RemoteTask(
  ApiUrlGeneratorService("/tasks"),
  AxiosHttpClientService
);
