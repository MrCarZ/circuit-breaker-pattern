import { HttpException } from "../http/HttpException";

export type DefaultDataType<T> = {
  caller: any;
  exception?: HttpException;
  data?: T;
  timestamp: number;
  entitiesTotal?: number;
  pagesTotal?: number;
};
