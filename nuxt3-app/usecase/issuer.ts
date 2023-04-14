import { BbsBlsSignature } from "~/zk/bbs-bls-signature";

export class Issuer {
  issueCredential = async () => {
    const bbsBls = await BbsBlsSignature.connect();
    const signedDocument = await bbsBls.signDocument();
    console.log("signedDocument", JSON.stringify(signedDocument));
    await this.saveToCeramics(signedDocument);
  };

  saveToCeramics = async (signedDocument: any) => {
    console.log("saveToCeramics");
  };
}
