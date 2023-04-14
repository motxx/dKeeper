import signedDocument from "../zk/data/signedDocument.json";

export class Holder {
  fetchCredential = async () => {
    return JSON.stringify(signedDocument);
  };
}
