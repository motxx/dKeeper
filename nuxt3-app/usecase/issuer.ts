import { BbsBlsSignature } from "~/zk/bbs-bls-signature";

export class Issuer {
  issueCredential = async () => {
    const bbsBls = await BbsBlsSignature.connect();
    const keyPair = await bbsBls.getKeyPair();
    console.log(keyPair);
    console.log("ok");
  };
}
