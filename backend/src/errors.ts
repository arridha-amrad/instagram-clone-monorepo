import { ContentfulStatusCode } from "hono/utils/http-status";

export class MyApiError extends Error {
  public statusCode: ContentfulStatusCode;

  constructor(message: string, statusCode: ContentfulStatusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
