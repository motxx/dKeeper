import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { Response } from "../response";

const verifyProof = async (proof: string) => {
  return false;
};

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  if (!event.body) {
    return Response.BadRequest("No proof");
  }
  const body = JSON.parse(event.body);
  const proof: string = body.proof;
  const verified = await verifyProof(proof);
  return Response.Ok({
    verified,
  });
};
