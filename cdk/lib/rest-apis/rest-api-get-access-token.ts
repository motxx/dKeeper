import { aws_apigateway } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RestApiBase } from "./base";

export class RestApiGetAccessToken extends RestApiBase {
  constructor(
    scope: Construct,
    version: aws_apigateway.IResource,
    baseHandlerId: string
  ) {
    super(scope, version, baseHandlerId);
  }

  public createResource() {
    const postHandler = this.createHandler(
      "GetAccessTokenHandler",
      "access-token/get.ts"
    );
    const getIntegration = new aws_apigateway.LambdaIntegration(postHandler);

    const notification = this.version.addResource("access-token");
    notification.addMethod("GET", getIntegration);
    this.addCorsOptions(notification);
  }
}
