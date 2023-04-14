import { aws_apigateway } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RestApiBase } from "./base";

export class RestApiVerifyProof extends RestApiBase {
  constructor(
    scope: Construct,
    version: aws_apigateway.IResource,
    baseHandlerId: string
  ) {
    super(scope, version, baseHandlerId);
  }

  public createResource() {
    const postHandler = this.createHandler(
      "VerifyProof",
      "verify-proof/post.ts"
    );
    const postIntegration = new aws_apigateway.LambdaIntegration(postHandler);

    const resource = this.version.addResource("verify-proof");
    resource.addMethod("POST", postIntegration);
    this.addCorsOptions(resource);
  }
}
