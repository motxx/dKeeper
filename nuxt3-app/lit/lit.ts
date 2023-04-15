import { ethers } from "ethers";
//import * as fs from "fs";
import type * as LitJsSdk from "@lit-protocol/lit-node-client";

export class Lit {
  static chain = "polygon";
  /**
   * ZKP verifiable presentation and YouTube view count proof
   */
  static authzIpfsId = "Qma8MgBV8TqGT8wTZkkEi3s2BEgbVpRYJcNeTeoA1xeWF7";
  litNodeClient: LitJsSdk.LitNodeClient;

  private constructor(
    private LitJsSdk: typeof import("@lit-protocol/lit-node-client")
  ) {
    this.litNodeClient = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: "serrano",
      debug: true,
    });
  }

  static connect = async () => {
    // 遅延ロード
    const lit = new Lit(await import("@lit-protocol/lit-node-client"));
    await lit.litNodeClient.connect();
    return lit;
  };

  authorization = async () => {
    const authSig = await this.authSig();
    const res = await this.litNodeClient.executeJs({
      ipfsId: Lit.authzIpfsId,
      authSig,
      jsParams: {
        sigName: "sig1",
      },
    });
    const response = JSON.parse(res.response);
    return response.sig1;
  };

  private authSig = async () => {
    return await this.LitJsSdk.checkAndSignAuthMessage({
      chain: Lit.chain,
    });
  };
}
