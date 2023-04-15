/**
 * NAME: verifyzk
 */

import { VerifierResult } from "types";

const verifyPresentation = async (vp: string) => {
  // Verifier is Node.js code, but it imports MATTR library.
  const zkVerifierURL =
    "https://8bwlh1sj48.execute-api.ap-northeast-1.amazonaws.com/prod";
  const res = await fetch(zkVerifierURL, {
    method: "POST",
    body: vp,
  });
  const jsonstr = (await res.json()).response;
  const json = JSON.parse(jsonstr);
  LitActions.setResponse({
    response: JSON.stringify({
      data: JSON.stringify(json),
      verified: json.verified,
    } as VerifierResult),
  });
  /*
  const verifierResult: VerifierResult = {
    data: JSON.stringify(json),
    verified: json.verified,
  };
  return verifierResult;
  */
};

verifyPresentation(presentation);
