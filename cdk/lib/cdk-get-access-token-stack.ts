import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RestApis } from "./rest-apis";

export class CdkGetAccessTokenStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new RestApis(this).createResource();
  }
}
