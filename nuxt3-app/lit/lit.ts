import { ethers } from "ethers";
//import * as fs from "fs";
import type * as LitJsSdk from "@lit-protocol/lit-node-client";
// @ts-ignore
import signEcdsa from "./node/signEcdsa.lit.js";
// @ts-ignore
import setContribution from "./node/setContribution.lit.js";

export class Lit {
  static chain = "polygon";
  litNodeClient: LitJsSdk.LitNodeClient;

  private constructor(private LitJsSdk: typeof import("@lit-protocol/lit-node-client")) {
    this.litNodeClient = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: "serrano",
      debug: true,
    });
  }

  static async connect() {
    // 遅延ロード
    const lit = new Lit(await import("@lit-protocol/lit-node-client"));
    await lit.litNodeClient.connect();
    return lit;
  }

  createAccount = async () => {
    const authSig = await this.authSig();
    return await this.litNodeClient.executeJs({
      code: signEcdsa,
      authSig,
      jsParams: {},
    });
  }

  setContribution = async (pkpPubkey: string, member: string, userInput: string) => {
    const authSig = await this.authSig();
    return await this.litNodeClient.executeJs({
      code: setContribution,
      authSig,
      jsParams: {
        pkpPubkey,
        member,
        encodedUserInput: userInput,//encodeURIComponent(userInput),
        sigName: "sig1"
      },
    });
  };

  private authSig = async () => {
    return await this.LitJsSdk.checkAndSignAuthMessage({
      chain: Lit.chain,
    });
  }
}
