import { HttpMethod } from "../enums/HttpMethod";
import CircuitBreaker from "../interfaces/CircuitBreaker";
import { getResponse } from "./utils/getResponse";

export type ExportParams = {
  ids: string[];
  zipName: string;
};

export default class RemoteTask {
  protected readonly url: string;
  protected circuitBreaker: CircuitBreaker;

  constructor(url: string, circuitBreaker: CircuitBreaker) {
    this.url = url;
    this.circuitBreaker = circuitBreaker;
  }

  async findAllTasks<T>(): Promise<T> {
    const response = await this.circuitBreaker.fire<T>({
      url: this.url,
      method: HttpMethod.GET,
    });

    return getResponse(response);
  }

  async findById<Task>(id: string | number): Promise<Task> {
    const response = await this.circuitBreaker.fire<Task>({
      url: `${this.url}/${encodeURIComponent(id)}`,
      method: HttpMethod.GET,
    });

    return getResponse(response);
  }

  async create<Task>(body: unknown): Promise<Task> {
    const response = await this.circuitBreaker.fire<Task>({
      url: this.url,
      method: HttpMethod.POST,
      body,
    });

    return getResponse(response);
  }

  async update<Task>(id: string | number, body: Task): Promise<Task> {
    const response = await this.circuitBreaker.fire<Task>({
      url: `${this.url}/${encodeURIComponent(id)}`,
      method: HttpMethod.PUT,
      body,
    });

    return getResponse(response);
  }

  async deleteById<Task>(id: string | number): Promise<Task> {
    const response = await this.circuitBreaker.fire<Task>({
      url: `${this.url}/${encodeURIComponent(id)}`,
      method: HttpMethod.DELETE,
    });

    return getResponse(response);
  }

  getCircuitBreakerParameters() {
    return this.circuitBreaker.circuitParametersInfo;
  }
}
