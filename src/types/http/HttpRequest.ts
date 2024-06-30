import { HttpMethod } from "../../enums/HttpMethod";

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  withCredentials?: boolean;
  responseType?:
    | "blob"
    | "arraybuffer"
    | "document"
    | "json"
    | "text"
    | "stream";
  header?: any;
  params?: any;
  body?: any;
};
