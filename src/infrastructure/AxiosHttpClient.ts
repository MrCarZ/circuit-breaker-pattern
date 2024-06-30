/* eslint-disable @typescript-eslint/no-explicit-any */
import { Axios, AxiosResponse } from "axios";
import HttpClient from "../interfaces/HttpClient";
import { HttpRequest } from "../types/http/HttpRequest";
import { HttpResponse } from "../types/http/HttpResponse";
import { HttpStatusCode } from "../enums/HttpStatusCode";

export default class AxiosHttpClient implements HttpClient {
  private readonly axios: Axios;

  constructor(axios: Axios) {
    this.axios = axios;
  }

  async request<T>(requestParameters: HttpRequest): Promise<HttpResponse<T>> {
    const { body, method, url, params, header, withCredentials } =
      requestParameters;

    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await this.axios.request({
        method,
        url,
        headers: header,
        data: body,
        params,
        withCredentials,
      });
    } catch (error: any) {
      if (error.request && !error.response) {
        axiosResponse = {
          ...error,
          status: HttpStatusCode.InternalServerError,
        };
      } else {
        axiosResponse = {
          ...error,
          data: error.response?.data,
          status: error.response.status,
        };
      }
    }

    return {
      statusCode: axiosResponse.status,
      header: axiosResponse.headers,
      data: axiosResponse.data,
    };
  }
}
