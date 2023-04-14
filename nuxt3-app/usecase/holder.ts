import signedDocument from "../zk/data/signedDocument.json";

export class Holder {
  credentials: string | null = null;
  presentation: string | null = null;

  constructor() {
  }

  fetchCredential = async () => {
    this.credentials = JSON.stringify(signedDocument);
    return this.credentials;
  };

  createPresentation = async () => {
    if (!this.credentials) {
      return null;
    }
    this.presentation = "present";
    return this.presentation;
  };

  sendTransaction = async () => {
    console.log("execute dApp");
  };
}
