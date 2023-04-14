import { BbsBlsSignature } from "~/zk/bbs-bls-signature";
import signedDocument from "../zk/data/signedDocument.json";

export class Holder {
  credential: object | null = null;
  presentation: object | null = null;

  fetchCredential = async () => {
    this.credential = signedDocument;
    return this.credential;
  };

  createPresentation = async () => {
    if (!this.credential) {
      return null;
    }
    const bbsBls = await BbsBlsSignature.connect();
    const proof = await bbsBls.deriveProof(this.credential);
    console.log(proof);
    this.presentation = proof;
    return this.presentation;
  };

  sendTransaction = async () => {
    console.log("execute dApp");
  };
}
