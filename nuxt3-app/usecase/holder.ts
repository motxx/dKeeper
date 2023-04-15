import { BbsBlsSignature } from "../zk/bbs-bls-signature";

export class Holder {
  credential: object | null = null;
  presentation: object | null = null;

  fetchCredential = async (did: string) => {
    this.credential = await this.load(did);
    return this.credential;
  };

  createPresentation = async (
    nameDisclosure: boolean,
    genderDisclosure: boolean,
    countryDisclosure: boolean
  ) => {
    if (!this.credential) {
      return null;
    }
    const bbsBls = await BbsBlsSignature.connect();
    const proof = await bbsBls.deriveProof(
      this.credential,
      nameDisclosure,
      genderDisclosure,
      countryDisclosure,
    );
    console.log(proof);
    this.presentation = proof;
    return this.presentation;
  };

  sendTransaction = async () => {
    console.log("execute dApp");
  };

  load = async (did: string) => {
    const key = `signedDocument-${did}`;
    const serializedValue = window.localStorage.getItem(key);
    if (serializedValue) {
      return JSON.parse(serializedValue);
    }
    return null;
  };  
}
