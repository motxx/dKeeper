import { APIGatewayProxyResult } from "aws-lambda";

const headers = {
  /*
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
  "Access-Control-Allow-Origin": "https://example.com",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE",
  */
};

export const APIErrorCode = {
  //  InvalidParams: 1,
  //  InvalidUUID: 2,
} as const;

export type APIErrorCode = typeof APIErrorCode[keyof typeof APIErrorCode];

export class APIError extends Error {
  constructor(public code: APIErrorCode, message: string) {
    super(message);
  }
}

type ResponseBody = {
  message: string;
  code?: number;
  reason?: string;
};

export class Response {
  private static makeBody(
    message: string,
    error?: APIError | string
  ): ResponseBody {
    const params: ResponseBody = { message };
    if (error instanceof APIError) {
      params.reason = error.message;
      params.code = error.code;
    } else if (error) {
      params.reason = error;
    }
    return params;
  }

  static Ok(body?: object): APIGatewayProxyResult {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(body ?? {}),
    };
  }

  static BadRequest(error?: APIError | string): APIGatewayProxyResult {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(this.makeBody("Bad Request", error)),
    };
  }

  static Unauthorized(error?: APIError | string): APIGatewayProxyResult {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify(this.makeBody("Unauthorized", error)),
    };
  }

  static Forbidden(error?: APIError | string): APIGatewayProxyResult {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify(this.makeBody("Forbidden", error)),
    };
  }

  static NotFound(error?: APIError | string): APIGatewayProxyResult {
    console.log(error instanceof Error ? (error as Error).stack : error);
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify(this.makeBody("Not found", error)),
    };
  }

  static InternalServerError(
    internalError: Error | string
  ): APIGatewayProxyResult {
    if (internalError) {
      console.log(
        internalError instanceof Error
          ? (internalError as Error).stack
          : internalError
      );
    }
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Internal server error: " + internalError.toString(),
      }),
    };
  }
}
