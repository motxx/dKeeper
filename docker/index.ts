import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { Response } from "./response";
import { BbsBlsSignatureProof2020 } from "@mattrglobal/jsonld-signatures-bbs";
// const BbsBlsSignatureProof2020 = require("@mattrglobal/jsonld-signatures-bbs").BbsBlsSignatureProof2020;
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

//Extended document load that uses local contexts
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const documentLoader: any = extendContextLoader(customDocLoader);

const verifyPresentation = async (proof: string) => {
  const verified = await verify(proof, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  return JSON.stringify(verified, null, 2);
};

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  if (!event.body) {
    return Response.BadRequest("No proof");
  }
  try {
    const presentation = JSON.parse(event.body);
    const response = await verifyPresentation(presentation).catch(e => {
      return Response.InternalServerError(e);
    });
    return Response.Ok({
      response,
    });
  } catch (e) {
    return Response.InternalServerError(e);
  }
};
