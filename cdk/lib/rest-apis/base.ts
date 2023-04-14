import { aws_apigateway, aws_lambda_nodejs, Duration } from "aws-cdk-lib";
import {
  MockIntegration,
  PassthroughBehavior,
  IResource,
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import * as path from "path";

export abstract class RestApiBase {
  constructor(
    protected scope: Construct,
    protected version: aws_apigateway.IResource,
    protected baseHandlerId: string
  ) {}

  public createResource() {
    throw new Error("Implement createResource");
  }

  protected createHandler(
    handlerId: string,
    handlerPath: string,
    additionalProps?: aws_lambda_nodejs.NodejsFunctionProps
  ) {
    return new aws_lambda_nodejs.NodejsFunction(
      this.scope,
      `${this.baseHandlerId}${handlerId}`,
      {
        entry: path.join(__dirname, `../../src/${handlerPath}`),
        bundling: {
          forceDockerBundling: false,
        },
        timeout: Duration.seconds(300),
        memorySize: 2048,
        ...additionalProps,
      }
    );
  }

  protected addCorsOptions(apiResource: IResource, isAirdrop?: boolean) {
    apiResource.addMethod(
      "OPTIONS",
      new MockIntegration({
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers":
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              "method.response.header.Access-Control-Allow-Credentials":
                "'true'",
              "method.response.header.Access-Control-Allow-Methods":
                "'OPTIONS,GET,PUT,POST,DELETE'",
            },
          },
        ],
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Credentials": true,
            },
          },
        ],
      }
    );
  }
}
