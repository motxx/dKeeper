import { aws_apigateway, aws_dynamodb } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RestApiGetAccessToken } from "./rest-apis/rest-api-get-access-token";
import { RestApiVerifyProof } from "./rest-apis/rest-api-verify-proof";

export class RestApis {
  static baseHandlerId = "ETHTokyo";
  restApi: aws_apigateway.RestApi;

  constructor(private scope: Construct) {}

  createResource() {
    this.restApi = new aws_apigateway.RestApi(
      this.scope,
      `${RestApis.baseHandlerId}GetAccessToken`
    );
    const v1 = this.restApi.root.addResource("v1");
    new RestApiGetAccessToken(
      this.scope,
      v1,
      RestApis.baseHandlerId
    ).createResource();
    // manually deployed for now.
    /*
    new RestApiVerifyProof(
      this.scope,
      v1,
      RestApis.baseHandlerId
    ).createResource();
    */
  }
}
