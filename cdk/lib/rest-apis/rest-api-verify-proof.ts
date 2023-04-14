import { Duration, aws_lambda, aws_apigateway, aws_lambda_nodejs, aws_ecr } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RestApiBase } from "./base";
import * as path from "path";

export class RestApiVerifyProof extends RestApiBase {
  constructor(
    scope: Construct,
    version: aws_apigateway.IResource,
    baseHandlerId: string
  ) {
    super(scope, version, baseHandlerId);
  }

  private _createHandler(
    handlerId: string,
    handlerPath: string,
    additionalProps?: aws_lambda_nodejs.NodejsFunctionProps
  ) {
    const lambdaEcrRepository = aws_ecr.Repository.fromRepositoryArn(
      this.scope,
      `${this.baseHandlerId}${handlerId}-ECR-Repository`,
      this.scope.node.tryGetContext("ecrRepoArn")
    );
    const lambda = new aws_lambda.DockerImageFunction(
      this.scope,
      `${this.baseHandlerId}${handlerId}`,
      {
        code: aws_lambda.DockerImageCode.fromEcr(lambdaEcrRepository, {
          tag: "latest",
        }),
        timeout: Duration.seconds(30),
      }
    );

    return lambda;
  }

  public createResource() {
    const postHandler = this._createHandler(
      "VerifyProof",
      "verify-proof/post.ts"
    );

    const postIntegration = new aws_apigateway.LambdaIntegration(postHandler);

    const resource = this.version.addResource("verify-proof");
    resource.addMethod("POST", postIntegration);
    this.addCorsOptions(resource);
  }
}
