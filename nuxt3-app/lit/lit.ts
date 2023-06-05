import { ethers } from "ethers";
//import * as fs from "fs";
import type * as LitJsSdk from "@lit-protocol/lit-node-client";
import jsonldStableStringify from "jsonld-stable-stringify";
//import thecode from "../lit_actions/out/main.action.js";

export class Lit {
  static chain = "polygon";
  /**
   * ZKP verifiable presentation and YouTube view count proof
   */
  static authzIpfsId = "Qma8MgBV8TqGT8wTZkkEi3s2BEgbVpRYJcNeTeoA1xeWF7";
  static pkpPubKey =
    "0x041463c0d75c9d1a254a0750228079eb7129fce053eb3ebe663896006cbad8c8321aaf5470c54b2eb43a3452616fb733ead681ca42bf96d01d4b0da30940894beb";
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

  authorization = async (presentation: object, videoId: string) => {
    const authSig = await this.authSig();
    const res = await this.litNodeClient.executeJs({
      //      code: this.thecode(),
      ipfsId: Lit.authzIpfsId,
      authSig,
      jsParams: {
        publicKey: Lit.pkpPubKey,
        sigName: "sig1",
        verifierActions: [
          {
            // verifyzk.action.js
            ipfsId: "QmcMtweCSaLS8TiAswcAVFcLUuSCcFgq5LktX8Ebz6Pvry",
            params: {
              presentation: jsonldStableStringify(presentation),
            },
          },
          {
            // youtubeviewcount.action.js
            ipfsId: "QmWU8ZUGaTp4LdstmXobZTL8TfuzpFgAojSADwYoxWKF1t",
            params: {
              videoId,
              threshold: 10000,
            },
          },
        ],
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
