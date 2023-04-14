import {
  Bls12381G2KeyPair,
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
  deriveProof,
} from "@mattrglobal/jsonld-signatures-bbs";
import { extendContextLoader, sign, verify, purposes } from "jsonld-signatures";

import inputDocument from "./data/inputDocument.json";
import keyPairOptions from "./data/keyPair.json";
import exampleControllerDoc from "./data/controllerDocument.json";
import bbsContext from "./data/bbs.json";
import revealDocument from "./data/deriveProofFrame.json";
import citizenVocab from "./data/citizenVocab.json";
import credentialContext from "./data/credentialsContext.json";
import suiteContext from "./data/suiteContext.json";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const documents: any = {
  "did:example:489398593#test": keyPairOptions,
  "did:example:489398593": exampleControllerDoc,
  "https://w3id.org/security/bbs/v1": bbsContext,
  "https://w3id.org/citizenship/v1": citizenVocab,
  "https://www.w3.org/2018/credentials/v1": credentialContext,
  "https://w3id.org/security/suites/jws-2020/v1": suiteContext,
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const customDocLoader = (url: string): any => {
  const context = documents[url];

  if (context) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  console.log(
    `Attempted to remote load context : '${url}', please cache instead`
  );
  throw new Error(
    `Attempted to remote load context : '${url}', please cache instead`
  );
};

export class BbsBlsSignature {
  documentLoader: any;

  private constructor(
    private BbsBls: typeof import("@mattrglobal/jsonld-signatures-bbs"),
    private JsonLd: typeof import("jsonld-signatures")
  ) {
    console.log("AAA", this.BbsBls);
  }

  static async connect() {
    // 遅延ロード
    return new BbsBlsSignature(
      await import("@mattrglobal/jsonld-signatures-bbs"),
      await import("jsonld-signatures")
    );
  }

  getKeyPair = async () => {
    return await new this.BbsBls.Bls12381G2KeyPair(keyPairOptions);
  };

  signDocument = async () => {
    this.documentLoader = this.JsonLd.extendContextLoader(customDocLoader);
    const keyPair = await this.getKeyPair();
  
    console.log("Input document");
    console.log(JSON.stringify(inputDocument, null, 2));
  
    //Sign the input document
    return await this.JsonLd.sign(inputDocument, {
      suite: new this.BbsBls.BbsBlsSignature2020({ key: keyPair }),
      purpose: new this.JsonLd.purposes.AssertionProofPurpose(),
      documentLoader: this.documentLoader,
    });
  }

  deriveProof = async (signedDocument: any) => {
    this.documentLoader = this.JsonLd.extendContextLoader(customDocLoader);
    console.log("Input document with proof");
    console.log(JSON.stringify(signedDocument, null, 2));
  
    //Derive a proof
    return await this.BbsBls.deriveProof(signedDocument, revealDocument, {
      suite: new this.BbsBls.BbsBlsSignatureProof2020(),
      documentLoader: this.documentLoader,
    });
  }
}
