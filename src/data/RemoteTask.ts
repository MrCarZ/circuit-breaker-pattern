import { HttpMethod } from "../enums/HttpMethod";
import HttpClient from "../interfaces/HttpClient";
import { DefaultDataType } from "../types/data/DefaultDataType";
import { getResponse } from "./utils/getResponse";

export type ExportParams = {
  ids: string[];
  zipName: string;
};

export default class RemoteTask {
  protected readonly url: string;
  protected readonly httpClient: HttpClient;
  // protected readonly circuitBreaker: CircuitBreaker;

  constructor(
    url: string,
    httpClient: HttpClient
    // circuitBreaker: CircuitBreaker
  ) {
    this.url = url;
    this.httpClient = httpClient;
    // this.circuitBreaker = circuitBreaker;
  }

  async findAllTasks<T>(): Promise<DefaultDataType<T>> {
    const response = await this.httpClient.request<DefaultDataType<T>>({
      url: this.url,
      method: HttpMethod.GET,
    });

    return getResponse(response);
  }

  async findById<T>(id: string | number): Promise<DefaultDataType<T>> {
    const response = await this.httpClient.request<DefaultDataType<T>>({
      url: `${this.url}/${encodeURIComponent(id)}`,
      method: HttpMethod.GET,
    });

    return getResponse(response);
  }

  async create<T>(body: unknown): Promise<DefaultDataType<T>> {
    const response = await this.httpClient.request<DefaultDataType<T>>({
      url: this.url,
      method: HttpMethod.POST,
      body,
    });

    return getResponse(response);
  }

  async update<T = any>(
    id: string | number,
    body: T
  ): Promise<DefaultDataType<T>> {
    const response = await this.httpClient.request<DefaultDataType<T>>({
      url: `${this.url}/${encodeURIComponent(id)}`,
      method: HttpMethod.PUT,
      body,
    });

    return getResponse(response);
  }

  async deleteById<T = any>(id: string | number): Promise<DefaultDataType<T>> {
    const response = await this.httpClient.request<DefaultDataType<T>>({
      url: `${this.url}/${encodeURIComponent(id)}`,
      method: HttpMethod.DELETE,
    });

    return getResponse(response);
  }
}
