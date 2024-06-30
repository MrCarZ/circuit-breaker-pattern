import { HttpStatusCode } from "../../enums/HttpStatusCode";
import { HttpResponse } from "../../types/http/HttpResponse";

export function getResponse<T>({ statusCode, data }: HttpResponse<T>) {
  if (!Object.values(HttpStatusCode).includes(statusCode))
    throw new Error(
      `The given statusCode (${statusCode}) is not mapped within the system!`
    );

  if (typeof data === "string" && statusCode < 400) {
    return data;
  }

  if (data && typeof data === "object" && Reflect.has(data, "exception")) {
    const responseError = data as any;
    throw new Error(responseError.exception.message);
  }

  const responsesByStatus = {
    200: () => data,
    201: () => data,
    204: () => data,
    400: () => {
      throw new Error("Bad Request");
    },
    401: () => {
      throw new Error("Unauthorized");
    },
    403: () => {
      throw new Error("Forbidden");
    },
    404: () => {
      throw new Error("Not Found");
    },
    500: () => {
      throw new Error("Internal Server Error");
    },
  };

  return responsesByStatus[statusCode]();
}
