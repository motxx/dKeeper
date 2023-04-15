import { BbsBlsSignature } from "~/zk/bbs-bls-signature";

export class Issuer {
  issueCredential = async (inputDocument: object) => {
    console.log(inputDocument);
    const bbsBls = await BbsBlsSignature.connect();
    const signedDocument = await bbsBls.signDocument(inputDocument);
    await this.save(signedDocument);
  };

  save = async (signedDocument: any) => {
  };
}
