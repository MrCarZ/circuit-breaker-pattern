export type HttpException = {
  cause: any;
  exceptionClass: string;
  stackTrace: string[];
  message: string;
  type: string;
};
