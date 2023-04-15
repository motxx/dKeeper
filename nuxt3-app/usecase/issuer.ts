import { BbsBlsSignature } from "~/zk/bbs-bls-signature";

export class Issuer {
  issueCredential = async (did: string, inputDocument: object) => {
    console.log(inputDocument);
    const bbsBls = await BbsBlsSignature.connect();
    const signedDocument = await bbsBls.signDocument(inputDocument);
    await this.save(did, signedDocument);
  };

  save = async (did: string, signedDocument: any) => {
    const key = `signedDocument-${did}`;
    const serializedValue = JSON.stringify(signedDocument);
    window.localStorage.setItem(key, serializedValue);
  };
}
