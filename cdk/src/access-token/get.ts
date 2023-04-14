import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { Response } from "../response";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  return Response.Ok({
    apiKey: process.env.YOUTUBE_DATA_API_KEY,
  });
};
